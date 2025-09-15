import { defineConfig } from 'vitepress'
import path from 'node:path'
import packageJson from '../../package.json'

export default defineConfig({
  title: 'gi-component',
  description: 'Vue3中基于Element Plus二次封装基础组件库',
  base: '/gi-component/',
  vite: {
    resolve: {
      alias: {
        'gi-component': path.resolve(__dirname, '../../packages/index.ts'),
        '@': path.resolve(__dirname, '../../docs')
      }
    },
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: '工具', link: '/tools/createSelectDialog' },
      { text: '内置CSS类名', link: '/style' },
      { text: `v${packageJson.version}`, link: '' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '更新日志', link: '/guide/changelog' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'InputGroup 输入组', link: '/components/input-group' },
            { text: 'InputSearch 搜索输入', link: '/components/input-search' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'PageLayout 页面布局', link: '/components/page-layout' }
          ]
        },
        {
          text: '高阶组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Dialog 函数对话框', link: '/components/dialog2' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Table 表格', link: '/components/table' },
            { text: 'EditTable 可编辑表格', link: '/components/edit-table' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具',
          items: [
            { text: 'useTable', link: '/tools/useTable' },
            { text: 'createSelectDialog', link: '/tools/createSelectDialog' },
            { text: 'createBaseAPI', link: '/tools/createBaseAPI' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lin-97/gi-component' }
    ]
  }
})
