import type { ButtonProps as ElButtonProps } from 'element-plus'

export interface ButtonProps extends Partial<Omit<ElButtonProps, 'type'>> {
  type?:
    | 'add'
    | 'edit'
    | 'delete'
    | 'search'
    | 'reset'
    | 'upload'
    | 'download'
    | 'print'
    | ''
    | ElButtonProps['type']
}
