import type { SplitterPanelProps } from 'element-plus'
import type { CSSProperties } from 'vue'

export interface PageLayoutProps {
  size?: SplitterPanelProps['size']
  bordered?: boolean
  collapse?: boolean
  leftStyle?: CSSProperties
  headerStyle?: CSSProperties
  toolStyle?: CSSProperties
  bodyStyle?: CSSProperties
}
