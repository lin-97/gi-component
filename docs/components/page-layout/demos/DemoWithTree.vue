<template>
  <gi-page-layout bordered :size="160" style="height: 500px">
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
import Search from '@docs/_shared/components/Search.vue'
import Table from '@docs/_shared/components/Table.vue'
import Tree from '@docs/_shared/components/Tree.vue'
</script>

<style lang="scss" scoped></style>
