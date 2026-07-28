import type { InjectionKey } from 'vue'
import type { GridItemData } from './type'

/** Grid 向子项下发的布局上下文 */
export type GridContext = Readonly<{
  /** 折叠模式下是否存在被隐藏的项 */
  overflow: boolean
  /** 当前应显示的子项索引列表 */
  displayIndexList: number[]
  /** 当前列数 */
  cols: number
  /** 当前列间距 */
  colGap: number
}>

export const GridContextInjectionKey: InjectionKey<GridContext> = Symbol(
  'GridContextInjectionKey'
)

/** 子项向 Grid 收集/移除自身布局数据的接口 */
export type GridDataCollector = Readonly<{
  collectItemData: (index: number, itemData: GridItemData) => void
  removeItemData: (index: number) => void
}>

export const GridDataCollectorInjectionKey: InjectionKey<GridDataCollector>
  = Symbol('GridDataCollectorInjectionKey')
