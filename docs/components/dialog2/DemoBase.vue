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
    title: '信息标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色',
    onBeforeOk: async () => {
      await new Promise((resolve) => setTimeout(() => resolve(true), 2000))
      return true
    }
  })
}

const openSuccessDialog = () => {
  Dialog.success({
    title: '成功标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色'
  })
}

const openWarningDialog = () => {
  Dialog.warning({
    title: '警告标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色'
  })
}

const openErrorDialog = () => {
  Dialog.error({
    title: '错误标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色'
  })
}
</script>
