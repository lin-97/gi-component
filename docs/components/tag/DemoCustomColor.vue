<template>
  <gi-card bordered title="自定义颜色">
    <el-space direction="vertical" alignment="normal" style="width: 100%">
      <el-space wrap>
        <GiTag color="#4E6EF2" closable @close="onClose">#4E6EF2</GiTag>
        <GiTag color="#1BA035">#1BA035</GiTag>
        <GiTag color="#AB57E3">#AB57E3</GiTag>
        <GiTag color="#FF6C9D">#FF6C9D</GiTag>
        <GiTag color="#0fc6c2">#0fc6c2</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="dark" color="#4E6EF2" closable @close="onClose">#4E6EF2</GiTag>
        <GiTag type="dark" color="#1BA035">#1BA035</GiTag>
        <GiTag type="dark" color="#AB57E3">#AB57E3</GiTag>
        <GiTag type="dark" color="#FF6C9D">#FF6C9D</GiTag>
        <GiTag type="dark" color="#0fc6c2">#0fc6c2</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="outline" color="#4E6EF2" closable @close="onClose">#4E6EF2</GiTag>
        <GiTag type="outline" color="#1BA035">#1BA035</GiTag>
        <GiTag type="outline" color="#AB57E3">#AB57E3</GiTag>
        <GiTag type="outline" color="#FF6C9D">#FF6C9D</GiTag>
        <GiTag type="outline" color="#0fc6c2">#0fc6c2</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="light-outline" color="#4E6EF2" closable @close="onClose">#4E6EF2</GiTag>
        <GiTag type="light-outline" color="#1BA035">#1BA035</GiTag>
        <GiTag type="light-outline" color="#AB57E3">#AB57E3</GiTag>
        <GiTag type="light-outline" color="#FF6C9D">#FF6C9D</GiTag>
        <GiTag type="light-outline" color="#0fc6c2">#0fc6c2</GiTag>
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
