<template>
  <div :class="b('table')">
    <ElTable v-bind="tableProps as any" ref="tableRef" :data="props.data as any[]">
      <TableColumn v-for="item in props.columns" :key="item.prop || item.label" :column="item" />
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </ElTable>

    <ElRow v-if="props.pagination !== false" justify="end" :class="b('table-pagination')">
      <ElPagination v-bind="paginationProps" :current-page="paginationProps.currentPage"
        :page-size="paginationProps.pageSize" />
    </ElRow>
  </div>
</template>

<script lang="ts" setup generic="T extends DefaultRow">
import type { DefaultRow, TableProps, TableSlots } from './type'
import { ElPagination, ElRow, ElTable } from 'element-plus'
import { computed, provide, useAttrs, useSlots, useTemplateRef } from 'vue'
import { useBemClass } from '../../../hooks'
import TableColumn from './table-column.vue'
import { TABLE_SLOTS_KEY } from './type'

const props = withDefaults(defineProps<TableProps<T>>(), {
  fit: true,
  showHeader: true,
  selectOnIndeterminate: true,
  data: () => [],
  columns: () => [],
  pagination: () => ({})
})

defineSlots<TableSlots<T>>()

const attrs = useAttrs()
const slots = useSlots()
provide(TABLE_SLOTS_KEY, slots)
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
  margin-top: 12px;
}
</style>
