# Tabs 标签页

该组件主要是为了弥补`el-tabs`不支持右侧插槽的问题

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoCard from './demos/DemoCard.vue'
import DemoSlotExtra from './demos/DemoSlotExtra.vue'
import DemoSize from './demos/DemoSize.vue'
</script>

## 基础用法

<DemoBasic></DemoBasic>

::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 卡片类型

<DemoCard></DemoCard>

::: details 查看代码
<<< ./demos/DemoCard.vue
:::

## 使用插槽

<DemoSlotExtra></DemoSlotExtra>

::: details 查看代码
<<< ./demos/DemoSlotExtra.vue
:::

## 小型尺寸

<DemoSize></DemoSize>

::: details 查看代码
<<< ./demos/DemoSize.vue
:::

## API

### Props

| 参数    | 说明                     | 类型                | 默认值   |
| :------ | :----------------------- | :------------------ | :------- |
| size    | 尺寸                     | `small` \| `medium` | `medium` |
| options | 选项列表                 | `OptionItem[]`      | -        |
| inner   | 内嵌模式，消除左右内边距 | `boolean`           | `false`  |

### Slots

| 名称    | 说明             |
| :------ | :--------------- |
| default | 自定义内容       |
| label   | 参数: \{ data \} |
| extra | 额外插槽 |

::: tip
继承 `el-tabs` 的所有属性
:::
