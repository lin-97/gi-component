<template>
  <ElTableColumn v-bind="columnProps">
    <!-- 处理render函数 -->
    <template v-if="column.render" #default="scope">
      <template v-if="typeof column.render(scope) === 'string'">{{ column.render(scope) }}</template>
      <component :is="column.render(scope)" v-else />
    </template>

    <!-- 处理插槽内容 -->
    <template v-else-if="column.slotName" #default="scope">
      <component :is="() => renderColumnSlot(column.slotName!, scope)" />
    </template>

    <!-- 递归渲染子列 -->
    <template v-if="column.children && column.children.length > 0">
      <TableColumn v-for="child in column.children" :key="child.prop || child.label" :column="child" />
    </template>
  </ElTableColumn>
</template>

<script lang="ts" setup>
import type { TableColumnItem, TableSlotScope } from './type'
import { ElTableColumn } from 'element-plus'
import { computed, inject, useSlots } from 'vue'
import { TABLE_SLOTS_KEY } from './type'

defineOptions({
  name: 'TableColumn'
})

const props = defineProps<{
  column: TableColumnItem
}>()

const tableSlots = inject(TABLE_SLOTS_KEY, useSlots())

function renderColumnSlot(slotName: string, scope: TableSlotScope) {
  const slotFn = tableSlots[slotName]
  return slotFn ? slotFn(scope) : null
}

// 计算el-table-column需要的属性
const columnProps = computed(() => {
  const { slotName, render, children, ...restProps } = props.column
  return restProps
})
</script>

<style scoped></style>
