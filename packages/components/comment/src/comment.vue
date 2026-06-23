<script lang="ts" setup>
import type { CommentProps } from './type'
import { ElAvatar } from 'element-plus'
import { computed, useSlots } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<CommentProps>(), {
  author: '',
  avatar: '',
  content: '',
  datetime: ''
})

defineSlots<{
  avatar?: () => void
  author?: () => void
  datetime?: () => void
  content?: () => void
  actions?: () => void
  default?: () => void
}>()

const slots = useSlots()
const { b } = useBemClass()

const hasAuthor = computed(() => !!slots.author || !!props.author)
const hasDatetime = computed(() => !!slots.datetime || !!props.datetime)
const hasContent = computed(() => !!slots.content || !!props.content)
</script>

<template>
  <div :class="b('comment')">
    <div :class="b('comment__inner')">
      <div :class="b('comment__avatar')">
        <slot name="avatar">
          <ElAvatar v-if="props.avatar" :size="40" :src="props.avatar" />
        </slot>
      </div>
      <div :class="b('comment__content')">
        <div v-if="hasAuthor || hasDatetime" :class="b('comment__content-author')">
          <span v-if="hasAuthor" :class="b('comment__author')">
            <slot name="author">{{ props.author }}</slot>
          </span>
          <span v-if="hasDatetime" :class="b('comment__datetime')">
            <slot name="datetime">{{ props.datetime }}</slot>
          </span>
        </div>
        <div v-if="hasContent" :class="b('comment__content-detail')">
          <slot name="content">{{ props.content }}</slot>
        </div>
        <div v-if="slots.actions" :class="b('comment__actions')">
          <slot name="actions" />
        </div>
      </div>
    </div>
    <div v-if="slots.default" :class="b('comment__nested')">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.#{a.$prefix}-comment {
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;

  &__inner {
    display: flex;
    gap: 12px;
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__content-author {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 1.5;
    font-size: 15px;
  }

  &__author {
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  &__datetime {
    margin-left: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  &__content-detail {
    margin-top: 4px;
    color: var(--el-text-color-regular);
    line-height: 1.5715;
    word-break: break-word;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 8px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 1.5715;
  }

  &__nested {
    width: 100%;
    padding-left: 52px;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
  }
}
</style>
