<template>
  <el-radio-group v-model="tabsType">
    <el-radio value="">默认</el-radio>
    <el-radio value="card">卡片</el-radio>
    <el-radio value="border-card">边框卡片</el-radio>
  </el-radio-group>
  <gi-tabs v-model="activeName" :options="options" :type="tabsType" inner size="small" @tab-change="handleTabChange">
    <template #extra>
      <el-space>
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small">返回</el-button>
      </el-space>
    </template>
    <template #label="{ data }">
      <span>{{ data.label }}</span>
      <el-text type="danger" size="small">{{ countObj[data.name] }}</el-text>
    </template>
  </gi-tabs>
</template>

<script setup lang="ts">
import type { TabsProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const tabsType = ref<TabsProps['type']>('')
const activeName = ref('a')
const options = [
  { label: '全部', name: 'a' },
  { label: '待审批', name: 'b' },
  { label: '已审批', name: 'c' },
  { label: '草稿', name: 'd' }
]

const countObj = ref<Record<string, number>>({ a: 5, b: 10, c: 15, d: 6 })

const handleTabChange = (name: string) => {
  ElMessage.info(`当前选中的标签页的值是：${name}`)
}
</script>
