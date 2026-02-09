<template>
  <gi-page-layout>
    <template #tool>
      <el-space>
        <ElInput v-model="queryParams.keyword" placeholder="搜索姓名或地址" clearable style="width: 200px" />
        <ElButton type="primary" @click="search">搜索</ElButton>
        <ElButton type="danger" @click="onBatchDelete">批量删除</ElButton>
      </el-space>
    </template>
    <gi-table v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border
      max-height="400px" @selection-change="onSelectionChange">
      <template #action="{ row }">
        <el-space>
          <ElButton type="primary" size="small" @click="onEdit(row)">编辑</ElButton>
          <ElButton type="danger" size="small" @click="onDelete(row)">删除</ElButton>
        </el-space>
      </template>
    </gi-table>
  </gi-page-layout>
</template>

<script lang="ts" setup>
import type { UserItem } from '@docs/_apis/mockTable'
import type { TableColumnItem } from 'gi-component'
import { getUserList } from '@docs/_apis/mockTable'
import { useTable } from '@docs/_hooks'
import { ElButton, ElMessage, ElTag } from 'element-plus'
import { h, reactive } from 'vue'

const queryParams = reactive({
  keyword: ''
})

const columns: TableColumnItem<UserItem>[] = [
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

const { tableData, pagination, search, loading, onDelete, onBatchDelete, onSelectionChange } = useTable((p) => getUserList({ ...p, ...queryParams }), {
  deleteAPI: (pks) => {
    // 模拟删除操作，实际应该调用删除接口
    // eslint-disable-next-line no-console
    console.log(pks)
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
  },
  onSuccess: () => {
    // ElMessage.success(`页面${pagination.currentPage}, 页数${pagination.pageSize}条--数据成功加载`)
  }
})

function onEdit(row: UserItem) {
  ElMessage.success(`编辑 ${row.name}`)
}
</script>

<style lang="scss" scoped></style>
