# Drawer 函数抽屉

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

如果要继承主应用的上下文

```js
// main.ts
import { Drawer } from 'gi-component'

const app = createApp(App)
Drawer._context = app._context
```
