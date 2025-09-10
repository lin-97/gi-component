import type {
  TableProps as ElTableProps,
  PaginationProps,
  TableColumnCtx,
  TableColumnInstance
} from 'element-plus';
import type { ExtractPropTypes, VNode } from 'vue';

export interface TableColumnItem
  extends Omit<TableColumnInstance['$props'], never> {
  slotName?: string;
  children?: TableColumnItem[];
  render?: (scope: TableColumnCtx<any>) => VNode | VNode[] | string;
}

export interface TableProps
  extends ExtractPropTypes<
    ElTableProps<Record<string | number | symbol, any>>
  > {
  columns?: TableColumnItem[];
  pagination?: Partial<PaginationProps>;
}
