<template>
  <span :class="className" :style="tagStyle" @click="handleClick">
    <span v-if="hasIcon" :class="b('tag__icon')">
      <slot name="icon">
        <ElIcon v-if="icon">
          <component :is="icon" />
        </ElIcon>
      </slot>
    </span>
    <slot />
    <span v-if="closable" class="gi-tag-close-btn" @click="handleClose">
      <ElIcon class="close-icon">
        <Close />
      </ElIcon>
    </span>
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { TagProps, TagThemeColor } from './type'
import { Close } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, useSlots } from 'vue'
import { useBemClass } from '../../../hooks'

const props = withDefaults(defineProps<TagProps>(), {
  type: 'light',
  color: 'info',
  size: 'default',
  round: false,
  closable: false
})

const emit = defineEmits<{
  click: []
  close: []
}>()

defineSlots<{
  default?: () => unknown
  icon?: () => unknown
}>()

const slots = useSlots()
const hasIcon = computed(() => Boolean(slots.icon) || Boolean(props.icon))

const SEMANTIC_THEME_COLORS: readonly TagThemeColor[] = [
  'primary',
  'success',
  'warning',
  'danger',
  'info'
]

function isSemanticThemeColor(value: string): value is TagThemeColor {
  return (SEMANTIC_THEME_COLORS as readonly string[]).includes(value)
}

const { b } = useBemClass()

const BASE_COLORS = {
  red: '#FF0000',
  orangered: '#f77234',
  orange: '#ff7d00',
  gold: '#f7ba1e',
  lime: '#9fdb1d',
  green: '#00b42a',
  cyan: '#14c9c9',
  blue: '#3491fa',
  purple: '#722ed1',
  pink: '#f5319d',
  gray: '#86909c'
} as const

type PresetColorKey = keyof typeof BASE_COLORS

function resolveColorToken(input: string): string {
  return BASE_COLORS[input as PresetColorKey] || input
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const body = hex.startsWith('#') ? hex.slice(1) : hex
  const full = body.length === 3
    ? body.split('').map((c) => c + c).join('')
    : body
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16)
  }
}

function stylesForType(
  type: NonNullable<TagProps['type']>,
  color: string,
  rgb: { r: number, g: number, b: number }
): CSSProperties {
  const { r, g, b } = rgb
  /** 与主题色标签一致：悬停时白字 + 实心色底 */
  const closeHoverVars = {
    '--tag-close-hover-color': '#fff',
    '--tag-close-hover-bg-color': color
  } as CSSProperties

  switch (type) {
    case 'dark':
      return {
        'color': '#fff',
        'backgroundColor': color,
        '--tag-close-hover-color': color,
        '--tag-close-hover-bg-color': 'rgba(255, 255, 255, 0.9)'
      } as CSSProperties
    case 'outline':
      return {
        color,
        backgroundColor: 'transparent',
        borderColor: `rgba(${r}, ${g}, ${b}, 0.6)`,
        ...closeHoverVars
      }
    case 'light-outline':
      return {
        color,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        borderColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
        ...closeHoverVars
      }
    case 'light':
    default:
      return {
        color,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        ...closeHoverVars
      }
  }
}

const className = computed(() => {
  const c = props.color
  return [
    b('tag'),
    props.type && b(`tag__type--${props.type}`),
    props.size && b(`tag__size--${props.size}`),
    props.round && b('tag--round'),
    c && isSemanticThemeColor(c) && b(`tag__color--${c}`)
  ].filter(Boolean).join(' ')
})

const tagStyle = computed((): CSSProperties => {
  const raw = props.color
  if (!raw || isSemanticThemeColor(raw))
    return {}
  const color = resolveColorToken(raw)
  return stylesForType(props.type ?? 'light', color, hexToRgb(color))
})

function handleClick() {
  emit('click')
}

function handleClose(event: MouseEvent) {
  event.stopPropagation()
  emit('close')
}
</script>

<style scoped lang="scss">
@use '../../../styles/var.scss' as a;

$theme-colors: primary, success, warning, danger, info;

