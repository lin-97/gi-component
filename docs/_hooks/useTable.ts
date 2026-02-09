import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'

interface Options<T, U> {
  onSuccess?: () => void
  onError?: (error: Error) => void
  immediate?: boolean
  rowKey?: keyof T
  deleteAPI?: (_pks: string[]) => Promise<AxiosResponse<unknown> | void>
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
  const { onSuccess, onError, immediate = true } = options || {}

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

  const selectedKeys = ref<string[]>([])
  const onSelectionChange = (rows: T[]) => {
    const key = options.rowKey ?? 'id'
    selectedKeys.value = rows.map((row) => String(row[key as keyof T]))
  }

  /** 删除操作的配置选项 */
  interface DeleteOptions {
    /** 确认框标题 */
    title?: string
    /** 确认框内容 */
    content?: string
    /** 成功提示信息 */
    successTip?: string
  }

  /**
   * 处理删除操作
   * @description 弹出确认框，点击确定后确认框内显示 loading 并执行删除，成功后关闭并刷新表格
   * @param deleteApi - 删除操作的 API 函数（如 () => CmBearingService.delete(id)）
   * @param options - 删除操作的配置选项
   * @returns Promise<boolean | undefined> 用户取消为 undefined，执行结果为 true/false
   */
  function handleDelete(
    deleteApi: () => Promise<AxiosResponse<unknown> | void>,
    options?: DeleteOptions
  ): Promise<boolean | undefined> {
    return new Promise((resolve) => {
      ElMessageBox.confirm(options?.content ?? '是否确认删除？', options?.title ?? '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'cancel') {
            done()
            resolve(undefined)
            return
          }
          instance.confirmButtonLoading = true
          deleteApi()
            .then(() => {
              ElMessage.success(options?.successTip ?? '删除成功')
              getTableData()
              instance.confirmButtonLoading = false
              done()
              resolve(true)
            })
            .catch((err) => {
              console.error('删除失败', err)
              instance.confirmButtonLoading = false
              done()
              resolve(false)
            })
        }
      }).catch(() => resolve(undefined))
    })
  }

  // 删除单个数据
  const onDelete = (row: T) => {
    if (!options.deleteAPI) {
      ElMessage.error('deleteAPI没有配置')
      return
    }
    const deleteAPI = options.deleteAPI
    handleDelete(() => deleteAPI([row[options.rowKey as keyof T] as unknown as string]))
  }

  // 批量删除数据
  const onBatchDelete = () => {
    if (!options.deleteAPI) {
      ElMessage.error('deleteAPI没有配置')
      return
    }
    if (!selectedKeys.value.length) {
      ElMessage.error('请选择要删除的数据')
      return
    }
    const deleteAPI = options.deleteAPI
    handleDelete(() => deleteAPI(selectedKeys.value.map((key) => key as unknown as string)), {
      title: '批量删除',
      content: `确定要删除选中的 ${selectedKeys.value.length} 条数据吗？`,
      successTip: '删除成功'
    })
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
    refresh,
    /** 选中数据 */
    selectedKeys,
    /** 选中数据变化 */
    onSelectionChange,
    /** 删除操作 */
    handleDelete,
    /** 删除单个数据 */
    onDelete,
    /** 批量删除数据 */
    onBatchDelete
  }
}
