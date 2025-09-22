<template>
  <gi-page-layout bordered>
    <template #header>
      <Search></Search>
    </template>
    <Table></Table>
  </gi-page-layout>
</template>

<script setup lang="ts">
import Search from '@docs/_components/Search.vue'
import Table from './components/Table.vue'
</script>

<style lang="scss" scoped></style>
