<template>
  <div>
    <el-row justify="end" style="margin-bottom: 8px">
      <el-space>
        <el-button type="success" @click="disabled = !disabled">禁用</el-button>
        <el-button type="primary" @click="onAddRow">新增</el-button>
      </el-space>
    </el-row>
    <gi-edit-table ref="EditTableRef" :columns="columns" :data="data" :max-height="400" :disabled="disabled">
      <template #action="{ $index }">
        <el-row justify="center" style="width: 100%">
          <el-button size="small" type="danger" @click="onDelete($index)">删除</el-button>
        </el-row>
      </template>
    </gi-edit-table>
    <el-row justify="end" style="margin-top: 8px">
      <el-button type="primary" @click="submit">校验并提交</el-button>
    </el-row>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
import type { EditTableColumnItem } from 'gi-component'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'

const disabled = ref(false)
const EditTableRef = ref()

const data = ref<any[]>([
  {
    id: '001',
    name: '张三',
    phone: '13800000000',
    status: '1',
    rate: 3,
    num: 3.14,
    remark: '这是备注'
  }
])

const columns = computed(() => {
  return [
    {
      type: 'input',
      label: '姓名',
      prop: 'name',
      required: true,
      width: 200
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'phone',
      required: true,
      width: 200
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      componentProps: {
        options: [
          { label: '启用', value: '1' },
          { label: '禁用', value: '0' }
        ]
      },
      width: 120
    },
    {
      type: 'rate',
      label: '评分',
      prop: 'rate',
      width: 150
    },
    {
      type: 'input-number',
      label: '小数',
      prop: 'num',
      width: 150
    },
    {
      type: 'input',
      label: '备注',
      prop: 'remark',
      width: 200
    },
    {
      type: '',
      label: '操作',
      prop: 'action',
      slotName: 'action',
      columnProps: {
        width: 100,
        align: 'center',
        fixed: 'right'
      }
    }
  ] as EditTableColumnItem[]
})

const onAddRow = () => {
  data.value.push({
    name: '',
    phone: '',
    status: '',
    rate: 0,
    num: 0,
    remark: ''
  })
}

const submit = async () => {
  try {
    await EditTableRef.value?.formRef?.validate()
    ElMessage.success('校验成功')
  } catch (error) {
    const data: any[] = Object.values(error as any)
    if (data.length) {
      ElMessage.warning(data[0][0].message)
    }
  }
}

const onDelete = (index: number) => {
  data.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
pre {
  font-size: 12px;
  margin-top: 8px;
  background-color: #f5f5f5;
  line-height: 1;
}
</style>
