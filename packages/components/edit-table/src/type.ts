import type * as El from 'element-plus'
import type { CSSProperties, VNode } from 'vue'
import type { MergeMultiple } from '../../../types/tool'
import type { InputSearchInstance } from '../../input-search'

export type EditTableColumnItemType
  = | 'input'
    | 'textarea'
    | 'input-number'
    | 'input-tag'
    | 'select'
    | 'select-v2'
    | 'tree-select'
    | 'cascader'
    | 'slider'
    | 'switch'
    | 'rate'
    | 'checkbox-group'
    | 'checkbox'
    | 'radio-group'
    | 'radio'
    | 'date-picker'
    | 'time-picker'
    | 'time-select'
    | 'color-picker'
    | 'transfer'
    | 'autocomplete'
    | 'upload'
    | 'slot'
    | 'input-search'

export interface EditTableColumnItem {
  type?: EditTableColumnItemType
  label: string
  prop: string
  width?: number | string
  required?: boolean
  rules?: El.FormItemRule[] // 表单校验规则
  componentProps?: EditTableColumnItemProps
  columnProps?: El.TableColumnInstance['$props']
  formItemProps?: El.FormItemProps
  slotName?: string
}

export type EditTableColumnItemProps = MergeMultiple<[El.InputProps, El.InputNumberProps, El.InputTagProps, El.SelectProps, El.SelectV2Props, El.TreeInstance['$props'], El.CascaderProps, El.SliderProps, El.SwitchProps, El.RateProps, El.CheckboxGroupProps, El.CheckboxProps, El.RadioGroupProps, El.RadioProps, El.DatePickerProps, El.TimePickerDefaultProps, El.TimeSelectProps, El.ColorPickerProps, El.TransferProps, El.AutocompleteProps, El.UploadProps, InputSearchInstance['$props']]>

export type EditTableRow = Record<PropertyKey, any>

export type EditTableColumnCtx = El.TableColumnInstance['$props']

export type EditTableSize = '' | 'large' | 'default' | 'small'

export type EditTableSortOrder = 'ascending' | 'descending' | null

export interface EditTableSort {
  prop: string
  order: EditTableSortOrder
  init?: boolean
  silent?: boolean
}

export interface EditTableTreeProps {
  hasChildren?: string
  children?: string
  checkStrictly?: boolean
}

export type EditTableRowClassName = string | ((data: {
  row: EditTableRow
  rowIndex: number
}) => string)

export type EditTableRowStyle = CSSProperties | ((data: {
  row: EditTableRow
  rowIndex: number
}) => CSSProperties)

export type EditTableCellClassName = string | ((data: {
  row: EditTableRow
  column: EditTableColumnCtx
  rowIndex: number
  columnIndex: number
}) => string)

export type EditTableCellStyle = CSSProperties | ((data: {
  row: EditTableRow
  column: EditTableColumnCtx
  rowIndex: number
  columnIndex: number
}) => CSSProperties)

export type EditTableHeaderRowClassName = string | ((data: {
  rowIndex: number
}) => string)

export type EditTableHeaderRowStyle = CSSProperties | ((data: {
  rowIndex: number
}) => CSSProperties)

export type EditTableHeaderCellClassName = string | ((data: {
  column: EditTableColumnCtx
  columnIndex: number
}) => string)

export type EditTableHeaderCellStyle = CSSProperties | ((data: {
  column: EditTableColumnCtx
  columnIndex: number
}) => CSSProperties)

export type EditTableSummaryMethod = (data: {
  columns: EditTableColumnCtx[]
  data: EditTableRow[]
}) => string[]

export type EditTableSpanMethod = (data: {
  row: EditTableRow
  column: EditTableColumnCtx
  rowIndex: number
  columnIndex: number
}) => number[] | { rowspan: number, colspan: number } | void

export type EditTableLoadMethod = (
  row: EditTableRow,
  treeNode: unknown,
  resolve: (data: EditTableRow[]) => void
) => void

export type EditTableTooltipFormatter = (data: {
  row: EditTableRow
  column: EditTableColumnCtx
  cellValue: any
}) => string | VNode

export type EditTableRowExpandable = (row: EditTableRow, index: number) => boolean

export type EditTableCellScope = {
  row: EditTableRow
  column: EditTableColumnCtx
  $index: number
}

/**
 * gi-edit-table 组件 Props（可移植类型，不直接继承 ElTableProps 以避免 d.ts 生成失败）
 * 未列出的 el-table 属性仍可通过 attrs 透传
 */
export interface EditTableProps {
  /** gi-edit-table 列配置 */
  columns?: EditTableColumnItem[]
  /** 单元格禁用，函数返回 true 时禁用编辑 */
  cellDisabled?: boolean | ((scope: EditTableCellScope) => boolean)
  /** 是否禁用表单内所有编辑组件，透传 el-form */
  disabled?: boolean

