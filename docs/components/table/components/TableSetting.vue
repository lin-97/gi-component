<template>
  <div class="table-setting" :class="{ 'table-setting--fullscreen': isFullscreen }">
    <div class="table-setting__toolbar">
      <div class="table-setting__toolbar-left">
        <slot name="toolbar-left">
          <span class="table-setting__title">{{ title }}</span>
        </slot>
      </div>
      <el-space wrap :size="8">
        <el-tooltip content="斑马纹" placement="top">
          <el-switch v-model="stripe" size="small" />
        </el-tooltip>
        <el-tooltip content="刷新" placement="top">
          <el-button class="table-setting__icon-btn" bg text circle @click="emit('refresh')">
            <el-icon :size="14">
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="top">
          <el-button class="table-setting__icon-btn" bg text circle @click="toggleFullscreen">
            <el-icon :size="14">
              <ScaleToOriginal v-if="isFullscreen" />
              <FullScreen v-else />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip content="显示边框" placement="top">
          <el-button class="table-setting__icon-btn" bg text circle @click="toggleBorder">
            <el-icon :size="14">
              <Grid />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-dropdown trigger="click" @command="handleSizeCommand">
          <span class="el-dropdown-link">
            <el-tooltip content="表格尺寸" placement="top">
              <el-button class="table-setting__icon-btn" bg text circle>
                <el-icon :size="14">
                  <Switch />
                </el-icon>
              </el-button>
            </el-tooltip>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in TABLE_SIZE_OPTIONS" :key="item.label" :command="item.value"
                :class="{ 'is-active': item.value === size }">
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-popover v-if="showColumnSetting" placement="bottom-end" :width="180" trigger="click"
          transition="el-zoom-in-top">
          <template #reference>
            <el-button type="primary" bg text circle>
              <el-icon :size="14">
                <Setting />
              </el-icon>
            </el-button>
          </template>
          <div class="table-setting__popover">
            <el-scrollbar class="table-setting__draggable" max-height="200px" :wrap-style="{ overflowX: 'hidden' }">
              <VueDraggable v-model="settingColumnList" :animation="150" handle=".table-setting__drag-handle">
                <div v-for="item in settingColumnList" :key="item.key" class="table-setting__draggable-item">
                  <span class="table-setting__drag-handle">
                    <el-icon :size="16">
                      <Rank />
                    </el-icon>
                  </span>
                  <el-checkbox v-model="item.show" :disabled="item.disabled" class="table-setting__checkbox">
                    {{ item.title }}
                  </el-checkbox>
                  <div class="table-setting__pins">
                    <span class="table-setting__pin-btn" :class="{ 'is-active': item.fixedLeft }"
                      @click.stop="toggleFixedLeft(item.key)">
                      <el-icon :size="14">
                        <LocationFilled />
                      </el-icon>
                    </span>
                    <span class="table-setting__pin-btn table-setting__pin-btn--right"
                      :class="{ 'is-active': item.fixedRight }" @click.stop="toggleFixedRight(item.key)">
                      <el-icon :size="14">
                        <LocationFilled />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </VueDraggable>
            </el-scrollbar>
            <el-divider style="margin: 8px 0" />
            <el-button type="primary" size="small" style="width: 100%" @click="resetSettingColumns">
              <el-icon class="el-icon--left">
                <RefreshRight />
              </el-icon>
              重置
            </el-button>
          </div>
        </el-popover>
      </el-space>
    </div>
    <div class="table-setting__body">
      <slot :setting-columns="settingColumns" :is-fullscreen="isFullscreen" :table-props="tableProps" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnItem } from 'gi-component'
import {
  FullScreen,
  Grid,
  LocationFilled,
  Rank,
  RefreshRight,
  ScaleToOriginal,
  Setting,
  Switch
} from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

export interface TableSettingColumnItem {
  key: string
  title: string
  show: boolean
  disabled: boolean
  fixedLeft: boolean
  fixedRight: boolean
}

/** Element Plus 表格 size */
export type TableSettingSize = 'small' | 'default' | 'large'

interface TableSettingProps {
  title?: string
  columns?: TableColumnItem[]
  /** 不允许在列设置中切换显示/隐藏的列 key（仍可拖拽、固定） */
  disabledColumnKeys?: string[]
}

const props = withDefaults(defineProps<TableSettingProps>(), {
  title: '',
  columns: () => [],
  disabledColumnKeys: () => []
})

const emit = defineEmits<{
  refresh: []
}>()

const TABLE_SIZE_OPTIONS: { label: string, value: TableSettingSize }[] = [
  { label: '迷你', value: 'small' },
  { label: '中等', value: 'default' },
  { label: '大型', value: 'large' }
]

const stripe = ref(false)
const size = ref<TableSettingSize>('default')
const border = ref(true)
const isFullscreen = ref(false)

const tableProps = computed(() => ({
  stripe: stripe.value,
  border: border.value,
  size: size.value
}))

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

function toggleBorder() {
  border.value = !border.value
}

function handleSizeCommand(value: string | number | object) {
  size.value = value as TableSettingSize
}

/** 参与列设置（可拖拽 / 显隐 / 固定）的列；多选列不参与 */
function isColumnInSettingList(column: TableColumnItem): boolean {
  return column.type !== 'selection'
}

const showColumnSetting = computed(() => {
  const cols = props.columns ?? []
  return cols.some((c) => isColumnInSettingList(c))
})

function getColumnKey(column: TableColumnItem, index: number): string {
  if (column.prop != null && column.prop !== '')
    return String(column.prop)
  if (column.type)
    return `__type_${String(column.type)}_${index}__`
  if (typeof column.label === 'string' && column.label)
    return column.label
  return `__column_${index}__`
}

