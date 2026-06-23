<template>
  <ElButton :class="b('button')" v-bind="bindProps" @click="(e: MouseEvent) => emit('click', e)">
    <slot>{{ btnText }}</slot>
  </ElButton>
</template>

<script setup lang="ts">
import type { ButtonProps as ElButtonProps } from 'element-plus'
import type { ButtonProps, CustomButtonType } from './type.ts'
import {
  Delete,
  Download,
  Edit,
  Plus,
  Printer,
  Search,
  Upload
} from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { computed, useAttrs } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: ''
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()

const { b } = useBemClass()

const obj: Record<CustomButtonType, { btnProps: Partial<ElButtonProps>, btnText: string }>
  = {
  add: { btnProps: { icon: Plus, type: 'primary' }, btnText: '新增' },
  edit: { btnProps: { icon: Edit, type: 'primary' }, btnText: '编辑' },
  delete: { btnProps: { icon: Delete, type: 'danger' }, btnText: '删除' },
  search: { btnProps: { icon: Search, type: 'primary' }, btnText: '搜索' },
  reset: { btnProps: { type: undefined }, btnText: '重置' },
  upload: { btnProps: { icon: Upload }, btnText: '上传' },
  download: {
    btnProps: { icon: Download },
    btnText: '下载'
  },
  print: { btnProps: { icon: Printer }, btnText: '打印' }
}

const bindProps = computed((): Partial<ElButtonProps> => {
  if (props.type in obj) {
    const { type: _, ...restProps } = props
    return { ...attrs, ...restProps, ...obj[props.type as CustomButtonType].btnProps }
  }
  const { type, ...restProps } = props
  return { ...attrs, ...restProps, type: type as ElButtonProps['type'] | undefined }
})

const btnText = computed(() => {
  if (props.type in obj)
    return obj[props.type as CustomButtonType].btnText
  return ''
})
</script>

<style lang="scss" scoped></style>
