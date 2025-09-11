<template>
  <GiPageLayout>
    <template #left>
      <Tree></Tree>
    </template>
    <template #header>
      <Search></Search>
    </template>
    <gi-table ref="tableRef" v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border>
    </gi-table>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { reactive, ref, onMounted, watch, h } from 'vue';
import { ElMessage, ElTag, ElButton } from 'element-plus';
import { type TableColumnItem, useTable } from 'gi-component';
import Search from './Search.vue';
import Tree from './Tree.vue';
import { getUserList, type UserItem } from '@/_apis/mockTable';

const columns: TableColumnItem[] = [
  { type: 'selection', width: 55, align: 'center', fixed: 'left' },
  { type: 'index', label: '序号', width: 60, align: 'center' },
  {
    prop: 'name',
    label: '姓名',
    width: 100,
    align: 'center',
    showOverflowTooltip: true
  },
  { prop: 'age', label: '年龄', width: 60, align: 'center' },
  {
    prop: 'sex',
    label: '性别',
    width: 80,
    align: 'center',
    render: ({ row }) => {
      return h(
        ElTag,
        { type: row.sex === '男' ? 'primary' : 'danger' },
        { default: () => row.sex }
      );
    }
  },
  { prop: 'city', label: '城市', width: 100 },
  { prop: 'district', label: '区县', width: 100 },
  { prop: 'remark', label: '描述', showOverflowTooltip: true },
];

const tableRef = useTemplateRef('tableRef');
const { tableData, getTableData, pagination, search, refresh, loading } = useTable((p) => getUserList({ ...p }), {})

function getSelectedData() {
  const data = tableRef.value?.tableRef?.getSelectionRows?.() || [];
  return data;
}

defineExpose({
  getSelectedData
});
</script>

<style lang="scss" scoped></style>
