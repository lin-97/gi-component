<template>
  <el-table-column v-bind="columnProps">
    <!-- 处理render函数 -->
    <template v-if="column.render" #default="scope">
      <template v-if="typeof column.render(scope) === 'string'">{{ column.render(scope) }}</template>
      <component :is="column.render(scope)" v-else />
    </template>

    <!-- 处理插槽内容 -->
    <template v-else-if="column.slotName" #default="scope">
      <slot :name="column.slotName" v-bind="scope" />
    </template>

    <!-- 递归渲染子列 -->
    <template v-if="column.children && column.children.length > 0">
      <TableColumn v-for="child in column.children" :key="child.prop || child.label" :column="child">
        <!-- 将所有插槽传递给子组件 -->
        <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableColumn>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { TableColumnItem } from './type'
import { computed } from 'vue'
import TableColumn from './TableColumn.vue'

const props = defineProps<{
  column: TableColumnItem
}>()

// 计算el-table-column需要的属性
const columnProps = computed(() => {
  const { slotName, render, children, ...restProps } = props.column
  return restProps
})
</script>

<style scoped></style>
