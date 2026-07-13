# PageLayout 页面布局

该组件是一个页面布局组件，用于快速生成一个页面布局，扩展性强，适合各种场景使用

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoSearch from './demos/DemoSearch.vue'
import DemoSearchWithActions from './demos/DemoSearchWithActions.vue'
import DemoWithTree from './demos/DemoWithTree.vue'
import DemoNestedLayout from './demos/DemoNestedLayout.vue'
</script>

## 基础用法

::: raw
<DemoBasic></DemoBasic>
:::
::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 搜索

::: raw
<DemoSearch></DemoSearch>
:::
::: details 查看代码
<<< ./demos/DemoSearch.vue
:::

## 搜索 + 按钮

::: raw
<DemoSearchWithActions></DemoSearchWithActions>
:::
::: details 查看代码
<<< ./demos/DemoSearchWithActions.vue
:::

## 左侧树

::: raw
<DemoWithTree></DemoWithTree>
:::
::: details 查看代码
<<< ./demos/DemoWithTree.vue
:::

## 布局嵌套布局

::: raw
<DemoNestedLayout></DemoNestedLayout>
:::
::: details 查看代码
<<< ./demos/DemoNestedLayout.vue
:::

## API

### Props

| 属性名      | 说明                     | 类型                             | 默认值   |
| :---------- | :----------------------- | :------------------------------- | :------- |
| size        | 左侧面板宽度/占比        | `SplitterPanelProps['size']`     | `270`    |
| bordered    | 是否显示外边框           | `boolean`                        | `false`  |
| collapse    | 是否可以折叠             | `boolean`                        | `true`   |
| autoCollapse | 是否开启容器宽度自动折叠左侧面板 | `boolean` | `false` |
| collapseBreakpoint | 自动折叠断点（单位 px，需配合 `autoCollapse`、`collapse` 与 `left` 插槽） | `number` | `850` |
| leftStyle   | 左侧区域自定义样式       | `CSSProperties`                  | `{}`     |
| headerStyle | 头部区域自定义样式       | `CSSProperties`                  | `{}`     |
| toolStyle   | 操作栏区域自定义样式     | `CSSProperties`                  | `{}`     |
| bodyStyle   | 内容区域自定义样式       | `CSSProperties`                  | `{}`     |

### Slots

| 名称    | 说明         |
| :------ | :----------- |
| default | 自定义内容   |
| header  | 自定义头部   |
| left    | 自定义左侧   |
| tool    | 自定义操作栏 |

> 提示：只有在插槽 `left` 存在时才会渲染可折叠的左侧区域与折叠按钮。若 `collapse` 设为 `false`，左侧区域固定展示。
