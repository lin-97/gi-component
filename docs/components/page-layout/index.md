# PageLayout 页面布局

该组件是一个页面布局组件，用于快速生成一个页面布局，扩展性强，适合各种场景使用

<script setup>
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'
import Demo3 from './demo3.vue'
import Demo4 from './demo4.vue'
import Demo5 from './demo5.vue'
</script>

## 基础用法

<Demo1></Demo1>
::: details 查看代码
<<<./demo1.vue
:::

## 搜索

<Demo2></Demo2>
::: details 查看代码
<<<./demo2.vue
:::

## 搜索 + 按钮

<Demo3></Demo3>
::: details 查看代码
<<<./demo3.vue
:::

## 左侧树

<Demo4></Demo4>
::: details 查看代码
<<<./demo4.vue
:::

## 布局嵌套布局

<Demo5></Demo5>
::: details 查看代码
<<<./demo5.vue
:::

## API

### Slots

| 名称    | 说明         |
| :------ | :----------- |
| default | 自定义内容   |
| header  | 自定义头部   |
| left    | 自定义左侧   |
| tool    | 自定义操作栏 |
