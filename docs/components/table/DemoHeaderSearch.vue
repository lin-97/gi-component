<template>
  <gi-page-layout bordered style="height: 500px">
    <template #tool>
      <el-row justify="space-between" class="gi-tool gi-w-full">
        <el-space warp>
          <gi-button type="add"></gi-button>
          <gi-button type="delete"></gi-button>
        </el-space>
        <el-space warp>
          <el-input v-model="queryParams.keyword" placeholder="搜索姓名或地址" clearable style="width: 200px" />
          <ElButton type="primary" @click="search">搜索</ElButton>
        </el-space>
      </el-row>
    </template>
    <gi-table v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border>
      <template #action="scope">
        <el-space>
          <ElButton type="primary" size="small" @click="onEdit(scope)">编辑</ElButton>
          <ElButton type="danger" size="small">删除</ElButton>
        </el-space>
      </template>
    </gi-table>
    <pre class="doc-pre">{{ headerParams }}</pre>
  </gi-page-layout>
</template>

<script lang="ts" setup>
import type { UserItem } from '@docs/_apis/mockTable'
import type { TableColumnItem } from 'gi-component'
import { getUserList } from '@docs/_apis/mockTable'
import { useTable } from '@docs/_hooks'
import { ElButton, ElMessage, ElTag } from 'element-plus'
import { h, reactive } from 'vue'
import { useTableHeaderSearch } from './components/useTableHeaderSearch'

const queryParams = reactive({
  keyword: ''
})

const { tableData, getTableData, pagination, search, refresh, loading } = useTable((p) => getUserList({ ...p, ...queryParams }), {
  onSuccess: () => {
    // ElMessage.success(`页码${pagination.currentPage}, 页数${pagination.pageSize}条--数据成功加载`);
  }
})

const { headerParams, createTableHeader } = useTableHeaderSearch({ search: () => search() })

const columns: TableColumnItem<UserItem>[] = [
  { type: 'selection', width: 55, align: 'center', fixed: 'left' },
  { type: 'index', label: '序号', width: 60, align: 'center' },
  {
    prop: 'name',
    label: '姓名',
    width: 100,
    align: 'center',
    showOverflowTooltip: true,
    renderHeader: () => createTableHeader({ type: 'input', label: '姓名', field: 'name' })
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
        { type: row.sex === '男' ? 'primary' : 'danger', size: 'small' },
        { default: () => row.sex }
      )
    },
    renderHeader: () => createTableHeader({ type: 'checkbox-group', label: '性别', field: 'sex' })
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
]

// 编辑操作
function onEdit(scope: any) {
  ElMessage.success(`编辑 ${scope.row.name}`)
}
</script>

<style lang="scss" scoped></style>
