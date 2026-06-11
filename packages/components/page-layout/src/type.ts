import type { SplitterPanelProps } from 'element-plus'
import type { CSSProperties } from 'vue'

/** 组件插槽类型 */
export type PageLayoutSlots = {
  header?: () => void
  left?: () => void
  tool?: () => void
  default?: () => void
}

export interface PageLayoutProps {
  size?: SplitterPanelProps['size']
  bordered?: boolean
  collapse?: boolean
  /** 是否开启容器宽度自动折叠左侧面板 */
  autoCollapse?: boolean
  /** 容器宽度小于该值时自动折叠左侧面板，大于该值时自动展开（单位 px） */
  collapseBreakpoint?: number
  leftStyle?: CSSProperties
  headerStyle?: CSSProperties
  toolStyle?: CSSProperties
  bodyStyle?: CSSProperties
}
