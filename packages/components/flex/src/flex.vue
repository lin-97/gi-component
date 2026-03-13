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
  flex: 'normal'
})

const { b } = useBemClass()

const classNames = computed(() => [b('flex')])

const gapMap: Record<string, string> = {
  small: '8px',
  middle: '16px',
  large: '24px'
}

const resolvedGap = computed(() => {
  if (props.gap === undefined || props.gap === null || props.gap === '')
    return undefined
  if (typeof props.gap === 'number')
    return `${props.gap}px`
  if (gapMap[props.gap])
    return gapMap[props.gap]
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
    flexDirection: props.vertical ? 'column' : 'row',
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
:deep(.el-button+.el-button) {
  margin-left: 0;
}
</style>
