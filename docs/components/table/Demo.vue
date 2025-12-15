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
          <ElButton type="primary" @click="search">搜索</ElButton>
        </el-space>
      </el-row>
    </template>
    <gi-table v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" max-height="400px">
      <template #action="scope">
        <el-space>
          <ElButton type="primary" size="small" @click="onEdit(scope)">编辑</ElButton>
          <ElButton type="danger" size="small">删除</ElButton>
        </el-space>
      </template>
    </gi-table>
  </gi-page-layout>
</template>

<script lang="ts" setup>
import type { TableColumnItem } from 'gi-component'
import { getUserList } from '@docs/_apis/mockTable'
import { ElButton, ElMessage, ElTag } from 'element-plus'
import { useTable } from 'gi-component'
import { h, reactive } from 'vue'

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
    label: '地址'
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

const queryParams = reactive({
  keyword: ''
})

const { tableData, getTableData, pagination, search, refresh, loading } = useTable((p) => getUserList({ ...p, ...queryParams }), {
  onSuccess: () => {
    // ElMessage.success(`页码${pagination.currentPage}, 页数${pagination.pageSize}条--数据成功加载`);
  }
})

// 编辑操作
function onEdit(scope: any) {
  ElMessage.success(`编辑 ${scope.row.name}`)
}
</script>

<style lang="scss" scoped></style>
