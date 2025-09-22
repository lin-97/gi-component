<template>
  <el-form ref="formRef" :class="getClass" v-bind="formProps" :model="props.modelValue">
    <Grid class="w-full" :col-gap="12" v-bind="props.gridProps" :collapsed="collapsed">
      <template v-for="(item, index) in props.columns">
        <GridItem v-if="item.type === 'title'" :key="`title${index}`" :span="100">
          <el-form-item label-width="0">
            <GiCard :title="typeof item.label === 'string' ? item.label : ''" :header-style="{ padding: 0 }"
              :body-style="{ display: 'none' }"></GiCard>
          </el-form-item>
        </GridItem>

        <template v-else>
          <GridItem v-if="!isHide(item)" :key="item.field + index" v-bind="item.gridItemProps || props.gridItemProps"
            :span="item.span
              || item.gridItemProps?.span
              || props?.gridItemProps?.span
              ">
            <el-form-item :key="item.field + index" :prop="item.field" :label="item.label"
              :rules="getFormItemRules(item)" v-bind="item.formItemProps">
              <template v-if="item?.labelRender" #label>
                <component :is="item.labelRender"></component>
              </template>
              <div v-if="item.type === 'slot'" class="w-full">
                <slot :name="item.field" :item="item"></slot>
              </div>
              <template v-else>
                <div :class="b('form-item__content')">
                  <div :class="b('form-item__component')">
                    <component :is="CompMap[item.type] || item.type" :disabled="isDisabled(item)" class="w-full"
                      v-bind="getComponentBindProps(item)" :model-value="props.modelValue[item.fieldName || item.field]
                        " @update:model-value="updateModelValue($event, item)">
                      <template v-for="(slotValue, slotKey) in item?.slots || {}" :key="slotKey" #[slotKey]="scope">
                        <template v-if="typeof slotValue === 'string'">
                          {{ slotValue }}
                        </template>
                        <template v-else-if="slotValue">
                          <component :is="slotValue(scope)"></component>
                        </template>
                      </template>
                    </component>
                    <el-text v-if="item.tip" :class="b('form-item__tip')" type="info" size="small">
                      {{ item.tip }}
                    </el-text>
                  </div>
                  <!-- 额外信息 -->
                  <div v-if="item.extra" :class="b('form-item__extra')">
                    <template v-if="typeof item.extra === 'string'">
                      <el-text type="info" size="small">
                        {{
                          item.extra
                        }}
                      </el-text>
                    </template>
                    <template v-else-if="item.extra">
                      <component :is="item.extra"></component>
                    </template>
                  </div>
                </div>
              </template>
            </el-form-item>
          </GridItem>
        </template>
      </template>

      <GridItem v-if="props.search" :suffix="props.search" :span="props?.gridItemProps?.span">
        <el-space :class="b('form__search-btns')">
          <el-button type="primary" @click="emit('search')">
            {{ searchText }}
          </el-button>
          <el-button @click="emit('reset')"> 重置 </el-button>
          <el-button v-if="!props.hideFoldBtn" class="form__fold-btn" type="primary"
            :icon="collapsed ? ArrowDown : ArrowUp" text size="small" @click="collapsed = !collapsed">
            {{ collapsed ? '展开' : '收起' }}
          </el-button>
        </el-space>
      </GridItem>
    </Grid>
  </el-form>
</template>

<script lang="tsx" setup>
import type { FormInstance } from 'element-plus'
import type { FormColumnItem, FormColumnType, FormProps } from './type'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import * as El from 'element-plus'
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
  toRaw,
  useAttrs,
  watch
} from 'vue'
import { useBemClass } from '../../../hooks'
import GiCard from '../../card'
import { Grid, GridItem } from '../../grid'
import InputSearch from '../../input-search'

