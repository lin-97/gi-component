import type { DefineComponent } from 'vue'
import type { DefaultRow, TableProps } from './src/type'
import Table from './src/table.vue'

export type TableInstance<T extends DefaultRow = DefaultRow> = DefineComponent<TableProps<T>>
export * from './src/type'
export default Table
