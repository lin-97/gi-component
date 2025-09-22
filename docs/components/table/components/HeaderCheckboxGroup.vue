<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="200"
    :popper-style="{ width: '140px', minWidth: '0px' }">
    <template #reference>
      <HeaderLabel :label="props.label" :actived="!!props.headerParams[props.field]?.length" @click="visible = true">
      </HeaderLabel>
    </template>
    <el-checkbox-group v-model="props.headerParams[props.field]" :options="options" />
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
  headerParams?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  headerParams: () => ({})
})

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const visible = ref(false)
const options = [
  { label: '男', value: '1' },
  { label: '女', value: '2' }
]
function onConfirm() {
  emit('confirm')
  visible.value = false
}
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
  display: flex;
  margin-right: 0;
}
</style>
