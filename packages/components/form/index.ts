import type { FormInstance as ElFormInstance } from 'element-plus'
import type { PublicProps, ShallowUnwrapRef, VNode } from 'vue'
import type { DefaultFormModel, FormProps, FormSlots } from './src/type'
import _Form from './src/form.vue'

type __VLS_PrettifyLocal<T> = {
  [K in keyof T]: T[K]
} & {}

type FormEmit = {
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}

type FormSetup<F extends DefaultFormModel> = {
  props: __VLS_PrettifyLocal<FormProps<F> & {}> & PublicProps
  expose: (exposed: ShallowUnwrapRef<{ formRef: ElFormInstance | undefined }>) => void
  attrs: any
  slots: Readonly<FormSlots<F>>
  emit: FormEmit
}

declare const _FormComponent: <F extends DefaultFormModel>(
  __VLS_props: NonNullable<Awaited<typeof __VLS_setup>>['props'],
  __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, 'attrs' | 'emit' | 'slots'>>,
  __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>['expose'],
  __VLS_setup?: Promise<FormSetup<F>>
) => VNode & { __ctx?: Awaited<typeof __VLS_setup> }

/** gi-form 组件实例（template ref 绑定后的 exposed 类型） */
export type FormInstance = {
  /** 内部 el-form 实例，对应 form.vue defineExpose({ formRef }) */
  formRef?: ElFormInstance
}

export * from './src/type'
export default _Form as unknown as typeof _FormComponent
