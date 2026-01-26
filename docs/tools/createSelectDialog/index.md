# createSelectDialog

用于快速构建选择对话框的工具函数，支持自定义组件、多选、参数传递等功能。

<script setup>
import Demo from './Demo.vue'
</script>

## 基础用法

<Demo></Demo>

<<< ./Demo.vue

::: details TreeTable查看代码
<<< ./components/TreeTable.vue
:::

::: details 工具函数使用示例
<<< ./utils/index.ts
:::

## 使用示例

### 1. 创建选择对话框函数

```typescript
import type { TableDataItem } from './components/TreeTable.vue'
import { createSelectDialog } from 'gi-component'
import TreeTable from './components/TreeTable.vue'

// 选择用户列表对话框
export const SelectUserListDialog = createSelectDialog<TableDataItem[]>({
  title: '选择用户',
  component: TreeTable,
  componentProps: {
    style: { height: '500px' }
  },
  tip: '请至少选择一名用户'
})
```

### 2. 打开选择对话框

```typescript
import { SelectUserListDialog } from './utils'

// 基础用法
SelectUserListDialog({
  onOk: (data) => {
    console.log('选中的数据:', data)
  }
})

// 带参数的用法
SelectUserListDialog({
  title: '选择部门用户', // 覆盖默认标题
  multiple: true, // 支持多选
  queryParams: { departmentId: '1001' }, // 传递查询参数
  onBeforeOk: async (data) => {
    // 自定义校验逻辑
    if (data.length > 5) {
      ElMessage.warning('最多只能选择5名用户')
      return false
    }
    return true
  },
  onOk: (data) => {
    console.log('选中的数据:', data)
  }
})
```

### 3. 创建符合要求的内容组件

内容组件必须暴露`getSelectedData`方法来获取选中的数据：

```vue
<template>
  <gi-table ref="tableRef" v-loading="loading" :columns="columns" :data="tableData" :pagination="pagination" border>
  </gi-table>
</template>

<script setup lang="ts">
import type { TableColumnItem } from 'gi-component'
import { useTable } from 'gi-component'
import { useTemplateRef } from 'vue'

const tableRef = useTemplateRef('tableRef')
const { tableData, getTableData, pagination, loading } = useTable(api, {})

// 必须暴露此方法供createSelectDialog调用
defineExpose({
  getSelectedData() {
    const data = tableRef.value?.tableRef?.getSelectionRows?.() || []
    return data
  }
})
</script>
```

## 注意事项

1. **组件要求**：传递给`component`参数的组件必须暴露`getSelectedData`方法，否则会提示错误

2. **数据校验**：如果未选择任何数据，会显示提示信息（默认为"请选择数据"）

3. **回调顺序**：如果同时设置了`onBeforeOk`和`onOk`，会先执行`onBeforeOk`，只有当它返回`true`时才会执行`onOk`

4. **类型安全**：通过泛型参数可以确保`onOk`和`onBeforeOk`回调函数接收的数据类型正确

5. **样式配置**：可以通过`componentProps`为内容组件传递样式和其他属性

## 源码

<<< ../../../packages/utils/createSelectDialog.ts

## 参数说明

### createSelectDialog函数参数

| 参数 | 类型 | 必选 | 说明 |
|-----|-----|-----|-----|
| `params` | `CreateSelectDialogParams` | 是 | 创建对话框的基本配置 |
| `params.component` | `Component` | 是 | 对话框中显示的内容组件，必须暴露getSelectedData方法 |
| `params.componentProps` | `Record<string, any>` | 否 | 传递给内容组件的属性 |
| `params.tip` | `string` | 否 | 未选择数据时的提示信息，默认为"请选择数据" |
| `params.title` | `string` | 否 | 对话框标题，可在调用返回的函数时覆盖 |
| `params.其他属性` | - | 否 | 继承自DialogOptions的其他属性（除content、onOk、onBeforeOk外） |

### 返回函数参数

| 参数 | 类型 | 必选 | 说明 |
|-----|-----|-----|-----|
| `options` | `DialogOption<T, Q>` | 是 | 打开对话框的配置选项 |
| `options.title` | `string` | 否 | 对话框标题，会覆盖createSelectDialog中的设置 |
| `options.multiple` | `boolean` | 否 | 是否支持多选，默认为false |
| `options.queryParams` | `Q['queryParams']` | 否 | 传递给内容组件的查询参数 |
| `options.componentProps` | `Q['componentProps']` | 否 | 传递给内容组件的属性 |
| `options.onOk` | `(data: T) => void` | 否 | 点击确定按钮后的回调函数，接收选中的数据 |
| `options.onBeforeOk` | `(data: T) => Promise<boolean>` | 否 | 点击确定按钮前的回调函数，可用于校验数据，返回`Promise<boolean>` |
