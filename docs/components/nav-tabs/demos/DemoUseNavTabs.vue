<template>
  <div class="demo-nav-tabs">
    <div class="tab">
      <div class="tab__scroll">
        <div v-for="item in tabList" :key="item.value" class="tab-item" :class="{
          'tab-item--active': activeValue === item.value,
          'tab-item--disabled': item.disabled,
        }" :data-value="item.value" @click="handleTabClick(item)">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="demo-nav-tabs__actions">
      <el-button size="small" @click="activeValue = '1'">选中页签1</el-button>
      <el-button size="small" @click="activeValue = '5'">选中页签5</el-button>
      <el-button size="small" @click="activeValue = '10'">选中页签10</el-button>
    </div>
    <p class="demo-nav-tabs__tip">在标签区域使用鼠标滚轮可横向滚动，切换选中项后会自动居中。</p>
  </div>
</template>

<script setup lang="ts">
import type { NavTabItem } from 'gi-component'
import { useNavTabs } from 'gi-component'
import { ref } from 'vue'

const activeValue = ref<string | number>('1')

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
  { label: '页签12', value: '12' }
])

useNavTabs({
  tabEl: '.tab',
  tabScrollEl: 'tab__scroll',
  tabItemClassName: 'tab-item',
  activeValue
})

function handleTabClick(item: NavTabItem) {
  if (item.disabled) {
    return
  }
  activeValue.value = item.value
}
</script>

<style scoped>
.demo-nav-tabs {
  width: 360px;
}

.tab {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  background: var(--el-bg-color);
  font-size: 14px;
}

.tab__scroll {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
}

.tab__scroll::-webkit-scrollbar {
  display: none;
}

.tab-item {
  flex-shrink: 0;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: var(--el-text-color-regular);
  position: relative;
  user-select: none;
}

.tab-item--active {
  color: var(--el-color-primary);
  font-weight: 500;
}

.tab-item--active::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 2px;
  background: var(--el-color-primary);
}

.tab-item--disabled {
  color: var(--el-text-color-disabled);
  cursor: not-allowed;
}

.demo-nav-tabs__actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.demo-nav-tabs__tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
