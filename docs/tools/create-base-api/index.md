# createBaseAPI

基于 RESTful 风格封装资源型 CRUD 接口，减少重复代码。

::: warning 提示
仅供参考，请根据项目实际接口规范调整路径、方法名与返回结构。
:::

## RESTful 约定

以资源 `users` 为例，`baseUrl` 为 `/api/users`：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/api/users` | 简单分页列表，查询参数 `page`、`size` 及少量筛选条件 |
| `POST` | `/api/users/search` | 复杂分页查询，筛选条件放请求体，避免 GET URL 过长 |
| `GET` | `/api/users/:id` | 获取详情 |
| `POST` | `/api/users` | 新增 |
| `PUT` | `/api/users/:id` | 全量更新 |
| `DELETE` | `/api/users/:id` | 删除单条 |
| `DELETE` | `/api/users` | 批量删除，请求体 `{ ids: string[] }` |

::: tip
- 筛选字段少、无数组/日期范围时，用 `list`（GET）即可。
- 筛选条件多、含多选/日期区间/动态表单时，用 `search`（POST），避免 URL 超长。
- 若后端批量删除使用独立路径（如 `POST /api/users/batch-delete`），可在 `createBaseAPI` 返回对象上自行扩展。
:::

## 封装实现

```typescript
import { http } from '@/utils/http'

export interface PageResult<T> {
  list: T[]
  total: number
}

export interface PageParams {
  page: number
  size: number
}

interface QueryMap {
  /** 列表查询筛选参数 */
  list?: Record<string, any>
  /** 新增请求体 */
  create?: Record<string, any>
  /** 更新请求体 */
  update?: Record<string, any>
}

export function createBaseAPI<T, Q extends QueryMap = QueryMap>(params: { baseUrl: string }) {
  const { baseUrl } = params

  return {
    /** GET /resource/:id */
    getById(id: string) {
      return http.get<T>(`${baseUrl}/${id}`)
    },

    /** GET /resource?page=&size= — 简单筛选 */
    list(params: PageParams & Q['list']) {
      return http.get<PageResult<T>>(baseUrl, params)
    },

    /** POST /resource/search — 复杂筛选，参数放 body */
    search(params: PageParams & Q['list']) {
      return http.post<PageResult<T>>(`${baseUrl}/search`, params)
    },

    /** POST /resource */
    create(data: Q['create']) {
      return http.post<T>(baseUrl, data)
    },

    /** PUT /resource/:id */
    update(id: string, data: Q['update']) {
      return http.put<T>(`${baseUrl}/${id}`, data)
    },

    /** DELETE /resource/:id */
    remove(id: string) {
      return http.delete<void>(`${baseUrl}/${id}`)
    },

    /** DELETE /resource  body: { ids } */
    removeBatch(ids: string[]) {
      return http.delete<void>(baseUrl, { data: { ids } })
    }
  }
}
```

## 定义业务 API

```typescript
// @/apis/user.ts
import { createBaseAPI } from '@/utils/createBaseAPI'

export interface UserItem {
  id: string
  name: string
  age: number
  phone: string
  address: string
  status: number
}

/** 覆盖列表筛选、创建、更新等请求参数类型 */
interface UserQuery {
  list?: {
    name?: string
    status?: number
    statusList?: number[]
    dateRange?: string[]
  }
  create?: Partial<UserItem>
  update?: Partial<UserItem>
}

export const userAPI = createBaseAPI<UserItem, UserQuery>({ baseUrl: '/api/users' })

/** 非标准 REST 的扩展接口单独声明 */
export function getUserRoleList(id: string) {
  return http.get<UserRoleItem[]>(`/api/users/${id}/roles`)
}
```

## 在页面中使用

```typescript
import { userAPI } from '@/apis/user'

// 详情
const detail = await userAPI.getById('1')

// 简单分页列表（与 useTable 的 page / size 一致）
const page = await userAPI.list({ page: 1, size: 10, name: '', status: 1 })

// 复杂筛选（多条件、多选、日期范围等）
const searchResult = await userAPI.search({
  page: 1,
  size: 10,
  name: '',
  statusList: [1, 2],
  dateRange: ['2024-01-01', '2024-12-31']
})

// 新增
await userAPI.create({ name: '张三', age: 18, status: 1 })

// 更新
await userAPI.update('1', { name: '李四' })

// 删除
await userAPI.remove('1')

// 批量删除
await userAPI.removeBatch(['1', '2', '3'])
```

## 与 useTable 配合

```typescript
import { userAPI } from '@/apis/user'
import { useTable } from '@/hooks/useTable'

const queryParams = reactive({
  name: '',
  status: undefined as number | undefined,
  statusList: [] as number[],
  dateRange: [] as string[]
})

/** 条件较多时走 POST search，避免 GET URL 过长 */
const useSearchAPI = computed(() =>
  queryParams.statusList.length > 0 || queryParams.dateRange.length > 0
)

const { tableData, pagination, search, loading } = useTable({
  listAPI: (p) => useSearchAPI.value
    ? userAPI.search({ ...p, ...queryParams })
    : userAPI.list({ ...p, ...queryParams }),
  rowKey: 'id',
  deleteAPI: (ids) => userAPI.removeBatch(ids)
})
```

## 与旧版 RPC 风格对照

| 旧接口（RPC） | RESTful |
| --- | --- |
| `GET /api/user/queryById?id=` | `GET /api/users/:id` |
| `GET /api/user/pageQueryList` | `GET /api/users?page=&size=` 或 `POST /api/users/search` |
| `POST /api/user/saveInsert` | `POST /api/users` |
| `POST /api/user/saveUpdate` | `PUT /api/users/:id` |
| `POST /api/user/delete` | `DELETE /api/users/:id` 或 `DELETE /api/users` |

`newBean` 一类「获取空表单默认值」接口在 REST 中通常由前端初始化，或使用后端的 `GET /api/users/new`（若存在）单独封装。
