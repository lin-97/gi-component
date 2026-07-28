import type { Ref } from 'vue'
import type { ResponsiveValue } from '../type'
import type { ScreenMap } from '../utils/responsive-observe'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { isObject } from '../utils/is'
import ResponsiveObserve, { responsiveArray } from '../utils/responsive-observe'

function isResponsiveValue(
  val: number | ResponsiveValue
): val is ResponsiveValue {
  return isObject(val)
}

/**
 * 将 number | ResponsiveValue 解析为当前断点下的具体数值
 * @param val 响应式配置
 * @param defaultVal 未匹配到断点时的回退值
 * @param fallbackToXs 断点未命中时是否回退到 xs 配置
 */
export function useResponsiveState(
  val: Ref<number | ResponsiveValue>,
  defaultVal: number,
  fallbackToXs = false
) {
  const screens = ref<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true
  })

  const result = computed(() => {
    let res = defaultVal
    if (isResponsiveValue(val.value)) {
      // 按断点从大到小匹配第一个已激活且有配置的值
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i]
        if (
          (screens.value[breakpoint]
            || (breakpoint === 'xs' && fallbackToXs))
          && val.value[breakpoint] !== undefined
        ) {
          res = val.value[breakpoint] as number
          break
        }
      }
    } else {
      res = val.value
    }
    return res
  })

  let subscribeToken = ''

  onMounted(() => {
    subscribeToken = ResponsiveObserve.subscribe((screensVal) => {
      // 仅在值为响应式对象时同步屏幕状态，避免无意义更新
      if (isResponsiveValue(val.value)) {
        screens.value = screensVal
      }
    })
  })

  onUnmounted(() => {
    if (subscribeToken) {
      ResponsiveObserve.unsubscribe(subscribeToken)
    }
  })

  return result
}
