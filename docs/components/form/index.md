# Form 配置表单

该组件是基于`el-form`封装的组件，提供配置表单功能

<script setup>
import Demo from './Demo.vue'
import DemoSearch from './DemoSearch.vue'
import DemoDict from './DemoDict.vue'
</script>

## 基础用法

<Demo></Demo>
::: details 查看代码
<<<./Demo.vue
:::

## 搜索表单

<DemoSearch></DemoSearch>
::: details 查看代码
<<<./DemoSearch.vue
:::

## 结合字典

<DemoDict></DemoDict>
::: details 查看代码
<<<./DemoDict.vue
:::

## API 说明

### Props

| 参数                 | 类型               | 说明             | 默认值                                 |
| -------------------- | ------------------ | ---------------- | -------------------------------------- |
| modelValue / v-model | `any`              | 表单数据对象     | -                                      |
| columns              | `FormColumnItem[]` | 表单项配置数组   | `[]`                                   |
| gridProps            | `any`              | 网格配置         | -                                      |
| gridItemProps        | `any`              | 网格项默认配置   | `{ span: { xs: 24, sm: 24, md: 12 } }` |
| search               | `boolean`          | 是否为搜索表单   | `false`                                |
| searchText           | `string`           | 搜索按钮文本     | `'查询'`                               |
| hideFoldBtn          | `boolean`          | 是否隐藏折叠按钮 | `false`                                |
| defaultCollapsed     | `boolean`          | 默认是否折叠     | -                                      |

::: tip
继承 `el-form` 的所有属性
:::

### Events

| 事件名            | 说明             | 参数         |
| ----------------- | ---------------- | ------------ |
| update:modelValue | 表单数据更新事件 | `value: any` |
| search            | 搜索事件         | -            |
| reset             | 重置事件         | -            |

### ColumnItem 配置

`FormColumnItem` 是表单项的配置接口，支持以下属性：

| 属性          | 类型                                  | 说明                                   |
| ------------- | ------------------------------------- | -------------------------------------- |
| type          | `ColumnType`                          | 表单项类型                             |
| label         | `string`                              | 标签文本                               |
| labelRender   | `() => VNode`                         | 标签渲染函数                           |
| field         | `string`                              | 字段名，用于绑定表单数据               |
| fieldName     | `string`                              | 字段名称                               |
| span          | `number`                              | 占用列数                               |
| props         | `ColumnProps`                         | 组件属性，根据不同的 type 有不同的配置 |
| formItemProps | `FormItemProps`                       | ElFormItem 的属性配置                  |
| gridItemProps | `any`                                 | GridItem 的属性配置                    |
| required      | `boolean`                             | 是否必填                               |
| rules         | `FormItemRule[]`                      | 验证规则                               |
| hide          | `boolean \| ((form: any) => boolean)` | 是否隐藏，支持函数动态控制             |
| tip           | `string`                              | 提示信息                               |
| slotName      | `string`                              | 插槽名称                               |
| slots         | `ColumnSlots`                         | 插槽配置                               |
| extra         | `string \| VNode`                     | 右侧额外内容                           |
