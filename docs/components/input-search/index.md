# InputSearch 搜索输入框

<script setup>
import Demo from './Demo.vue'
import DemoDisabled from './DemoDisabled.vue'
import DemoReadonly from './DemoReadonly.vue'

</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 禁用状态

<DemoDisabled></DemoDisabled>

::: details 查看代码
<<< ./DemoDisabled.vue
:::

## 只读状态

<DemoReadonly></DemoReadonly>

::: details 查看代码
<<< ./DemoReadonly.vue
:::

## API

### 属性

| 参数                  | 类型      | 默认值     | 说明               |
| --------------------- | --------- | ---------- | ------------------ |
| model-value / v-model | `string`  | `''`       | 绑定值             |
| disabled              | `boolean` | `false`    | 是否禁用           |
| readonly              | `boolean` | `false`    | 是否只读           |
| placeholder           | `string`  | `'请选择'` | 占位文本           |
| disabled-hide-button  | `boolean` | `false`    | 禁用时是否隐藏按钮 |

### 事件

| 事件名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| search | 点击搜索按钮时触发 | -    |
| clear  | 点击清除按钮时触发 | -    |
