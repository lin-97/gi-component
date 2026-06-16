import type { DefaultTheme } from 'vitepress'

export const guideSidebar: DefaultTheme.SidebarItem[] = [
  { text: '介绍', link: '/guide/introduction' },
  { text: '快速开始', link: '/guide/quick-start' },
  { text: '更新日志', link: '/guide/changelog' },
  { text: '内置CSS', link: '/guide/style' }
]

export const basicComponentsSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Button 按钮', link: '/components/button/' },
  { text: 'Card 卡片', link: '/components/card/' },
  { text: 'Descriptions 描述列表', link: '/components/descriptions/' },
  { text: 'Flex 弹性布局', link: '/components/flex/' },
  { text: 'Grid 栅格', link: '/components/grid/' },
  { text: 'InputGroup 输入框组', link: '/components/input-group/' },
  { text: 'InputSearch 搜索输入框', link: '/components/input-search/' },
  { text: 'Tabs 标签页', link: '/components/tabs/' },
  { text: 'NavTabs 导航页签', link: '/components/nav-tabs/' },
  { text: 'Tag 标签', link: '/components/tag/' },
  { text: 'PageLayout 页面布局', link: '/components/page-layout/' },
  { text: 'Dot 点', link: '/components/dot/' }
]

export const advancedComponentsSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Dialog 对话框', link: '/components/dialog/' },
  { text: 'Drawer 抽屉', link: '/components/drawer/' },
  { text: 'Form 表单', link: '/components/form/' },
  { text: 'Table 表格', link: '/components/table/' },
  { text: 'EditTable 可编辑表格', link: '/components/edit-table/' },
  { text: 'TreeTransfer 树穿梭框(实验)', link: '/components/tree-transfer/' }
]

export const toolsSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'createSelectDialog(内置)', link: '/tools/create-select-dialog' },
  { text: 'useTable（仅参考）', link: '/tools/use-table' },
  { text: 'createBaseAPI（仅参考）', link: '/tools/create-base-api' }
]

export const sidebar: DefaultTheme.Sidebar = {
  '/': [
    { text: '指南', items: guideSidebar },
    { text: '基础组件', items: basicComponentsSidebar },
    { text: '高阶组件', items: advancedComponentsSidebar }
  ],
  '/tools/': [
    { text: '工具', items: toolsSidebar }
  ]
}
