<template>
  <gi-input-search v-model="form.userNames" @search="search" @clear="clear"></gi-input-search>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { SelectUserListDialog } from './utils'

const form = reactive({
  userIds: '',
  userNames: ''
})

function search() {
  SelectUserListDialog({
    onOk: (data) => {
      ElMessage.success('点击了确定按钮')
      form.userIds = data.map((i) => i.id).join(',')
      form.userNames = data.map((i) => i.name).join(',')
    }
  })
}

function clear() {
  form.userIds = ''
  form.userNames = ''
}
</script>
