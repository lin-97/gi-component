<template>
  <el-space wrap>
    <gi-button type="add" @click="handleClick"></gi-button>
    <gi-button type="edit"></gi-button>
    <gi-button type="delete"></gi-button>
    <gi-button type="search"></gi-button>
    <gi-button type="search" loading></gi-button>
    <gi-button type="reset"></gi-button>
    <gi-button type="upload"></gi-button>
    <gi-button type="download"></gi-button>
    <gi-button type="print"></gi-button>
    <gi-button type="success">按钮</gi-button>
  </el-space>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

function handleClick() {
  ElMessage.success('点击了按钮');
}
</script>
