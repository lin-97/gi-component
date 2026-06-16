<template>
  <gi-page-layout bordered style="height: 500px">
    <template #header>
      <Search></Search>
    </template>
    <Table></Table>
  </gi-page-layout>
</template>

<script setup lang="ts">
import Search from '@docs/_shared/components/Search.vue'
import Table from '@docs/_shared/components/Table.vue'
</script>

<style lang="scss" scoped></style>
