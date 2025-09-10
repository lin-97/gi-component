# Tabs 标签页

<script setup>
import Demo from './Demo.vue'
import DemoCard from './DemoCard.vue'
import DemoSlotExtra from './DemoSlotExtra.vue'
import DemoSize from './DemoSize.vue'
</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 卡片类型

<DemoCard></DemoCard>

::: details 查看代码
<<< ./DemoCard.vue
:::

## 使用插槽

<DemoSlotExtra></DemoSlotExtra>

::: details 查看代码
<<< ./DemoSlotExtra.vue
:::

## 小型尺寸

<DemoSize></DemoSize>

::: details 查看代码
<<< ./DemoSize.vue
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

::: tip
继承 `el-tabs` 的所有属性
:::
