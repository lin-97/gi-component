<template>
  <div>
    <gi-edit-table :columns="tableColumns" :data="data" size="small" class="gi-mb"></gi-edit-table>
    <gi-form ref="formRef" v-model="formData" :columns="columns" :fc="fc" :scroll-to-error="false" />
    <el-row justify="end">
      <el-space>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-space>
    </el-row>
    <pre class="doc-pre">{{ fc }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { EditTableColumnItem, FormColumnItem } from 'gi-component'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, useTemplateRef } from 'vue'

const tableColumns: EditTableColumnItem[] = [
  { label: '字段', prop: 'field' },
  { type: 'checkbox', label: '必填', prop: 'required' },
  { type: 'checkbox', label: '禁用', prop: 'disabled' },
  { type: 'checkbox', label: '隐藏', prop: 'hidden' }
]
const data = ref([
  {
    field: 'name',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    field: 'phone',
    required: true,
    disabled: false,
    hidden: false
  }
])

const fc = computed(() => {
  const obj: Record<string, { required: boolean, disabled: boolean, hidden: boolean }> = {}
  data.value.forEach((item) => {
    obj[item.field] = {
      required: item.required,
      disabled: item.disabled,
      hidden: item.hidden
    }
  })
  return obj
})

// 表单数据
const formData = reactive({
  name: '',
  phone: ''
})

// 表单列配置
const columns = [
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机号',
    field: 'phone'
  }
] as FormColumnItem[]

const formRef = useTemplateRef('formRef')
async function handleSubmit() {
  try {
    await formRef.value?.formRef?.validate?.()
    ElMessage.success('提交成功')
  } catch (error) {
    ElMessage.error('提交失败')
  }
}

function handleReset() {
  formRef.value?.formRef?.resetFields?.()
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
}
</style>
