import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'

/** 删除操作的配置选项 */
export interface DeleteOptions {
  /** 确认框标题 */
  title?: string
  /** 确认框内容 */
  content?: string
  /** 成功提示信息 */
  successTip?: string
}

export interface PageParams {
  page: number
  size: number
}

export interface PageResult<T> {
  list: T[]
  total: number
}

interface Options<T> {
  onSuccess?: () => void
  onError?: (_error: Error) => void
  immediate?: boolean
  /** 行数据的唯一键（如表格 row-key） */
  rowKey?: keyof T
  listAPI: (_p: PageParams) => Promise<PageResult<T>> | Promise<T[]>
  deleteAPI?: (_pks: string[]) => Promise<any>
  exportAPI?: () => Promise<any>
}

export function useTable<F>(options: Options<F>) {
  const { onSuccess, onError, immediate = true } = options

  const loading = ref(false)
  const tableData: Ref<F[]> = ref([])

  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
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
      const res = await options.listAPI({ page: pagination.currentPage, size: pagination.pageSize })
      const data = !Array.isArray(res) ? res.list : res
      tableData.value = data as F[]
      const total = !Array.isArray(res) ? res.total : data.length
      setTotal(total)
      onSuccess?.()
    }
    catch (error) {
      onError?.(error as Error)
    }
    finally {
      loading.value = false
    }
  }

  immediate && getTableData()

  function search() {
    pagination.currentPage = 1
    getTableData()
  }

  function refresh() {
    getTableData()
  }

  function handleDelete(
    deleteApi: () => Promise<AxiosResponse<unknown>>,
    deleteOptions?: DeleteOptions
  ): Promise<boolean | undefined> {
    return new Promise((resolve) => {
      ElMessageBox.confirm(deleteOptions?.content ?? '是否确认删除？', deleteOptions?.title ?? '提示', {
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
              ElMessage.success(deleteOptions?.successTip ?? '删除成功')
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

  const selectedKeys = ref<string[]>([])
  const onSelectionChange = (rows: F[]) => {
    selectedKeys.value = rows.map(row => row[options.rowKey as keyof F] as unknown as string)
  }

  const onDelete = (row: F) => {
    if (!options.deleteAPI) {
      ElMessage.error('deleteAPI没有配置')
      return
    }
    const deleteAPI = options.deleteAPI
    handleDelete(() => deleteAPI([row[options.rowKey as keyof F] as unknown as string]))
  }

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
    handleDelete(() => deleteAPI(selectedKeys.value.map(key => key as unknown as string)), {
      title: '批量删除',
      content: `确定要删除选中的 ${selectedKeys.value.length} 条数据吗？`,
      successTip: '删除成功'
    })
  }

  return {
    tableData,
    getTableData,
    pagination,
    loading,
    search,
    refresh,
    handleDelete,
    onSelectionChange,
    selectedKeys,
    onDelete,
    onBatchDelete
  }
}
