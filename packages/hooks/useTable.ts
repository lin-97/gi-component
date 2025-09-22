import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

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

export function useTable<T extends U, U = T>(api: UseTableApi<T>, options: Options<T, U>) {
  const { onSuccess, immediate = true, rowKey = 'id' } = options || {}

  // const instance = getCurrentInstance();
  // const globalConfig = instance?.appContext.config.globalProperties?.$config || {};

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
