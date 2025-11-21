import type { ButtonProps, DrawerProps as ElDrawerProps } from 'element-plus'
import type { CSSProperties, VNode } from 'vue'

export interface DrawerProps extends Partial<ElDrawerProps> {
  content?: string | (() => VNode)
  footer?: boolean | (() => VNode)
  okText?: string
  cancelText?: string
  okButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  style?: CSSProperties
  onOk?: () => void
  onBeforeOk?: () => Promise<boolean>
  onCancel?: () => void
}
