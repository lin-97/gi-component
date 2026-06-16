import type { DrawerInstance } from '../index'
import ElementPlus from 'element-plus'
import { createApp, h, ref } from 'vue'
import GiDrawer from './drawer.vue'

export type DrawerOptions = Partial<DrawerInstance['$props']>

export interface DrawerReturnObject {
  close: () => void
  update: (newProps?: Record<string, any>) => void
}

const DEF_OPTIONS: DrawerOptions = {

}

export function createDrawer() {
  const Drawer = {
    _context: {},
    // 核心创建方法
    create(options: DrawerOptions): DrawerReturnObject {
      const mergedOptions = { ...DEF_OPTIONS, ...options }
      // 创建容器
      const container = document.createElement('div')
      document.body.appendChild(container)

      // 状态管理
      const visible = ref(true)
      const dialogOptions = ref(mergedOptions || {})

      // 创建弹窗应用
      const drawerApp = createApp({
        setup() {
          // 关闭处理
          const closed = () => {
            drawerApp.unmount()
            container.remove()
          }

          return () =>
            h(GiDrawer, {
              ...dialogOptions.value,
              'modelValue': visible.value,
              'onUpdate:modelValue': (val: boolean) => (visible.value = val),
              'onClosed': () => closed()
            })
        }
      })

      drawerApp.use(ElementPlus)

      // 继承主应用的上下文
      Object.assign(drawerApp._context, Drawer._context)

      // 挂载
      drawerApp.mount(container)

      return {
        /** 关闭抽屉 */
        close: () => {
          visible.value = false
          setTimeout(() => {
            drawerApp.unmount()
            container.remove()
          }, 300)
        },
        /** 更新抽屉 */
        update: (newProps?: Record<string, any>) => {
          dialogOptions.value = { ...dialogOptions.value, ...newProps }
        }
      }
    },

    /** 抽屉-打开 */
    open(options: DrawerOptions) {
      return this.create(options)
    }
  }

  return Drawer
}

// 默认导出实例
export const Drawer = createDrawer()
