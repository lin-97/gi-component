import type { ButtonProps as ElButtonProps } from 'element-plus'

export type CustomButtonType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'search'
  | 'reset'
  | 'upload'
  | 'download'
  | 'print'

export interface ButtonProps extends Partial<Omit<ElButtonProps, 'type'>> {
  type?: CustomButtonType | '' | ElButtonProps['type']
}
