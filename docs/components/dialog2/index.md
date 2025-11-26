# Dialog 函数对话框

函数对话框，通过js 调用打开，支持异步关闭，隐藏底部，拖拽等

<script setup>
import Demo from './Demo.vue'
import DemoAsync from './DemoAsync.vue'
import DemoHideFooter from './DemoHideFooter.vue'
import DemoDrag from './DemoDrag.vue'
import DemoFullscreen from './DemoFullscreen.vue'
import DemoForm from './DemoForm.vue'
import DemoCustomFooter from './DemoCustomFooter.vue'
import DemoBase from './DemoBase.vue'
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

## 隐藏底部

<DemoHideFooter></DemoHideFooter>
::: details 查看代码
<<< ./DemoHideFooter.vue
:::

## 全屏
<DemoFullscreen></DemoFullscreen>
::: details 查看代码
<<< ./DemoFullscreen.vue
:::

## 拖拽

<DemoDrag></DemoDrag>
::: details 查看代码
<<< ./DemoDrag.vue
:::

## 表单对话框

<DemoForm></DemoForm>
::: details 查看代码
<<< ./DemoForm.vue
:::

## 自定义底部

<DemoCustomFooter></DemoCustomFooter>
::: details 查看代码
<<< ./DemoCustomFooter.vue
:::

## 基础对话框

<DemoBase></DemoBase>
::: details 查看代码
<<< ./DemoBase.vue
:::

## 继承主应用的上下文

如果要继承主应用的上下文

```js
// main.ts
import { Dialog } from 'gi-component'

const app = createApp(App)
Dialog._context = app._context
```
