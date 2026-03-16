<template>
  <ElDescriptions :border="border" :column="column" :direction="direction" :size="size" :title="title" :extra="extra">
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="useColumns">
      <ElDescriptionsItem v-for="(col, idx) in columns" :key="col.value ?? idx"
        :label="typeof col.label === 'string' ? col.label : ''" :span="col.span ?? 1" :width="col.width"
        :min-width="col.minWidth" :align="col.align ?? 'left'" :label-align="col.labelAlign" :class-name="col.className"
        :label-class-name="col.labelClassName">
        <template v-if="typeof col.label === 'function'" #label>
          <NodeRenderer :get-node="() => (col.label as (c: DescriptionsColumnItem) => any)(col)" />
        </template>
        <slot v-if="hasColumnSlot(col.value)" :name="col.value" :value="getFieldValue(col)" :data="data" :column="col" />
        <NodeRenderer v-else-if="col.render && data" :get-node="() => col.render!({ value: getFieldValue(col), data, column: col })" />
        <span v-else>{{ getFieldValue(col) }}</span>
      </ElDescriptionsItem>
    </template>
    <template v-else>
      <slot />
    </template>
  </ElDescriptions>
</template>

<script setup lang="ts">
import type { DescriptionsColumnItem, DescriptionsProps } from './type'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { computed, defineComponent, useSlots } from 'vue'

const props = withDefaults(defineProps<DescriptionsProps>(), {
  columns: () => [],
  data: () => ({}),
  border: false,
  column: 3,
  direction: 'horizontal',
  size: 'default',
  title: '',
  extra: ''
})

defineSlots<{
  default?: () => any
  title?: () => any
  extra?: () => any
}>()

const NodeRenderer = defineComponent({
  name: 'NodeRenderer',
  props: {
    getNode: { type: Function, required: true }
  },
  setup(props: { getNode: () => any }) {
    return () => props.getNode()
  }
})

const slots = useSlots()
const useColumns = computed(() => (props.columns?.length ?? 0) > 0)

function hasColumnSlot(name: string | undefined): boolean {
  return !!name && !!(slots as Record<string, unknown>)[name]
}

function getFieldValue(col: DescriptionsColumnItem) {
  if (!props.data || col.value === undefined || col.value === null)
    return ''
  return props.data[col.value]
}
</script>
