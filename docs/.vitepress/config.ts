import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

const require = createRequire(import.meta.url)
const packageJson = require('../../package.json') as { version: string }

export default defineConfig({
  title: 'gi-component',
  description: 'Vue3中基于Element Plus二次封装基础组件库',
  base: '/gi-component/',
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/gi-component/favicon.ico' }]
  ],
  rewrites: {
    'components/dialog2/index.md': 'components/dialog-function/index.md',
    'components/drawer2/index.md': 'components/drawer-function/index.md',
    'components/dialog-imperative/index.md': 'components/dialog-function/index.md',
    'components/drawer-imperative/index.md': 'components/drawer-function/index.md',
    'style/index.md': 'guide/style.md',
    'tools/createSelectDialog/index.md': 'tools/create-select-dialog/index.md',
    'tools/useTable/index.md': 'tools/use-table/index.md',
    'tools/createBaseAPI/index.md': 'tools/create-base-api/index.md'
  },
  vite: {
    resolve: {
      alias: {
        'gi-component': path.resolve(__dirname, '../../packages/index.ts'),
        '@docs': path.resolve(__dirname, '../../docs')
      }
    }
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '组件', link: '/components/button/' },
      { text: '工具', link: '/tools/create-select-dialog' },
      { text: '捐赠', link: '/donate' },
      { text: `v${packageJson.version}`, link: '' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lin-97/gi-component' }
    ]
  }
})
