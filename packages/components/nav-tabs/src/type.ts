/** 页签项基础字段（必填 + 可选 disabled） */
export interface NavTabBase {
  label: string
  value: string | number
  disabled?: boolean
}

/** 兼容旧用法：无扩展字段时的默认项类型 */
export type NavTabItem = NavTabBase

/** 组件 Props，T 由 data 数组元素类型推导 */
export interface NavTabsProps<T extends NavTabBase = NavTabBase> {
  data?: T[]
  wheelSpeed?: number
  /** 自定义项样式：无 padding，不应用 --active / --disabled 修饰类 */
  custom?: boolean
}

/** 默认插槽作用域 */
export type NavTabSlotProps<T extends NavTabBase = NavTabBase> = {
  item: T
  active: boolean
  disabled: boolean
}
