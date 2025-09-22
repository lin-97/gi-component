<template>
  <div :class="getClass" @click="handleClick">
    <el-icon :size="props.iconSize">
      <ArrowRightBold v-if="collapsed" :size="iconSize" />
      <ArrowLeftBold v-else :size="iconSize" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useBemClass } from '../../../hooks'

/** 按钮类型 */
type ButtonType = 'default' | 'circle'

/** 组件属性定义 */
interface Props {
  /** 是否折叠状态 */
  collapsed?: boolean
  /** 按钮类型 */
  type?: ButtonType
  /** 图标大小 */
  iconSize?: number
  /** 是否禁用 */
  disabled?: boolean
}

/** 组件事件定义 */
interface Emits {
  (e: 'click'): void
  (e: 'update:collapsed', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  type: 'circle',
  iconSize: 10,
  disabled: false
})

const emit = defineEmits<Emits>()
const { b } = useBemClass()

/** 计算按钮类名 */
const getClass = computed(() => {
  const arr: string[] = [b('split-button'), b(`split-button--${props.type}`)]
  if (props.collapsed) {
    arr.push(b('split-button--collapsed'))
  }
  if (props.disabled) {
    arr.push(b('split-button--disabled'))
  }
  return arr.join(' ')
})

/** 处理点击事件 */
const handleClick = () => {
  if (props.disabled) return
  emit('click')
  emit('update:collapsed', !props.collapsed)
}
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-split-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  border: 1px solid var(--el-border-color);
  background-color: var(--el-bg-color);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, border-color;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  &--default {
    width: 18px;
    height: 40px;
    left: 0;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  }

  &--circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: -12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
