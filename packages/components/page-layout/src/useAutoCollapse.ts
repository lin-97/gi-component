import type { ElSplitter, SplitterPanelProps } from 'element-plus'
import type { Ref } from 'vue'
import { nextTick, onBeforeUnmount, onMounted } from 'vue'

const RESIZE_DEBOUNCE_MS = 150

export interface UseAutoCollapseOptions<TSize extends SplitterPanelProps['size'] = SplitterPanelProps['size']> {
  splitterRef: Ref<InstanceType<typeof ElSplitter> | undefined>
  size: Ref<TSize>
  enabled: boolean
  collapseBreakpoint: number
  panelSize: () => TSize
  setCollapsingSize: (newSize: TSize) => void
}

export function useAutoCollapse<TSize extends SplitterPanelProps['size']>(
  options: UseAutoCollapseOptions<TSize>
) {
  if (!options.enabled) {
    return
  }

  let resizeObserver: ResizeObserver | null = null
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function getSplitterWidth() {
    const el = options.splitterRef.value?.$el as HTMLElement | undefined
    return el?.clientWidth ?? 0
  }

  function applyAutoCollapseWidth(width: number) {
    const threshold = options.collapseBreakpoint

    if (width < threshold && Number(options.size.value) > 30) {
      options.setCollapsingSize(0 as TSize)
    }
    else if (width > threshold && Number(options.size.value) === 0) {
      options.setCollapsingSize(options.panelSize())
    }
  }

  function debouncedApplyAutoCollapseWidth() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      debounceTimer = null
      applyAutoCollapseWidth(getSplitterWidth())
    }, RESIZE_DEBOUNCE_MS)
  }

  function clearDebounceTimer() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  }

  function bindResizeObserver() {
    unbindResizeObserver()

    const el = options.splitterRef.value?.$el as HTMLElement | undefined
    if (!el || typeof ResizeObserver === 'undefined') {
      return
    }

    resizeObserver = new ResizeObserver(() => {
      debouncedApplyAutoCollapseWidth()
    })
    resizeObserver.observe(el)
    applyAutoCollapseWidth(getSplitterWidth())
  }

  function unbindResizeObserver() {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  onMounted(async () => {
    await nextTick()
    bindResizeObserver()
  })

  onBeforeUnmount(() => {
    clearDebounceTimer()
    unbindResizeObserver()
  })
}
