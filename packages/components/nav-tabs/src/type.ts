export type NavTabItem = {
  label: string
  value: string | number
  disabled?: boolean
  [key: string]: unknown
}

export interface NavTabsProps {
  data?: NavTabItem[]
  wheelSpeed?: number
  /** 自定义项样式：无 padding，不应用 --active / --disabled 修饰类 */
  custom?: boolean
}
