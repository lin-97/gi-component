<template>
  <div :class="classNames" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { GridItemData, GridProps } from './type'
import { computed, provide, reactive, toRefs, watchEffect } from 'vue'
import { useBemClass } from '../../../hooks'
import { GridContextInjectionKey, GridDataCollectorInjectionKey } from './context'
import { useResponsiveState } from './hook/useResponsiveState'
import { setItemVisible } from './utils'

defineOptions({
  name: 'Grid'
})

const props = withDefaults(defineProps<GridProps>(), {
  cols: 24,
  rowGap: 0,
  colGap: 0,
  collapsed: false,
  collapsedRows: 1
})

const {
  cols: propCols,
  rowGap: propRowGap,
  colGap: propColGap,
  collapsedRows,
  collapsed
} = toRefs(props)

// 将可能的响应式配置解析为当前断点下的具体数值
const cols = useResponsiveState(propCols, 24)
const colGap = useResponsiveState(propColGap, 0)
const rowGap = useResponsiveState(propRowGap, 0)

const { b } = useBemClass()
const classNames = computed(() => [b('grid')])

const style = computed(() => [
  {
    'gap': `${rowGap.value}px ${colGap.value}px`,
    'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`
  }
])

/** 子项按 DOM 索引收集的布局数据 */
const itemDataMap = reactive<Map<number, GridItemData>>(new Map())

const itemDataList = computed(() => {
  const list: GridItemData[] = []
  for (const [index, itemData] of itemDataMap.entries()) {
    list[index] = itemData
  }
  return list
})

const gridContext = reactive<{
  overflow: boolean
  displayIndexList: number[]
  cols: number
  colGap: number
}>({
  overflow: false,
  displayIndexList: [],
  cols: cols.value,
  colGap: colGap.value
})

watchEffect(() => {
  gridContext.cols = cols.value
  gridContext.colGap = colGap.value
})

// 根据折叠配置计算哪些子项可见，以及是否存在溢出
watchEffect(() => {
  const displayInfo = setItemVisible({
    cols: cols.value,
    collapsed: collapsed.value,
    collapsedRows: collapsedRows.value,
    itemDataList: itemDataList.value
  })
  gridContext.overflow = displayInfo.overflow
  gridContext.displayIndexList = displayInfo.displayIndexList
})

provide(GridContextInjectionKey, gridContext)
provide(GridDataCollectorInjectionKey, {
  collectItemData(index, itemData) {
    itemDataMap.set(index, itemData)
  },
  removeItemData(index) {
    itemDataMap.delete(index)
  }
})
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-grid {
  display: grid;
}
</style>
