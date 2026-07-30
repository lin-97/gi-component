interface CustomIconSet {
  prefix: string
  /** 图标集默认 viewBox 宽高，单个图标未指定时使用 */
  width?: number
  height?: number
  icons: Record<string, { body: string, width?: number, height?: number }>
}

/** 项目自定义 Iconify 图标集，使用方式：custom:图标名 */
export const CUSTOM_ICONS: CustomIconSet = {
  prefix: 'custom',
  width: 48,
  height: 48,
  icons: {
    'sun-fill': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><circle cx="24" cy="24" r="9" fill="currentColor" stroke="none"></circle><path d="M21 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM21 37.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM42.5 21a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5ZM10.5 21a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5ZM39.203 34.96a.5.5 0 0 1 0 .707l-3.536 3.536a.5.5 0 0 1-.707 0l-3.535-3.536a.5.5 0 0 1 0-.707l3.535-3.535a.5.5 0 0 1 .707 0l3.536 3.535ZM16.575 12.333a.5.5 0 0 1 0 .707l-3.535 3.535a.5.5 0 0 1-.707 0L8.797 13.04a.5.5 0 0 1 0-.707l3.536-3.536a.5.5 0 0 1 .707 0l3.535 3.536ZM13.04 39.203a.5.5 0 0 1-.707 0l-3.536-3.536a.5.5 0 0 1 0-.707l3.536-3.535a.5.5 0 0 1 .707 0l3.536 3.535a.5.5 0 0 1 0 .707l-3.536 3.536ZM35.668 16.575a.5.5 0 0 1-.708 0l-3.535-3.535a.5.5 0 0 1 0-.707l3.535-3.536a.5.5 0 0 1 .708 0l3.535 3.536a.5.5 0 0 1 0 .707l-3.535 3.535Z" fill="currentColor" stroke="none"></path></svg>'
    },
    'moon-fill': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M42.108 29.769c.124-.387-.258-.736-.645-.613A17.99 17.99 0 0 1 36 30c-9.941 0-18-8.059-18-18 0-1.904.296-3.74.844-5.463.123-.387-.226-.768-.613-.645C10.558 8.334 5 15.518 5 24c0 10.493 8.507 19 19 19 8.482 0 15.666-5.558 18.108-13.231Z" fill="currentColor" stroke="none"></path></svg>'
    },
    'full-screen': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M42 17V9a1 1 0 0 0-1-1h-8M6 17V9a1 1 0 0 1 1-1h8m27 23v8a1 1 0 0 1-1 1h-8M6 31v8a1 1 0 0 0 1 1h8"></path></svg>'
    },
    'off-screen': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M35 6v8a1 1 0 0 0 1 1h8M13 6v8a1 1 0 0 1-1 1H4m31 27v-8a1 1 0 0 1 1-1h8m-31 9v-8a1 1 0 0 0-1-1H4"></path></svg>'
    },
    setting: {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M18.797 6.732A1 1 0 0 1 19.76 6h8.48a1 1 0 0 1 .964.732l1.285 4.628a1 1 0 0 0 1.213.7l4.651-1.2a1 1 0 0 1 1.116.468l4.24 7.344a1 1 0 0 1-.153 1.2L38.193 23.3a1 1 0 0 0 0 1.402l3.364 3.427a1 1 0 0 1 .153 1.2l-4.24 7.344a1 1 0 0 1-1.116.468l-4.65-1.2a1 1 0 0 0-1.214.7l-1.285 4.628a1 1 0 0 1-.964.732h-8.48a1 1 0 0 1-.963-.732L17.51 36.64a1 1 0 0 0-1.213-.7l-4.65 1.2a1 1 0 0 1-1.116-.468l-4.24-7.344a1 1 0 0 1 .153-1.2L9.809 24.7a1 1 0 0 0 0-1.402l-3.364-3.427a1 1 0 0 1-.153-1.2l4.24-7.344a1 1 0 0 1 1.116-.468l4.65 1.2a1 1 0 0 0 1.213-.7l1.286-4.628Z"></path><path d="M30 24a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path></svg>'
    },
    'menu-fold': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M42 11H6M42 24H22M42 37H6M13.66 26.912l-4.82-3.118 4.82-3.118v6.236Z"></path></svg>'
    },
    'menu-unfold': {
      body: '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M6 11h36M22 24h20M6 37h36M8 20.882 12.819 24 8 27.118v-6.236Z"></path></svg>'
    },
    reload: {
      body: '<path fill="currentColor" d="M10.926 8.866A19.92 19.92 0 0 1 24 4c11.046 0 20 8.954 20 20c0 4.272-1.34 8.232-3.62 11.48L34 24h6A16 16 0 0 0 12.92 12.456zm26.148 30.268A19.92 19.92 0 0 1 24 44C12.954 44 4 35.046 4 24c0-4.272 1.34-8.232 3.62-11.48L14 24H8a16 16 0 0 0 27.08 11.544z"/>'
    },
    'table-size': {
      body: '<path d="M24 12V36M18 17 24 12 30 17M30 31 24 36 18 31" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 5H42" fill="none" stroke="currentColor" stroke-width="4"/><path d="M6 43H42" fill="none" stroke="currentColor" stroke-width="4"/>'
    },
    notice: {
      body: '<svg  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 18px;"><path d="M24 9c7.18 0 13 5.82 13 13v13H11V22c0-7.18 5.82-13 13-13Zm0 0V4M6 35h36m-25 7h14"></path></svg>'
    }
  }
}
