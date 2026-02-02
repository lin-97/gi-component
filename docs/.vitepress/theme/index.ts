import type { EnhanceAppContext } from 'vitepress'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import GiComponent, { Dialog } from 'gi-component'
import DefaultTheme from 'vitepress/theme'
import { getDictData } from '../../_apis/dictRequest'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '../../../packages/styles/index.scss'
import '../../public/css/index.css'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }: EnhanceAppContext) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    Dialog._context = app._context
    app.use(ElementPlus, {
      locale // 语言设置
    })
    app.use(GiComponent, {
      dictRequest: (code: string) => getDictData(code)
    })
  }
}
