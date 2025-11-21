<template>
  <ElDrawer v-bind="dialogProps" v-model="visible" :class="getClass" :title="props.title" :style="{ ...props.style }">
    <slot>
      <template v-if="typeof props.content === 'string'">
        <p>{{ props.content }}</p>
      </template>
      <template v-if="typeof props.content === 'function'">
        <component :is="props?.content?.()"></component>
      </template>
    </slot>
    <template v-if="props.footer" #footer>
      <slot name="footer">
        <template v-if="typeof props.footer === 'boolean'">
          <ElSpace :size="10">
            <ElButton v-bind="props.cancelButtonProps" @click="handleCancel">
              {{ props.cancelText }}
            </ElButton>
            <ElButton type="primary" v-bind="props.okButtonProps" :loading="okLoading" @click="handleOk">
              {{ props.okText }}
            </ElButton>
          </ElSpace>
        </template>
        <template v-else>
          <component :is="props.footer()"></component>
        </template>
      </slot>
    </template>
  </ElDrawer>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import type { DrawerProps } from './type'
import { ElButton, ElDrawer, ElSpace } from 'element-plus'
import { computed, defineProps, defineSlots, ref } from 'vue'
import { useBemClass } from '../../../hooks'

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const props = withDefaults(defineProps<DrawerProps>(), {
  title: '',
  withHeader: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  modal: true,
  showClose: true,
  footer: true,
  okText: '确认',
  cancelText: '取消',
  size: '300px',
  appendTo: 'body'
})

defineSlots<{
  title: () => VNode
  footer: () => VNode
  default: () => VNode
}>()

const { b } = useBemClass()

const getClass = computed(() => {
  const arr: string[] = [b('drawer')]
  return arr.join(' ')
})

const dialogProps = computed(() => {
  return {
    ...props,
    content: undefined,
    footer: undefined,
    okText: undefined,
    cancelText: undefined,
    okButtonProps: undefined,
    cancelButtonProps: undefined,
    onOk: undefined,
    onBeforeOk: undefined,
    onCancel: undefined,
    simple: undefined
  }
})

const okLoading = ref(false)

const handleCancel = () => {
  props.onCancel?.()
  visible.value = false
}

const handleOk = async () => {
  if (props.onBeforeOk) {
    try {
      okLoading.value = true
      const flag = await props.onBeforeOk()
      okLoading.value = false
      if (flag) {
        visible.value = false
      }
    } catch (error) {
      console.error('error', error)
      okLoading.value = false
    }
  } else {
    props.onOk?.()
    visible.value = false
  }
}
</script>

<style lang="scss" scoped></style>
