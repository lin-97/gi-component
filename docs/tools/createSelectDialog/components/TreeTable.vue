<template>
  <GiPageLayout>
    <template #left>
      <Tree></Tree>
    </template>
    <template #header>
      <Search></Search>
    </template>
    <gi-table ref="tableRef" v-loading="loading" :columns="columns" :data="data" :pagination="pagination" border>
    </gi-table>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { reactive, ref, onMounted, watch, h } from 'vue';
import { ElMessage, ElTag, ElButton } from 'element-plus';
import { type TableColumnItem } from 'gi-component';
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

// 响应式数据
const data = ref<UserItem[]>([]);
const loading = ref(false);
const tableRef = useTemplateRef('tableRef');

const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  total: 0,
  // 监听分页变化，重新加载数据
  onSizeChange: (size: number) => {
    pagination.pageSize = size;
    loadData();
  },
  onCurrentChange: (current: number) => {
    pagination.currentPage = current;
    loadData();
  }
});

async function loadData() {
  loading.value = true;

  try {
    const params: any = {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    };

    const response = await getUserList(params);
    data.value = response.data;
    pagination.total = response.total;

    ElMessage.success(`成功加载 ${response.data.length} 条数据`);
  } catch (error) {
    ElMessage.error('数据加载失败');
    console.error('Failed to load data:', error);
  } finally {
    loading.value = false;
  }
}

function getSelectedData() {
  const data = tableRef.value?.tableRef?.getSelectionRows?.() || [];
  return data;
}

onMounted(() => {
  loadData();
});

defineExpose({
  getSelectedData
});
</script>

<style lang="scss" scoped></style>
