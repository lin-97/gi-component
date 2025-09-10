# Grid 栅格

<script setup>
import Demo from './Demo.vue'
</script>

## 基础用法

<Demo></Demo>
::: details 查看代码
<<<./Demo.vue
:::

## API

### Grid Props

| 参数           | 说明             | 类型                        | 默认值 |
| -------------- | ---------------- | --------------------------- | ------ |
| cols           | 每一行展示的列数 | `number \| ResponsiveValue` | 24     |
| row-gap        | 行与行之间的间距 | `number \| ResponsiveValue` | 0      |
| col-gap        | 列与列之间的间距 | `number \| ResponsiveValue` | 0      |
| collapsed      | 是否折叠         | `boolean`                   | false  |
| collapsed-rows | 折叠时显示的行数 | `number`                    | 1      |

### GridItem Props

| 参数   | 说明           | 类型                        | 默认值 |
| ------ | -------------- | --------------------------- | ------ |
| span   | 跨越的格数     | `number \| ResponsiveValue` | 1      |
| offset | 左侧的间隔格数 | `number \| ResponsiveValue` | 0      |
| suffix | 是否是后缀元素 | `boolean`                   | false  |

### ResponsiveValue

| 参数名 | 描述                 | 类型     | 默认值 |
| ------ | -------------------- | -------- | ------ |
| xxl    | \>=1600px 响应式配置 | `number` | -      |
| xl     | \>=1200px 响应式配置 | `number` | -      |
| lg     | \>=992px 响应式配置  | `number` | -      |
| md     | \>=768px 响应式配置  | `number` | -      |
| sm     | \>=576px 响应式配置  | `number` | -      |
| xs     | <576px 响应式配置    | `number` | -      |
