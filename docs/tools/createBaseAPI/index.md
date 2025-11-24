# createBaseAPI

本`createBaseAPI`仅提供参考，根据自身项目自行封装

```typescript
import { http } from '@/utils/http'

interface DefaultP {
  queryByIdParams?: { id: string } // 详情查询参数
  pageQueryListParams?: Record<string, any> // 分页查询参数
  saveInsertParams?: Record<string, any> // 新增参数
  saveUpdateParams?: Record<string, any> // 更新参数
  deleteParams?: { ids: string[] } // 删除参数
}

export function createBaseAPI<T, P extends DefaultP = DefaultP>(params: { baseUrl: string }) {
  const { baseUrl } = params

  const baseAPI = {
    newBean() {
      return http.get<T>(`${baseUrl}/newBean`, {})
    },
    queryById(params: P['queryByIdParams']) {
      return http.get<T>(`${baseUrl}/queryById`, params)
    },
    pageQueryList(params: P['pageQueryListParams'] & { page: number, rows: number }) {
      return http.get<PageResult<T[]>>(`${baseUrl}/pageQueryList`, params)
    },
    saveInsert(data: P['saveInsertParams']) {
      return http.post<T>(`${baseUrl}/saveInsert`, data)
    },
    saveUpdate(data: P['saveUpdateParams']) {
      return http.post<T>(`${baseUrl}/saveUpdate`, data)
    },
    delete(params: P['deleteParams']) {
      return http.post<string>(`${baseUrl}/delete`, params)
    }
    // 扩展，根据实际情况添加其他基本接口，如导入、导出等
  }

  return baseAPI
}
```

## 使用示例

```typescript
import type * as T from './type'
import { createBaseAPI } from '@/utils/createBaseAPI'
// @/apis/user.ts
import { http } from '@/utils/http'

interface ListItem {
  id: string
  name: string
  age: number
  phone: string
  address: string
  status: number
}

// 用于覆盖原来的默认类型
interface TBaseApi {
  pageQueryList: { name?: string, status?: number }
  // ....
}

// 基础接口
export const baseAPI = createBaseAPI<ListItem, TBaseApi>({ baseUrl: '/api/user' })

// 其他接口
export const getUserRoleList = (params: { id: string }) => {
  return http.get<PageResult<T.UserRoleListItem[]>>('/api/user/getUserRoleList', params)
}
```

其中`baseAPI`为基础接口，其他接口为扩展接口，基础接口包含了基本的新增、修改、删除、详情、分页查询等功能，可以自己扩展导入，导出等接口，主要是为了提高效率，减少重复代码

## 在页面使用

```typescript
import type * as T from '@/apis/user' // 获取类型
import { baseAPI, getUserRoleList } from '@/apis/user'

const userList = ref<T.ListItem[]>([])

// 获取详情
baseAPI.queryById({ id: '1' })

// 获取列表
baseAPI.pageQueryList({ page: 1, rows: 10, name: '' })
```
