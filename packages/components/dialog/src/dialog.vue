<template>
  <ElDialog v-bind="dialogProps" v-model="visible" :class="getClass" :fullscreen="isFullscreen" :show-close="false"
    :style="{ maxWidth: !isFullscreen ? '480px' : '100%', ...props.style }">
    <template #header="{ close, titleId, titleClass }">
      <div :class="b('dialog-header')">
        <slot name="title">
          <div
            :id="titleId"
            class="el-dialog__title"
            :class="[titleClass, b('dialog-title')]"
          >
            {{ props.title }}
          </div>
        </slot>
        <ElSpace :size="8">
          <ElButton v-if="props.showFullscreen" :class="b('dialog-button')" text circle @click="toggleFullscreen">
            <ElIcon :size="16">
              <FullScreen />
            </ElIcon>
          </ElButton>
          <ElButton v-if="props.showClose" :class="b('dialog-button')" text circle @click="close">
            <ElIcon :size="16">
              <Close />
            </ElIcon>
          </ElButton>
        </ElSpace>
      </div>
    </template>
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
  </ElDialog>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import type { DialogProps } from './type'
import { Close, FullScreen } from '@element-plus/icons-vue'
import { ElButton, ElDialog, ElIcon, ElSpace } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useBemClass } from '../../../hooks'

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false
})

const props = withDefaults(defineProps<DialogProps>(), {
  closeOnClickModal: true,
  showClose: true,
  showFullscreen: false,
  footer: true,
  okText: '确认',
  cancelText: '取消',
  width: 'calc(100% - 20px)',
  alignCenter: true,
  lockScroll: true,
  modal: true,
  appendTo: 'body'
})

defineSlots<{
  title: () => VNode
  footer: () => VNode
  default: () => VNode
}>()

const { b } = useBemClass()

const isFullscreen = ref(false)

watch(
  () => props.fullscreen,
  (val) => {
    isFullscreen.value = !!val
  },
  { immediate: true }
)

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
    simple: undefined,
    showFullscreen: undefined,
    fullscreen: undefined,
    title: undefined
  }
})

const okLoading = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

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

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-dialog-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0;
}

.#{a.$prefix}-dialog .#{a.$prefix}-dialog-button {
  border-radius: 4px;
}

.#{a.$prefix}-dialog-title {
  flex: 1;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
