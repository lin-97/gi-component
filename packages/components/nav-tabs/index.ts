import type { DefineComponent } from 'vue'
import type { NavTabBase, NavTabsProps } from './src/type'
import NavTabs from './src/nav-tabs.vue'

export type NavTabsInstance<T extends NavTabBase = NavTabBase> = DefineComponent<NavTabsProps<T>>

export * from './src/type'
export default NavTabs
