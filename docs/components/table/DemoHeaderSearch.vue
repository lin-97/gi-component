<template>
  <gi-page-layout bordered>
    <template #tool>
      <el-row justify="space-between" style="width: 100%">
        <el-space warp>
          <gi-button type="add"></gi-button>
          <gi-button type="delete"></gi-button>
        </el-space>
        <el-space warp>
          <el-input v-model="queryParams.keyword" placeholder="搜索姓名或地址" clearable style="width: 200px" />
          <el-button type="primary" @click="search">搜索</el-button>
        </el-space>
      </el-row>
    </template>
    <gi-table v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border
      max-height="400px">
      <template #action="scope">
        <el-space>
          <el-button type="primary" size="small" @click="onEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-space>
      </template>
    </gi-table>
    <pre>{{ headerParams }}</pre>
  </gi-page-layout>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch, h } from 'vue';
import { ElMessage, ElTag, ElButton } from 'element-plus';
import { type TableColumnItem, useTable } from 'gi-component';
import { getUserList, type UserItem } from '@/_apis/mockTable';
import { useTableHeaderSearch } from './components/useTableHeaderSearch'

const { headerParams, createTableHeader } = useTableHeaderSearch({ search: () => search() })

const columns: TableColumnItem[] = [
  { type: 'selection', width: 55, align: 'center', fixed: 'left' },
  { type: 'index', label: '序号', width: 60, align: 'center' },
  {
    prop: 'name',
    label: '姓名',
    width: 100,
    align: 'center',
    showOverflowTooltip: true,
    renderHeader: () => createTableHeader({ type: 'input', label: '姓名', field: 'name' }),
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
    },
    renderHeader: () => createTableHeader({ type: 'checkbox-group', label: '性别', field: 'sex' }),
  },
  {
    prop: 'address',
    label: '地址',
    children: [
      { prop: 'city', label: '城市', width: 100 },
      { prop: 'district', label: '区县', width: 100 }
    ]
  },
  { prop: 'remark', label: '描述', width: 150, showOverflowTooltip: true },
  {
    prop: 'action',
    label: '操作',
    width: 140,
    align: 'center',
    slotName: 'action',
    fixed: 'right'
  }
];

const queryParams = reactive({
  keyword: ''
});

const { tableData, getTableData, pagination, search, refresh, loading } = useTable((p) => getUserList({ ...p, ...queryParams }), {
  onSuccess: () => {
    // ElMessage.success(`页码${pagination.currentPage}, 页数${pagination.pageSize}条--数据成功加载`);
  }
})

// 编辑操作
function onEdit(scope: any) {
  ElMessage.success(`编辑 ${scope.row.name}`);
}
</script>

<style lang="scss" scoped></style>
