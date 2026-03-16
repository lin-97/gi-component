# Descriptions 描述列表

基于 `el-descriptions` 封装，支持通过 `columns` + `data` 配置项快速渲染描述列表，也可使用默认插槽自定义内容。`title`、`extra` 支持插槽。

<script setup>
import Demo from './Demo.vue'
import DemoSlot from './DemoSlot.vue'
</script>

## 基本用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 插槽用法

<DemoSlot></DemoSlot>

::: details 查看代码
<<< ./DemoSlot.vue
:::

## API

### Descriptions Props

| 属性名   | 说明                     | 类型     | 可选值                    | 默认值     |
| -------- | ------------------------ | -------- | ------------------------- | ---------- |
| columns  | 描述列表配置项           | `DescriptionsColumnItem[]`  | -                         | -          |
| data     | 详情数据（与 columns 配合） | `Object` | -                         | -          |
| border   | 是否带有边框             | `boolean` | -                         | `false`    |
| column   | 一行 Descriptions Item 的数量 | `number` | -                         | `3`        |
| direction| 排列的方向               | `string` | `vertical` / `horizontal` | `horizontal` |
| size     | 列表的尺寸               | `string` | `large` / `default` / `small` | `default` |
| title    | 标题文本，显示在左上方   | `string` | -                         | -          |
| extra    | 操作区文本，显示在右上方 | `string` | -                         | -          |

### Columns 配置项（columns 数组元素）

| 属性名        | 说明 | 类型 | 可选值 | 默认值 |
| ------------- | ---- | ---- | ------ | ------ |
| value         | 对应 data 的字段名 | `string` | - | - |
| label         | 标签文本，或 `(DescriptionsColumnItem) => VNode` | `string` / `Function` | - | - |
| span          | 列的数量 | `number` | - | `1` |
| width         | 列宽度（无 border 时含标签与内容） | `string` / `number` | - | - |
| minWidth      | 列最小宽度，剩余宽度按比例分配 | `string` / `number` | - | - |
| align         | 列内容对齐方式 | `string` | `left` / `center` / `right` | `left` |
| labelAlign    | 列标签对齐方式（无 border 时用 align） | `string` | `left` / `center` / `right` | - |
| className     | 列内容自定义类名 | `string` | - | - |
| labelClassName| 列标签自定义类名 | `string` | - | - |
| render        | 自定义渲染内容 `({value, data, column}) => VNode` | `Function` | - | - |
