# Flex 弹性布局

基于 CSS Flex 的布局组件，用于快速实现弹性盒子布局。

**与 Space 组件的区别**

Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。

Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

<script setup>
import DemoGap from './DemoGap.vue'
import DemoJustifyAlign from './DemoJustifyAlign.vue'
import DemoWrap from './DemoWrap.vue'
</script>

## 主轴与交叉轴对齐

通过 `justify` 和 `align` 分别控制主轴、交叉轴上的对齐方式。

<DemoJustifyAlign></DemoJustifyAlign>

::: details 查看代码
<<< ./DemoJustifyAlign.vue
:::

## 设置间隙

使用 `gap` 设置元素之间的间距, 预设了 `small`、`middle`、`large` 三种尺寸, 也可以自定义间距。

<DemoGap></DemoGap>

::: details 查看代码
<<< ./DemoGap.vue
:::

## 自动换行

设置 `wrap` 为 `true` 后，子元素在空间不足时会自动换行。

<DemoWrap></DemoWrap>

::: details 查看代码
<<< ./DemoWrap.vue
:::

## API

### Flex Props

| 属性     | 说明                                       | 类型                                                                 | 默认值   |
| -------- | ------------------------------------------ | -------------------------------------------------------------------- | -------- |
| column | Flex 主轴的方向是否垂直，使用 `flex-direction: column` | `boolean`                                                            | `false`  |
| wrap     | 设置元素单行显示还是多行显示               | `boolean` \| `nowrap` \| `wrap` \| `wrap-reverse`（`true` 为 wrap，`false` 为 nowrap） | `false` |
| justify  | 设置元素在主轴方向上的对齐方式             | `normal` \| `flex-start` \| `flex-end` \| `center` \| `space-between` \| `space-around` \| `space-evenly` | `normal` |
| align    | 设置元素在交叉轴方向上的对齐方式           | `normal` \| `flex-start` \| `flex-end` \| `center` \| `stretch` \| `baseline` | `normal` |
| flex     | `flex` CSS 简写属性                       | 参考 `flex` CSS 属性                                                | `normal` |
| gap      | 设置网格之间的间隙                         | 预设 `small`(8px)、`middle`(16px)、`large`(24px)，或 `string` \| `number` | -        |
