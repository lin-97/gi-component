# Dot 点

<script setup>
import Demo from './Demo.vue'
import Demo2 from './Demo2.vue'
import DemoColor from './DemoColor.vue'
</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 动画

<Demo2></Demo2>

::: details 查看代码
<<< ./Demo2.vue
:::

## 自定义颜色

<DemoColor></DemoColor>

::: details 查看代码
<<< ./DemoColor.vue
:::

## API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 点的类型 | `circle\|square` | `circle` |
| size | 尺寸 | number | 6 |
| color | 点的颜色 | `string\|primary\|success\|warning\|error\|info` | -- |
| animation | 是否添加动画 | boolean | `false` |
