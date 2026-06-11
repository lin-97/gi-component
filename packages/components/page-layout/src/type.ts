import type { SplitterPanelProps } from 'element-plus'
import type { CSSProperties } from 'vue'

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
