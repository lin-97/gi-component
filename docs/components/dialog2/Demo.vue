<template>
  <el-button type="primary" @click="openDialog">打开对话框</el-button>
</template>

<script setup lang="ts">
import { Dialog } from 'gi-component';
import { ElMessage } from 'element-plus';

const openDialog = () => {
  Dialog.open({
    title: '标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色',
    onOk: () => {
      ElMessage.success('点击了确定按钮');
    },
    onCancel: () => {
      ElMessage.warning('点击了取消按钮');
    }
  });
};
</script>
