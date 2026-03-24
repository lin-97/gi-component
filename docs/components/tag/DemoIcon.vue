<template>
  <gi-card bordered title="图标">
    <el-space direction="vertical" alignment="normal" style="width: 100%">
      <el-space wrap>
        <GiTag :icon="User" color="primary">icon 属性</GiTag>
        <GiTag :icon="CircleCheck" color="success" closable @close="onClose">icon + 可关闭</GiTag>
      </el-space>
      <el-space wrap>
        <GiTag color="primary">
          <template #icon>
            <ElIcon>
              <User />
            </ElIcon>
          </template>
          用户
        </GiTag>
        <GiTag color="success" closable @close="onClose">
          <template #icon>
            <ElIcon>
              <CircleCheck />
            </ElIcon>
          </template>
          已完成
        </GiTag>
        <GiTag type="dark" color="primary">
          <template #icon>
            <ElIcon>
              <Warning />
            </ElIcon>
          </template>
          注意
        </GiTag>
      </el-space>
      <el-space wrap>
        <GiTag type="outline" size="small" color="warning">
          <template #icon>
            <ElIcon>
              <Star />
            </ElIcon>
          </template>
          小号
        </GiTag>
        <GiTag type="light-outline" size="large" color="danger">
          <template #icon>
            <ElIcon>
              <Star />
            </ElIcon>
          </template>
          大号
        </GiTag>
      </el-space>
    </el-space>
  </gi-card>
</template>

<script setup lang="ts">
import { CircleCheck, Star, User, Warning } from '@element-plus/icons-vue'
import { ElIcon, ElMessage } from 'element-plus'

function onClose() {
  ElMessage.success('点击了关闭图标')
}
</script>
