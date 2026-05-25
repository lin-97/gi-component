<template>
  <div class="demo">
    <el-slider v-model="width" :min="200" :max="500" />
    <div class="demo-nav-tabs-wrap" :style="{ width: `${width}px` }">
      <gi-nav-tabs v-model="activeValue" :data="tabList"></gi-nav-tabs>
    </div>
    <p class="demo-nav-tabs-wrap__tip">当前选中：{{ activeValue }}</p>
  </div>
</template>

<script setup lang="ts">
import type { NavTabItem } from 'gi-component'
import { ref } from 'vue'

const width = ref(360)
const activeValue = ref('1')

const tabList = ref<NavTabItem[]>([
  { label: '页签1', value: '1' },
  { label: '页签2', value: '2', disabled: true },
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
  margin-top: 20px;
}

.demo-nav-tabs-wrap {
  border: 1px solid var(--el-border-color);
}

.demo-nav-tabs-wrap__tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
