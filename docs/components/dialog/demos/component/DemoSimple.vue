<template>
  <div>
    <el-space>
      <el-button type="primary" @click="visible = true">
        打开简易对话框
      </el-button>
    </el-space>
    <gi-dialog v-model="visible" title="标题" simple @ok="onOk">
      落霞与孤鹜齐飞，秋水共长天一色。
    </gi-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)

const onOk = () => {
  ElMessage.success('点击了确定按钮')
}
</script>
