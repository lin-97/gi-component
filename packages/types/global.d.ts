import type { Config } from '../index'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config?: Config
  }
}
