# Dialog 函数对话框

函数对话框，通过 JS 调用打开，支持异步关闭、隐藏底部、拖拽等。

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoAsync from './demos/DemoAsync.vue'
import DemoHideFooter from './demos/DemoHideFooter.vue'
import DemoDrag from './demos/DemoDrag.vue'
import DemoFullscreen from './demos/DemoFullscreen.vue'
import DemoForm from './demos/DemoForm.vue'
import DemoCustomFooter from './demos/DemoCustomFooter.vue'
import DemoBase from './demos/DemoBase.vue'
</script>

## 基础用法

::: raw
<DemoBasic></DemoBasic>
:::
::: details 查看代码
<<< ./demos/DemoBasic.vue
:::

## 异步关闭

::: raw
<DemoAsync></DemoAsync>
:::
::: details 查看代码
<<< ./demos/DemoAsync.vue
:::

## 隐藏底部

::: raw
<DemoHideFooter></DemoHideFooter>
:::
::: details 查看代码
<<< ./demos/DemoHideFooter.vue
:::

## 全屏

::: raw
<DemoFullscreen></DemoFullscreen>
:::
::: details 查看代码
<<< ./demos/DemoFullscreen.vue
:::

## 拖拽

::: raw
<DemoDrag></DemoDrag>
:::
::: details 查看代码
<<< ./demos/DemoDrag.vue
:::

## 表单对话框

::: raw
<DemoForm></DemoForm>
:::
::: details 查看代码
<<< ./demos/DemoForm.vue
:::

## 自定义底部

::: raw
<DemoCustomFooter></DemoCustomFooter>
:::
::: details 查看代码
<<< ./demos/DemoCustomFooter.vue
:::

## 基础对话框

::: raw
<DemoBase></DemoBase>
:::
::: details 查看代码
<<< ./demos/DemoBase.vue
:::

## 继承主应用的上下文

如果要继承主应用的上下文：

```js
// main.ts
import { Dialog } from 'gi-component'

const app = createApp(App)
Dialog._context = app._context
```
