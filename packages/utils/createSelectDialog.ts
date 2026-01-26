import type { Component } from 'vue'
import type { DialogOptions } from '../index'
import { ElMessage } from 'element-plus'
import { h, ref } from 'vue'
import { Dialog } from '../index'

// 创建选择弹窗的参数
interface CreateSelectDialogParams extends Omit<DialogOptions, 'content' | 'onOk' | 'onBeforeOk'> {
  component: Component // 内容组件
  componentProps?: Record<string, any> // 内容组件属性
  tip?: string // 提示信息
};

// 默认选项
interface DefaultOption {
  queryParams?: Record<string, any>
  componentProps?: Record<string, any>
}

// 打开选择弹窗的选项
type DialogOption<T, Q extends DefaultOption = DefaultOption> = {
  title?: string // 标题
  multiple?: boolean // 是否多选
  queryParams?: (Q extends { queryParams: infer P } ? P : DefaultOption['queryParams']) // 查询参数
  componentProps?: (Q extends { componentProps: infer P } ? P : DefaultOption['componentProps']) // 组件属性
  onOk?: (data: T) => void // 确定回调
  onBeforeOk?: (data: T) => Promise<boolean> // 确定前的回调
}

/**
 * 创建选择弹窗
 * @description component组件必须暴露一个getSelectedData方法
 */
export const createSelectDialog = <T, Q extends DefaultOption = DefaultOption>(
  params: CreateSelectDialogParams
) => {
  return function (options: DialogOption<T, Q>) {
    const { multiple = false, onOk, onBeforeOk, queryParams, componentProps } = options
    const DialogTableRef = ref<any>()
    const { component, componentProps: componentPropsFromParams, tip, ...restParams } = params

    Dialog.open({
      bodyClass: 'gi-p0',
      ...restParams,
      title: params.title || options.title,
      content: () =>
        h(params.component, {
          ref: (e: any) => (DialogTableRef.value = e),
          multiple,
          queryParams,
          ...params.componentProps,
          ...componentProps
        }),
      style: { maxWidth: '1000px', ...params.style },
      onBeforeOk: async () => {
        if (!DialogTableRef.value.getSelectedData) {
          ElMessage.error('组件必须暴露getSelectedData方法')
          return false
        }
        const data = DialogTableRef.value?.getSelectedData()
        if (!data.length) {
          ElMessage.warning(params.tip || '请选择数据')
          return false
        }
        if (onBeforeOk) {
          return await onBeforeOk(data)
        } else {
          onOk?.(data)
          return true
        }
      }
    })
  }
}
