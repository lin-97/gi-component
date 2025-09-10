# Button 按钮

<script setup>
import Demo from './Demo.vue'
import DemoSize from './DemoSize.vue'
</script>

## 基础用法

<Demo></Demo>

::: details 查看代码
<<< ./Demo.vue
:::

## 按钮尺寸

<DemoSize></DemoSize>

::: details 查看代码
<<< ./DemoSize.vue
:::

## API

| 参数 | 说明 | 类型                                                                                               | 默认值 |
| :--- | :--- | :------------------------------------------------------------------------------------------------- | :----- |
| type | 类型 | `add \| edit \| delete \| search \| reset \| upload \| download \| print \| ElButtonProps['type']` | -      |

::: tip
继承 `el-button` 的所有属性
:::
