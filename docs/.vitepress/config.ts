import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'vitepress'

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
      { text: '工具', link: '/tools/createSelectDialog' },
      { text: '捐赠', link: '/donate' },
      { text: `v${packageJson.version}`, link: '' }
    ],
    sidebar: {
      '/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '更新日志', link: '/guide/changelog' },
            { text: '内置CSS', link: '/style' }
          ]
        },
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button/' },
            { text: 'Card 卡片', link: '/components/card/' },
            { text: 'Grid 栅格', link: '/components/grid/' },
            { text: 'InputGroup 输入框组', link: '/components/input-group/' },
            { text: 'InputSearch 搜索输入框', link: '/components/input-search/' },
            { text: 'Tabs 标签页', link: '/components/tabs/' },
            { text: 'PageLayout 页面布局', link: '/components/page-layout/' },
            { text: 'Dot 点', link: '/components/dot/' }
          ]
        },
        {
          text: '高阶组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog/' },
            { text: 'Dialog 函数对话框', link: '/components/dialog2/' },
            { text: 'Drawer 抽屉', link: '/components/drawer/' },
            { text: 'Drawer 函数抽屉', link: '/components/drawer2/' },
            { text: 'Form 表单', link: '/components/form/' },
            { text: 'Table 表格', link: '/components/table/' },
            { text: 'EditTable 可编辑表格', link: '/components/edit-table/' },
            { text: 'TreeTransfer 树穿梭框(实验)', link: '/components/tree-transfer/' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具',
          items: [
            { text: 'createSelectDialog(内置)', link: '/tools/createSelectDialog' },
            { text: 'useTable', link: '/tools/useTable' },
            { text: 'createBaseAPI', link: '/tools/createBaseAPI' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lin-97/gi-component' }
    ]
  }
})
