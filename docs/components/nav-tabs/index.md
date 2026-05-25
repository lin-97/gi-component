# NavTabs 导航页签

主要用于后台管理系统页签栏，由于el-tabs功能不足

<script setup>
import DemoNavTabs from './DemoNavTabs.vue'
import DemoNavTabsSlot from './DemoNavTabsSlot.vue'
import DemoNavTabsSlot2 from './DemoNavTabsSlot2.vue'
import DemoUseNavTabs from './DemoUseNavTabs.vue'
</script>

### 基础用法

<DemoNavTabs />

::: details 查看代码
<<< ./DemoNavTabs.vue
:::

### 自定义默认插槽

<DemoNavTabsSlot />

::: details 查看代码
<<< ./DemoNavTabsSlot.vue
:::

### 自定义默认插槽2（右键菜单）

<DemoNavTabsSlot2 />

::: details 查看代码
<<< ./DemoNavTabsSlot2.vue
:::

### Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| v-model | 当前选中值 | `string \| number` | - |
| data | 标签数据 | `NavTabItem[]` | `[]` |
| custom | 自定义项样式：无 padding，不应用 `--active` / `--disabled` 修饰类 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| change | 选中项变化（点击可切换的项时） | `(value: string \| number)` |

### Slots

| 插槽名 | 说明 | 作用域 |
| :-- | :-- | :-- |
| default | 每一项的内容（外层 tab 容器由组件渲染） | `{ item: NavTabItem, active: boolean, disabled: boolean }` |
| left-extra | 左侧扩展区 | - |
| right-extra | 右侧扩展区 | - |

---

## useNavTabs 组合函数

`useNavTabs` 是一个用于水平标签导航的组合函数，提供鼠标滚轮横向滚动与选中项自动居中能力。适用于完全自定义标签头 DOM 结构。

源码位于 `packages/hooks/useNavTabs.ts`。

## 组合函数基础用法

在自定义标签头模板中调用 `useNavTabs`，传入根容器、滚动容器、标签项 class 以及当前选中值即可。

<DemoUseNavTabs></DemoUseNavTabs>

::: details 查看代码
<<< ./DemoUseNavTabs.vue
:::

## 为什么用组合函数而不是构造函数

| 维度 | 组合函数 | 构造函数 |
| :-- | :-- | :-- |
| 生命周期 | 自动在 `onMounted` / `onUnmounted` 绑定与清理事件 | 需手动 `init()` / `destroy()` |
| 响应式 | 可 `watch(activeValue)` 自动居中 | 需额外回调或轮询 DOM |
| 使用方式 | 在 `<script setup>` 中与 `ref` 配合 | 更适合纯 JS 环境 |

## API

### Options

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| tabEl | 根容器，支持选择器或 HTMLElement | `string \| HTMLElement \| null` | - |
| tabScrollEl | 滚动容器，支持类名（如 `tab__scroll`）或选择器 | `string \| HTMLElement \| null` | - |
| tabItemClassName | 标签项 class 名 | `string` | - |
| activeValue | 当前选中值，变化时自动居中 | `string \| number` | - |
| wheelSpeed | 滚轮换算系数 | `number` | `1.5` |

::: tip
`tabScrollEl` 传入 `tab__scroll` 时会自动补全为 `.tab__scroll`；`tabScrollEl` 会优先在 `tabEl` 内部查找，避免多实例误匹配。
:::

### 返回值

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| scrollToActive | 手动滚动到当前选中项并居中 | `(behavior?: ScrollBehavior) => void` |
| getScrollEl | 获取解析后的滚动容器 | `() => HTMLElement \| null` |

### 引入

```ts
import { useNavTabs } from 'gi-component'
```
