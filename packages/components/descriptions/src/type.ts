import type { VNode } from 'vue'
import type { DefaultRow } from '../../table/src/type'

/** 描述列表列配置（对应 data 的字段与展示） */
export interface DescriptionsColumnItem<T extends DefaultRow = DefaultRow> {
  /** 对应 data 的字段名 */
  value?: keyof T & string
  /** 标签文本，或返回 VNode 的函数 */
  label?: string | ((columnItem: DescriptionsColumnItem<T>) => VNode)
  /** 列的数量（占据几列） */
  span?: number
  /** 列宽度（如无 border，宽度包含标签与内容） */
  width?: string | number
  /** 列最小宽度，剩余宽度按比例分配给设置了 minWidth 的列 */
  minWidth?: string | number
  /** 列内容对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 列标签对齐方式（无 border 时用 align） */
  labelAlign?: 'left' | 'center' | 'right'
  /** 列内容自定义类名 */
  className?: string
  /** 列标签自定义类名 */
  labelClassName?: string
  /** 自定义渲染内容：({ value, data, column }) => VNode */
  render?: (params: DescriptionsColumnSlotProps<T>) => VNode
}

/** 列字段插槽参数（插槽名与 column.value 一致） */
export type DescriptionsColumnSlotProps<
  T extends DefaultRow = DefaultRow,
  K extends keyof T & string = keyof T & string
> = {
  value: T[K]
  data: T
  column: DescriptionsColumnItem<T>
}

type DescriptionsStaticSlotKey = 'default' | 'title' | 'extra'

/** 组件插槽类型 */
export type DescriptionsSlots<T extends DefaultRow = DefaultRow> = {
  default?: () => any
  title?: () => any
  extra?: () => any
} & {
  [K in keyof T & string as K extends DescriptionsStaticSlotKey ? never : K]: (props: DescriptionsColumnSlotProps<T, K>) => any
}

export interface DescriptionsProps<T extends DefaultRow = DefaultRow> {
  /** 描述列表配置项，与 data 配合使用 */
  columns?: DescriptionsColumnItem<T>[]
  /** 详情数据（与 columns 配合，按 value 取字段） */
  data?: T
  /** 是否带边框 */
  border?: boolean
  /** 一行 Descriptions Item 的数量 */
  column?: number
  /** 排列方向 */
  direction?: 'vertical' | 'horizontal'
  /** 列表尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 标题文本，显示在左上方，也可用 title 插槽 */
  title?: string
  /** 操作区，显示在右上方，也可用 extra 插槽 */
  extra?: string
}
