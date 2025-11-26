<template>
  <div class="el-message-box__container">
    <el-icon class="el-message-box__status" :class="`el-message-box-icon--${props.type}`">
      <InfoFilled v-if="props.type === 'info'" />
      <SuccessFilled v-else-if="props.type === 'success'" />
      <WarningFilled v-else-if="props.type === 'warning'" />
      <CircleCloseFilled v-else-if="props.type === 'error'" />
    </el-icon>
    <div class="el-message-box__message">
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleCloseFilled, InfoFilled, SuccessFilled, WarningFilled } from '@element-plus/icons-vue'

interface Props {
  type?: 'info' | 'success' | 'warning' | 'error'
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  content: ''
})
</script>
