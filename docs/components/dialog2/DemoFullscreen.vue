<template>
  <el-button type="primary" @click="openDialog">打开对话框</el-button>
</template>

<script setup lang="ts">
import LayoutTable from '@docs/_components/LayoutTable.vue'
import { ElMessage } from 'element-plus'
import { Dialog } from 'gi-component'
import { h } from 'vue'

const openDialog = () => {
  Dialog.open({
    title: '标题',
    content: () => h(LayoutTable),
    fullscreen: true,
    bodyClass: 'gi-p0',
    onOk: () => {
      ElMessage.success('点击了确定按钮')
    },
    onCancel: () => {
      ElMessage.warning('点击了取消按钮')
    }
  })
}
</script>
