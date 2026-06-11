import type { TableProps as ElTableProps, PaginationProps, TableColumnInstance } from 'element-plus'
import type { VNode } from 'vue'

export type DefaultRow = Record<PropertyKey, any>

export interface TableColumnItem<T extends DefaultRow = DefaultRow> extends Omit<TableColumnInstance['$props'], never> {
  slotName?: string
  children?: TableColumnItem<T>[]
  render?: (scope: TableSlotScope<T>) => VNode | VNode[] | string
}

export type TableSlotScope<T extends DefaultRow = DefaultRow> = {
  $index: number
  cellIndex: number
  column: TableColumnInstance['$props']
  row: T
  expanded: boolean
}

export interface TableProps<T extends DefaultRow = DefaultRow> extends Partial<ElTableProps<T>> {
  data?: T[]
  columns?: TableColumnItem<T>[]
  pagination?: Partial<PaginationProps> | boolean
}
