import type { MaybeRefOrGetter, Ref } from 'vue'
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
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
  /** 左侧滚动按钮元素 */
  tabLeftScrollBtnEl?: MaybeRefOrGetter<string | HTMLElement | null>
  /** 右侧滚动按钮元素 */
  tabRightScrollBtnEl?: MaybeRefOrGetter<string | HTMLElement | null>
  /** 按钮滚动步长占可视宽度比例，默认 0.6 */
  scrollBtnStepRatio?: number
  /** 按钮滚动最小步长（px），默认 120 */
  scrollBtnMinStep?: number
  /** 按钮不可滚动时添加的 class（如 nav-tabs__nav-btn--disabled） */
  navBtnDisabledClassName?: string
}

export interface UseNavTabsReturn {
  /** 滚动到当前选中项并居中 */
  scrollToActive: (behavior?: ScrollBehavior) => void
  /** 获取解析后的滚动容器 */
  getScrollEl: () => HTMLElement | null
  /** 停止滚轮插值动画，避免与 scrollTo 冲突 */
  cancelWheelScroll: () => void
  /** 按步滚动（供外部调用，传入按钮时内部已绑定） */
  scrollByStep: (direction: -1 | 1) => void
  /** 内容是否溢出（可选，与按钮显隐同步更新） */
  showNavBtn: Ref<boolean>
  /** 是否可向左滚动 */
  canScrollLeft: Ref<boolean>
  /** 是否可向右滚动 */
  canScrollRight: Ref<boolean>
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

function getMaxScrollLeft(scrollEl: HTMLElement) {
  return Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth)
}

/** 边界容差，避免浮点误差导致禁用态抖动 */
const SCROLL_EDGE_EPSILON = 1

function canScrollToLeft(scrollEl: HTMLElement) {
  return scrollEl.scrollLeft > SCROLL_EDGE_EPSILON
}

function canScrollToRight(scrollEl: HTMLElement) {
  return scrollEl.scrollLeft < getMaxScrollLeft(scrollEl) - SCROLL_EDGE_EPSILON
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
  return Math.max(0, Math.min(left, getMaxScrollLeft(scrollEl)))
}

function scrollItemToCenter(
  scrollEl: HTMLElement,
  activeEl: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
) {
  const maxScroll = getMaxScrollLeft(scrollEl)
  if (maxScroll <= 0) {
    return
  }

  const scrollRect = scrollEl.getBoundingClientRect()
  const activeRect = activeEl.getBoundingClientRect()
  const activeLeftInContent = activeRect.left - scrollRect.left + scrollEl.scrollLeft
  const target = activeLeftInContent - (scrollEl.clientWidth - activeRect.width) / 2

  scrollEl.scrollTo({
    left: Math.max(0, Math.min(target, maxScroll)),
    behavior
  })
}

function setElementVisible(el: HTMLElement | null, visible: boolean) {
  if (!el) {
    return
  }
  el.style.display = visible ? 'flex' : 'none'
}

function setBtnDisabled(
  el: HTMLElement | null,
  disabled: boolean,
  disabledClassName?: string
) {
  if (!el) {
    return
  }
  if (disabledClassName) {
    el.classList.toggle(disabledClassName, disabled)
  }
  if (disabled) {
    el.setAttribute('aria-disabled', 'true')
  } else {
    el.removeAttribute('aria-disabled')
  }
}

