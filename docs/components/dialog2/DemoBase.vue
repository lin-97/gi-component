<template>
  <el-space>
    <el-button type="primary" @click="openInfoDialog">信息对话框</el-button>
    <el-button type="success" @click="openSuccessDialog">成功对话框</el-button>
    <el-button type="warning" @click="openWarningDialog">警告对话框</el-button>
    <el-button type="danger" @click="openErrorDialog">错误对话框</el-button>
  </el-space>
</template>

<script setup lang="ts">
import { Dialog } from 'gi-component'

const openInfoDialog = () => {
  Dialog.info({
    title: 'Info Title',
    content: 'proxy will permanently delete the file. Continue?',
    onBeforeOk: async () => {
      await new Promise((resolve) => setTimeout(() => resolve(true), 2000))
      return true
    }
  })
}

const openSuccessDialog = () => {
  Dialog.success({
    title: 'Success Title',
    content: 'Operation completed successfully'
  })
}

const openWarningDialog = () => {
  Dialog.warning({
    title: 'Warning Title',
    content: 'Are you sure you want to continue?'
  })
}

const openErrorDialog = () => {
  Dialog.error({
    title: 'Error Title',
    content: 'Operation failed'
  })
}
</script>
