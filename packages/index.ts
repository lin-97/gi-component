import type { App } from 'vue'

import Button from './components/button'
import Card from './components/card'
import Dialog from './components/dialog'
import Drawer from './components/drawer'
import EditTable from './components/edit-table'
import Form from './components/form'
import GridItem from './components/grid/src/grid-item.vue'
import Grid from './components/grid/src/grid.vue'
import InputGroup from './components/input-group'
import InputSearch from './components/input-search'
import PageLayout from './components/page-layout'
import Table from './components/table'
import Tabs from './components/tabs'
import TreeTransfer from './components/tree-transfer'
import './styles/index.scss'

export * from './components/dialog'
export * from './components/drawer'
export * from './components/edit-table'
export * from './components/form'
export * from './components/table'
export * from './components/tabs'
export * from './hooks'
export * from './utils'

const components = {
  Button,
  Card,
  Drawer,
  Tabs,
  InputGroup,
  InputSearch,
  Grid,
  GridItem,
  Form,
  PageLayout,
  Dialog,
  EditTable,
  Table,
  TreeTransfer
}

// 导出Gi前缀的组件并添加明确类型注解
export const GiButton: typeof Button = Button
export const GiCard: typeof Card = Card
export const GiDrawer: typeof Drawer = Drawer
export const GiTabs: typeof Tabs = Tabs
export const GiInputGroup: typeof InputGroup = InputGroup
export const GiInputSearch: typeof InputSearch = InputSearch
export const GiGrid: typeof Grid = Grid
export const GiGridItem: typeof GridItem = GridItem
export const GiForm: typeof Form = Form
export const GiPageLayout: typeof PageLayout = PageLayout
export const GiDialog: typeof Dialog = Dialog
export const GiEditTable: typeof EditTable = EditTable
export const GiTable: typeof Table = Table
export const GiTreeTransfer: typeof TreeTransfer = TreeTransfer

function capitalizeWord(word: string) {
  // 检查输入是否为字符串且不为空
  if (typeof word !== 'string' || word.length === 0) {
    return word
  }
  // 首字母大写，其余字母小写
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

// 全局默认配置
export interface Config {
  prefix?: string // 组件前缀
  /** 输入框是否可清除 */
  clearable?: boolean
  /** 字典请求方法 */
  dictRequest?: () => Promise<any>
  /** 格式化响应数据, 用于useTable */
  // formatResponse?: (data: any) => any;
}

export default {
  install(app: App, options?: Config) {
    const prefix = options?.prefix || 'Gi'
    Object.entries(components).forEach(([name, component]) => {
      app.component(`${capitalizeWord(prefix)}${name}`, component)
    })
    // 将配置保存到全局属性
    app.config.globalProperties.$config = options
  }
}
