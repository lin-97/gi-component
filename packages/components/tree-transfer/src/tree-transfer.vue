<template>
  <div class="el-transfer">
    <div class="el-transfer-panel">
      <div class="el-transfer-panel__header" @click="handleLeftAllChecked">
        <ElCheckbox class="hide-checkbox" :model-value="leftAllChecked">
          {{ props.titles[0] }}<span>{{ `${leftObj.checkedKeys.length}/${leftObj.total}`
          }}</span>
        </ElCheckbox>
      </div>
      <div class="el-transfer-panel__body">
        <ElScrollbar>
          <ElTree ref="treeRef" :data="leftTreeData" default-expand-all show-checkbox v-bind="props.treeProps"
            @check="handleCheck" />
        </ElScrollbar>
      </div>
    </div>

    <div class="el-transfer__buttons">
      <ElSpace>
        <ElButton type="primary" :disabled="!rightObj.checkedKeys.length" @click="handleMoveLeft">
          <ElIcon>
            <ArrowLeft />
          </ElIcon>
        </ElButton>
        <ElButton type="primary" :disabled="!leftObj.checkedKeys.length" @click="handleMoveRight">
          <ElIcon>
            <ArrowRight />
          </ElIcon>
        </ElButton>
      </ElSpace>
    </div>

    <div class="el-transfer-panel">
      <div class="el-transfer-panel__header" @click="handleRightAllChecked">
        <ElCheckbox :model-value="rightAllChecked">
          {{ props.titles[1] }}<span>{{ `${rightObj.checkedKeys.length}/${rightObj.options.length}`
          }}</span>
        </ElCheckbox>
      </div>
      <div class="el-transfer-panel__body">
        <ElScrollbar>
          <ElCheckboxGroup v-if="rightObj.options.length" v-model="rightObj.checkedKeys"
            class="el-transfer-panel__list">
            <ElCheckbox v-for="(item, index) in rightObj.options" :key="index" :label="item.label" :value="item.value"
              class="el-transfer-panel__item" />
          </ElCheckboxGroup>
          <ElEmpty v-else :image-size="60"></ElEmpty>
        </ElScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxOption, TreeInstance } from 'element-plus'
import type { PropType } from 'vue'
import type { TreeTransferProps } from './type'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElButton, ElCheckbox, ElCheckboxGroup, ElEmpty, ElIcon, ElScrollbar, ElSpace, ElTree } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import pkg from 'xe-utils'
import { filterTree } from './utils'

// 右边的列表keys
const selectedKeys = defineModel('selectedKeys', { type: Array as PropType<string[]>, default: () => [] })

const props = withDefaults(defineProps<TreeTransferProps>(), {
  titles: () => ['列表', '列表'],
  data: () => [],
  treeProps: () => ({})
})

const { eachTree } = pkg

const treeRef = ref<TreeInstance | null>(null)
const nodeKey = computed(() => props.treeProps?.nodeKey || 'id')

const leftObj = reactive({
  checkedKeys: [] as string[],
  total: 0,
  options: [] as CheckboxOption[]
})
const rightObj = reactive({
  checkedKeys: [] as string[],
  options: [] as CheckboxOption[]
})

const leftAllChecked = computed(() => {
  const arr: string[] = []
  eachTree(props.data, (i) => {
    if (i.children === undefined) {
      arr.push(i[nodeKey.value])
    }
  })
  return arr.every((i) => leftObj.checkedKeys.includes(i))
})

const getLeftTreeNodes = () => {
  const arr: any[] = []
  eachTree(props.data, (i) => {
    if (i.children === undefined) {
      arr.push(i)
    }
  })
  return arr
}

function handleLeftAllChecked() {
  if (leftAllChecked.value) {
    leftObj.checkedKeys = []
    leftObj.options = []
    treeRef.value?.setCheckedKeys([])
  } else {
    const arr = getLeftTreeNodes()
    leftObj.checkedKeys = arr.map((i) => i[nodeKey.value])
    leftObj.options = arr.map((i) => ({ label: i.label, value: i[nodeKey.value] }))
    treeRef.value?.setCheckedKeys(leftObj.checkedKeys)
  }
}

const rightAllChecked = computed(() => rightObj.checkedKeys.length === rightObj.options.length && rightObj.options.length !== 0)
function handleRightAllChecked() {
  if (rightAllChecked.value) {
    rightObj.checkedKeys = []
  } else {
    rightObj.checkedKeys = rightObj.options.map((i) => i.value as string)
  }
}

const leftTreeData = computed(() => {
  const treeData = JSON.parse(JSON.stringify(props.data))
  const rightListKeys = rightObj.options.map((i) => i.value)
  const data = filterTree(treeData, (i: any) => !rightListKeys.includes(i[nodeKey.value]))
  return data
})

const handleCheck = (data: any, obj: any) => {
  console.log(data, obj)
  leftObj.checkedKeys = obj.checkedNodes.filter((i: any) => i?.children === undefined).map((j: any) => j[nodeKey.value])
  leftObj.options = obj.checkedNodes.filter((i: any) => i?.children === undefined).map((j: any) => ({ label: j.label, value: j[nodeKey.value] }))
  // leftObj.checkedKeys = obj.checkedNodes.map((i: any) => i[nodeKey.value])
  // leftObj.options = obj.checkedNodes.map((j: any) => ({ label: j.label, value: j[nodeKey.value] }))
}

function getLeftTotal() {
  const data: any[] = []
  eachTree(props.data, (i) => {
    if (i.children === undefined) {
      data.push(i[props?.treeProps?.nodeKey || 'id'])
    }
  })
  return data.length
}

const handleMoveLeft = () => {
  if (rightObj.checkedKeys.length) {
    leftObj.checkedKeys = []
    leftObj.options = []
    rightObj.options = rightObj.options.filter((i) => !rightObj.checkedKeys.includes(i.value as string))
    rightObj.checkedKeys = []
    selectedKeys.value = rightObj.options.map((i) => i.value as string)
    treeRef.value?.setCheckedKeys([])
  }
}

const handleMoveRight = () => {
  rightObj.options = [...rightObj.options, ...leftObj.options]
  leftObj.checkedKeys = []
  leftObj.options = []
  selectedKeys.value = rightObj.options.map((i) => i.value as string)
}

// 获取初始选中
const setInitChecked = () => {
  const arr: CheckboxOption[] = []
  eachTree(props.data, (i) => {
    if (selectedKeys.value.includes(i[nodeKey.value] as string)) {
      arr.push({ label: i.label, value: i[nodeKey.value] as string })
    }
  })
  rightObj.options = arr
}

onMounted(() => {
  leftObj.total = getLeftTotal()
  setInitChecked()
})
</script>

<style lang="scss" scoped>
.el-transfer-panel__list {
  height: auto;
}
</style>
