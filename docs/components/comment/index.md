# Comment 评论

用于展示评论信息，支持嵌套回复。

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoContent from './demos/DemoContent.vue'
import DemoNested from './demos/DemoNested.vue'
</script>

## 基础用法

<DemoBasic></DemoBasic>

::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 嵌套评论

<DemoNested></DemoNested>

::: details 查看代码
<<< ./demos/DemoNested.vue
:::

## 自定义内容

通过 `content` 插槽自定义评论区域，例如评论输入框。

<DemoContent></DemoContent>

::: details 查看代码
<<< ./demos/DemoContent.vue
:::

## API

### Props

| 参数     | 说明     | 类型     | 默认值 |
| :------- | :------- | :------- | :----- |
| author   | 作者名   | `string` | -      |
| avatar   | 头像     | `string` | -      |
| content  | 评论内容 | `string` | -      |
| datetime | 时间描述 | `string` | -      |

### Slots

| 名称     | 说明               |
| :------- | :----------------- |
| avatar   | 头像               |
| author   | 作者               |
| datetime | 时间描述           |
| content  | 评论内容           |
| actions  | 操作列表           |
| default  | 嵌套子评论         |
