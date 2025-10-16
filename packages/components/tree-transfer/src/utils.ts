import { mapTree } from 'xe-utils'

/**
 * @desc 过滤树
 * @param { values } 数组
 */
type FilterTree = <T extends { children?: T[] }>(
  array: T[],
  iterate: (item: T, index?: number, items?: T[]) => boolean
) => T[]

export const filterTree: FilterTree = (values, fn) => {
  const arr = values.filter(fn)
  const data = mapTree(arr, (item) => {
    if (item.children && item.children.length) {
      item.children = item.children.filter(fn)
    }
    return item
  })
  return data
}
