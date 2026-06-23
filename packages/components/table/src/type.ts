import type { PaginationProps, TableColumnInstance } from 'element-plus'
import type { CSSProperties, InjectionKey, Slots, VNode } from 'vue'

export const TABLE_SLOTS_KEY: InjectionKey<Slots> = Symbol('tableSlots')

export type DefaultRow = Record<PropertyKey, any>

export type TableColumnCtx = TableColumnInstance['$props']

export interface TableColumnItem<T extends DefaultRow = DefaultRow> extends Omit<TableColumnCtx, never> {
  slotName?: string
  children?: TableColumnItem<T>[]
  render?: (scope: TableSlotScope<T>) => VNode | VNode[] | string
}

export type TableSlotScope<T extends DefaultRow = DefaultRow> = {
  $index: number
  cellIndex: number
  column: TableColumnCtx
  row: T
  expanded: boolean
}

export type TableSize = '' | 'large' | 'default' | 'small'

export type TableSortOrder = 'ascending' | 'descending' | null

export interface TableSort {
  prop: string
  order: TableSortOrder
  init?: boolean
  silent?: boolean
}

export interface TableTreeProps {
  hasChildren?: string
  children?: string
  checkStrictly?: boolean
}

export type TableRowClassName<T extends DefaultRow> = string | ((data: {
  row: T
  rowIndex: number
}) => string)

export type TableRowStyle<T extends DefaultRow> = CSSProperties | ((data: {
  row: T
  rowIndex: number
}) => CSSProperties)

export type TableCellClassName<T extends DefaultRow> = string | ((data: {
  row: T
  column: TableColumnCtx
  rowIndex: number
  columnIndex: number
}) => string)

export type TableCellStyle<T extends DefaultRow> = CSSProperties | ((data: {
  row: T
  column: TableColumnCtx
  rowIndex: number
  columnIndex: number
}) => CSSProperties)

export type TableHeaderRowClassName = string | ((data: {
  rowIndex: number
}) => string)

export type TableHeaderRowStyle = CSSProperties | ((data: {
  rowIndex: number
}) => CSSProperties)

export type TableHeaderCellClassName = string | ((data: {
  column: TableColumnCtx
  columnIndex: number
}) => string)

export type TableHeaderCellStyle = CSSProperties | ((data: {
  column: TableColumnCtx
  columnIndex: number
}) => CSSProperties)

export type TableSummaryMethod<T extends DefaultRow> = (data: {
  columns: TableColumnCtx[]
  data: T[]
}) => string[]

export type TableSpanMethod<T extends DefaultRow> = (data: {
  row: T
  column: TableColumnCtx
  rowIndex: number
  columnIndex: number
}) => number[] | { rowspan: number, colspan: number } | void

export type TableLoadMethod<T extends DefaultRow> = (
  row: T,
  treeNode: unknown,
  resolve: (data: T[]) => void
) => void

export type TableTooltipFormatter<T extends DefaultRow> = (data: {
  row: T
  column: TableColumnCtx
  cellValue: any
}) => string | VNode

export type TableRowExpandable<T extends DefaultRow> = (row: T, index: number) => boolean

/**
 * gi-table 组件 Props（可移植类型，不直接继承 ElTableProps 以避免 d.ts 生成失败）
 * 未列出的 el-table 属性仍可通过 attrs 透传
 */
export interface TableProps<T extends DefaultRow = DefaultRow> {
  /** gi-table 列配置 */
  columns?: TableColumnItem<T>[]
  /** gi-table 分页配置，传 false 可隐藏分页 */
  pagination?: Partial<PaginationProps> | boolean

