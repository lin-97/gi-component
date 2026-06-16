# Dialog 对话框

基于 `el-dialog` 封装的组件与函数式调用 API，灵活性更高。

<script setup>
import ComponentDemoBasic from './demos/component/DemoBasic.vue'
import ComponentDemoAsync from './demos/component/DemoAsync.vue'
import ComponentDemoHideFooter from './demos/component/DemoHideFooter.vue'
import ComponentDemoButtonText from './demos/component/DemoButtonText.vue'
import ComponentDemoFullscreen from './demos/component/DemoFullscreen.vue'
import ComponentDemoSimple from './demos/component/DemoSimple.vue'
import ImperativeDemoBasic from './demos/imperative/DemoBasic.vue'
import ImperativeDemoAsync from './demos/imperative/DemoAsync.vue'
import ImperativeDemoHideFooter from './demos/imperative/DemoHideFooter.vue'
import ImperativeDemoDrag from './demos/imperative/DemoDrag.vue'
import ImperativeDemoFullscreen from './demos/imperative/DemoFullscreen.vue'
import ImperativeDemoForm from './demos/imperative/DemoForm.vue'
import ImperativeDemoCustomFooter from './demos/imperative/DemoCustomFooter.vue'
import ImperativeDemoBase from './demos/imperative/DemoBase.vue'
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

### 隐藏底部

<ComponentDemoHideFooter></ComponentDemoHideFooter>
::: details 查看代码
<<< ./demos/component/DemoHideFooter.vue
:::

### 修改按钮

<ComponentDemoButtonText></ComponentDemoButtonText>
::: details 查看代码
<<< ./demos/component/DemoButtonText.vue
:::

### 全屏对话框

<ComponentDemoFullscreen></ComponentDemoFullscreen>
::: details 查看代码
<<< ./demos/component/DemoFullscreen.vue
:::

### 简单对话框

<ComponentDemoSimple></ComponentDemoSimple>
::: details 查看代码
<<< ./demos/component/DemoSimple.vue
:::

## 函数式用法

函数对话框，通过 JS 调用打开，支持异步关闭、隐藏底部、拖拽等。

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

### 隐藏底部

<ImperativeDemoHideFooter></ImperativeDemoHideFooter>
::: details 查看代码
<<< ./demos/imperative/DemoHideFooter.vue
:::

### 全屏

<ImperativeDemoFullscreen></ImperativeDemoFullscreen>
::: details 查看代码
<<< ./demos/imperative/DemoFullscreen.vue
:::

### 拖拽

<ImperativeDemoDrag></ImperativeDemoDrag>
::: details 查看代码
<<< ./demos/imperative/DemoDrag.vue
:::

### 表单对话框

<ImperativeDemoForm></ImperativeDemoForm>
::: details 查看代码
<<< ./demos/imperative/DemoForm.vue
:::

### 自定义底部

<ImperativeDemoCustomFooter></ImperativeDemoCustomFooter>
::: details 查看代码
<<< ./demos/imperative/DemoCustomFooter.vue
:::

### 基础对话框

<ImperativeDemoBase></ImperativeDemoBase>
::: details 查看代码
<<< ./demos/imperative/DemoBase.vue
:::

### 继承主应用的上下文

如果要继承主应用的上下文：

```js
// main.ts
import { Dialog } from 'gi-component'

const app = createApp(App)
Dialog._context = app._context
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
| simple            | 简单模式        | boolean | false  |

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
继承 `el-dialog` 的所有属性
:::
