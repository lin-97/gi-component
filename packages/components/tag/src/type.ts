import type { Component } from 'vue'

/** 与 Element Plus 语义色一致的主题色（走 CSS 变量，非内联色值） */
export type TagThemeColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** 内置调色板色名（映射为固定十六进制） */
export type TagPaletteColor =
  | 'red'
  | 'orangered'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray'

/** 组件属性定义 */
export interface TagProps {
  /** 标签类型 */
  type?: 'dark' | 'light' | 'outline' | 'light-outline'
  /**
   * 颜色：主题色名（primary / success 等，使用 Element 色板）、调色板预设名（red / blue 等）或任意 CSS 颜色字符串（如十六进制）
   */
  color?: TagThemeColor | TagPaletteColor | string
  /** 标签尺寸 */
  size?: 'small' | 'default' | 'large'
  /**
   * 左侧图标组件（如 `@element-plus/icons-vue` 图标）；与 `#icon` 插槽同时存在时以插槽为准
   */
  icon?: Component
  /** 是否可关闭 */
  closable?: boolean
}
