<template>
  <gi-card bordered :header-style="{ display: 'none' }">
    <gi-flex wrap :gap="8">
      <el-button v-for="i in 24" :key="i" type="primary">Button</el-button>
    </gi-flex>
  </gi-card>
</template>
