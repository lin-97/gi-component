<template>
  <gi-input-group>
    <el-input
      v-model="arr[0]"
      placeholder="请输入"
      clearable
      style="width: 100px"
    ></el-input>
    <el-input
      v-model="arr[1]"
      placeholder="请输入"
      clearable
      style="width: 100px"
    ></el-input>
    <el-input
      v-model="arr[2]"
      placeholder="请输入"
      clearable
      style="width: 100px"
    ></el-input>
    <el-select
      v-model="arr[3]"
      placeholder="请选择"
      clearable
      style="width: 120px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </gi-input-group>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const arr = reactive(['', '', '', '']);
const options = [
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2' },
  { value: '3', label: '选项3' }
];
</script>
