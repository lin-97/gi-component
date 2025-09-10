# Card 卡片

<script setup>
import Demo from './Demo.vue'
import DemoInnerClass from './DemoInnerClass.vue'
import DemoSize from './DemoSize.vue'
import DemoFooter from './DemoFooter.vue'
import DemoScroll from './DemoScroll.vue'
import DemoInner from './DemoInner.vue'
</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 内置类名

内置类名提供了卡片标题伪元素样式

<DemoInnerClass></DemoInnerClass>

::: details 查看代码
<<< ./DemoInnerClass.vue
:::

## 底部插槽

<DemoFooter></DemoFooter>

::: details 查看代码
<<< ./DemoFooter.vue
:::

## 迷你卡片

<DemoSize></DemoSize>

::: details 查看代码
<<< ./DemoSize.vue
:::

## 内容滚动

<DemoScroll></DemoScroll>

::: details 查看代码
<<< ./DemoScroll.vue
:::

## 内嵌模式

<DemoInner></DemoInner>

::: details 查看代码
<<< ./DemoInner.vue
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
