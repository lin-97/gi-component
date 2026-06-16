<template>
  <gi-card bordered title="不同尺寸">
    <el-space direction="vertical" alignment="normal" style="width: 100%">
      <el-space wrap>
        <GiTag size="small" closable>small</GiTag>
        <GiTag size="default" closable>default</GiTag>
        <GiTag size="large" closable>large</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="dark" size="small" closable>小尺寸</GiTag>
        <GiTag type="dark" size="default" closable>默认尺寸</GiTag>
        <GiTag type="dark" size="large" closable>大尺寸</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="light-outline" size="small" closable>小尺寸</GiTag>
        <GiTag type="light-outline" size="default" closable>默认尺寸</GiTag>
        <GiTag type="light-outline" size="large" closable>大尺寸</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag size="small" color="red" closable @close="onClose">small</GiTag>
        <GiTag size="default" color="red" closable @close="onClose">default</GiTag>
        <GiTag size="large" color="red" closable @close="onClose">large</GiTag>
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
