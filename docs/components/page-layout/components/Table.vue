<template>
  <gi-table v-loading="loading" :columns="columns" :data="data" :pagination="pagination" border max-height="400px">
    <template #action="scope">
      <el-space>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </el-space>
    </template>
  </gi-table>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, h } from 'vue';
import { ElMessage, ElTag, ElButton } from 'element-plus';
import { type TableColumnItem } from 'gi-component';
import {
  fetchTableData,
  type TableData,
  type PaginationParams
} from '@/_apis/mockTable';

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

// 响应式数据
const data = ref<TableData[]>([]);
const loading = ref(false);

// 分页配置
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

// 加载数据的函数
async function loadData() {
  loading.value = true;

  try {
    const params: PaginationParams = {
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize
    };
    const response = await fetchTableData(params);
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

// 组件挂载时加载初始数据
onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped></style>
