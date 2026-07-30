<template>
  <div class="iconify-demo">
    <div
      v-for="name in iconNames"
      :key="name"
      class="iconify-demo__item"
    >
      <Icon :icon="`custom:${name}`" width="28" height="28" />
      <span class="iconify-demo__name">custom:{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { CUSTOM_ICONS } from '../../icons/custom'

const iconNames = Object.keys(CUSTOM_ICONS.icons)
</script>

<style lang="scss" scoped>
.iconify-demo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.iconify-demo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
}

.iconify-demo__name {
  font-size: 12px;
  color: var(--vp-c-text-2);
  word-break: break-all;
  text-align: center;
}
</style>
