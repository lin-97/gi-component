import type { FormInstance as ElFormInstance } from 'element-plus'
import type { PublicProps, ShallowUnwrapRef, VNode } from 'vue'
import type { EditTableProps, EditTableSlots } from './src/type'
import _EditTable from './src/edit-table.vue'

type __VLS_PrettifyLocal<T> = {
  [K in keyof T]: T[K]
} & {}

type EditTableSetup = {
  props: __VLS_PrettifyLocal<EditTableProps & {}> & PublicProps
  expose: (exposed: ShallowUnwrapRef<{ formRef: ElFormInstance | null | undefined }>) => void
  attrs: any
  slots: Readonly<EditTableSlots>
  emit: Record<string, never>
}

declare const _EditTableComponent: (
  __VLS_props: EditTableSetup['props'],
  __VLS_ctx?: __VLS_PrettifyLocal<Pick<EditTableSetup, 'attrs' | 'emit' | 'slots'>>,
  __VLS_expose?: EditTableSetup['expose'],
  __VLS_setup?: Promise<EditTableSetup>
) => VNode & { __ctx?: EditTableSetup }

/** gi-edit-table 组件实例（template ref 绑定后的 exposed 类型） */
export type EditTableInstance = {
  /** 内部 el-form 实例，对应 edit-table.vue defineExpose({ formRef }) */
  formRef?: ElFormInstance | null
}

export * from './src/type'
export default _EditTable as unknown as typeof _EditTableComponent
