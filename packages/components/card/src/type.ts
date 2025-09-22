import type { CSSProperties } from 'vue'

export interface CardProps {
  title?: string
  extra?: string
  bordered?: boolean
  size?: 'small' | 'middle'
  headerBordered?: boolean
  headerStyle?: CSSProperties
  bodyStyle?: CSSProperties
  inner?: boolean // 内嵌模式
}
