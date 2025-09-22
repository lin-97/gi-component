<template>
  <gi-page-layout bordered>
    <template #header>
      <Search></Search>
    </template>
    <template #tool>
      <el-space>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">导出</el-button>
      </el-space>
    </template>
    <Table></Table>
  </gi-page-layout>
</template>

<script setup lang="ts">
import Search from '@docs/_components/Search.vue'
import Table from './components/Table.vue'
</script>

<style lang="scss" scoped></style>
