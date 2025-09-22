# 快速开始

本指南将帮助您快速上手 gi-component 组件库。

## 安装

```bash
# 使用 npm
npm install gi-component --save

# 使用 yarn
# yarn add gi-component

# 使用 pnpm
# pnpm install gi-component
```

## 环境要求

在使用 gi-component 之前，请确保您的项目满足以下要求：

- Vue.js 3.x
- Element Plus 2.x
- TypeScript 4.5+（可选，但推荐）

## 引入方式

### 全局引入

全局引入是最简单的使用方式，适合在整个项目中频繁使用组件的场景。

```js
import GiComponent, { Dialog } from 'gi-component'
import { createApp } from 'vue'

import App from './App.vue'
// 引入样式
import 'element-plus/dist/index.css'
import 'gi-component/dist/gi.css'

const app = createApp(App)
Dialog._context = app._context // 继承主应用的上下文

// 注册组件库
app.use(GiComponent)

app.mount('#app')
```

## TypeScript 支持

gi-component 完全支持 TypeScript，您可以在项目中享受类型提示。如果您的项目使用 TypeScript，建议在 `tsconfig.json` 中添加以下配置：

```json
{
  "compilerOptions": {
    "types": ["element-plus/global", "gi-component/packages/components.d.ts"]
  }
}
```

## 内置CSS变量

```css
body {
  --margin: 14px; // 基础外边距
  --padding: 14px; // 基础内边距
  --padding-x: 14px;
  --padding-x-small: 10px;
  --padding-y: 12px;
  --padding-y-small: 8px;
}
```

## 全局配置

```ts
// src/main.ts
import { getDictData } from '@/apis'

app.use(GiComponent, {
  clearable?: false, // 输入框是否可清除
  dictRequest: (code: string) => getDictData(code) // 字典请求方法，还可以做一些持久化的处理，以及数据过滤
})
```

```ts
// 模拟接口返回数据
export const getDictData = (
  code: string
): Promise<{ label: string, value: string }[]> => {
  const dictData: Record<string, { label: string, value: string }[]> = {
    SEX: [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ],
    STATUS: [
      { label: '正常', value: '1' },
      { label: '禁用', value: '2' }
    ],
    CITY: [
      { label: '北京', value: '1' },
      { label: '上海', value: '2' },
      { label: '广州', value: '3' },
      { label: '深圳', value: '4' },
      { label: '成都', value: '5' }
    ]
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('获取的字典请求', code, dictData[code])
      resolve(dictData[code])
    }, 500)
  })
}
```
