<template>
  <gi-card bordered :header-style="{ display: 'none' }">
    <el-radio-group v-model="gapType">
      <el-radio value="small">small</el-radio>
      <el-radio value="middle">middle</el-radio>
      <el-radio value="large">large</el-radio>
      <el-radio value="customize">customize</el-radio>
    </el-radio-group>
    <el-slider v-if="gapType === 'customize'" v-model="customGap" :min="0" :max="30" />
    <gi-flex :gap="gapValue">
      <el-button type="primary">Primary</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="primary">Primary</el-button>
    </gi-flex>
  </gi-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const gapType = ref<'small' | 'middle' | 'large' | 'customize'>('large')
const customGap = ref(10)

const gapValue = computed(() => {
  if (gapType.value === 'customize') {
    return customGap.value
  }
  return gapType.value
})
</script>
