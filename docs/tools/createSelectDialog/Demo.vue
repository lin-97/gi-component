<template>
  <div>
    <gi-input-search v-model="form.userNames" @search="search" @clear="clear"></gi-input-search>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { selectUserListDialog } from './utils'

const form = reactive({
  userIds: '',
  userNames: ''
})

function search() {
  selectUserListDialog({
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
