import { getCurrentInstance } from 'vue'

export function useBemClass() {
  const instance = getCurrentInstance()
  const configPrefix
    = instance?.appContext.config.globalProperties.$config?.prefix || 'gi'
  const prefix = configPrefix.toLowerCase()
  const b = (name: string = '') => `${prefix}-${name ? `${name}` : ''}`

  return { b }
}
