import type { Component } from 'vue';
import { ElMessage } from 'element-plus';
import { h, ref } from 'vue';
import { Dialog, type DialogOptions } from '../index';

interface CreateSelectDialogParams extends Omit<DialogOptions, 'content' | 'onOk' | 'onBeforeOk'> {
  component: Component;
  componentProps?: Record<string, any>;
  tip?: string;
};

interface DefOption {
  queryParams: Record<string, any>;
}

type DialogOption<T, Q extends DefOption = DefOption> = {
  title?: string;
  multiple?: boolean;
  queryParams?: Q['queryParams'];
  onOk?: (data: T) => void;
  onBeforeOk?: (data: T) => Promise<boolean>;
};

/**
 * 创建选择弹窗
 * @description component组件必须暴露一个getSelectedData方法
 */
export const createSelectDialog = <T, Q extends DefOption = DefOption>(
  params: CreateSelectDialogParams
) => {
  return function (options: DialogOption<T, Q>) {
    const { multiple = false, onOk, onBeforeOk, queryParams } = options;
    const DialogTableRef = ref<any>();

    Dialog.open({
      bodyClass: 'gi-p0',
      ...{ ...params, component: undefined, componentProps: undefined, tip: undefined },
      title: params.title || options.title,
      content: () =>
        h(params.component, {
          ref: (e: any) => (DialogTableRef.value = e),
          multiple,
          queryParams,
          ...params.componentProps
        }),
      style: { maxWidth: '1000px', ...params.style },
      onBeforeOk: async () => {
        if (!DialogTableRef.value.getSelectedData) {
          ElMessage.error('组件必须暴露getSelectedData方法');
          return false;
        }
        const data = DialogTableRef.value?.getSelectedData();
        if (!data.length) {
          ElMessage.warning(params.tip || '请选择数据');
          return false;
        }
        if (onBeforeOk) {
          return await onBeforeOk(data);
        } else {
          onOk?.(data);
          return true;
        }
      }
    });
  };
};
