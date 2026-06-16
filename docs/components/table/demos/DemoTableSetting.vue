<template>
  <gi-page-layout bordered style="height: 520px">
    <template #tool>
      <el-row justify="space-between" class="g-tool g-w-full">
        <el-space wrap>
          <gi-button type="add"></gi-button>
          <gi-button type="delete"></gi-button>
        </el-space>
        <el-space wrap>
          <el-input v-model="queryParams.keyword" placeholder="搜索姓名或地址" clearable style="width: 200px" />
          <ElButton type="primary" @click="search">搜索</ElButton>
        </el-space>
      </el-row>
    </template>
    <TableSetting title="表格工具栏" :columns="columns" :disabled-column-keys="disabledColumnKeys" @refresh="refresh">
      <template #default="{ settingColumns, tableProps }">
        <gi-table v-loading="loading" v-bind="tableProps" :columns="settingColumns" :data="tableData"
          :pagination="pagination">
          <template #action="scope">
            <el-space>
              <ElButton type="primary" size="small" @click="onEdit(scope.row)">编辑</ElButton>
              <ElButton type="danger" size="small">删除</ElButton>
            </el-space>
          </template>
        </gi-table>
      </template>
    </TableSetting>
  </gi-page-layout>
</template>

<script lang="ts" setup>
import type { UserItem } from '@docs/_shared/apis/mockTable'
import type { TableColumnItem } from 'gi-component'
import { getUserList } from '@docs/_shared/apis/mockTable'
import { useTable } from '@docs/_shared/hooks'
import { ElButton, ElMessage, ElTag } from 'element-plus'
import { h, reactive } from 'vue'
import TableSetting from '../_fragments/TableSetting.vue'

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
        { type: row.sex === '男' ? 'primary' : 'danger', size: 'small' },
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

/** 与 TableSetting 内 getColumnKey 规则一致：无 prop 的列用 __type_{type}_{index}__（多选列不在列设置中） */
const disabledColumnKeys = ['__type_index_1__', 'name']

const queryParams = reactive({
  keyword: ''
})

const { tableData, pagination, search, refresh, loading } = useTable({
  listAPI: (p) => getUserList({ ...p, ...queryParams }),
  onSuccess: () => { }
})

function onEdit(row: UserItem) {
  ElMessage.success(`编辑 ${row.name}`)
}
</script>

<style lang="scss" scoped>
.demo-table-setting__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  color: var(--el-text-color-primary);
}
</style>
