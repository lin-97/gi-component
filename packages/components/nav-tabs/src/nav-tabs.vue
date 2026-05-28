<template>
  <div ref="rootRef" :class="[b('nav-tabs'), { [b('nav-tabs--custom')]: props.custom }]">
    <div v-if="slots['left-extra']" :class="b('nav-tabs__left')">
      <slot name="left-extra" />
    </div>
    <div :class="b('nav-tabs__scroll-wrap')">
      <button ref="leftBtnRef" type="button" :class="[b('nav-tabs__nav-btn'), b('nav-tabs__nav-btn--prev')]">
        <ElIcon>
          <ArrowLeft />
        </ElIcon>
      </button>
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
      <button ref="rightBtnRef" type="button" :class="[b('nav-tabs__nav-btn'), b('nav-tabs__nav-btn--next')]">
        <ElIcon>
          <ArrowRight />
        </ElIcon>
      </button>
    </div>
    <div v-if="slots['right-extra']" :class="b('nav-tabs__right')">
      <slot name="right-extra" />
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends NavTabBase">
import type { NavTabBase, NavTabSlotProps, NavTabsProps } from './type.ts'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { ref, useSlots } from 'vue'
import { useBemClass, useNavTabs } from '../../../hooks'

const model = defineModel<string | number>()

const props = withDefaults(defineProps<NavTabsProps<T>>(), {
  data: () => [],
  wheelSpeed: 1,
  custom: false
})

const emits = defineEmits<{
  (e: 'change', value: string | number): void
}>()

defineSlots<{
  'default': (props: NavTabSlotProps<T>) => void
  'left-extra': () => void
  'right-extra': () => void
}>()

const slots = useSlots()
const { b } = useBemClass()

const rootRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const leftBtnRef = ref<HTMLElement | null>(null)
const rightBtnRef = ref<HTMLElement | null>(null)

const tabItemClassName = b('nav-tabs-item')

useNavTabs({
  tabEl: rootRef,
  tabScrollEl: scrollRef,
  tabItemClassName,
  activeValue: model,
  wheelSpeed: props.wheelSpeed,
  tabLeftScrollBtnEl: leftBtnRef,
  tabRightScrollBtnEl: rightBtnRef,
  navBtnDisabledClassName: b('nav-tabs__nav-btn--disabled')
})

function handleItemClick(item: T) {
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
    // margin-right: 8px;
  }

  &__right {
    flex-shrink: 0;
    //margin-left: 8px;
  }

  &__scroll-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    height: 100%;
  }

  &__scroll {
    flex: 1;
    min-width: 0;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__nav-btn {
    flex-shrink: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    outline: none;
    margin: 0 4px;

    &--prev {
      margin-left: 6px;
    }

    &--next {
      margin-right: 6px;
    }

    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-fill-color-light);
    }

    &:active {
      background-color: var(--el-fill-color);
    }

    &--disabled {
      color: var(--el-text-color-disabled);
      cursor: not-allowed;
      pointer-events: none;

      &:hover,
      &:active {
        color: var(--el-text-color-disabled);
        background-color: transparent;
      }
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