  /** 表格数据 */
  data?: EditTableRow[]
  /** 表格高度 */
  height?: string | number
  /** 表格最大高度 */
  maxHeight?: string | number
  /** 是否为斑马纹表格 */
  stripe?: boolean
  /** 是否带有纵向边框 */
  border?: boolean
  /** 表格尺寸 */
  size?: EditTableSize
  /** 列宽是否自撑开 */
  fit?: boolean
  /** 是否显示表头 */
  showHeader?: boolean
  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean
  /** 当前行的 key，只接受预设值 */
  currentRowKey?: string | number
  /** 行的 className */
  rowClassName?: EditTableRowClassName
  /** 行的 style */
  rowStyle?: EditTableRowStyle
  /** 单元格的 className */
  cellClassName?: EditTableCellClassName
  /** 单元格的 style */
  cellStyle?: EditTableCellStyle
  /** 表头行的 className */
  headerRowClassName?: EditTableHeaderRowClassName
  /** 表头行的 style */
  headerRowStyle?: EditTableHeaderRowStyle
  /** 表头单元格的 className */
  headerCellClassName?: EditTableHeaderCellClassName
  /** 表头单元格的 style */
  headerCellStyle?: EditTableHeaderCellStyle
  /** 行数据的 Key，树形数据、多选保留勾选时必填 */
  rowKey?: string | ((row: EditTableRow) => string)
  /** 空数据时显示的文本 */
  emptyText?: string
  /** 是否默认展开所有行 */
  defaultExpandAll?: boolean
  /** 展开行的 keys，需设置 row-key */
  expandRowKeys?: string[]
  /** 默认排序列和顺序 */
  defaultSort?: EditTableSort
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
  summaryMethod?: EditTableSummaryMethod
  /** 合并行或列的计算方法 */
  spanMethod?: EditTableSpanMethod
  /** 多选表格中全选 checkbox 的半选状态行为 */
  selectOnIndeterminate?: boolean
  /** 树形数据缩进 */
  indent?: number
  /** 是否懒加载子节点数据 */
  lazy?: boolean
  /** 懒加载子节点数据的方法 */
  load?: EditTableLoadMethod
  /** 树形结构配置 */
  treeProps?: EditTableTreeProps
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
  tooltipFormatter?: EditTableTooltipFormatter
  /** 折叠时是否保留展开行内容在 DOM 中 */
  preserveExpandedContent?: boolean
  /** 是否使用原生滚动条 */
  nativeScrollbar?: boolean
  /** 是否允许行展开，需存在 type="expand" 列 */
  rowExpandable?: EditTableRowExpandable

  /** 当用户手动勾选数据行的 Checkbox 时触发 */
  onSelect?: (selection: EditTableRow[], row: EditTableRow) => void
  /** 当用户手动勾选全选 Checkbox 时触发 */
  onSelectAll?: (selection: EditTableRow[]) => void
  /** 当选择项发生变化时触发 */
  onSelectionChange?: (selection: EditTableRow[]) => void
  /** 当单元格 hover 进入时触发 */
  onCellMouseEnter?: (row: EditTableRow, column: EditTableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当单元格 hover 退出时触发 */
  onCellMouseLeave?: (row: EditTableRow, column: EditTableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被点击时触发 */
  onCellClick?: (row: EditTableRow, column: EditTableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被双击时触发 */
  onCellDblclick?: (row: EditTableRow, column: EditTableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某个单元格被右键点击时触发 */
  onCellContextmenu?: (row: EditTableRow, column: EditTableColumnCtx, cell: HTMLTableCellElement, event: Event) => void
  /** 当某一行被点击时触发 */
  onRowClick?: (row: EditTableRow, column: EditTableColumnCtx, event: Event) => void
  /** 当某一行被右键点击时触发 */
  onRowContextmenu?: (row: EditTableRow, column: EditTableColumnCtx, event: Event) => void
  /** 当某一行被双击时触发 */
  onRowDblclick?: (row: EditTableRow, column: EditTableColumnCtx, event: Event) => void
  /** 当某一列的表头被点击时触发 */
  onHeaderClick?: (column: EditTableColumnCtx, event: Event) => void
  /** 当某一列的表头被右键点击时触发 */
  onHeaderContextmenu?: (column: EditTableColumnCtx, event: Event) => void
  /** 当表格的排序条件发生变化时触发 */
  onSortChange?: (data: { column: EditTableColumnCtx, prop: string, order: EditTableSortOrder }) => void
  /** 当表格的筛选条件发生变化时触发 */
  onFilterChange?: (newFilters: Record<string, string[]>) => void
  /** 当表格的当前行发生变化时触发 */
  onCurrentChange?: (currentRow: EditTableRow | null, oldCurrentRow: EditTableRow | null) => void
  /** 当拖动表头改变了列的宽度时触发 */
  onHeaderDragend?: (newWidth: number, oldWidth: number, column: EditTableColumnCtx, event: MouseEvent) => void
  /** 当用户对某一行展开或者关闭时触发 */
  onExpandChange?: (row: EditTableRow, expandedRows: EditTableRow[]) => void
  /** 表格滚动时触发 */
  onScroll?: (args: { scrollLeft: number, scrollTop: number }) => void
}

/** 组件全部插槽签名，与 edit-table.vue defineSlots 一致 */
export type EditTableSlots = {
  append?: () => void
  empty?: () => void
  [slotName: string]: ((props: EditTableCellScope) => any) | undefined
}
