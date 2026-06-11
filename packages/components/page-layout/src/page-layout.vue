<template>
  <ElSplitter ref="splitterRef" :class="getClass">
    <ElSplitterPanel v-if="slots.left" v-model:size="size">
      <div :class="b('page-layout__left')" :style="props.leftStyle">
        <slot name="left"></slot>
      </div>
    </ElSplitterPanel>
    <div v-if="slots.left && props.collapse" :class="b('page-layout__split')">
      <SplitButton :collapsed="Number(size) === 0" @click="handleClick"></SplitButton>
    </div>
    <ElSplitterPanel :resizable="props.collapse">
      <div :class="b('page-layout__right')">
        <div v-if="slots.header" :class="b('page-layout__header')" :style="props.headerStyle">
          <slot name="header"></slot>
        </div>
        <div v-if="slots.tool" :class="b('page-layout__tool')" :style="props.toolStyle">
          <slot name="tool"></slot>
        </div>
        <div :class="b('page-layout__body')" :style="props.bodyStyle">
          <slot></slot>
        </div>
      </div>
    </ElSplitterPanel>
  </ElSplitter>
</template>

<script lang="ts" setup>
import type { PageLayoutProps } from './type'
import { ElSplitter, ElSplitterPanel } from 'element-plus'
import { computed, onBeforeUnmount, ref, useSlots } from 'vue'
import { useBemClass } from '../../../hooks'
import SplitButton from './split-button.vue'
import { useAutoCollapse } from './useAutoCollapse'

const props = withDefaults(defineProps<PageLayoutProps>(), {
  size: 270,
  bordered: false,
  collapse: true,
  autoCollapse: false,
  collapseBreakpoint: 850,
  leftStyle: () => ({}),
  headerStyle: () => ({}),
  toolStyle: () => ({}),
  bodyStyle: () => ({})
})

defineSlots<{
  header: () => void
  left: () => void
  tool: () => void
  default: () => void
}>()

const slots = useSlots()
const { b } = useBemClass()
const splitterRef = ref<InstanceType<typeof ElSplitter>>()
const size = ref(props.size)
const collapsing = ref(false)
let collapsingTimer: ReturnType<typeof setTimeout> | null = null

const COLLAPSE_TRANSITION_MS = 300

function setCollapsingSize(newSize: typeof size.value) {
  if (collapsingTimer) {
    clearTimeout(collapsingTimer)
  }
  collapsing.value = true
  collapsingTimer = setTimeout(() => {
    collapsing.value = false
    collapsingTimer = null
  }, COLLAPSE_TRANSITION_MS)
  size.value = newSize
}

const autoCollapseEnabled = props.collapse && props.autoCollapse && !!slots.left && !!props.collapseBreakpoint

useAutoCollapse({
  splitterRef,
  size,
  enabled: autoCollapseEnabled,
  collapseBreakpoint: props.collapseBreakpoint,
  panelSize: () => props.size,
  setCollapsingSize
})

onBeforeUnmount(() => {
  if (collapsingTimer) {
    clearTimeout(collapsingTimer)
    collapsingTimer = null
  }
})

const getClass = computed(() => {
  const arr: string[] = [b('page-layout')]
  if (props.bordered) {
    arr.push(b('page-layout--bordered'))
  }
  if (slots.header) {
    arr.push(b('page-layout--has-header'))
  }
  if (slots.tool) {
    arr.push(b('page-layout--has-tool'))
  }
  if (collapsing.value) {
    arr.push(b('page-layout--collapsing'))
  }
  return arr.join(' ')
})

function handleClick() {
  setCollapsingSize(Number(size.value) > 30 ? 0 : props.size)
}
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

:deep(.el-splitter-bar__dragger-horizontal) {

  &::before,
  &::after {
    width: 1px;
  }
}

.#{a.$prefix}-page-layout {
  flex: 1;
  width: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: var(--el-bg-color);

  &--bordered {
    border: 1px solid var(--el-border-color);
  }

  &__left {
    width: 100%;
    height: 100%;
  }

  &__right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
}

.#{a.$prefix}-page-layout__header {
  padding: var(--padding);
  padding-bottom: 0;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
}

.#{a.$prefix}-page-layout__tool {
  width: 100%;
  padding: var(--padding);
  padding-bottom: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  box-sizing: border-box;
}

.#{a.$prefix}-page-layout__body {
  flex: 1;
  padding: var(--padding);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.#{a.$prefix}-page-layout--has-header {
  .#{a.$prefix}-page-layout__tool {
    padding-top: 10px;
  }
}

.#{a.$prefix}-page-layout--has-tool {
  .#{a.$prefix}-page-layout__body {
    padding-top: 10px;
  }
}

.#{a.$prefix}-page-layout__split {
  width: 0;
  height: auto;
  position: relative;
}

.#{a.$prefix}-page-layout--collapsing {
  :deep(.el-splitter-panel) {
    transition: flex-basis 0.3s;
  }
}
</style>
