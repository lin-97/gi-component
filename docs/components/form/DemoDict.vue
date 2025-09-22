<template>
  <gi-form
    ref="GiFormRef"
    v-model="form"
    :columns="columns"
    :grid-item-props="{
      span: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
    }"
  >
  </gi-form>
</template>

<script lang="ts" setup>
import type { FormColumnItem, FormInstance } from 'gi-component'
import { computed, reactive, ref } from 'vue'
import { useDictStore } from './useDictStore'

const GiFormRef = ref<FormInstance | null>()

const form = reactive({
  status: '1'
})
const { dict } = useDictStore(['HOBBY', 'STATUS'])

const columns = computed(() => {
  return [
    {
      type: 'select',
      label: '性别',
      field: 'sex',
      dictCode: 'SEX' // 需要配置dictRequest
    },
    {
      type: 'radio-group',
      label: '状态',
      field: 'status',
      dictCode: 'STATUS' // 需要配置dictRequest
    },
    {
      type: 'checkbox-group',
      label: '兴趣',
      field: 'hobby',
      props: {
        options: dict.HOBBY // 通过hooks获取字典数据
      }
    }
  ] as FormColumnItem[]
})
</script>
