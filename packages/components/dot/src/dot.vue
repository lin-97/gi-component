<template>
  <span :class="getClass" :style="getStyle"></span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { DotProps } from './type.ts'
import { computed } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<DotProps>(), {
  type: 'circle',
  size: 6,
  color: 'primary'
})

const { b } = useBemClass()

const getClass = computed(() => {
  const arr = [b('dot'), b(`dot--${props.type}`)]
  if (['primary', 'success', 'danger', 'warning', 'info'].includes(props.color)) {
    arr.push(b(`dot--${props.color}`))
  }
  if (props.animation) {
    arr.push(b('dot--animation'))
  }
  return arr.join(' ')
})

const getStyle = computed(() => {
  const obj: CSSProperties = {}
  if (props.color && !['primary', 'success', 'danger', 'warning', 'info'].includes(props.color)) {
    obj.backgroundColor = props.color
  }
  if (props.size) {
    obj.width = `${props.size}px`
    obj.height = `${props.size}px`
  }
  return obj
})
</script>

<style scoped lang="scss">
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-dot {
  display: inline-flex;
  border-radius: 100px;
  background-color: var(--el-color-info);
}

.#{a.$prefix}-dot--square {
  border-radius: 0;
}

.#{a.$prefix}-dot--primary {
  background-color: var(--el-color-primary);
}

.#{a.$prefix}-dot--success {
  background-color: var(--el-color-success);
}

.#{a.$prefix}-dot--danger {
  background-color: var(--el-color-danger);
}

.#{a.$prefix}-dot--warning {
  background-color: var(--el-color-warning);
}

.#{a.$prefix}-dot--info {
  background-color: var(--el-color-info);
}

.#{a.$prefix}-dot--animation {
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: inherit;
    border-radius: 50%;
    animation: dot-animation 1.2s ease-in-out infinite;
  }
}

@keyframes dot-animation {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }

  30% {
    opacity: 0.7;
  }

  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}
</style>
