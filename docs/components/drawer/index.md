# Drawer 抽屉

基于 `el-drawer` 封装的组件与函数式调用 API，灵活性更高。

<script setup>
import ComponentDemoBasic from './demos/component/DemoBasic.vue'
import ComponentDemoAsync from './demos/component/DemoAsync.vue'
import ImperativeDemoBasic from './demos/imperative/DemoBasic.vue'
import ImperativeDemoAsync from './demos/imperative/DemoAsync.vue'
</script>

## 组件用法

### 基础用法

<ComponentDemoBasic></ComponentDemoBasic>
::: details 查看代码
<<< ./demos/component/DemoBasic.vue
:::

### 异步关闭

<ComponentDemoAsync></ComponentDemoAsync>
::: details 查看代码
<<< ./demos/component/DemoAsync.vue
:::

## 函数式用法

### 基础用法

<ImperativeDemoBasic></ImperativeDemoBasic>
::: details 查看代码
<<< ./demos/imperative/DemoBasic.vue
:::

### 异步关闭

<ImperativeDemoAsync></ImperativeDemoAsync>
::: details 查看代码
<<< ./demos/imperative/DemoAsync.vue
:::

### 继承主应用的上下文

如果要继承主应用的上下文：

```js
// main.ts
import { Drawer } from 'gi-component'

const app = createApp(App)
Drawer._context = app._context
```

## API

### Props

| 参数              | 说明            | 类型    | 默认值 |
| ----------------- | --------------- | ------- | ------ |
| okText            | 确认按钮文本    | string  | 确定   |
| cancelText        | 取消按钮文本    | string  | 取消   |
| okButtonProps     | 确认按钮的props | Button.Props       | -      |
| cancelButtonProps | 取消按钮的props | Button.Props | -      |
| content           | 内容            | string  | -      |
| footer            | 显示尾部        | boolean | true   |

### Events

| 事件名   | 说明                     | 类型 |
| -------- | ------------------------ | ---- |
| ok       | 点击确认按钮时触发       | `() => void` |
| cancel   | 点击取消按钮时触发       | `() => void` |
| beforeOk | 触发 ok 事件前的回调函数 | `() => Promise<boolean>` |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
| footer  | 自定义底部 |

::: tip
继承 `el-drawer` 的所有属性
:::
