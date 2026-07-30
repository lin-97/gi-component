# Iconify 使用

基于 [@iconify/vue](https://iconify.design/docs/icon-components/vue/) 使用图标，并支持注册项目自定义图标集。

::: warning 提示
仅供参考，根据业务自行封装
:::

<script setup>
import Demo from './Demo.vue'
</script>

## 安装

```bash
pnpm add @iconify/vue
```

## 注册自定义图标

在应用入口（如 `main.ts`）中注册自定义图标集：

```ts
import { addCollection } from '@iconify/vue'
import { CUSTOM_ICONS } from '@/icons/custom'

addCollection(CUSTOM_ICONS)
```

注册后即可通过 `custom:图标名` 使用，例如 `custom:sun-fill`。

## 基础用法

```vue
<template>
  <Icon icon="custom:sun-fill" width="24" height="24" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>
```

## 自定义图标预览

::: raw
<Demo></Demo>
:::

<<< ./Demo.vue

::: details 查看自定义图标源码
<<< ../../icons/custom.ts
:::
