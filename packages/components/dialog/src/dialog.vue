<template>
  <el-dialog
    v-bind="dialogProps"
    v-model="visible"
    :class="getClass"
    :title="props.title"
    :style="{ maxWidth: !props.fullscreen ? '480px' : '100%', ...props.style }"
  >
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
          <el-space :size="10">
            <el-button v-bind="props.cancelButtonProps" @click="handleCancel">
{{
              props.cancelText
            }}
</el-button>
            <el-button
              type="primary"
              v-bind="props.okButtonProps"
              :loading="okLoading"
              @click="handleOk"
            >
              {{ props.okText }}
            </el-button>
          </el-space>
        </template>
        <template v-else>
          <component :is="props.footer()"></component>
        </template>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import type { DialogProps } from './type'
import { computed, defineProps, defineSlots, ref } from 'vue'
import { useBemClass } from '../../../hooks'

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const props = withDefaults(defineProps<DialogProps>(), {
  closeOnClickModal: true,
  showClose: true,
  footer: true,
  okText: '确认',
  cancelText: '取消',
  width: 'calc(100% - 20px)',
  alignCenter: true
})

defineSlots<{
  title: () => VNode
  footer: () => VNode
  default: () => VNode
}>()

const { b } = useBemClass()

const getClass = computed(() => {
  const arr: string[] = [b('dialog')]
  if (props.simple) {
    arr.push(b('dialog--simple'))
  }
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
