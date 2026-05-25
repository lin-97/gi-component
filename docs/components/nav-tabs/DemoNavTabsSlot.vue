<template>
  <div class="demo">
    <gi-nav-tabs v-model="activeValue" :data="tabList">
      <template #left-extra>
        <el-button size="small" type="primary">左插槽</el-button>
      </template>
      <template #default="{ item, active, disabled }">
        <el-space :size="4">
          <span>{{ item.label }}</span>
          <el-tag v-if="item.value === '3'" size="small" type="warning">新</el-tag>
        </el-space>
      </template>
      <template #right-extra>
        <el-button size="small" type="primary">右插槽</el-button>
      </template>
    </gi-nav-tabs>
  </div>
</template>

<script setup lang="ts">
import type { NavTabItem } from 'gi-component'
import { ref } from 'vue'

const activeValue = ref('1')

const tabList = ref<NavTabItem[]>([
  { label: '页签1', value: '1' },
  { label: '页签2', value: '2' },
  { label: '页签3', value: '3' },
  { label: '页签4', value: '4' },
  { label: '页签5', value: '5' },
  { label: '页签6', value: '6' },
  { label: '页签7', value: '7' },
  { label: '页签8', value: '8' },
  { label: '页签9', value: '9' },
  { label: '页签10', value: '10' },
  { label: '页签11', value: '11' },
  { label: '页签12', value: '12' },
  { label: '页签13', value: '13' },
  { label: '页签14', value: '14' },
  { label: '页签15', value: '15' },
  { label: '页签16', value: '16' },
  { label: '页签17', value: '17' },
  { label: '页签18', value: '18' },
  { label: '页签19', value: '19' },
  { label: '页签20', value: '20' }
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
</style>
