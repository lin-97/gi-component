<template>
  <div :class="getClass">
    <div :class="b('tabs__default')">
      <slot>
        <ElTabs v-model="model" :type="props.type" :stretch="props.stretch"
          @tab-click="(p, e) => emits('tab-click', p, e)" @tab-change="emits('tab-change', $event as any)">
          <ElTabPane v-for="item in props.options" :key="item.name" :name="item.name" :disabled="item?.disabled">
            <template #label>
              <slot name="label" :data="item">{{ item.label }}</slot>
            </template>
          </ElTabPane>
        </ElTabs>
      </slot>
    </div>
    <div v-if="slots.extra" :class="b('tabs__extra')">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps as ElTabsProps, TabsPaneContext } from 'element-plus'
import type { TabsOptionItem, TabsProps } from './type.ts'
import { ElTabPane, ElTabs } from 'element-plus'
import { computed, useSlots } from 'vue'
import { useBemClass } from '../../../hooks'

const model = defineModel<ElTabsProps['modelValue']>()

const props = withDefaults(defineProps<TabsProps>(), {
  type: '',
  options: () => [],
  size: 'medium',
  inner: false
})

const emits = defineEmits<{
  (e: 'tab-click', pane: TabsPaneContext, ev: Event): void
  (e: 'tab-change', value: string): void
}>()

defineSlots<{
  default: () => void
  extra: () => void
  label: (e: { data: TabsOptionItem }) => void
}>()

const slots = useSlots()
const { b } = useBemClass()

const getClass = computed(() => {
  const arr: string[] = [b('tabs')]
  arr.push(b(`tabs--${props.size}`))
  if (props.inner) {
    arr.push(b('tabs--inner'))
  }
  return arr.join(' ')
})
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.#{a.$prefix}-tabs {
  width: 100%;
  padding: 0 var(--padding);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
  background-color: var(--el-bg-color);

  &__default {
    flex: 1;
    overflow: hidden;

    :deep(.el-tabs__header) {
      margin-bottom: 0;

      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
    }

    :deep(.el-tabs__active-bar) {
      bottom: 1px;
    }
  }

  &__extra {
    margin-left: 10px;
    align-self: flex-start;
  }
}

:deep(.el-tabs--card) {
  >.el-tabs__header {
    border-bottom: none;
  }
}

:deep(.el-tabs--border-card) {
  border-bottom: none;

  >.el-tabs__content {
    display: none;
  }

  >.el-tabs__header {
    border-bottom: none;
  }
}

.#{a.$prefix}-tabs--small {
  padding: 0 10px;

  :deep(.el-tabs) {
    --el-tabs-header-height: 32px;

    .el-tabs__item {
      font-size: 12px;
    }
  }
}

.#{a.$prefix}-tabs--inner {
  padding: 0;
}
</style>
