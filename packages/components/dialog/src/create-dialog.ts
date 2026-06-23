import type { DialogProps } from './type'
import ElementPlus from 'element-plus'
import { createApp, h, ref } from 'vue'
import DialogContent from './dialog-content.vue'
import GiDialog from './dialog.vue'

export type DialogOptions = Partial<DialogProps>

type MessageType = 'info' | 'success' | 'warning' | 'error'

/** 消息类对话框配置，content 为纯文本 */
export type MessageDialogOptions = DialogOptions & {
  content?: string
}

export interface DialogReturnObject {
  close: () => void
  update: (newProps?: Partial<DialogOptions>) => void
}

/** 全局默认配置，可按需取消注释 */
const DEF_OPTIONS: DialogOptions = {
  // width: '600px',
  // center: false,
  // footer: true,
  // closeOnClickModal: true
}

/** 构建 info / success / warning / error 消息框的公共配置 */
function buildMessageOptions(type: MessageType, options: MessageDialogOptions): DialogOptions {
  return {
    ...options,
    content: () => h(DialogContent, { type, content: options.content ?? '' }),
    simple: true,
    style: { maxWidth: '420px', ...options.style },
    lockScroll: false
  }
}

export function createDialog() {
  const Dialog = {
    /** 主应用上下文，需在 app.use 后赋值：Dialog._context = app._context */
    _context: {},
    /** 核心创建方法 */
    create(options: DialogOptions): DialogReturnObject {
      const mergedOptions = { ...DEF_OPTIONS, ...options }
      // 创建挂载容器
      const container = document.createElement('div')
      document.body.appendChild(container)

      // 响应式状态
      const visible = ref(true)
      const dialogOptions = ref<DialogOptions>({ ...mergedOptions })
      let destroyed = false
      let dialogApp: ReturnType<typeof createApp>

      // 销毁实例，onClosed 回调中调用，防止重复卸载
      const destroy = () => {
        if (destroyed)
          return
        destroyed = true
        dialogApp.unmount()
        container.remove()
      }

      // 创建独立 Vue 应用渲染对话框
      dialogApp = createApp({
        setup() {
          return () =>
            h(GiDialog, {
              ...dialogOptions.value,
              'modelValue': visible.value,
              'onUpdate:modelValue': (val: boolean) => (visible.value = val),
              'onClosed': destroy
            })
        }
      })

      dialogApp.use(ElementPlus)

      // 继承主应用的上下文（插件、provide 等）
      Object.assign(dialogApp._context, Dialog._context)

      // 挂载到容器
      dialogApp.mount(container)

      return {
        /** 关闭对话框，等待关闭动画结束后由 onClosed 触发销毁 */
        close: () => {
          visible.value = false
        },
        /** 动态更新对话框 props */
        update: (newProps?: Partial<DialogOptions>) => {
          if (newProps)
            dialogOptions.value = { ...dialogOptions.value, ...newProps }
        }
      }
    },

    /** 打开对话框 */
    open(options: DialogOptions) {
      return this.create(options)
    },

    /** 信息提示框 */
    info(options: MessageDialogOptions) {
      return this.create(buildMessageOptions('info', options))
    },

    /** 成功提示框 */
    success(options: MessageDialogOptions) {
      return this.create(buildMessageOptions('success', options))
    },

    /** 警告提示框 */
    warning(options: MessageDialogOptions) {
      return this.create(buildMessageOptions('warning', options))
    },

    /** 错误提示框 */
    error(options: MessageDialogOptions) {
      return this.create(buildMessageOptions('error', options))
    }
  }

  return Dialog
}

// 默认导出实例
export const Dialog = createDialog()

// 防止打包时 tree-shake 掉 info/success/warning/error（此处引用保证被打包）
void [Dialog.info, Dialog.success, Dialog.warning, Dialog.error]
