<template>
  <el-button type="primary" @click="openDialog">打开对话框</el-button>
</template>

<script setup lang="ts">
import { Dialog } from 'gi-component';
import { ElEmpty } from 'element-plus';
import { h } from 'vue';

const openDialog = () => {
  Dialog.open({
    title: '标题',
    content: () => h(ElEmpty, { description: '暂无数据' }),
    draggable: true
  });
};
</script>
