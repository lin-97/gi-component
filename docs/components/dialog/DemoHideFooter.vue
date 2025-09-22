<template>
  <div>
    <el-space>
      <el-button type="primary" @click="visible = true">打开对话框</el-button>
    </el-space>
    <gi-dialog v-model="visible" title="标题" :footer="false">
      <el-space direction="vertical" fill style="width: 100%">
        <el-alert title="Success alert" type="success" :closable="false" />
        <el-alert title="Info alert" type="info" :closable="false" />
        <el-alert title="Warning alert" type="warning" :closable="false" />
        <el-alert title="Error alert" type="error" :closable="false" />
      </el-space>
    </gi-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
