<template>
  <gi-comment
    author="Socrates"
    datetime="1 hour"
    content="Comment body content."
    avatar="https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
  >
    <template #actions>
      <span class="comment-action"><ElIcon><Star /></ElIcon>83</span>
      <span class="comment-action"><ElIcon><StarFilled /></ElIcon>4</span>
      <span class="comment-action"><ElIcon><ChatDotRound /></ElIcon>Reply</span>
    </template>
  </gi-comment>
</template>

<script setup lang="ts">
import { ChatDotRound, Star, StarFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
</script>

<style lang="scss" scoped>
.comment-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.comment-action:hover {
  color: var(--el-color-primary);
}
</style>
