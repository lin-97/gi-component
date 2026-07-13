# Drawer 函数抽屉

函数抽屉，通过 JS 调用打开，支持异步关闭等。

<script setup>
import DemoBasic from './demos/DemoBasic.vue'
import DemoAsync from './demos/DemoAsync.vue'
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

## 继承主应用的上下文

如果要继承主应用的上下文：

```js
// main.ts
import { Drawer } from 'gi-component'

const app = createApp(App)
Drawer._context = app._context
```
