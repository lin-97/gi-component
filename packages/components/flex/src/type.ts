export interface FlexProps {
  /** Flex 主轴的方向是否垂直，使用 flex-direction: column */
  column?: boolean
  /** 与 column 同义，保留用于兼容旧版 API */
  vertical?: boolean
  /** 设置元素单行显示还是多行显示，参考 flex-wrap；支持布尔值，true 为 wrap，false 为 nowrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | boolean | ''
  /** 设置元素在主轴方向上的对齐方式，参考 justify-content */
  justify?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  /** 设置元素在交叉轴方向上的对齐方式，参考 align-items */
  align?: 'normal' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  /** flex CSS 简写属性 */
  flex?: string
  /** 设置网格之间的间隙，可选预设 small / middle / large 或 string / number */
  gap?: 'small' | 'middle' | 'large' | string | number
}
