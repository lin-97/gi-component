<template>
  <div :class="b('input-group')">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useBemClass } from '../../../hooks';

const { b } = useBemClass();
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

:deep(.el-button + .el-button) {
  margin-left: 0;
}

:deep(.el-select__wrapper) {
  box-shadow: none;
  border: 1px solid var(--el-border-color);

  &.is-focused {
    box-shadow: none;
    border-color: var(--el-color-primary);
  }

  &.is-hovering:not(.is-focused) {
    box-shadow: none;
    border-color: var(--el-border-color-hover);
  }
}

.#{a.$prefix}-input-group {
  display: flex;

  > :deep(*:not(:last-child)) {
    margin-right: -1px;
  }

  > :deep(*:first-child:last-child) {
    border-radius: var(--el-border-radius-base);

    .el-input__wrapper,
    .el-select__wrapper {
      border-radius: var(--el-border-radius-base);
    }
  }

  > :deep(*:not(:first-child):not(:last-child)) {
    border-radius: 0;

    .el-input__wrapper {
      border-radius: 0;
    }
  }

  > :deep(*:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    .el-input__wrapper,
    .el-select__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  > :deep(*:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    .el-input__wrapper,
    .el-select__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  > :deep(*:hover, *:focus, *:active) {
    z-index: 1;
  }

  > :deep(*) {
    .el-input__wrapper.is-focus,
    .el-select__wrapper.is-focused {
      z-index: 2;
    }
  }
}
</style>
