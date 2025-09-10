# Table 表格

`gi-table` 组件是基于 Element Plus 的 `el-table` 和 `el-pagination` 组件封装的高级表格组件，提供了更便捷的配置方式和增强的功能，包括动态列配置、自定义渲染、嵌套列支持、分页集成等。

<script setup>
import Demo from './Demo.vue'
</script>

## 基础用法

::: raw
<Demo></Demo>
:::

::: details 查看代码
<<< ./Demo.vue
:::

## API 使用说明

### 组件属性

| 属性名     | 类型                       | 默认值 | 说明                                   |
| ---------- | -------------------------- | ------ | -------------------------------------- |
| columns    | `TableColumnItem[]`        | `[]`   | 表格列配置数组                         |
| data       | `any[]`                    | -      | 表格数据                               |
| pagination | `Partial<PaginationProps>` | `{}`   | 分页配置                               |
| 其他属性   | -                          | -      | 支持 Element Plus Table 组件的所有属性 |

### TableColumnItem 接口

`TableColumnItem` 接口继承自 Element Plus 的 `TableColumnInstance['$props']`，并扩展了以下属性：

| 属性名   | 类型                                                         | 说明                                     |
| -------- | ------------------------------------------------------------ | ---------------------------------------- |
| slotName | `string`                                                     | 用于自定义列内容的插槽名称               |
| children | `TableColumnItem[]`                                          | 子列配置，用于创建嵌套表头               |
| render   | `(scope: TableColumnCtx<any>) => VNode \| VNode[] \| string` | 自定义渲染函数，用于动态生成单元格内容   |
| 其他属性 | -                                                            | 支持 Element Plus TableColumn 的所有属性 |

### Pagination 配置

`pagination` 属性支持 Element Plus Pagination 组件的所有配置项，常用配置如下：

### 事件

支持 Element Plus Table 组件的所有事件。

### 插槽

除了通过 `slotName` 属性定义的自定义列插槽外，还支持 Element Plus Table 组件的所有作用域插槽。
