<template>
  <div>
    <el-space>
      <el-button type="primary" @click="open('ttb')">从上打开</el-button>
      <el-button type="primary" @click="open('btt')">从下打开</el-button>
    </el-space>
    <gi-drawer v-model="visible" :title="title" :direction="direction" size="40%" @ok="onOk">
      <el-text>
        通过 direction 控制抽屉打开方向：ttb 从上打开，btt 从下打开。
      </el-text>
    </gi-drawer>
  </div>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'

type Direction = NonNullable<DrawerProps['direction']>

const visible = ref(false)
const direction = ref<Direction>('ttb')

const title = computed(() => (direction.value === 'ttb' ? '从上打开' : '从下打开'))

const open = (value: Direction) => {
  direction.value = value
  visible.value = true
}

const onOk = () => {
  ElMessage.success('点击了确定按钮')
}
</script>
