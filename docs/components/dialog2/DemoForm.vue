<template>
  <el-button type="primary" @click="openDialog">打开表单对话框</el-button>
</template>

<script setup lang="ts">
import { Dialog, GiForm, type FormColumnItem, type FormInstance } from 'gi-component';
import { ElMessage } from 'element-plus';
import { h, reactive, ref } from 'vue'

const columns: FormColumnItem[] = [
  { type: 'input', label: '用户名', field: 'username', required: true },
  { type: 'input', label: '手机号', field: 'phone', required: true },
]

const form = reactive({ username: '', phone: '' })
const openDialog = () => {
  const formRef = ref<FormInstance>()
  Dialog.open({
    title: '表单新增',
    content: () => h(GiForm, { ref: (e: any) => formRef.value = e, columns: columns, modelValue: form, 'onUpdate:modelValue': (val) => Object.assign(form, val) }),
    onBeforeOk: async () => {
      try {
        await formRef.value?.formRef?.validate?.()
        ElMessage.success('提交成功')
        await new Promise(resolve => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        ElMessage.error('提交失败')
        return false
      }
    }
  });
};
</script>
