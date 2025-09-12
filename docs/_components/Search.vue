<template>
  <gi-form ref="GiFormRef" v-model="form" :columns="columns" search :grid-item-props="{
    span: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8, xxl: 8 }
  }" @search="search" @reset="reset">
  </gi-form>
</template>

<script lang="ts" setup>
import type { FormColumnItem, FormInstance } from 'gi-component';
import { ElMessage } from 'element-plus';
import { computed, reactive, ref } from 'vue';

const GiFormRef = ref<FormInstance | null>();

function search() {
  ElMessage.success('点击了搜索');
}

function reset() {
  ElMessage.info('点击了重置');
}

const form = reactive({});

const columns = computed(() => {
  return [
    {
      type: 'input',
      label: '姓名',
      field: 'name'
    },
    {
      type: 'input',
      label: '手机号',
      field: 'phone'
    },
    {
      type: 'input',
      label: '数量',
      field: 'num'
    },
    {
      type: 'input',
      label: '评分',
      field: 'star'
    },
    {
      type: 'select',
      label: '兴趣',
      field: 'hobby',
      props: {
        options: [
          { label: '吃饭', value: '吃饭' },
          { label: '睡觉', value: '睡觉' },
          { label: '打豆豆', value: '打豆豆' }
        ]
      }
    },
    {
      type: 'date-picker',
      label: '日期',
      field: 'date'
    },
    {
      type: 'date-picker',
      label: '时间',
      field: 'datetime',
      props: {
        type: 'datetime'
      }
    }
  ] as FormColumnItem[];
});
</script>

<style lang="scss" scoped></style>
