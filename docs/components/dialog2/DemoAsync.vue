<template>
  <el-button type="primary" @click="openDialog">打开对话框</el-button>
</template>

<script setup lang="ts">
import { Dialog } from 'gi-component';

const openDialog = () => {
  Dialog.open({
    title: '标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色',
    onBeforeOk: async () => {
      return await new Promise(resolve =>
        setTimeout(() => resolve(true), 2000)
      );
    }
  });
};
</script>
