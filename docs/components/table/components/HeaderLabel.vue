<template>
  <el-space :size="4" :class="{ 'label--actived': props.actived }" @click="emit('click')">
    <span>{{ props.label }}</span>
    <el-icon>
      <CaretBottom />
    </el-icon>
  </el-space>
</template>

<script lang="ts" setup>
import { CaretBottom } from '@element-plus/icons-vue'

interface Props {
  label: string;
  actived: boolean;
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['click'])
</script>

<style scoped lang="scss">
.label--actived {
  color: var(--el-color-primary);
}
</style>
