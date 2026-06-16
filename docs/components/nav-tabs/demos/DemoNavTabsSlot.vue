<template>
  <div class="demo">
    <gi-nav-tabs v-model="activeValue" :data="tabList">
      <template #left-extra>
        <el-button size="small" type="primary">左插槽</el-button>
      </template>
      <template #default="{ item }">
        <el-space :size="4">
          <span>{{ item.label }}</span>
          <el-tag v-if="item.badge" size="small" type="warning">{{ item.badge }}</el-tag>
        </el-space>
      </template>
      <template #right-extra>
        <el-button size="small" type="primary">右插槽</el-button>
      </template>
    </gi-nav-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** 扩展 NavTabBase，演示默认插槽 item 类型推导 */
interface DemoTabItem {
  label: string
  value: string
  disabled?: boolean
  badge?: string
}

const activeValue = ref('1')

const tabList = ref<DemoTabItem[]>([
  { label: '页签1', value: '1' },
  { label: '页签2', value: '2' },
  { label: '页签3', value: '3', badge: '新' },
  { label: '页签4', value: '4' },
  { label: '页签5', value: '5' },
  { label: '页签6', value: '6' },
  { label: '页签7', value: '7' },
  { label: '页签8', value: '8' },
  { label: '页签9', value: '9' },
  { label: '页签10', value: '10' },
  { label: '页签11', value: '11' },
  { label: '页签12', value: '12' }
])
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  border: 1px solid var(--el-border-color);
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;
}

.demo__active-tip {
  font-size: 12px;
  color: var(--el-color-primary);
}
</style>
