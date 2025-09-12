import type * as El from 'element-plus';
import type { FormProps as ElFormProps } from 'element-plus';
import type { VNode } from 'vue';
import type { GridItemProps, GridProps } from '../../grid/src/interface';
import type { InputSearchInstance } from '../../input-search';
import type { MergeMultiple } from '../../../types/tool'

export type FormColumnType =
  | 'input'
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
  | 'slot';

/**
 * 表单列属性类型，根据组件类型使用对应的属性类型
 */
export type FormColumnProps = MergeMultiple<[El.InputProps,
  El.InputNumberProps,
  El.InputTagProps,
  El.SelectProps,
  El.SelectV2Props,
  El.TreeInstance['$props'],
  El.CascaderProps,
  El.SliderProps,
  El.SwitchProps,
  El.RateProps,
  El.CheckboxGroupProps,
  El.CheckboxProps,
  El.RadioGroupProps,
  El.RadioProps,
  El.DatePickerProps,
  El.TimePickerDefaultProps,
  El.TimeSelectProps,
  El.ColorPickerProps,
  El.TransferProps,
  El.AutocompleteProps,
  El.UploadProps,
  InputSearchInstance['$props']]>;

export type FormColumnItemHide<F> = boolean | ((form: F) => boolean);

/**
 * 表单列插槽类型，根据组件类型使用对应的插槽类型
 */
export type FormColumnSlots = Partial<
  El.InputInstance['$slots'] |
  El.InputNumberInstance['$slots'] |
  El.InputTagInstance['$slots'] |
  El.AutocompleteInstance['$slots'] |
  El.CascaderInstance['$slots'] |
  El.DatePickerInstance['$slots']
>;

export interface FormColumnItem<F = any> {
  type: FormColumnType;
  label?: string;
  labelRender?: () => VNode;
  field: string;
  fieldName?: string;
  span?: number;
  props?: FormColumnProps;
  formItemProps?: El.FormItemProps;
  gridItemProps?: any;
  required?: boolean;
  rules?: El.FormItemRule[];
  hide?: FormColumnItemHide<F>; // 是否隐藏
  tip?: string;
  dictCode?: string; // 字典编码
  slotName?: string;
  slots?: FormColumnSlots;
  extra?: string | (() => VNode); // 右侧额外内容
}

export interface FormProps extends Partial<ElFormProps> {
  modelValue: any;
  columns?: FormColumnItem[];
  fc?: Record<string, { disabled?: boolean; hidden?: boolean; required?: boolean }>; // 表单控制
  gridProps?: GridProps; // grid默认配置
  gridItemProps?: GridItemProps; // grid-item默认配置
  search?: boolean;
  searchText?: string;
  hideFoldBtn?: boolean;
  defaultCollapsed?: boolean | undefined;
}