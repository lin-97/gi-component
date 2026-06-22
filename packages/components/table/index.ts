import type { TableInstance as ElTableInstance } from 'element-plus'
import type { DefineComponent, PublicProps, ShallowUnwrapRef, VNode } from 'vue'
import type { DefaultRow, TableProps, TableSlots } from './src/type'
import _Table from './src/table.vue'

type __VLS_PrettifyLocal<T> = {
  [K in keyof T]: T[K]
} & {}

type TableSetup<T extends DefaultRow> = {
  props: __VLS_PrettifyLocal<TableProps<T> & {}> & PublicProps
  expose: (exposed: ShallowUnwrapRef<{ tableRef: ElTableInstance | undefined }>) => void
  attrs: any
  slots: Readonly<TableSlots<T>>
  emit: Record<string, never>
}

declare const _TableComponent: <T extends DefaultRow = DefaultRow>(
  __VLS_props: TableSetup<T>['props'],
  __VLS_ctx?: __VLS_PrettifyLocal<Pick<TableSetup<T>, 'attrs' | 'emit' | 'slots'>>,
  __VLS_expose?: TableSetup<T>['expose'],
  __VLS_setup?: Promise<TableSetup<T>>
) => VNode & { __ctx?: TableSetup<T> }

export type TableInstance<T extends DefaultRow = DefaultRow> = DefineComponent<TableProps<T>>

export * from './src/type'
export default _Table as typeof _TableComponent
