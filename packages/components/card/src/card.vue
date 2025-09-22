<template>
  <div :class="getCardClass">
    <section :class="getHeaderClass" :style="props.headerStyle">
      <div :class="b('card-header__title')">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div :class="b('card-header__extra')">
        <slot name="extra">{{ props.extra }}</slot>
      </div>
    </section>
    <section :class="b('card-body')" :style="props.bodyStyle">
      <slot></slot>
    </section>
    <section v-if="slot.footer" :class="b('card-footer')">
      <slot name="footer"></slot>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { CardProps } from './type'
import { computed, useSlots } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  extra: '',
  size: 'middle' as const,
  bordered: false,
  headerBordered: true,
  headerStyle: () => ({}),
  bodyStyle: () => ({}),
  inner: false
})

defineSlots<{
  default: () => void
  title: () => void
  extra: () => void
  footer: () => void
}>()

const slot = useSlots()
const { b } = useBemClass()

const getCardClass = computed(() => {
  const arr: string[] = [b('card')]
  if (props.bordered) {
    arr.push(b('card--bordered'))
  }
  if (props.inner) {
    arr.push(b('card--inner'))
  }
  arr.push(b(`card--${props.size}`))
  return arr.join(' ')
})

const getHeaderClass = computed(() => {
  const arr: string[] = [b('card-header')]
  if (props.headerBordered) {
    arr.push(b('card-header--bordered'))
  }
  return arr.join(' ')
})
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-card {
  background-color: var(--el-bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  --card-padding-x: var(--padding-x);
  --card-padding-x-small: var(--padding-x-small);
  --card-padding-y: var(--padding-y);
  --card-padding-y-small: var(--padding-y-small);

  &--bordered {
    border: 1px solid var(--el-border-color);
  }
}

.#{a.$prefix}-card-header {
  height: 46px;
  padding: 0 var(--card-padding-x);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--el-text-color-primary);
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;

  &__title {
    position: relative;
    line-height: 1.3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 16px;
  }

  &__extra {
    display: flex;
  }

  &--bordered {
    border-bottom: 1px solid var(--el-border-color);
  }
}

.#{a.$prefix}-card-body {
  padding: var(--card-padding-x);
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
}

.#{a.$prefix}-card-footer {
  padding: var(--card-padding-y) var(--card-padding-x);
  box-sizing: border-box;
  border-top: 1px solid var(--el-border-color);
  box-sizing: border-box;
}

.#{a.$prefix}-card--full {
  .#{a.$prefix}-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.#{a.$prefix}-card--inner {
  .#{a.$prefix}-card-header,
  .#{a.$prefix}-card-body,
  .#{a.$prefix}-card-footer {
    padding-left: 0;
    padding-right: 0;
  }
}

.#{a.$prefix}-card--small {
  .#{a.$prefix}-card-header {
    height: 36px;
    padding: 0 var(--card-padding-x-small);

    &__title {
      font-size: 14px;
    }
  }

  .#{a.$prefix}-card-body {
    padding: var(--card-padding-x-small);
  }

  .#{a.$prefix}-card-footer {
    padding: var(--card-padding-y-small) var(--card-padding-x-small);
  }
}
</style>
