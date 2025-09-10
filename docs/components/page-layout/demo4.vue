<template>
  <gi-page-layout bordered :size="160">
    <template #left>
      <Tree></Tree>
    </template>
    <template #header>
      <Search></Search>
    </template>
    <Table></Table>
  </gi-page-layout>
</template>

<script setup lang="ts">
import Search from './components/Search.vue';
import Table from './components/Table.vue';
import Tree from './components/Tree.vue';
</script>

<style lang="scss" scoped></style>
