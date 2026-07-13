# Dot 点

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoAnimation from './demos/DemoAnimation.vue'
import DemoColor from './demos/DemoColor.vue'
</script>

## 基础用法

::: raw
<DemoBasic></DemoBasic>
:::

::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 动画

::: raw
<DemoAnimation></DemoAnimation>
:::

::: details 查看代码
<<< ./demos/DemoAnimation.vue
:::

## 自定义颜色

::: raw
<DemoColor></DemoColor>
:::

::: details 查看代码
<<< ./demos/DemoColor.vue
:::

## API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 点的类型 | `circle\|square` | `circle` |
| size | 尺寸 | number | 6 |
| color | 点的颜色 | `string\|primary\|success\|warning\|error\|info` | -- |
| animation | 是否添加动画 | boolean | `false` |
