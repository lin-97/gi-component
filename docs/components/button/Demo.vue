<template>
  <el-space wrap>
    <gi-button type="add" @click="handleClick"></gi-button>
    <gi-button type="edit" @click="handleClick"></gi-button>
    <gi-button type="delete" @click="handleClick"></gi-button>
    <gi-button type="search" @click="handleClick"></gi-button>
    <gi-button type="reset" @click="handleClick"></gi-button>
    <gi-button type="upload" @click="handleClick"></gi-button>
    <gi-button type="download" @click="handleClick"></gi-button>
    <gi-button type="print" @click="handleClick"></gi-button>
    <gi-button type="success" @click="handleClick">按钮</gi-button>
  </el-space>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

function handleClick() {
  ElMessage.success('点击了按钮');
}
</script>
