<template>
  <gi-page-layout bordered :style="{ height: '500px' }" :header-style="{ padding: '8px 0 0', borderBottom: 'none' }"
    :body-style="{ padding: 0 }">
    <template #header>
      <gi-tabs v-model="activeName" :options="options">
        <template #extra>
          <el-space wrap>
            <el-button type="primary">新增</el-button>
            <el-button type="danger">删除</el-button>
          </el-space>
        </template>
      </gi-tabs>
    </template>
    <gi-page-layout :size="150">
      <template #left>
        <Tree></Tree>
      </template>
      <Table></Table>
    </gi-page-layout>
  </gi-page-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tree from '@/_components/Tree.vue';
import Table from '@/_components/Table.vue';
import { TabsOptionItem } from 'gi-component'

const activeName = ref('1')
const options: TabsOptionItem[] = [
  { label: '选项1', name: '1' },
  { label: '选项2', name: '2' },
  { label: '选项3', name: '3' },
]
</script>