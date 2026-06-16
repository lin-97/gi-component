<template>
  <gi-page-layout bordered style="height: 500px">
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
import Table from '@docs/_shared/components/Table.vue'
</script>

<style lang="scss" scoped></style>