  /** 表格数据 */
  data?: T[]
  /** 表格高度 */
  height?: string | number
  /** 表格最大高度 */
  maxHeight?: string | number
  /** 是否为斑马纹表格 */
  stripe?: boolean
  /** 是否带有纵向边框 */
  border?: boolean
  /** 表格尺寸 */
  size?: TableSize
  /** 列宽是否自撑开 */
  fit?: boolean
  /** 是否显示表头 */
  showHeader?: boolean
  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean
  /** 当前行的 key，只接受预设值 */
  currentRowKey?: string | number
  /** 行的 className */
  rowClassName?: TableRowClassName<T>
  /** 行的 style */
  rowStyle?: TableRowStyle<T>
  /** 单元格的 className */
  cellClassName?: TableCellClassName<T>
  /** 单元格的 style */
  cellStyle?: TableCellStyle<T>
  /** 表头行的 className */
  headerRowClassName?: TableHeaderRowClassName
  /** 表头行的 style */
  headerRowStyle?: TableHeaderRowStyle
  /** 表头单元格的 className */
  headerCellClassName?: TableHeaderCellClassName
  /** 表头单元格的 style */
  headerCellStyle?: TableHeaderCellStyle
  /** 行数据的 Key，树形数据、多选保留勾选时必填 */
  rowKey?: string | ((row: T) => string)
  /** 空数据时显示的文本 */
  emptyText?: string
  /** 是否默认展开所有行 */
  defaultExpandAll?: boolean
  /** 展开行的 keys，需设置 row-key */
  expandRowKeys?: string[]
  /** 默认排序列和顺序 */
  defaultSort?: TableSort
  /** 溢出 tooltip 的 effect */
  tooltipEffect?: 'dark' | 'light'
  /** 溢出 tooltip 的选项 */
  tooltipOptions?: Record<string, any>
  /** 过滤面板挂载到哪个元素 */
  appendFilterPanelTo?: string
  /** 是否显示合计行 */
  showSummary?: boolean
  /** 合计行第一列文本 */
  sumText?: string
  /** 自定义合计方法 */
  summaryMethod?: TableSummaryMethod<T>
  /** 合并行或列的计算方法 */
  spanMethod?: TableSpanMethod<T>
  /** 多选表格中全选 checkbox 的半选状态行为 */
  selectOnIndeterminate?: boolean
  /** 树形数据缩进 */
  indent?: number
  /** 是否懒加载子节点数据 */
  lazy?: boolean
  /** 懒加载子节点数据的方法 */
  load?: TableLoadMethod<T>
  /** 树形结构配置 */
  treeProps?: TableTreeProps
  /** 设置表格单元格、行和列的布局算法 */
  tableLayout?: 'fixed' | 'auto'
  /** 总是显示滚动条 */
  scrollbarAlwaysOn?: boolean
  /** 是否隐藏溢出内容并在 hover 时显示 tooltip */
  showOverflowTooltip?: boolean | Record<string, any>
  /** 确保主轴最小尺寸不跟随内容变化 */
  flexible?: boolean
  /** 内容区滚动条 wrap 的 tabindex */
  scrollbarTabindex?: string | number
  /** 是否允许拖拽最后一列 */
  allowDragLastColumn?: boolean
  /** show-overflow-tooltip 时的 tooltip 内容格式化 */
  tooltipFormatter?: TableTooltipFormatter<T>
  /** 折叠时是否保留展开行内容在 DOM 中 */
  preserveExpandedContent?: boolean
  /** 是否使用原生滚动条 */
  nativeScrollbar?: boolean
  /** 是否允许行展开，需存在 type="expand" 列 */
  rowExpandable?: TableRowExpandable<T>

  /** 当用户手动勾选数据行的 Checkbox 时触发 */
  onSelect?: (selection: T[], row: T) => void
  /** 当用户手动勾选全选 Checkbox 时触发 */
  onSelectAll?: (selection: T[]) => void
  /** 当选择项发生变化时触发 */
  onSelectionChange?: (selection: T[]) => void
  /** 当单元格 hover 进入时触发 */
  onCellMouseEnter?: (row: T, column: TableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当单元格 hover 退出时触发 */
  onCellMouseLeave?: (row: T, column: TableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被点击时触发 */
  onCellClick?: (row: T, column: TableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被双击时触发 */
  onCellDblclick?: (row: T, column: TableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被右键点击时触发 */
  onCellContextmenu?: (row: T, column: TableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某一行被点击时触发 */
  onRowClick?: (row: T, column: TableColumnCtx, event: Event) => void
  /** 当某一行被右键点击时触发 */
  onRowContextmenu?: (row: T, column: TableColumnCtx, event: Event) => void
  /** 当某一行被双击时触发 */
  onRowDblclick?: (row: T, column: TableColumnCtx, event: Event) => void
  /** 当某一列的表头被点击时触发 */
  onHeaderClick?: (column: TableColumnCtx, event: Event) => void
  /** 当某一列的表头被右键点击时触发 */
  onHeaderContextmenu?: (column: TableColumnCtx, event: Event) => void
  /** 当表格的排序条件发生变化时触发 */
  onSortChange?: (data: { column: TableColumnCtx, prop: string, order: TableSortOrder }) => void
  /** 当表格的筛选条件发生变化时触发 */
  onFilterChange?: (newFilters: Record<string, string[]>) => void
  /** 当表格的当前行发生变化时触发 */
  onCurrentChange?: (currentRow: T | null, oldCurrentRow: T | null) => void
  /** 当拖动表头改变了列的宽度时触发 */
  onHeaderDragend?: (newWidth: number, oldWidth: number, column: TableColumnCtx, event: MouseEvent) => void
  /** 当用户对某一行展开或者关闭时触发 */
  onExpandChange?: (row: T, expandedRows: T[]) => void
  /** 表格滚动时触发 */
  onScroll?: (args: { scrollLeft: number, scrollTop: number }) => void
}

/** 组件全部插槽签名，与 table.vue defineSlots 一致 */
export type TableSlots<T extends DefaultRow = DefaultRow> = {
  append?: () => void
  empty?: () => void
} & {
  [slotName: string]: ((props: TableSlotScope<T>) => any) | undefined
}
