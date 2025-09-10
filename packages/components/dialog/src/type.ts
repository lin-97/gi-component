import type { ButtonProps, DialogProps as ElDialogProps } from 'element-plus';
import type { CSSProperties, VNode } from 'vue';

export interface DialogProps extends Partial<ElDialogProps> {
  content?: string | (() => VNode);
  footer?: boolean | (() => VNode);
  okText?: string;
  cancelText?: string;
  okButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
  style?: CSSProperties;
  simple?: boolean; // 简单模式
  onOk?: () => void;
  onBeforeOk?: () => Promise<boolean>;
  onCancel?: () => void;
}