$tag-size-small-height: 20px;
$tag-size-default-height: 22px;
$tag-size-large-height: 24px;

$tag-size-small-padding: 0 6px;
$tag-size-default-padding: 0 8px;
$tag-size-large-padding: 0 10px;

.#{a.$prefix}-tag {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  border-radius: 3px;
}

.#{a.$prefix}-tag--round {
  border-radius: 9999px;
}

.#{a.$prefix}-tag__icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  margin-right: 4px;
  line-height: 0;
  color: inherit;

  :deep(.el-icon),
  :deep(svg) {
    width: 11px;
    height: 11px;
  }
}

.#{a.$prefix}-tag-close-btn {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  margin-left: 4px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 50%;
  transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);

  .close-icon {
    z-index: 9;
    width: 11px;
    height: 11px;
    color: inherit;
  }

  /* 主题色写在 .gi-tag__color--* 上，自定义色写在内联 style；统一用变量驱动悬停 */
  &:hover {
    color: var(--tag-close-hover-color);
    background-color: var(--tag-close-hover-bg-color);
  }
}

.#{a.$prefix}-tag__size--small {
  height: $tag-size-small-height;
  padding: $tag-size-small-padding;

  .#{a.$prefix}-tag__icon {

    :deep(.el-icon),
    :deep(svg) {
      width: 10px;
      height: 10px;
    }
  }

  .#{a.$prefix}-tag-close-btn {
    width: 14px;
    height: 14px;

    .close-icon {
      width: 10px;
      height: 10px;
    }
  }
}

.#{a.$prefix}-tag__size--default {
  height: $tag-size-default-height;
  padding: $tag-size-default-padding;
}

.#{a.$prefix}-tag__size--large {
  height: $tag-size-large-height;
  padding: $tag-size-large-padding;

  .#{a.$prefix}-tag__icon {

    :deep(.el-icon),
    :deep(svg) {
      width: 12px;
      height: 12px;
    }
  }

  .#{a.$prefix}-tag-close-btn {
    width: 16px;
    height: 16px;

    .close-icon {
      width: 12px;
      height: 12px;
    }
  }
}

.#{a.$prefix}-tag__type--light {
  @each $s in $theme-colors {
    &.#{a.$prefix}-tag__color--#{$s} {
      color: var(--el-color-#{$s});
      background-color: var(--el-color-#{$s}-light-9);

      --tag-close-hover-color: #fff;
      --tag-close-hover-bg-color: var(--el-color-#{$s});
    }
  }
}

.#{a.$prefix}-tag__type--dark {
  color: #fff;

  @each $s in $theme-colors {
    &.#{a.$prefix}-tag__color--#{$s} {
      background-color: var(--el-color-#{$s});

      --tag-close-hover-color: var(--el-color-#{$s});
      --tag-close-hover-bg-color: rgb(255 255 255 / 90%);
    }
  }
}

.#{a.$prefix}-tag__type--outline {
  background: transparent;
  border-style: solid;
  border-width: 1px;

  @each $s in $theme-colors {
    &.#{a.$prefix}-tag__color--#{$s} {
      color: var(--el-color-#{$s});
      border-color: var(--el-color-#{$s}-light-5);

      --tag-close-hover-color: #fff;
      --tag-close-hover-bg-color: var(--el-color-#{$s});
    }
  }
}

.#{a.$prefix}-tag__type--light-outline {
  border-style: solid;
  border-width: 1px;

  @each $s in $theme-colors {
    &.#{a.$prefix}-tag__color--#{$s} {
      color: var(--el-color-#{$s});
      background-color: var(--el-color-#{$s}-light-9);
      border-color: var(--el-color-#{$s}-light-7);

      --tag-close-hover-color: #fff;
      --tag-close-hover-bg-color: var(--el-color-#{$s});
    }
  }
}

.#{a.$prefix}-tag__type--light,
.#{a.$prefix}-tag__type--outline,
.#{a.$prefix}-tag__type--light-outline {
  &.#{a.$prefix}-tag__color--info {
    color: var(--el-color-text-primary);
  }
}
</style>
