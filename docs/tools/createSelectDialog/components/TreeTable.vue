<template>
  <GiPageLayout>
    <template #left>
      <Tree></Tree>
    </template>
    <template #header>
      <Search></Search>
    </template>
    <div>
      <el-table ref="tableRef" :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="46" align="center" />
        <el-table-column prop="name" label="姓名" width="100" align="center" />
        <el-table-column prop="date" label="日期" width="150" align="center" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </div>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Search from './Search.vue';
import Tree from './Tree.vue';

const tableRef = useTemplateRef('tableRef');

export interface TableDataItem {
  id: string;
  date: string;
  name: string;
  address: string;
}

const tableData = [
  {
    id: '001',
    date: '2016-05-03',
    name: '张三',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '002',
    date: '2016-05-02',
    name: '李四',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '003',
    date: '2016-05-04',
    name: '王五',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: '004',
    date: '2016-05-01',
    name: '赵六',
    address: 'No. 189, Grove St, Los Angeles'
  }
];

function getSelectedData() {
  const data = tableRef.value?.getSelectionRows();
  return data;
}

defineExpose({
  getSelectedData
});
</script>

<style lang="scss" scoped></style>
