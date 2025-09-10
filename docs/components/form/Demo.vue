<template>
  <gi-card title="配置表单示例" bordered>
    <template #extra>
      <el-space>
        <el-switch v-model="disabled" active-text="禁用"></el-switch>
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="左侧" value="left" />
          <el-radio-button label="右侧" value="right" />
          <el-radio-button label="顶部" value="top" />
        </el-radio-group>
      </el-space>
    </template>

    <gi-form
      ref="GiFormRef"
      v-model="form"
      :columns="columns"
      :disabled="disabled"
      label-width="auto"
      :label-position="labelPosition"
      :grid-item-props="{
        span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }
      }"
    >
      <template #customSlot="{ item }">
        {{ form.status }}-----------{{ item.field }}
      </template>
      <template #customSlot2>
        <el-alert title="Success alert" type="success" effect="dark" />
        <el-alert title="Info alert" type="info" effect="dark" />
        <el-alert title="Warning alert" type="warning" effect="dark" />
        <el-alert title="Error alert" type="error" effect="dark" />
      </template>
      <template #btns>
        <el-space>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="submit"> 提交 </el-button>
        </el-space>
      </template>
    </gi-form>
  </gi-card>
</template>

<script lang="ts" setup>
import type { FormColumnItem, FormInstance } from 'gi-component';
import { ElMessage, ElTag } from 'element-plus';
import { computed, h, reactive, ref } from 'vue';
import { treeData } from './data';

const GiFormRef = ref<FormInstance | null>();
const disabled = ref(false);
const labelPosition = ref<any>('right');

const form = reactive({
  name: '',
  age: 18,
  sex: '1',
  address: '北京',
  desc: '我是一个描述',
  date: '2021-01-01',
  datetime: '',
  time: '12:00:00',
  status: false,
  star: 3,
  radio: '吃饭',
  remark: '',
  inputTag: ['音乐', '电影'],
  color: '#0077F7',
  startTime: '',
  endTime: '',
  inputSearchId: '',
  inputSearchName: ''
});

const columns = computed(() => {
  return [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      required: true,
      extra: '指标单位'
    },
    {
      type: 'input',
      label: '手机号',
      field: 'phone',
      required: true,
      tip: '国内手机号',
      formItemProps: { style: { alignItems: 'baseline' } },
      slots: {
        prepend: '+86'
      }
    },
    {
      type: 'select',
      label: '性别',
      field: 'sex',
      props: {
        options: [
          { label: '男', value: '1' },
          { label: '女', value: '2' }
        ]
      }
    },
    {
      type: 'input-number',
      label: '数量',
      field: 'num',
      extra: () => h(ElTag, { type: 'danger' }, () => '个')
    },
    {
      type: 'switch',
      label: '启动',
      labelRender: () => h('span', { style: { color: 'red' } }, '启动'),
      field: 'status'
    },
    {
      type: 'slider',
      label: '滑块',
      field: 'slider',
      hide: () => form.status === true
    },
    {
      type: 'rate',
      label: '评分',
      field: 'star'
    },
    {
      type: 'date-picker',
      label: '日期',
      field: 'date'
    },
    {
      type: 'date-picker',
      label: '日期时间',
      field: 'datetime',
      props: {
        type: 'datetime'
      }
    },
    {
      type: 'checkbox-group',
      label: '复选框',
      field: 'checkbox',
      props: {
        options: [
          { label: '吃饭', value: '吃饭' },
          { label: '睡觉', value: '睡觉' },
          { label: '打豆豆', value: '打豆豆' }
        ]
      }
    },
    {
      type: 'radio-group',
      label: '单选框',
      field: 'radio',
      props: {
        options: [
          { label: '吃饭', value: '吃饭' },
          { label: '睡觉', value: '睡觉' },
          { label: '打豆豆', value: '打豆豆' }
        ]
      }
    },
    {
      type: 'tree-select',
      label: '树形选择',
      field: 'treeSelect',
      tip: '这里是树形选择提示语',
      props: {
        data: treeData
      },
      formItemProps: { style: { alignItems: 'baseline' } }
    },
    {
      type: 'input-tag',
      label: '标签输入',
      field: 'inputTag'
    },
    {
      type: 'input-search',
      label: '选择输入',
      field: 'inputSearchId',
      fieldName: 'inputSearchName',
      props: {
        onSearch: () => {
          ElMessage.success('点击了搜索');
          form.inputSearchId = '111,222,333';
          form.inputSearchName = 'aaa,bbb,ccc';
        },
        onClear: () => {
          ElMessage.success('点击了清除');
          form.inputSearchId = '';
          form.inputSearchName = '';
        }
      }
    },
    {
      type: 'color-picker',
      label: '颜色选择',
      field: 'color'
    },
    {
      type: 'cascader',
      label: '级联',
      field: 'cascader',
      props: {
        options: treeData
      }
    },
    {
      type: 'slot',
      label: '插槽',
      field: 'customSlot',
      tip: '这里使用了自定义插槽'
    },
    {
      type: 'slot',
      label: '',
      field: 'customSlot2',
      span: 24,
      formItemProps: { labelWidth: 0, class: 'hide-label' },
      tip: '暂满宽度的插槽示例'
    },
    {
      type: 'textarea',
      label: '备注',
      field: 'remark',
      span: 24
    },
    {
      type: 'slot',
      label: '提交按钮',
      field: 'btns',
      span: 24,
      formItemProps: {
        labelWidth: 0,
        class: 'hide-label',
        style: { marginBottom: 0 }
      }
    }
  ] as FormColumnItem[];
});

async function submit() {
  await GiFormRef.value?.formRef?.validate();
}
function reset() {
  GiFormRef.value?.formRef?.resetFields();
}
</script>

<style lang="scss" scoped></style>
