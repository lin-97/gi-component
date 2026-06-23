import type { DrawerProps } from './type'
import ElementPlus from 'element-plus'
import { createApp, h, ref } from 'vue'
import GiDrawer from './drawer.vue'

export type DrawerOptions = Partial<DrawerProps>

export interface DrawerReturnObject {
  close: () => void
  update: (newProps?: Partial<DrawerOptions>) => void
}

/** 全局默认配置，可按需取消注释 */
const DEF_OPTIONS: DrawerOptions = {

}

export function createDrawer() {
  const Drawer = {
    /** 主应用上下文，需在 app.use 后赋值：Drawer._context = app._context */
    _context: {},
    /** 核心创建方法 */
    create(options: DrawerOptions): DrawerReturnObject {
      const mergedOptions = { ...DEF_OPTIONS, ...options }
      // 创建挂载容器
      const container = document.createElement('div')
      document.body.appendChild(container)

      // 响应式状态
      const visible = ref(true)
      const drawerOptions = ref<DrawerOptions>({ ...mergedOptions })
      let destroyed = false
      let drawerApp: ReturnType<typeof createApp>

      // 销毁实例，onClosed 回调中调用，防止重复卸载
      const destroy = () => {
        if (destroyed)
          return
        destroyed = true
        drawerApp.unmount()
        container.remove()
      }

      // 创建独立 Vue 应用渲染抽屉
      drawerApp = createApp({
        setup() {
          return () =>
            h(GiDrawer, {
              ...drawerOptions.value,
              'modelValue': visible.value,
              'onUpdate:modelValue': (val: boolean) => (visible.value = val),
              'onClosed': destroy
            })
        }
      })

      drawerApp.use(ElementPlus)

      // 继承主应用的上下文（插件、provide 等）
      Object.assign(drawerApp._context, Drawer._context)

      // 挂载到容器
      drawerApp.mount(container)

      return {
        /** 关闭抽屉，等待关闭动画结束后由 onClosed 触发销毁 */
        close: () => {
          visible.value = false
        },
        /** 动态更新抽屉 props */
        update: (newProps?: Partial<DrawerOptions>) => {
          if (newProps)
            drawerOptions.value = { ...drawerOptions.value, ...newProps }
        }
      }
    },

    /** 打开抽屉 */
    open(options: DrawerOptions) {
      return this.create(options)
    }
  }

  return Drawer
}

// 默认导出实例
export const Drawer = createDrawer()
