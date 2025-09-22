<template>
  <gi-input-group>
    <el-input
      v-model="value"
      placeholder="请输入"
      style="width: 200px"
    ></el-input>
    <el-button>搜索</el-button>
    <el-button>重置</el-button>
  </gi-input-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
