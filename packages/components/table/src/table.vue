<template>
  <div :class="b('table')">
    <el-table v-bind="tableProps" ref="tableRef" :data="props.data as any[]">
      <TableColumn v-for="item in props.columns" :key="item.prop || item.label" :column="item">
        <!-- 将所有插槽传递给子组件 -->
        <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope" />
        </template>
      </TableColumn>
    </el-table>

    <el-row justify="end" :class="b('table-pagination')">
      <el-pagination v-bind="paginationProps" v-model:current-page="paginationProps.currentPage"
        v-model:page-size="paginationProps.pageSize" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { TableProps } from './type'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useBemClass } from '../../../hooks'
import TableColumn from './TableColumn.vue'

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  pagination: () => ({})
})

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
    ...props.pagination
  }
})

function handleSizeChange(size: number) {
  // @ts-ignore
  props.pagination.pageSize = size
}

function handleCurrentChange(page: number) {
  // @ts-ignore
  props.pagination.currentPage = page
}

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
