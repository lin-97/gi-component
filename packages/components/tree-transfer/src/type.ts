import type { TreeComponentProps } from 'element-plus'

export interface TreeTransferProps {
  titles?: [string, string]
  data: any[]
  treeProps?: Partial<TreeComponentProps>
}
