import GiComponents, { Dialog } from 'gi-component';
import ElementPlus from 'element-plus';
import locale from 'element-plus/es/locale/lang/zh-cn';
import DefaultTheme from 'vitepress/theme';
import { getDictData } from '../../_apis/dictRequest';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'gi-component/dist/el.css';
import '../../public/css/index.css';

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    Dialog._context = app._context;
    app.use(ElementPlus, {
      locale // 语言设置
    });
    app.use(GiComponents, {
      dictRequest: (code: string) => getDictData(code)
    });
  }
};