const props = withDefaults(defineProps<FormProps>(), {
  columns: () => [],
  labelWidth: 'auto',
  scrollToError: true,
  gridItemProps: () => ({ span: { xs: 24, sm: 24, md: 12 } }), // xs, sm, md, lg, xl, xxl
  search: false,
  searchText: '查询',
  hideFoldBtn: false,
  defaultCollapsed: undefined,
  fc: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const attrs = useAttrs()
const { b } = useBemClass()
const collapsed = ref(props?.defaultCollapsed ?? props.search)
const instance = getCurrentInstance()

const globalConfig = instance?.appContext.config.globalProperties.$config
const clearable = globalConfig?.clearable ?? false
// 字典数据存储
const dictData = ref<Record<string, any[]>>({})

/** 组件静态配置 */
const STATIC_PROPS = new Map([
  ['input', { clearable, maxlength: 20 }],
  [
    'textarea',
    { clearable, type: 'textarea', maxlength: 200, showWordLimit: true }
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

// 获取字典数据
const loadDictData = async () => {
  const dictCodes: string[] = []
  // 收集所有需要的字典编码
  props.columns?.forEach((item) => {
    if (item.dictCode) {
      dictCodes.push(item.dictCode)
    }
  })
  if (!dictCodes.length) return
  if (!globalConfig?.dictRequest) {
    return El.ElMessage.error('请配置全局字典请求方法dictRequest')
  }
  try {
    // 使用Promise.all并行处理所有字典请求
    const dictResponses = await Promise.all(
      dictCodes.map((code) =>
        globalConfig
          .dictRequest(code)
          .then((response: any) => ({ code, response }))
      )
    )
    // 处理所有响应结果
    dictResponses.forEach(({ code, response }) => {
      dictData.value[code] = response
    })
  } catch (error) {
    console.error('获取字典数据失败:', error)
    El.ElMessage.error('获取字典数据失败')
  }
}

// 组件挂载时获取字典数据
onMounted(() => {
  loadDictData()
})

// 组件的默认props配置
function getComponentBindProps(item: FormColumnItem) {
  // 获取默认配置
  const defaultProps: any = STATIC_PROPS.get(item.type) || {}
  defaultProps.placeholder = getPlaceholder(item)
  if (item.type === 'date-picker') {
    defaultProps.valueFormat = item?.props?.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  // 如果配置了dictCode且存在对应的字典数据，设置options
  if (item.dictCode && dictData.value[item.dictCode]) {
    defaultProps.options = dictData.value[item.dictCode]
  }
  // 合并默认配置和自定义配置
  return { ...defaultProps, ...(item?.props || {}) }
}

const formProps = computed(() => {
  return {
    ...attrs,
    ...props,
    columns: undefined,
    gridProps: undefined,
    gridItemProps: undefined,
    search: undefined,
    searchText: undefined,
    hideFoldBtn: undefined,
    defaultCollapsed: undefined
  }
})

const getClass = computed(() => {
  const arr: string[] = [b('form')]
  if (props.search) {
    arr.push(b('form--search'))
  }
  return arr.join(' ')
})

const CompMap: Record<Exclude<FormColumnType, 'slot'>, any> = {
  'input': El.ElInput,
  'textarea': El.ElInput,
  'input-number': El.ElInputNumber,
  'input-tag': El.ElInputTag,
  'input-search': InputSearch,
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
  'title': El.ElAlert
}

const formRef = ref<FormInstance>()

/** 获取占位文本 */
const getPlaceholder = (item: FormColumnItem) => {
  if (!item.type) return undefined
  if (['input', 'input-number', 'input-tag'].includes(item.type)) {
    return `请输入${item.label}`
  }
  if (['textarea'].includes(item.type)) {
    return `请填写${item.label}`
  }
  if (
    [
      'select',
      'select-v2',
      'tree-select',
      'cascader',
      'time-select',
      'input-search'
    ].includes(item.type)
  ) {
    return `请选择${item.label}`
  }
  if (['date-picker'].includes(item.type)) {
    return `请选择日期`
  }
  if (['time-picker'].includes(item.type)) {
    return `请选择时间`
  }
  return undefined
}

/** 表单项校验规则 */
function getFormItemRules(item: FormColumnItem) {
  if (item.required) {
    return [
      { required: true, message: `${item.label}为必填项` },
      ...(Array.isArray(item.rules) ? item.rules : [])
    ]
  }
  if (props.fc?.[item.field]?.required) {
    return [
      {
        required: props.fc?.[item.field]?.required,
        message: `${item.label}为必填项`
      },
      ...(Array.isArray(item.rules) ? item.rules : [])
    ]
  }
  return item.rules
}

/** 隐藏表单项 */
function isHide(item: FormColumnItem) {
  if (typeof item.hide === 'boolean') return item.hide
  if (typeof item.hide === 'function') {
    return item.hide(props.modelValue)
  }
  if (props.fc?.[item.field]?.hidden) return true
  if (item.hide === undefined) return false
}

/** 禁用表单项 */
function isDisabled(item: FormColumnItem) {
  if (item?.props?.disabled !== undefined) return item?.props?.disabled
  if (props.fc?.[item.field]?.disabled === true) return true
  return false
}

/** 表单数据更新  */
function updateModelValue(value: any, item: FormColumnItem) {
  emit(
    'update:modelValue',
    Object.assign(props.modelValue, { [item.field]: value })
  )
}

watch(
  () => props.modelValue,
  () => {
    // eslint-disable-next-line no-console
    console.log('form', toRaw(props.modelValue))
  },
  { deep: true }
)

defineExpose({ formRef })
</script>

<style lang="scss" scoped>
@use '../../../styles/var.scss' as a;

.el-form {
  width: 100%;
}

:deep(.el-form-item) {
  align-items: center;

  .el-form-item__label {
    height: inherit;
    line-height: inherit;
  }
}

:deep(.hide-label) {

  // 隐藏el-form-item__label才能完整占满插槽宽度
  .el-form-item__label {
    display: none;
  }
}

.#{a.$prefix}-form {
  &-item {
    &__content {
      width: 100%;
      display: flex;
    }

    &__component {
      flex: 1;
    }

    &__tip {
      line-height: 1.5;
      color: var(--el-color-info-light-3);
    }

    &__extra {
      margin-left: 6px;
    }
  }

  &__search-btns {
    margin-bottom: 8px;
  }
}

.#{a.$prefix}-form--search {
  :deep(.el-form-item) {
    margin-bottom: 8px;
  }
}

:deep(.w-full) {
  width: 100%;

  .el-date-editor {
    width: 100%;
  }
}
</style>
