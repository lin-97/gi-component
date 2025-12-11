# useTable

一个获取表格数据的Hook，用于简化表格数据获取、分页处理等常见操作。

<script setup>
import Demo from './Demo.vue'
</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 源码

```typescript
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

interface Options<T, U> {
  onSuccess?: () => void
  onError?: (error: Error) => void
  immediate?: boolean
  rowKey?: keyof T
}

interface ApiResult<T> {
  code: number
  data: T
  message: string
  success: boolean
}

interface PageResult<T> {
  list: T[]
  total: number
}

export interface UseTablePaginationParams { page: number, size: number }

export interface UseTableApi<T> {
  (params: UseTablePaginationParams): Promise<ApiResult<PageResult<T[]>>> | Promise<ApiResult<T[]>>
}

export function useTable<T extends U, U = T>(api: UseTableApi<T>, options: Options<T, U>) {
  const { onSuccess, onError, immediate = true, rowKey = 'id' } = options || {}

  const loading = ref(false)
  const tableData: Ref<U[]> = ref([])

  const pagination = reactive({
    currentPage: 1,
    pageSize: 20,
    total: 0,
    onCurrentChange: (size: number) => {
      pagination.currentPage = size
      getTableData()
    },
    onSizeChange: (size: number) => {
      pagination.pageSize = size
      getTableData()
    }
  })

  function setTotal(total: number) {
    pagination.total = total
  }

  async function getTableData() {
    try {
      loading.value = true
      const res = await api({ page: pagination.currentPage, size: pagination.pageSize })
      // 处理返回的数据结构可能是分页或数组的情况
      const data = !Array.isArray(res.data) ? res.data.list : res.data
      tableData.value = data as T[]
      // 设置总数据量
      const total = !Array.isArray(res.data) ? res.data.total : data.length
      setTotal(total)
      onSuccess?.()
    } catch (error) {
      onError?.(error as Error)
    } finally {
      loading.value = false
    }
  }

  // 是否立即触发请求
  immediate && getTableData()

  function search() {
    pagination.currentPage = 1
    getTableData()
  }

  function refresh() {
    getTableData()
  }

  return {
    /** 表格数据 */
    tableData,
    /** 获取表格数据 */
    getTableData,
    /** 分页数据 */
    pagination,
    /** 加载状态 */
    loading,
    /** 搜索 */
    search,
    /** 刷新 */
    refresh
  }
}
```

## 类型定义

```typescript
interface Options<T, U> {
  onSuccess?: () => void
  immediate?: boolean
  rowKey?: keyof T
}

interface ApiResult<T> {
  code: number
  data: T
  message: string
  success: boolean
}

interface PageResult<T> {
  list: T[]
  total: number
}

export interface UseTablePaginationParams { page: number, size: number }

export interface UseTableApi<T> {
  (params: UseTablePaginationParams): Promise<ApiResult<PageResult<T[]>>> | Promise<ApiResult<T[]>>
}

export function useTable<T extends U, U = T>(api: UseTableApi<T>, options: Options<T, U>)
```

## 参数说明

| 参数 | 类型 | 必选 | 说明 |
|-----|-----|-----|-----|
| `api` | `(params: UseTablePaginationParams) => Promise<ApiResult<PageResult<T[]>>> 或 Promise<ApiResult<T[]>>` | 是 | 获取表格数据的API函数，接收分页参数，返回Promise结果 |
| `options` | `Options` | 否 | 配置选项对象 |
| `options.onSuccess` | `() => void` | 否 | 数据加载成功后的回调函数 |
| `options.immediate` | `boolean` | 否 | 是否在组件挂载后立即请求数据，默认为`true` |
| `options.rowKey` | `keyof T` | 否 | 表格行数据的唯一标识字段，默认为`'id'` |

## 返回值说明

| 返回值 | 类型 | 说明 |
|-----|-----|-----|
| `tableData` | `Ref<U[]>` | 表格数据数组的响应式引用 |
| `pagination` | `object` | 分页数据对象，包含当前页码、每页大小、总数等信息 |
| `loading` | `Ref<boolean>` | 加载状态的响应式引用 |
| `getTableData` | `() => Promise<void>` | 手动获取表格数据的方法 |
| `search` | `() => void` | 搜索方法，会重置页码为1并重新获取数据 |
| `refresh` | `() => void` | 刷新方法，在当前页码重新获取数据 |
