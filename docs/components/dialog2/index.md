# Dialog 函数对话框

<script setup>
import Demo from './Demo.vue'
import DemoAsync from './DemoAsync.vue'
import DemoHideFooter from './DemoHideFooter.vue'
import DemoDrag from './DemoDrag.vue'
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

## 拖拽

<DemoDrag></DemoDrag>
::: details 查看代码
<<< ./DemoDrag.vue
:::

如果要继承主应用的上下文

```js
// main.ts
import { Dialog } from 'gi-component';

const app = createApp(App);
Dialog._context = app._context;
```
