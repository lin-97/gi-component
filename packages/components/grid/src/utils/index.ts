import type { GridItemData } from '../type'

/**
 * 归一化子项布局数据：
 * - offset 不超过总列数
 * - 有 offset 时 span 计入 offset，且不超过总列数
 */
export function resolveItemData(cols: number, props: GridItemData): GridItemData {
  const originSpan = props.span ?? 1
  const originOffset = props.offset ?? 0
  const offset = Math.min(originOffset, cols)
  const span = Math.min(
    offset > 0 ? originSpan + originOffset : originSpan,
    cols
  )
  return {
    span,
    offset,
    suffix: 'suffix' in props ? props.suffix !== false : false
  }
}

/**
 * 计算折叠模式下各子项是否可见
 * - 未折叠：全部可见
 * - 折叠：优先保留 suffix 项，再按顺序填充至 collapsedRows 行容量
 */
export function setItemVisible({
  cols,
  collapsed,
  collapsedRows,
  itemDataList
}: {
  cols: number
  collapsed: boolean
  collapsedRows: number
  itemDataList: GridItemData[]
}) {
  let overflow = false
  let displayIndexList: number[] = []

  /** 累计 span 是否已超过折叠行容量 */
  function isOverflow(span: number) {
    return Math.ceil(span / cols) > collapsedRows
  }

  if (collapsed) {
    let spanSum = 0

    // 先占位 suffix 项（折叠时始终显示）
    for (let i = 0; i < itemDataList.length; i++) {
      if (itemDataList[i].suffix) {
        spanSum += itemDataList[i].span
        displayIndexList.push(i)
      }
    }

    // suffix 未撑满折叠行时，再按顺序塞入普通项
    if (!isOverflow(spanSum)) {
      let current = 0
      while (current < itemDataList.length) {
        const item = itemDataList[current]
        if (!item.suffix) {
          spanSum += item.span

          if (isOverflow(spanSum)) {
            break
          }
          displayIndexList.push(current)
        }
        current++
      }
    }

    // 存在非 suffix 且未进入显示列表的项，视为溢出
    overflow = itemDataList.some(
      (item, index) => !item.suffix && !displayIndexList.includes(index)
    )
  } else {
    displayIndexList = itemDataList.map((_, index) => index)
  }

  return {
    overflow,
    displayIndexList
  }
}
