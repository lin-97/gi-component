<template>
  <div :class="classNames" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { FlexProps } from './type'
import { computed } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<FlexProps>(), {
  vertical: false,
  wrap: false,
  justify: 'normal',
  align: 'normal',
  flex: 'normal',
  full: false
})

const { b } = useBemClass()

const classNames = computed(() => {
  const arr: string[] = [b('flex'), b(`flex__size--${props.gap}`)]
  if (props.full) {
    arr.push(b('flex--full'))
  }
  return arr
})

const SIZE_MAP = ['small', 'middle', 'large']

const resolvedGap = computed(() => {
  if (props.gap === undefined || props.gap === null || props.gap === '' || SIZE_MAP.includes(props.gap as string))
    return undefined
  if (typeof props.gap === 'number')
    return `${props.gap}px`
  return String(props.gap)
})

const resolvedWrap = computed(() => {
  if (typeof props.wrap === 'boolean')
    return props.wrap ? 'wrap' : 'nowrap'
  // 模板中写 wrap 无值时 Vue 传空字符串，视为开启换行
  if (props.wrap === '')
    return 'wrap'
  return props.wrap
})

const style = computed<CSSProperties>(() => {
  const obj: CSSProperties = {
    display: 'flex',
    flexDirection: props.column || props.vertical ? 'column' : 'row',
    flexWrap: resolvedWrap.value,
    justifyContent: props.justify,
    alignItems: props.align
  }
  if (props.flex !== 'normal') {
    obj.flex = props.flex
  }
  if (resolvedGap.value) {
    obj.gap = resolvedGap.value
  }
  return obj
})
</script>

<style scoped lang="scss">
@use '../../../styles/var.scss' as a;

:deep(.el-button+.el-button) {
  margin-left: 0;
}

.#{a.$prefix}-flex {
  &--full {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__size--small {
    gap: 8px;
  }

  &__size--middle {
    gap: 12px;
  }

  &__size--large {
    gap: 16px;
  }
}
</style>
