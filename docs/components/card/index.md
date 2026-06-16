# Card 卡片

该组件提供了比`el-card`更加易用，便捷的功能

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoInnerClass from './demos/DemoInnerClass.vue'
import DemoSize from './demos/DemoSize.vue'
import DemoFooter from './demos/DemoFooter.vue'
import DemoScroll from './demos/DemoScroll.vue'
import DemoInner from './demos/DemoInner.vue'
</script>

## 基础用法

<DemoBasic></DemoBasic>

::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 内置类名

内置类名提供了卡片标题伪元素样式

<DemoInnerClass></DemoInnerClass>

::: details 查看代码
<<< ./demos/DemoInnerClass.vue
:::

## 底部插槽

<DemoFooter></DemoFooter>

::: details 查看代码
<<< ./demos/DemoFooter.vue
:::

## 迷你卡片

<DemoSize></DemoSize>

::: details 查看代码
<<< ./demos/DemoSize.vue
:::

## 内容滚动

<DemoScroll></DemoScroll>

::: details 查看代码
<<< ./demos/DemoScroll.vue
:::

## 内嵌模式

<DemoInner></DemoInner>

::: details 查看代码
<<< ./demos/DemoInner.vue
:::

## API

### Props

| 参数        | 说明                     | 类型                | 默认值 |
| :---------- | :----------------------- | :------------------ | :----- |
| title       | 标题                     | `string`            | -      |
| extra       | 卡片右上角的操作区域     | `string`            | -      |
| bordered    | 是否有边框               | `boolean`           | false  |
| size        | 尺寸                     | `samll` \| `middle` | middle |
| headerStyle | 卡片头部区域的样式       | `CSSProperties`     | -      |
| bodyStyle   | 卡片内容区域的样式       | `CSSProperties`     | -      |
| inner       | 内嵌模式，消除左右内边距 | `boolean`           | false  |

### Slots

| 名称    | 说明                 |
| :------ | :------------------- |
| default | 卡片内容             |
| extra   | 卡片右上角的操作区域 |
