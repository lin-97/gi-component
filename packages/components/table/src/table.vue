<template>
  <div :class="b('table')">
    <ElTable v-bind="tableProps" ref="tableRef" :data="props.data as any[]">
      <TableColumn v-for="item in props.columns" :key="item.prop || item.label" :column="item">
        <!-- 将所有插槽传递给子组件 -->
        <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableColumn>
    </ElTable>

    <ElRow v-if="props.pagination !== false" justify="end" :class="b('table-pagination')">
      <ElPagination v-bind="paginationProps" :current-page="paginationProps.currentPage"
        :page-size="paginationProps.pageSize" />
    </ElRow>
  </div>
</template>

<script lang="ts" setup generic="T extends DefaultRow">
import type { DefaultRow, TableProps, TableSlotScope } from './type'
import { ElPagination, ElRow, ElTable } from 'element-plus'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useBemClass } from '../../../hooks'
import TableColumn from './TableColumn.vue'

const props = withDefaults(defineProps<TableProps<T>>(), {
  fit: true,
  showHeader: true,
  selectOnIndeterminate: true,
  data: () => [],
  columns: () => [],
  pagination: () => ({})
})

defineSlots<{
  append: () => void
  empty: () => void
  [propsName: string]: (props: TableSlotScope<T>) => void
}>()

const attrs = useAttrs()
const { b } = useBemClass()
const tableRef = useTemplateRef('tableRef')

const tableProps = computed(() => {
  return {
    ...attrs,
    ...props,
    columns: undefined,
    pagination: undefined
  }
})

const paginationProps = computed(() => {
  return {
    background: true,
    layout: 'prev, pager, next, sizes, total',
    pageSizes: [10, 20, 50, 100],
    ...(typeof props.pagination === 'boolean' ? {} : props.pagination)
  }
})

defineExpose({
  tableRef
})
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

:deep(.el-pagination__rightwrapper) {
  flex: auto;
}

.#{a.$prefix}-table {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  :deep(.el-table) {
    flex: 1;
  }
}

.#{a.$prefix}-table-pagination {
  margin-top: 10px;
}
</style>
