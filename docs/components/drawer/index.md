# Drawer 抽屉

基于`el-drawer`封装的组件，灵活性更高

<script setup>
import Demo from './Demo.vue'
import DemoAsync from './DemoAsync.vue'
</script>

## 基础用法

<Demo></Demo>
::: details 查看代码
<<< ./Demo.vue
:::

## 异步关闭

<DemoAsync></DemoAsync>
::: details 查看代码
<<< ./DemoAsync.vue
:::

## API

### Props

| 参数              | 说明            | 类型    | 默认值 |
| ----------------- | --------------- | ------- | ------ |
| okText            | 确认按钮文本    | string  | 确定   |
| cancelText        | 取消按钮文本    | string  | 取消   |
| okButtonProps     | 确认按钮的props | -       | -      |
| cancelButtonProps | 取消按钮的props | boolean | -      |
| content           | 内容            | string  | -      |
| footer            | 显示尾部        | boolean | true   |

### Events

| 事件名   | 说明                     | 参数 |
| -------- | ------------------------ | ---- |
| ok       | 点击确认按钮时触发       | -    |
| cancel   | 点击取消按钮时触发       | -    |
| beforeOk | 触发 ok 事件前的回调函数 | -    |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
| footer  | 自定义底部 |

::: tip
继承 `el-drawer` 的所有属性
:::
