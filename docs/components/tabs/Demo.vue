<template>
  <gi-tabs v-model="value" :options="options">
    <template #extra>
      <el-space>
        <el-button type="primary">保存</el-button>
        <el-button>返回</el-button>
      </el-space>
    </template>
  </gi-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('1');
const options = [
  { label: '页签1', name: '1' },
  { label: '页签2', name: '2' },
  { label: '页签3', name: '3', disabled: true },
  { label: '页签4', name: '4' }
];
</script>
