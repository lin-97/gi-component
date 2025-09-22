import type { DialogInstance } from '../index'
import ElementPlus from 'element-plus'
import { createApp, h, ref } from 'vue'
import GiDialog from './dialog.vue'

export type DialogOptions = Partial<DialogInstance['$props']>

export interface DialogReturnObject {
  close: () => void
  update: (newProps?: Record<string, any>) => void
}

const DEF_OPTIONS: DialogOptions = {
  // width: '600px',
  // center: false,
  // footer: true,
  // closeOnClickModal: true
}

export function createDialog() {
  const Dialog = {
    _context: {},
    // 核心创建方法
    create(options: DialogOptions): DialogReturnObject {
      const mergedOptions = { ...DEF_OPTIONS, ...options }
      // 创建容器
      const container = document.createElement('div')
      document.body.appendChild(container)

      // 状态管理
      const visible = ref(true)
      const dialogOptions = ref(mergedOptions || {})

      // 创建弹窗应用
      const dialogApp = createApp({
        setup() {
          // 关闭处理
          const closed = () => {
            dialogApp.unmount()
            container.remove()
          }

          return () =>
            h(GiDialog, {
              ...dialogOptions.value,
              'modelValue': visible.value,
              'onUpdate:modelValue': (val: boolean) => (visible.value = val),
              'onClosed': () => closed()
            })
        }
      })

      dialogApp.use(ElementPlus)

      // 继承主应用的上下文
      Object.assign(dialogApp._context, Dialog._context)

      // 挂载
      dialogApp.mount(container)

      return {
        /** 关闭对话框 */
        close: () => {
          visible.value = false
          setTimeout(() => {
            dialogApp.unmount()
            container.remove()
          }, 300)
        },
        /** 更新对话框 */
        update: (newProps?: Record<string, any>) => {
          dialogOptions.value = { ...dialogOptions.value, ...newProps }
        }
      }
    },

    /** 对话框-打开 */
    open(options: DialogOptions) {
      return this.create(options)
    }
  }

  return Dialog
}

// 默认导出实例
export const Dialog = createDialog()