function columnTitle(column: TableColumnItem): string {
  const lab = column.label
  return typeof lab === 'string' ? lab : ''
}

const initialSettingColumns = computed<TableSettingColumnItem[]>(() => {
  const list = props.columns ?? []
  const out: TableSettingColumnItem[] = []
  list.forEach((column, index) => {
    if (!isColumnInSettingList(column))
      return
    const key = getColumnKey(column, index)
    const fixed = column.fixed
    out.push({
      key,
      title: columnTitle(column),
      show: true,
      disabled: props.disabledColumnKeys.includes(key),
      fixedLeft: fixed === 'left',
      fixedRight: fixed === 'right'
    })
  })
  return out
})

const settingColumnList = ref<TableSettingColumnItem[]>([])

function isColumnStructureMatch(
  user: TableSettingColumnItem[],
  initial: TableSettingColumnItem[]
): boolean {
  if (user.length === 0 || user.length !== initial.length)
    return false
  const initialKeys = new Set(initial.map((i) => i.key))
  const userKeys = new Set(user.map((i) => i.key))
  return initialKeys.size === userKeys.size && [...initialKeys].every((k) => userKeys.has(k))
}

const columnMap = computed(() => {
  const list = props.columns ?? []
  return new Map(list.map((col, index) => [getColumnKey(col, index), col]))
})

function resetSettingColumns() {
  settingColumnList.value = initialSettingColumns.value.map((i) => ({ ...i }))
}

function ensureSettingColumnList() {
  if (settingColumnList.value.length === 0 && initialSettingColumns.value.length > 0)
    settingColumnList.value = initialSettingColumns.value.map((i) => ({ ...i }))
}

function toggleFixedLeft(key: string) {
  ensureSettingColumnList()
  settingColumnList.value = settingColumnList.value.map((item) =>
    item.key === key ? { ...item, fixedLeft: !item.fixedLeft, fixedRight: false } : item
  )
}

function toggleFixedRight(key: string) {
  ensureSettingColumnList()
  settingColumnList.value = settingColumnList.value.map((item) =>
    item.key === key ? { ...item, fixedRight: !item.fixedRight, fixedLeft: false } : item
  )
}

watch(
  initialSettingColumns,
  (next) => {
    if (next.length === 0) {
      settingColumnList.value = []
      return
    }
    if (!isColumnStructureMatch(settingColumnList.value, next))
      settingColumnList.value = next.map((i) => ({ ...i }))
  },
  { immediate: true }
)

/** 多选列始终保留在表格中，且不参与列设置列表；按原始 columns 顺序排在最前 */
const selectionColumnsPrefix = computed(() => {
  const cols = props.columns ?? []
  return cols.filter((c) => c.type === 'selection') as TableColumnItem[]
})

const settingColumns = computed<TableColumnItem[]>(() => {
  const cols = props.columns ?? []
  if (!cols.length)
    return []

  const prefix = selectionColumnsPrefix.value

  if (!settingColumnList.value.length)
    return prefix.length ? [...prefix] : []

  const shown = settingColumnList.value.filter((item) => item.show)
  const leftFixed: typeof shown = []
  const noFixed: typeof shown = []
  const rightFixed: typeof shown = []
  for (const item of shown) {
    if (item.fixedLeft)
      leftFixed.push(item)
    else if (item.fixedRight)
      rightFixed.push(item)
    else
      noFixed.push(item)
  }
  const ordered = [...leftFixed, ...noFixed, ...rightFixed]

  const body = ordered
    .map((item) => {
      const col = columnMap.value.get(item.key)
      if (!col)
        return null
      const fixed = item.fixedRight ? 'right' : item.fixedLeft ? 'left' : undefined
      return { ...col, fixed } as TableColumnItem
    })
    .filter(Boolean) as TableColumnItem[]

  return [...prefix, ...body]
})
</script>

<style lang="scss" scoped>
.table-setting {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: var(--el-bg-color);

  &__title {
    font-size: 15px;
    font-weight: 600;
    line-height: 32px;
    color: var(--el-text-color-primary);
  }

  &--fullscreen {
    position: fixed;
    inset: 0;
    z-index: 2000;
    padding: 12px;
    box-sizing: border-box;
  }

  &__toolbar {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__toolbar-left {
    flex: 1;
    min-width: 0;
  }

  &__body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  &__popover {
    padding: 4px 2px 2px;
  }

  &__draggable {
    box-sizing: border-box;
    padding: 2px 0;
    box-sizing: border-box;

    :deep(.el-scrollbar__wrap) {
      overflow-x: hidden !important;
    }

    :deep(.el-scrollbar__view) {
      box-sizing: border-box;
      min-width: 0;
      overflow-x: hidden;
    }
  }

  &__draggable-item {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    cursor: pointer;
    border-radius: var(--el-border-radius-small);
    box-sizing: border-box;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  &__drag-handle {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    color: var(--el-text-color-secondary);
    cursor: move;
  }

  &__checkbox {
    flex: 1;
    min-width: 0;
    margin-right: 4px;
    font-size: 12px;

    :deep(.el-checkbox__label) {
      font-size: 12px;
      color: var(--el-text-color-regular);
    }
  }

  :deep(.el-checkbox.is-disabled .el-checkbox__label) {
    color: var(--el-text-color-placeholder);
  }

  &__pins {
    display: flex;
    flex-shrink: 0;
    gap: 2px;
    align-items: center;
    margin-left: auto;
    padding-right: 10px;
  }

  &__pin-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    color: var(--el-text-color-placeholder);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--el-text-color-secondary);
    }

    &.is-active {
      color: var(--el-color-primary);
    }

    &--right {
      transform: scaleX(-1);
    }
  }
}

:deep(.el-dropdown-menu__item.is-active) {
  font-weight: 600;
  color: var(--el-color-primary);
}
</style>
