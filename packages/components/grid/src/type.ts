/**
 * 响应式断点配置
 * - xxl: >= 1600px
 * - xl: >= 1200px
 * - lg: >= 992px
 * - md: >= 768px
 * - sm: >= 576px
 * - xs: < 576px
 */
export interface ResponsiveValue {
  xxl?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

/** Grid 容器 Props */
export interface GridProps {
  /** 每一行展示的列数 */
  cols?: number | ResponsiveValue
  /** 行与行之间的间距（px） */
  rowGap?: number | ResponsiveValue
  /** 列与列之间的间距（px） */
  colGap?: number | ResponsiveValue
  /** 是否折叠超出 collapsedRows 的项 */
  collapsed?: boolean
  /** 折叠时显示的行数 */
  collapsedRows?: number
}

/** GridItem Props */
export interface GridItemProps {
  /** 跨越的格数 */
  span?: number | ResponsiveValue
  /** 左侧的间隔格数 */
  offset?: number | ResponsiveValue
  /** 是否为后缀元素（折叠时始终显示，并靠右对齐） */
  suffix?: boolean
}

/**
 * 经响应式解析并归一化后的 GridItem 数据
 * span / offset 已转为具体数值
 */
export interface GridItemData extends GridItemProps {
  span: number
  offset: number
}