export function useNavTabs(options: UseNavTabsOptions): UseNavTabsReturn {
  const {
    tabEl,
    tabScrollEl,
    tabItemClassName,
    activeValue,
    wheelSpeed = 1,
    tabLeftScrollBtnEl,
    tabRightScrollBtnEl,
    scrollBtnStepRatio = 0.6,
    scrollBtnMinStep = 120,
    navBtnDisabledClassName
  } = options

  const activeClassName = `${tabItemClassName}--active`
  const itemSelector = normalizeSelector(tabItemClassName)
  const showNavBtn = ref(false)
  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)

  let rootEl: HTMLElement | null = null
  let scrollEl: HTMLElement | null = null
  let leftBtnEl: HTMLElement | null = null
  let rightBtnEl: HTMLElement | null = null
  let resizeObserver: ResizeObserver | null = null
  let wheelRafId: number | null = null
  let wheelTargetScrollLeft = 0
  let navBtnRafId: number | null = null

  let onPrevClick: ((event: MouseEvent) => void) | null = null
  let onNextClick: ((event: MouseEvent) => void) | null = null

  const cancelWheelAnimation = () => {
    if (wheelRafId !== null) {
      cancelAnimationFrame(wheelRafId)
      wheelRafId = null
    }
  }

  const cancelWheelScroll = () => {
    if (scrollEl) {
      wheelTargetScrollLeft = scrollEl.scrollLeft
    }
    cancelWheelAnimation()
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
      scheduleUpdateNavBtnState()
      return
    }

    scrollEl.scrollLeft = current + diff * WHEEL_SCROLL_LERP
    wheelRafId = requestAnimationFrame(runWheelAnimation)
  }

  const updateNavBtnState = () => {
    if (!scrollEl) {
      showNavBtn.value = false
      canScrollLeft.value = false
      canScrollRight.value = false
      setElementVisible(leftBtnEl, false)
      setElementVisible(rightBtnEl, false)
      setBtnDisabled(leftBtnEl, false, navBtnDisabledClassName)
      setBtnDisabled(rightBtnEl, false, navBtnDisabledClassName)
      return
    }

    const overflow = getMaxScrollLeft(scrollEl) > 1
    const scrollLeftEnabled = canScrollToLeft(scrollEl)
    const scrollRightEnabled = canScrollToRight(scrollEl)

    showNavBtn.value = overflow
    canScrollLeft.value = scrollLeftEnabled
    canScrollRight.value = scrollRightEnabled

    setElementVisible(leftBtnEl, overflow)
    setElementVisible(rightBtnEl, overflow)
    setBtnDisabled(leftBtnEl, overflow && !scrollLeftEnabled, navBtnDisabledClassName)
    setBtnDisabled(rightBtnEl, overflow && !scrollRightEnabled, navBtnDisabledClassName)
  }

  const scheduleUpdateNavBtnState = () => {
    if (navBtnRafId !== null) {
      return
    }
    navBtnRafId = requestAnimationFrame(() => {
      navBtnRafId = null
      updateNavBtnState()
    })
  }

  const cancelNavBtnRaf = () => {
    if (navBtnRafId !== null) {
      cancelAnimationFrame(navBtnRafId)
      navBtnRafId = null
    }
  }

  const scrollByStep = (direction: -1 | 1) => {
    if (!scrollEl) {
      return
    }

    if (direction === -1 && !canScrollToLeft(scrollEl)) {
      return
    }
    if (direction === 1 && !canScrollToRight(scrollEl)) {
      return
    }

    cancelWheelScroll()

    const maxScroll = getMaxScrollLeft(scrollEl)
    if (maxScroll <= 0) {
      return
    }

    const step = Math.max(scrollBtnMinStep, scrollEl.clientWidth * scrollBtnStepRatio)
    const target = clampScrollLeft(scrollEl, scrollEl.scrollLeft + direction * step)

    if (Math.abs(target - scrollEl.scrollLeft) < 1) {
      return
    }

    scrollEl.scrollTo({ left: target, behavior: 'smooth' })
  }

  const resolveElements = () => {
    const instanceRoot = getCurrentInstance()?.proxy?.$el as HTMLElement | undefined
    const fallbackRoot = instanceRoot instanceof HTMLElement ? instanceRoot : document

    rootEl = resolveElement(toValue(tabEl), fallbackRoot)
    const scope = rootEl ?? fallbackRoot
    scrollEl = resolveElement(toValue(tabScrollEl), scope)
    leftBtnEl = resolveElement(toValue(tabLeftScrollBtnEl), scope)
    rightBtnEl = resolveElement(toValue(tabRightScrollBtnEl), scope)

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
    cancelWheelScroll()
    const activeItem = findActiveItem()
    if (activeItem) {
      scrollItemToCenter(scrollEl, activeItem, behavior)
    }
    scheduleUpdateNavBtnState()
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

    scheduleUpdateNavBtnState()
  }

  const handleScroll = () => {
    scheduleUpdateNavBtnState()
  }

  const bindWheel = () => {
    scrollEl?.addEventListener('wheel', handleWheel, { passive: false })
    scrollEl?.addEventListener('scroll', handleScroll, { passive: true })
  }

  const unbindWheel = () => {
    scrollEl?.removeEventListener('wheel', handleWheel)
    scrollEl?.removeEventListener('scroll', handleScroll)
    cancelWheelAnimation()
  }

  const bindNavButtons = () => {
    unbindNavButtons()

    if (leftBtnEl) {
      onPrevClick = (event: MouseEvent) => {
        if (leftBtnEl?.getAttribute('aria-disabled') === 'true') {
          event.preventDefault()
          return
        }
        scrollByStep(-1)
      }
      leftBtnEl.addEventListener('click', onPrevClick)
    }

    if (rightBtnEl) {
      onNextClick = (event: MouseEvent) => {
        if (rightBtnEl?.getAttribute('aria-disabled') === 'true') {
          event.preventDefault()
          return
        }
        scrollByStep(1)
      }
      rightBtnEl.addEventListener('click', onNextClick)
    }
  }

  const unbindNavButtons = () => {
    if (leftBtnEl && onPrevClick) {
      leftBtnEl.removeEventListener('click', onPrevClick)
    }
    if (rightBtnEl && onNextClick) {
      rightBtnEl.removeEventListener('click', onNextClick)
    }
    onPrevClick = null
    onNextClick = null
  }

  const bindResizeObserver = () => {
    if (!scrollEl || typeof ResizeObserver === 'undefined') {
      return
    }

    resizeObserver = new ResizeObserver(() => {
      scheduleUpdateNavBtnState()
      scrollToActive('auto')
    })
    resizeObserver.observe(scrollEl)
  }

  const unbindResizeObserver = () => {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  const teardown = () => {
    unbindWheel()
    unbindNavButtons()
    unbindResizeObserver()
    cancelWheelAnimation()
    cancelNavBtnRaf()
    rootEl = null
    scrollEl = null
    leftBtnEl = null
    rightBtnEl = null
  }

  const setup = async () => {
    await nextTick()
    if (!resolveElements()) {
      return
    }
    bindWheel()
    bindNavButtons()
    bindResizeObserver()
    updateNavBtnState()
    scrollToActive('auto')
  }

  onMounted(() => {
    setup()
  })

  watch(
    () => [
      toValue(tabEl),
      toValue(tabScrollEl),
      toValue(tabLeftScrollBtnEl),
      toValue(tabRightScrollBtnEl)
    ] as const,
    () => {
      teardown()
      setup()
    }
  )

  if (activeValue !== undefined) {
    watch(toRef(activeValue), () => {
      nextTick(() => scrollToActive())
    })
  }

  onUnmounted(() => {
    teardown()
  })

  return {
    scrollToActive,
    getScrollEl: () => scrollEl,
    cancelWheelScroll,
    scrollByStep,
    showNavBtn,
    canScrollLeft,
    canScrollRight
  }
}
