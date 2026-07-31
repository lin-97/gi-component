<template>
  <el-space>
    <el-button type="primary" @click="open('ttb')">从上打开</el-button>
    <el-button type="primary" @click="open('btt')">从下打开</el-button>
  </el-space>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Drawer } from 'gi-component'

type Direction = NonNullable<DrawerProps['direction']>

const open = (direction: Direction) => {
  Drawer.open({
    title: direction === 'ttb' ? '从上打开' : '从下打开',
    content: '通过 direction 控制抽屉打开方向：ttb 从上打开，btt 从下打开。',
    direction,
    size: '40%',
    onOk: () => {
      ElMessage.success('点击了确定按钮')
    }
  })
}
</script>
