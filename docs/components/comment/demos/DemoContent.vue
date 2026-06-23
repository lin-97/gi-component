<template>
  <div class="comment-demo">
    <gi-comment author="访客" :avatar="avatar">
      <template #content>
        <div class="comment-editor">
          <ElInput
            v-model="inputValue"
            type="textarea"
            :rows="3"
            maxlength="200"
            show-word-limit
            placeholder="写下你的评论..."
          />
          <div class="comment-editor__footer">
            <ElButton type="primary" :disabled="!inputValue.trim()" @click="handleSubmit">
              提交评论
            </ElButton>
          </div>
        </div>
      </template>
    </gi-comment>

    <gi-comment
      v-for="item in commentList"
      :key="item.id"
      :author="item.author"
      :avatar="avatar"
      :content="item.content"
      :datetime="item.datetime"
    />
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput, ElMessage } from 'element-plus'
import { ref } from 'vue'

interface CommentItem {
  id: number
  author: string
  content: string
  datetime: string
}

const avatar = 'https://s1.ax1x.com/2022/06/14/XhteeO.jpg'

const inputValue = ref('')
const commentList = ref<CommentItem[]>([
  {
    id: 1,
    author: '张三',
    content: '这个组件用起来很方便！',
    datetime: '10 分钟前'
  }
])

function handleSubmit() {
  const content = inputValue.value.trim()
  if (!content)
    return

  commentList.value.unshift({
    id: Date.now(),
    author: '访客',
    content,
    datetime: '刚刚'
  })
  inputValue.value = ''
  ElMessage.success('评论已提交')
}
</script>

<style lang="scss" scoped>
.comment-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-editor__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
