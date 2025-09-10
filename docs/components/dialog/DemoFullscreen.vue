<template>
  <div>
    <el-space>
      <el-button type="primary" @click="visible = true"
        >打开全屏对话框</el-button
      >
    </el-space>
    <gi-dialog v-model="visible" title="标题" fullscreen @ok="onOk">
      <el-space direction="vertical" fill style="width: 100%">
        <el-alert
          v-for="i in 30"
          :key="i"
          :title="`Success alert ${i}`"
          type="success"
          :closable="false"
        />
      </el-space>
    </gi-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const visible = ref(false);

const onOk = () => {
  ElMessage.success('点击了确定按钮');
};
</script>
