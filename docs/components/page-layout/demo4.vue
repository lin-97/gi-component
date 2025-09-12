<template>
  <gi-page-layout bordered :size="160" :style="{ height: '500px' }">
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
import Tree from '@/_components/Tree.vue';
import Search from '@/_components/Search.vue';
import Table from '@/_components/Table.vue';
</script>

<style lang="scss" scoped></style>
