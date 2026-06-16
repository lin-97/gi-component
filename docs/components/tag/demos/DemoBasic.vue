<template>
  <gi-card bordered title="基本使用">
    <el-space direction="vertical" alignment="normal" style="width: 100%">
      <el-space wrap>
        <GiTag>light</GiTag>
        <GiTag color="primary" closable @close="onClose">标签</GiTag>
        <GiTag color="success" closable @close="onClose">标签</GiTag>
        <GiTag color="warning">标签</GiTag>
        <GiTag color="danger" closable>标签</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="dark">dark</GiTag>
        <GiTag type="dark" color="primary" closable @close="onClose">标签</GiTag>
        <GiTag type="dark" color="success" closable @close="onClose">标签</GiTag>
        <GiTag type="dark" color="warning">标签</GiTag>
        <GiTag type="dark" color="danger" closable>标签</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="outline">outline</GiTag>
        <GiTag type="outline" color="primary" closable @close="onClose">标签</GiTag>
        <GiTag type="outline" color="success" closable @close="onClose">标签</GiTag>
        <GiTag type="outline" color="warning">标签</GiTag>
        <GiTag type="outline" color="danger" closable>标签</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="light-outline">light-outline</GiTag>
        <GiTag type="light-outline" color="primary" closable @close="onClose">标签</GiTag>
        <GiTag type="light-outline" color="success" closable @close="onClose">标签</GiTag>
        <GiTag type="light-outline" color="warning">标签</GiTag>
        <GiTag type="light-outline" color="danger" closable>标签</GiTag>
      </el-space>
    </el-space>
  </gi-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

function onClose() {
  ElMessage.success('点击了关闭图标')
}
</script>
