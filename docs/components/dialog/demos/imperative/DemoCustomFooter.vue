<template>
  <ElButton type="primary" @click="openDialog">打开对话框</ElButton>
</template>

<script setup lang="ts">
import { ElButton, ElMessage, ElSpace } from 'element-plus'
import { Dialog } from 'gi-component'
import { h } from 'vue'

const onConfirm = () => {
  ElMessage.success('点击了确定按钮')
}

const openDialog = () => {
  const { close, update } = Dialog.open({
    title: '标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色',
    footer: () => h(ElSpace, null, () => [
      h(ElButton, { type: 'success', plain: true, onClick: () => update({ title: '新标题' }) }, { default: () => '修改标题' }),
      h(ElButton, { type: 'warning', plain: true, onClick: () => close() }, { default: () => '取消' }),
      h(ElButton, { type: 'primary', onClick: () => onConfirm() }, { default: () => '确定' })
    ])
  })
}
</script>
