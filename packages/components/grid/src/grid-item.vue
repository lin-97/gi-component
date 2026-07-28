<template>
  <div ref="domRef" :class="classNames" :style="style">
    <slot :overflow="overflow" />
  </div>
</template>

<script setup lang="ts">
import type { GridItemProps } from './type'
import { computed, inject, onUnmounted, ref, toRefs, watchEffect } from 'vue'
import { useBemClass } from '../../../hooks'
import { GridContextInjectionKey, GridDataCollectorInjectionKey } from './context'
import { useIndex } from './hook/useIndex'
import { useResponsiveState } from './hook/useResponsiveState'
import { resolveItemData } from './utils'

defineOptions({
  name: 'GridItem'
})

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  offset: 0,
  suffix: false
})

const { b } = useBemClass()
const prefixCls = b('grid-item')
const classNames = computed(() => [prefixCls])

const domRef = ref<HTMLDivElement>()
const { computedIndex } = useIndex({
  itemRef: domRef,
  selector: `.${prefixCls}`
})

const gridContext = inject(GridContextInjectionKey, {
  overflow: false,
  displayIndexList: [],
  cols: 24,
  colGap: 0
})
const gridDataCollector = inject(GridDataCollectorInjectionKey)

/** 当前项是否在 Grid 计算的可见列表中 */
const visible = computed(() =>
  gridContext?.displayIndexList?.includes(computedIndex.value)
)

const { span: propSpan, offset: propOffset } = toRefs(props)
const rSpan = useResponsiveState(propSpan, 1)
const rOffset = useResponsiveState(propOffset, 0)

/** 结合列数归一化后的 span / offset / suffix */
const itemData = computed(() =>
  resolveItemData(gridContext.cols, {
    ...props,
    span: rSpan.value,
    offset: rOffset.value
  })
)

/** offset > 0 时通过 margin-left 模拟左侧空格 */
const offsetStyle = computed(() => {
  const { offset, span } = itemData.value
  const { colGap } = gridContext
  if (offset > 0) {
    const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`
    return {
      'margin-left': `calc((${oneSpan} * ${offset}) + ${colGap * offset}px)`
    }
  }
  return {}
})

/**
 * suffix 项靠右对齐：从 (cols - span + 1) 列开始
 * 普通项使用 span N 自动排布
 */
const columnStart = computed(() => {
  const { suffix, span } = itemData.value
  const { cols } = gridContext
  if (suffix) {
    return `${cols - span + 1}`
  }
  return `span ${span}`
})

const style = computed(() => {
  const { span } = itemData.value
  if (domRef.value) {
    return [
      {
        'grid-column': `${columnStart.value} / span ${span}`
      },
      offsetStyle.value,
      !visible.value || span === 0 ? { display: 'none' } : {}
    ]
  }
  return []
})

// 向父级 Grid 注册/更新自身布局数据
watchEffect(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.collectItemData(computedIndex.value, itemData.value)
  }
})

onUnmounted(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.removeItemData(computedIndex.value)
  }
})

const overflow = computed(() => gridContext.overflow)
</script>
