<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="200">
    <template #reference>
      <HeaderLabel :label="props.label" :actived="!!props.headerParams[props.field]" @click="visible = true">
      </HeaderLabel>
    </template>
    <el-input v-model="props.headerParams[props.field]" :placeholder="`输入${props.label}查询`" clearable
      size="small"></el-input>
    <el-row justify="end" style="margin-top: 10px">
      <el-space>
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button type="primary" size="small" @click="onConfirm">确定</el-button>
      </el-space>
    </el-row>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderLabel from './HeaderLabel.vue'

interface Props {
  label: string
  field: string
  headerParams: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const visible = ref(false)
function onConfirm() {
  emit('confirm')
  visible.value = false
}
</script>
