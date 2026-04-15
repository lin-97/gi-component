<template>
  <div>
    <el-form>
      <el-form-item label="Select column:">
        <el-radio-group v-model="column" size="small">
          <el-radio :value="true">true</el-radio>
          <el-radio :value="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Select justify:">
        <el-radio-group v-model="justify" size="small">
          <el-radio value="flex-start">flex-start</el-radio>
          <el-radio value="center">center</el-radio>
          <el-radio value="flex-end">flex-end</el-radio>
          <el-radio value="space-between">space-between</el-radio>
          <el-radio value="space-around">space-around</el-radio>
          <el-radio value="space-evenly">space-evenly</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Select align:">
        <el-radio-group v-model="align" size="small">
          <el-radio value="flex-start">flex-start</el-radio>
          <el-radio value="center">center</el-radio>
          <el-radio value="flex-end">flex-end</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <gi-card bordered :header-style="{ display: 'none' }">
      <gi-flex :column="column" :justify="justify" :align="align" :gap="4" :style="{ height: '200px' }">
        <el-button type="primary">Primary</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="primary">Primary</el-button>
      </gi-flex>
    </gi-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const justify = ref<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('flex-start')
const align = ref<'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'>('flex-start')
const column = ref(false)
</script>
