<template>
  <gi-card bordered title="基础颜色">
    <el-space direction="vertical" alignment="normal" style="width: 100%">
      <el-space wrap>
        <GiTag color="red" closable @close="onClose">red</GiTag>
        <GiTag color="orangered">orangered</GiTag>
        <GiTag color="orange">orange</GiTag>
        <GiTag color="gold">gold</GiTag>
        <GiTag color="lime">lime</GiTag>
        <GiTag color="green">green</GiTag>
        <GiTag color="cyan">cyan</GiTag>
        <GiTag color="blue">blue</GiTag>
        <GiTag color="purple">purple</GiTag>
        <GiTag color="pink">pink</GiTag>
        <GiTag color="gray">gray</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="dark" color="red" closable @close="onClose">red</GiTag>
        <GiTag type="dark" color="orangered">orangered</GiTag>
        <GiTag type="dark" color="orange">orange</GiTag>
        <GiTag type="dark" color="gold">gold</GiTag>
        <GiTag type="dark" color="lime">lime</GiTag>
        <GiTag type="dark" color="green">green</GiTag>
        <GiTag type="dark" color="cyan">cyan</GiTag>
        <GiTag type="dark" color="blue">blue</GiTag>
        <GiTag type="dark" color="purple">purple</GiTag>
        <GiTag type="dark" color="pink">pink</GiTag>
        <GiTag type="dark" color="gray">gray</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="outline" color="red" closable @close="onClose">red</GiTag>
        <GiTag type="outline" color="orangered">orangered</GiTag>
        <GiTag type="outline" color="orange">orange</GiTag>
        <GiTag type="outline" color="gold">gold</GiTag>
        <GiTag type="outline" color="lime">lime</GiTag>
        <GiTag type="outline" color="green">green</GiTag>
        <GiTag type="outline" color="cyan">cyan</GiTag>
        <GiTag type="outline" color="blue">blue</GiTag>
        <GiTag type="outline" color="purple">purple</GiTag>
        <GiTag type="outline" color="pink">pink</GiTag>
        <GiTag type="outline" color="gray">gray</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="light-outline" color="red" closable @close="onClose">red</GiTag>
        <GiTag type="light-outline" color="orangered">orangered</GiTag>
        <GiTag type="light-outline" color="orange">orange</GiTag>
        <GiTag type="light-outline" color="gold">gold</GiTag>
        <GiTag type="light-outline" color="lime">lime</GiTag>
        <GiTag type="light-outline" color="green">green</GiTag>
        <GiTag type="light-outline" color="cyan">cyan</GiTag>
        <GiTag type="light-outline" color="blue">blue</GiTag>
        <GiTag type="light-outline" color="purple">purple</GiTag>
        <GiTag type="light-outline" color="pink">pink</GiTag>
        <GiTag type="light-outline" color="gray">gray</GiTag>
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
