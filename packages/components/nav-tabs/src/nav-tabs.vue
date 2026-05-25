<template>
  <div ref="rootRef" :class="[b('nav-tabs'), { [b('nav-tabs--custom')]: props.custom }]">
    <div v-if="slots['left-extra']" :class="b('nav-tabs__left')">
      <slot name="left-extra" />
    </div>
    <div ref="scrollRef" :class="b('nav-tabs__scroll')">
      <div v-for="item in props.data" :key="item.value" :class="[
        b('nav-tabs-item'),
        props.custom
          ? b('nav-tabs-item--custom')
          : {
            [b('nav-tabs-item--active')]: model === item.value,
            [b('nav-tabs-item--disabled')]: item.disabled,
          },
      ]" :data-value="item.value" @click="handleItemClick(item)">
        <slot :item="item" :active="model === item.value" :disabled="!!item.disabled">
          {{ item.label }}
        </slot>
      </div>
    </div>
    <div v-if="slots['right-extra']" :class="b('nav-tabs__right')">
      <slot name="right-extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavTabItem, NavTabsProps } from './type.ts'
import { ref, useSlots } from 'vue'
import { useBemClass, useNavTabs } from '../../../hooks'

const model = defineModel<string | number>()

const props = withDefaults(defineProps<NavTabsProps>(), {
  data: () => [],
  wheelSpeed: 1,
  custom: false
})

const emits = defineEmits<{
  (e: 'change', value: string | number): void
}>()

defineSlots<{
  'default': (props: {
    item: NavTabItem
    active: boolean
    disabled: boolean
  }) => void
  'left-extra': () => void
  'right-extra': () => void
}>()

const slots = useSlots()
const { b } = useBemClass()

const rootRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

const tabItemClassName = b('nav-tabs-item')

useNavTabs({
  tabEl: rootRef,
  tabScrollEl: scrollRef,
  tabItemClassName,
  activeValue: model,
  wheelSpeed: props.wheelSpeed
})

function handleItemClick(item: NavTabItem) {
  if (item.disabled) {
    return
  }
  model.value = item.value
  emits('change', item.value)
}
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-nav-tabs {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  box-sizing: border-box;

  &__left {
    flex-shrink: 0;
    margin-right: 10px;
  }

  &__right {
    flex-shrink: 0;
    margin-left: 10px;
  }

  &__scroll {
    flex: 1;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &:not(.#{a.$prefix}-nav-tabs--custom) {
    .#{a.$prefix}-nav-tabs-item {
      padding: 0 16px;
      color: var(--el-text-color-regular);
      position: relative;
      font-size: 14px;
    }

    .#{a.$prefix}-nav-tabs-item--active {
      color: var(--el-color-primary);
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        left: 16px;
        right: 16px;
        bottom: 0;
        height: 2px;
        background: var(--el-color-primary);
      }
    }

    .#{a.$prefix}-nav-tabs-item--disabled {
      color: var(--el-text-color-disabled);
      cursor: not-allowed;
    }
  }
}

.#{a.$prefix}-nav-tabs--custom {
  .#{a.$prefix}-nav-tabs__scroll {
    gap: 8px;
  }

  .#{a.$prefix}-nav-tabs-item {
    padding: 0;
    height: auto;
    line-height: inherit;
  }
}

.#{a.$prefix}-nav-tabs-item {
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
