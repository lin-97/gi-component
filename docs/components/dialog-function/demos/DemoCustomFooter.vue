<template>
  <ElButton type="primary" @click="openDialog">打开对话框</ElButton>
</template>

<script setup lang="ts">
import { ElButton, ElMessage, ElSpace } from 'element-plus'
import { Dialog } from 'gi-component'
import { h } from 'vue'

function getRandomTitle() {
  const titles = ['春江花月夜', '滕王阁序', '岳阳楼记', '醉翁亭记', '赤壁赋']
  return titles[Math.floor(Math.random() * titles.length)] ?? titles[0]
}

const onConfirm = () => {
  ElMessage.success('点击了确定按钮')
}

const openDialog = () => {
  const { close, update } = Dialog.open({
    title: '标题',
    content: '落霞与孤鹜齐飞，秋水共长天一色',
    footer: () => h(ElSpace, null, () => [
      h(ElButton, {
        type: 'success',
        plain: true,
        onClick: () => update({ title: getRandomTitle() })
      }, { default: () => '随机标题' }),
      h(ElButton, { type: 'warning', plain: true, onClick: () => close() }, { default: () => '取消' }),
      h(ElButton, { type: 'primary', onClick: () => onConfirm() }, { default: () => '确定' })
    ])
  })
}
</script>
