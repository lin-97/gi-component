<template>
  <ElForm ref="formRef" :model="form" :class="b('edit-table')">
    <ElTable :data="form.tableData" border v-bind="attrs">
      <ElTableColumn v-for="(column, index) in props.columns" :key="column.prop + index" :width="column.width"
        v-bind="column.columnProps" :prop="column.prop" :label="column.label"
        :label-class-name="getLabelClassName(column)">
        <template #default="scope">
          <ElFormItem v-bind="column.formItemProps" :label="column.label"
            :prop="`tableData[${scope.$index}].${column.prop}`" :rules="getFormItemRules(column)">
            <template v-if="column.slotName">
              <slot :name="column.slotName" v-bind="scope"></slot>
            </template>
            <template v-else-if="!column.type">
              {{ scope.row[column.prop] }}
            </template>
            <component :is="COMP_MAP[column.type] || column.type" v-else v-bind="getComponentBindProps(column)"
              v-model="scope.row[column.prop]" class="w-full" :disabled="isDisabled(scope)" />
          </ElFormItem>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElForm>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { EditTableColumnItem, EditTableColumnItemType } from './type'
import type { EditTableProps } from './type.ts'
import * as El from 'element-plus'
import { ElForm, ElFormItem, ElTable, ElTableColumn } from 'element-plus'
import { computed, ref, useAttrs } from 'vue'
import { useBemClass } from '../../../hooks'
import InputSearch from '../../input-search'

const props = withDefaults(defineProps<EditTableProps>(), {
  rowKey: 'id',
  data: () => [],
  columns: () => []
})

const attrs = useAttrs()
const { b } = useBemClass()

const COMP_MAP: Record<EditTableColumnItemType, any> = {
  'input': El.ElInput,
  'textarea': El.ElInput,
  'input-number': El.ElInputNumber,
  'input-tag': El.ElInputTag,
  'select': El.ElSelect,
  'select-v2': El.ElSelectV2,
  'tree-select': El.ElTreeSelect,
  'cascader': El.ElCascader,
  'slider': El.ElSlider,
  'switch': El.ElSwitch,
  'rate': El.ElRate,
  'checkbox-group': El.ElCheckboxGroup,
  'checkbox': El.ElCheckbox,
  'radio-group': El.ElRadioGroup,
  'radio': El.ElRadio,
  'date-picker': El.ElDatePicker,
  'time-picker': El.ElTimePicker,
  'time-select': El.ElTimeSelect,
  'color-picker': El.ElColorPicker,
  'transfer': El.ElTransfer,
  'autocomplete': El.ElAutocomplete,
  'upload': El.ElUpload,
  'input-search': InputSearch,
  'slot': undefined
}

const formRef = ref<FormInstance | null>()

/** 表单数据 */
const form = computed(() => ({ tableData: props.data }))

const clearable = false
/** 组件静态配置 */
const STATIC_PROPS = new Map([
  ['input', { clearable, maxlength: 20 }],
  [
    'textarea',
    {
      clearable,
      type: 'textarea',
      rows: 1,
      maxlength: 200,
      showWordLimit: true
    }
  ],
  ['input-number', {}],
  ['input-tag', { clearable }],
  ['select', { clearable }],
  ['select-v2', { clearable }],
  ['tree-select', { clearable }],
  ['cascader', { clearable }],
  ['slider', {}],
  ['switch', {}],
  ['rate', {}],
  ['checkbox-group', {}],
  ['checkbox', {}],
  ['radio-group', {}],
  ['radio', {}],
  ['date-picker', { clearable }],
  ['time-picker', { clearable }],
  ['time-select', { clearable }],
  ['color-picker', {}],
  ['transfer', {}],
  ['autocomplete', {}],
  ['upload', {}],
  ['title', {}]
])

/** 占位符文本映射 */
const PLACEHOLDER_MAP = new Map<EditTableColumnItemType, (label?: string) => string | undefined>([
  ['input', (label) => `请输入${label}`],
  ['input-number', (label) => `请输入${label}`],
  ['input-tag', (label) => `请输入${label}`],
  ['textarea', (label) => `请填写${label}`],
  ['select', (label) => `请选择${label}`],
  ['select-v2', (label) => `请选择${label}`],
  ['tree-select', (label) => `请选择${label}`],
  ['cascader', (label) => `请选择${label}`],
  ['time-select', (label) => `请选择${label}`],
  ['input-search', (label) => `请选择${label}`],
  ['date-picker', () => '请选择日期'],
  ['time-picker', () => '请选择时间']
])

/** 获取占位文本 */
const getPlaceholder = (item: EditTableColumnItem): string | undefined => {
  if (!item.type) return undefined
  const placeholderFn = PLACEHOLDER_MAP.get(item.type)
  return placeholderFn ? placeholderFn(item.label) : undefined
}

/** 组件的默认props配置 */
function getComponentBindProps(item: EditTableColumnItem) {
  // 获取默认配置
  const defaultProps: Record<string, any> = { ...(STATIC_PROPS.get(item.type || '') || {}) }
  const placeholder = getPlaceholder(item)
  if (placeholder) {
    defaultProps.placeholder = placeholder
  }
  // 日期选择器格式化
  if (item.type === 'date-picker') {
    defaultProps.valueFormat = item?.componentProps?.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  // 合并默认配置和自定义配置
  return { ...defaultProps, ...(item?.componentProps || {}) }
}

/** 表单项校验规则 */
function getFormItemRules(item: EditTableColumnItem) {
  const rules = Array.isArray(item.rules) ? item.rules : []
  if (item.required) {
    return [
      { required: true, message: `${item.label}为必填项` },
      ...rules
    ]
  }
  return item.rules
}

/** 表头标题样式 */
function getLabelClassName(item: EditTableColumnItem) {
  if (item.required) return 'column-required'
  return ''
}

/** 判断是否禁用 */
const isDisabled = (scope: any): boolean => {
  if (typeof props?.cellDisabled === 'function') {
    return props.cellDisabled(scope)
  }
  return false
}

defineExpose({ formRef })
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;

  .el-form-item__label {
    display: none;
  }
}

:deep(.column-required) {
  .cell {
    position: relative;

    &::after {
      content: '*';
      color: red;
      margin-left: 2px;
    }
  }
}
</style>
