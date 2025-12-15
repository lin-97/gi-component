import type { TableProps as ElTableProps, PaginationProps, TableColumnInstance } from 'element-plus'
import type { ExtractPropTypes, VNode } from 'vue'

type DefaultRow = Record<PropertyKey, any>
export interface TableColumnItem<T extends DefaultRow = DefaultRow> extends Omit<TableColumnInstance['$props'], never> {
  slotName?: string
  children?: TableColumnItem[]
  render?: (scope: { $index: number, cellIndex: number, column: TableColumnItem<T>, row: T }) => VNode | VNode[] | string
}

export interface TableProps extends ExtractPropTypes<ElTableProps<Record<string | number | symbol, any>>> {
  columns?: TableColumnItem[]
  pagination?: Partial<PaginationProps> | boolean
}
