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
          <NodeRenderer :get-node="() => getLabelNode(col)" />
        </template>
        <template v-if="hasColumnSlot(col.value)">
          <slot :name="col.value as string" :value="getFieldValue(col)" :data="data!" :column="col" />
        </template>
        <NodeRenderer v-else-if="col.render && data" :get-node="() => getRenderNode(col)" />
        <span v-else>{{ getFieldValue(col) }}</span>
      </ElDescriptionsItem>
    </template>
    <template v-else>
      <slot />
    </template>
  </ElDescriptions>
</template>

<script setup lang="ts" generic="T extends DefaultRow">
import type { DefaultRow } from '../../table/src/type'
import type { DescriptionsColumnItem, DescriptionsProps, DescriptionsSlots } from './type'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { computed, defineComponent, useSlots } from 'vue'

const props = withDefaults(defineProps<DescriptionsProps<T>>(), {
  columns: () => [],
  border: false,
  column: 3,
  direction: 'horizontal',
  size: 'default',
  title: '',
  extra: ''
})

defineSlots<DescriptionsSlots<T>>()

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

function hasColumnSlot(name: string | undefined): name is string {
  return !!name && name in slots
}

function getFieldValue<K extends keyof T & string>(col: DescriptionsColumnItem<T> & { value?: K }) {
  if (!props.data || col.value === undefined)
    return undefined as T[K]
  return props.data[col.value]
}

function getLabelNode(col: DescriptionsColumnItem<T>) {
  if (typeof col.label === 'function')
    return col.label(col)
}

function getRenderNode(col: DescriptionsColumnItem<T>) {
  if (!col.render || !props.data)
    return
  return col.render({ value: getFieldValue(col), data: props.data!, column: col })
}
</script>
