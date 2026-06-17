import type * as El from 'element-plus'
import type { VNode } from 'vue'
import type { MergeMultiple } from '../../../types/tool'
import type { GridItemProps, GridProps } from '../../grid/src/interface'
import type { InputSearchInstance } from '../../input-search'

export type DefaultFormModel = Record<PropertyKey, any>

export type FormColumnType
  = | 'input'
  | 'textarea'
  | 'input-number'
  | 'input-tag'
  | 'input-search'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'slider'
  | 'switch'
  | 'rate'
  | 'checkbox-group'
  | 'checkbox'
  | 'radio-group'
  | 'radio'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'color-picker'
  | 'transfer'
  | 'autocomplete'
  | 'upload'
  | 'title'
  | 'slot'

/**
 * 表单列属性类型，根据组件类型使用对应的属性类型
 */
export type FormColumnProps = MergeMultiple<[El.InputProps, El.InputNumberProps, El.InputTagProps, El.SelectProps, El.SelectV2Props, El.TreeInstance['$props'], El.CascaderProps, El.SliderProps, El.SwitchProps, El.RateProps, El.CheckboxGroupProps, El.CheckboxProps, El.RadioGroupProps, El.RadioProps, El.DatePickerProps, El.TimePickerDefaultProps, El.TimeSelectProps, El.ColorPickerProps, El.TransferProps, El.AutocompleteProps, El.UploadProps, InputSearchInstance['$props']]>

export type FormColumnItemHide<F> = boolean | ((form: F) => boolean)

/**
 * 表单列插槽类型，根据组件类型使用对应的插槽类型
 */
export type FormColumnSlots = Partial<
  El.InputInstance['$slots']
  | El.InputNumberInstance['$slots']
  | El.InputTagInstance['$slots']
  | El.AutocompleteInstance['$slots']
  | El.CascaderInstance['$slots']
  | El.DatePickerInstance['$slots']
>

export interface FormColumnItem<F = any> {
  type: FormColumnType
  label?: string
  labelRender?: () => VNode
  field: string
  fieldName?: string
  span?: number | GridItemProps['span']
  props?: FormColumnProps
  formItemProps?: El.FormItemProps
  gridItemProps?: any
  required?: boolean
  rules?: El.FormItemRule[]
  hide?: FormColumnItemHide<F> // 是否隐藏
  tip?: string
  dictCode?: string // 字典编码
  slotName?: string
  slots?: FormColumnSlots
  extra?: string | (() => VNode) // 右侧额外内容
}

export type FormSize = '' | 'large' | 'default' | 'small'

export type FormLabelPosition = 'left' | 'right' | 'top'

export type FormRequireAsteriskPosition = 'left' | 'right'

/**
 * gi-form 组件 Props（可移植类型，不直接继承 ElFormProps 以避免 d.ts 生成失败）
 * 未列出的 el-form 属性仍可通过 attrs 透传
 */
export interface FormProps<F extends DefaultFormModel = DefaultFormModel> {
  /** 表单数据 */
  modelValue: F
  /** 表单列配置 */
  columns?: FormColumnItem<F>[]
  /** 表单控制 */
  fc?: Record<string, { disabled?: boolean, hidden?: boolean, required?: boolean }>
  /** grid 默认配置 */
  gridProps?: GridProps
  /** grid-item 默认配置 */
  gridItemProps?: GridItemProps
  /** 是否为搜索表单 */
  search?: boolean
  /** 搜索按钮文本 */
  searchText?: string
  /** 是否隐藏折叠按钮 */
  hideFoldBtn?: boolean
  /** 默认是否折叠 */
  defaultCollapsed?: boolean | undefined
  /** 搜索按钮是否 suffix 布局 */
  suffix?: boolean

  /** 表单内组件尺寸 */
  size?: FormSize
  /** 是否禁用表单内所有组件 */
  disabled?: boolean
  /** 表单验证规则 */
  rules?: Partial<Record<string, El.FormItemRule | El.FormItemRule[]>>
  /** 标签位置 */
  labelPosition?: FormLabelPosition
  /** 必填星号位置 */
  requireAsteriskPosition?: FormRequireAsteriskPosition
  /** 标签宽度 */
  labelWidth?: string | number
  /** 标签后缀 */
  labelSuffix?: string
  /** 是否为行内表单 */
  inline?: boolean
  /** 是否以行内形式展示校验信息 */
  inlineMessage?: boolean
  /** 是否显示校验结果图标 */
  statusIcon?: boolean
  /** 是否显示校验错误信息 */
  showMessage?: boolean
  /** rules 属性改变时是否触发验证 */
  validateOnRuleChange?: boolean
  /** 是否隐藏必填星号 */
  hideRequiredAsterisk?: boolean
  /** 校验失败时滚动到第一个错误表单项 */
  scrollToError?: boolean
  /** 校验失败滚动到视图的配置 */
  scrollIntoViewOptions?: ScrollIntoViewOptions | boolean
}

/** 组件全部插槽签名，与 form.vue defineSlots 一致 */
export type FormSlots<F extends DefaultFormModel = DefaultFormModel> = {
  [field: string]: ((props: { item: FormColumnItem<F> }) => any) | undefined
}
