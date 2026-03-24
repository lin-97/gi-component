# Tag 标签

<script setup>
import Demo from './Demo.vue'
import DemoSize from './DemoSize.vue'
import DemoColors from './DemoColors.vue'
import DemoCustomColor from './DemoCustomColor.vue'
import DemoIcon from './DemoIcon.vue'
</script>

## 基本使用

<Demo />

::: details 查看代码
<<< ./Demo.vue
:::

## 不同尺寸

<DemoSize />

::: details 查看代码
<<< ./DemoSize.vue
:::

## 基础颜色

<DemoColors />

::: details 查看代码
<<< ./DemoColors.vue
:::

## 自定义颜色

<DemoCustomColor />

::: details 查看代码
<<< ./DemoCustomColor.vue
:::

## 图标（属性 / 插槽）

<DemoIcon />

::: details 查看代码
<<< ./DemoIcon.vue
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `light` \| `dark` \| `outline` \| `light-outline` | `light` |
| color | 颜色：主题色（与 Element 一致）或调色板预设名或任意 CSS 颜色字符串 | `primary` \| `success` \| `warning` \| `danger` \| `info` \| 调色板名 \| `string` | `primary` |
| size | 尺寸 | `small` \| `default` \| `large` | `default` |
| icon | 左侧图标组件（如 Element Plus Icons）；与 `#icon` 插槽并存时以插槽为准 | `Component` | — |
| round | 是否为胶囊圆角（大圆角） | `boolean` | `false` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击标签时触发 | — |
| close | 点击关闭按钮时触发 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |
| icon | 标签左侧图标（有内容时才渲染占位） |
