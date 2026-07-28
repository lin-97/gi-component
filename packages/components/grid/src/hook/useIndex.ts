import type { Ref } from 'vue'
import { computed, onMounted, onUpdated, ref, watch } from 'vue'

function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined
}

/**
 * 根据 DOM 在父节点中的位置计算子项索引
 * 优先使用外部传入的 index；未传入时通过 selector 查询同级节点顺序
 */
export function useIndex({
  itemRef,
  selector,
  index,
  parentClassName
}: {
  itemRef: Ref<HTMLElement | undefined>
  selector: string
  index?: Ref<number | undefined>
  parentClassName?: string
}) {
  const _index = ref(-1)
  const computedIndex = computed(() => index?.value ?? _index.value)

  const parent = ref<HTMLElement>()

  /** 向上查找父容器；可按 className 过滤嵌套场景 */
  const getParent = () => {
    let parentEl = itemRef.value?.parentElement ?? undefined
    if (parentClassName) {
      while (parentEl && !parentEl.className.includes(parentClassName)) {
        parentEl = parentEl.parentElement ?? undefined
      }
    }
    return parentEl
  }

  /** 通过 querySelectorAll 计算当前节点在同级列表中的下标 */
  const getIndex = () => {
    if (isUndefined(index?.value) && parent.value && itemRef.value) {
      const nextIndex = Array.from(parent.value.querySelectorAll(selector)).indexOf(
        itemRef.value
      )
      if (nextIndex !== _index.value) {
        _index.value = nextIndex
      }
    }
  }

  watch(itemRef, () => {
    if (itemRef.value && !parent.value) {
      parent.value = getParent()
    }
  })

  onMounted(() => {
    if (itemRef.value) {
      parent.value = getParent()
    }
    getIndex()
  })

  // 子节点增删后重新计算索引
  onUpdated(() => getIndex())

  return {
    computedIndex
  }
}
