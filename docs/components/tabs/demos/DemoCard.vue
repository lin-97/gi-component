<template>
  <el-radio-group v-model="tabsType">
    <el-radio value="">默认</el-radio>
    <el-radio value="card">卡片</el-radio>
    <el-radio value="border-card">边框卡片</el-radio>
  </el-radio-group>
  <gi-tabs v-model="value" :options="options" :type="tabsType" style="margin-bottom: 10px">
    <template #extra>
      <el-space>
        <el-button type="primary">保存</el-button>
        <el-button>返回</el-button>
      </el-space>
    </template>
  </gi-tabs>
</template>

<script setup lang="ts">
import type { TabsProps } from 'element-plus'
import { ref } from 'vue'

const value = ref('1')
const options = [
  { label: '页签1', name: '1' },
  { label: '页签2', name: '2' },
  { label: '页签3', name: '3' },
  { label: '页签4', name: '4' },
  { label: '页签5', name: '5' },
  { label: '页签6', name: '6' },
  { label: '页签7', name: '7' },
  { label: '页签8', name: '8' },
  { label: '页签9', name: '9' },
  { label: '页签10', name: '10' },
  { label: '页签11', name: '11' },
  { label: '页签12', name: '12' },
  { label: '页签13', name: '13' },
  { label: '页签14', name: '14' },
  { label: '页签15', name: '15' }
]

const tabsType = ref<TabsProps['type']>('')
</script>
