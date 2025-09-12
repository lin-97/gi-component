import { reactive, h } from 'vue'
import HeaderInput from './HeaderInput.vue'
import HeaderCheckboxGroup from './HeaderCheckboxGroup.vue'

export function useTableHeaderSearch(options: { search: () => void }) {
  const headerParams = reactive({} as Record<string, any>)

  function createTableHeader(params: { type: 'input' | 'checkbox-group', label: string, field: string }) {
    if (params.type === 'input') {
      return h(HeaderInput, { headerParams: headerParams, label: params.label, field: params.field, onConfirm: () => options.search() })
    }
    if (params.type === 'checkbox-group') {
      return h(HeaderCheckboxGroup, { headerParams: headerParams, label: params.label, field: params.field, onConfirm: () => options.search() })
    }
    return h('div', {}, params.label)
  }

  return {
    headerParams,
    createTableHeader
  }
}