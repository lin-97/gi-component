<template>
  <div>
    <el-space class="header">
      <span>name</span>
      <el-space>
        <el-row align="middle">
          <span>必填</span>
          <el-switch v-model="fc.name.required" />
        </el-row>
        <el-row align="middle">
          <span>编辑</span>
          <el-switch v-model="fc.name.edit" />
        </el-row>
        <el-row align="middle">
          <span>隐藏</span>
          <el-switch v-model="fc.name.hidden" />
        </el-row>
      </el-space>
    </el-space>

    <gi-form ref="formRef" v-model="formData" :columns="columns" :fc="fc" />

    <pre>{{ fc }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormColumnItem } from 'gi-component';

// 表单数据
const formData = reactive({
  name: '',
  phone: ''
});

// 表单控制配置
const fc = ref({
  name: {
    required: true,
    edit: true,
    hidden: false
  }
});

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
] as FormColumnItem[];
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
}

pre {
  font-size: 12px;
  margin-top: 8px;
  background-color: #f5f5f5;
  line-height: 1;
}
</style>
