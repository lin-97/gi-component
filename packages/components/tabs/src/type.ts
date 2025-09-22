import type { TabsProps as ElTabsProps } from 'element-plus'

export type TabsOptionItem = {
  label: string
  name: string
  disabled?: boolean
}

export interface TabsProps
  extends Partial<Pick<ElTabsProps, 'type' | 'stretch'>> {
  type?: ElTabsProps['type']
  options?: TabsOptionItem[]
  size?: 'small' | 'medium'
  inner?: boolean // 内嵌模式
}
