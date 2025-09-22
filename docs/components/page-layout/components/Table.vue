<template>
  <gi-table v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border max-height="400px">
    <template #action="scope">
      <el-space>
        <ElButton type="primary" size="small">编辑</ElButton>
        <ElButton type="danger" size="small">删除</ElButton>
      </el-space>
    </template>
  </gi-table>
</template>

<script lang="ts" setup>
import type { TableColumnItem } from 'gi-component'
import { getUserList } from '@docs/_apis/mockTable'
import { ElButton, ElTag } from 'element-plus'
import { useTable } from 'gi-component'
import { h } from 'vue'

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
      )
    }
  },
  {
    prop: 'address',
    label: '地址',
    children: [
      { prop: 'city', label: '城市', width: 100 },
      { prop: 'district', label: '区县', width: 100 }
    ]
  },
  { prop: 'remark', label: '描述', showOverflowTooltip: true },
  {
    prop: 'action',
    label: '操作',
    width: 140,
    align: 'center',
    slotName: 'action',
    fixed: 'right'
  }
]

const { tableData, getTableData, pagination, search, refresh, loading } = useTable((p) => getUserList({ ...p }), {
  onSuccess: () => {
    // ElMessage.success(`页面${pagination.currentPage}, 页数${pagination.pageSize}条--数据成功加载`);
  }
})
</script>

<style lang="scss" scoped></style>
