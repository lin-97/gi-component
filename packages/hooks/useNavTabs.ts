import type { MaybeRefOrGetter } from 'vue'
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  toRef,
  toValue,
  watch
} from 'vue'

export interface UseNavTabsOptions {
  /** 根容器：选择器（.tab）或 HTMLElement / Ref */
  tabEl: MaybeRefOrGetter<string | HTMLElement | null>
  /** 滚动容器：类名 tab__scroll 或 .tab__scroll 或 HTMLElement */
  tabScrollEl: MaybeRefOrGetter<string | HTMLElement | null>
  /** tab 项 class，如 tab-item */
  tabItemClassName: string
  /** 当前选中值；变化时自动居中（推荐传入） */
  activeValue?: MaybeRefOrGetter<string | number | undefined>
  /** 滚轮换算系数，默认 1 */
  wheelSpeed?: number
}

export interface UseNavTabsReturn {
  /** 滚动到当前选中项并居中 */
  scrollToActive: (behavior?: ScrollBehavior) => void
  /** 获取解析后的滚动容器 */
  getScrollEl: () => HTMLElement | null
}

function normalizeSelector(value: string): string {
  if (value.startsWith('.') || value.startsWith('#')) {
    return value
  }
  return `.${value}`
}

function resolveElement(
  target: string | HTMLElement | null | undefined,
  root?: HTMLElement | Document | null
): HTMLElement | null {
  if (!target) {
    return null
  }
  if (typeof target !== 'string') {
    return target
  }
  const scope = root ?? document
  return scope.querySelector(normalizeSelector(target))
}

/** 滚轮平滑插值系数，越大跟手越快 */
const WHEEL_SCROLL_LERP = 0.4
const WHEEL_LINE_HEIGHT = 16

function getWheelPixelDelta(event: WheelEvent, scrollEl: HTMLElement): number {
  let delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ? event.deltaX
    : event.deltaY

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    delta *= WHEEL_LINE_HEIGHT
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    delta *= scrollEl.clientWidth
  }

  return delta
}

function clampScrollLeft(scrollEl: HTMLElement, left: number): number {
  const maxScroll = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth)
  return Math.max(0, Math.min(left, maxScroll))
}

function scrollItemToCenter(
  scrollEl: HTMLElement,
  activeEl: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
) {
  const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth
  if (maxScroll <= 0) {
    return
  }

  // 使用视口坐标计算，兼容 flex gap / margin 等间距，避免 offsetLeft 偏差
  const scrollRect = scrollEl.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()
  const activeLeftInContent = activeRect.left - scrollRect.left + scrollEl.scrollLeft
  const target = activeLeftInContent - (scrollEl.clientWidth - activeRect.width) / 2

  scrollEl.scrollTo({
    left: Math.max(0, Math.min(target, maxScroll)),
    behavior
  })
}

export function useNavTabs(options: UseNavTabsOptions): UseNavTabsReturn {
  const {
    tabEl,
    tabScrollEl,
    tabItemClassName,
    activeValue,
    wheelSpeed = 1
  } = options

  const activeClassName = `${tabItemClassName}--active`
  const itemSelector = normalizeSelector(tabItemClassName)

  let rootEl: HTMLElement | null = null
  let scrollEl: HTMLElement | null = null
  let resizeObserver: ResizeObserver | null = null
  let wheelRafId: number | null = null
  let wheelTargetScrollLeft = 0

  const cancelWheelAnimation = () => {
    if (wheelRafId !== null) {
      cancelAnimationFrame(wheelRafId)
      wheelRafId = null
    }
  }

  const runWheelAnimation = () => {
    if (!scrollEl) {
      cancelWheelAnimation()
      return
    }

    const current = scrollEl.scrollLeft
    const diff = wheelTargetScrollLeft - current

    if (Math.abs(diff) < 0.5) {
      scrollEl.scrollLeft = wheelTargetScrollLeft
      cancelWheelAnimation()
      return
    }

    scrollEl.scrollLeft = current + diff * WHEEL_SCROLL_LERP
    wheelRafId = requestAnimationFrame(runWheelAnimation)
  }

  const resolveElements = () => {
    const instanceRoot = getCurrentInstance()?.proxy?.$el as HTMLElement | undefined
    const fallbackRoot = instanceRoot instanceof HTMLElement ? instanceRoot : document

    rootEl = resolveElement(toValue(tabEl), fallbackRoot)
    scrollEl = resolveElement(toValue(tabScrollEl), rootEl ?? fallbackRoot)

    return Boolean(rootEl && scrollEl)
  }

  const findActiveItem = (): HTMLElement | null => {
    if (!scrollEl) {
      return null
    }

    const activeByClass = scrollEl.querySelector(normalizeSelector(activeClassName))
    if (activeByClass instanceof HTMLElement) {
      return activeByClass
    }

    const value = activeValue !== undefined ? toValue(activeValue) : undefined
    if (value === undefined) {
      return null
    }

    const items = scrollEl.querySelectorAll<HTMLElement>(itemSelector)
    const matched = Array.from(items).find((item) => item.dataset.value === String(value))
    return matched ?? null
  }

  const scrollToActive = (behavior: ScrollBehavior = 'smooth') => {
    if (!scrollEl) {
      return
    }
    cancelWheelAnimation()
    const activeItem = findActiveItem()
    if (activeItem) {
      scrollItemToCenter(scrollEl, activeItem, behavior)
    }
  }

  const handleWheel = (event: WheelEvent) => {
    if (!scrollEl) {
      return
    }

    const delta = getWheelPixelDelta(event, scrollEl)
    if (delta === 0) {
      return
    }

    event.preventDefault()

    if (wheelRafId === null) {
      wheelTargetScrollLeft = scrollEl.scrollLeft
    }

    wheelTargetScrollLeft = clampScrollLeft(
      scrollEl,
      wheelTargetScrollLeft + delta * wheelSpeed
    )

    if (wheelRafId === null) {
      wheelRafId = requestAnimationFrame(runWheelAnimation)
    }
  }

  const bindWheel = () => {
    scrollEl?.addEventListener('wheel', handleWheel, { passive: false })
  }

  const unbindWheel = () => {
    scrollEl?.removeEventListener('wheel', handleWheel)
    cancelWheelAnimation()
  }

  const bindResizeObserver = () => {
    if (!scrollEl || typeof ResizeObserver === 'undefined') {
      return
    }

    resizeObserver = new ResizeObserver(() => {
      scrollToActive('auto')
    })
    resizeObserver.observe(scrollEl)
  }

  const unbindResizeObserver = () => {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  const setup = async () => {
    await nextTick()
    if (!resolveElements()) {
      return
    }
    bindWheel()
    bindResizeObserver()
    scrollToActive('auto')
  }

  onMounted(() => {
    setup()
  })

  watch(
    () => [toValue(tabEl), toValue(tabScrollEl)] as const,
    () => {
      unbindWheel()
      unbindResizeObserver()
      setup()
    }
  )

  if (activeValue !== undefined) {
    watch(toRef(activeValue), () => {
      nextTick(() => scrollToActive())
    })
  }

  onUnmounted(() => {
    unbindWheel()
    unbindResizeObserver()
    cancelWheelAnimation()
    rootEl = null
    scrollEl = null
  })

  return {
    scrollToActive,
    getScrollEl: () => scrollEl
  }
}
