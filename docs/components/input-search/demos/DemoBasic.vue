<template>
  <gi-input-search @search="search" @clear="clear"></gi-input-search>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

function search() {
  ElMessage.success('点击了搜索')
}

function clear() {
  ElMessage.warning('点击了清除')
}
</script>
