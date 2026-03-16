<template>
  <gi-card bordered title="用户信息">
    <template #extra>
      <el-button type="primary">编辑</el-button>
    </template>
    <gi-descriptions :columns="columns" :data="detail" border :column="2">
      <template #sex="{ value }">
        <ElTag :type="value === '男' ? 'primary' : 'danger'" size="small">{{ value }}</ElTag>
      </template>
    </gi-descriptions>
  </gi-card>
</template>

<script setup lang="ts">
import type { DescriptionsColumnItem } from 'gi-component'
import { ElSpace, ElTag } from 'element-plus'
import { h } from 'vue'

const columns: DescriptionsColumnItem[] = [
  { value: 'name', label: '姓名' },
  { value: 'tel', label: '电话' },
  { value: 'email', label: '邮箱' },
  { value: 'age', label: '年龄' },
  { value: 'sex', label: '性别' },
  { value: 'address', label: '地址' },
  { value: 'city', label: '城市' },
  { value: 'district', label: '区县' },
  {
    value: 'hobby',
    label: '爱好',
    render: ({ value }: { value: unknown }) =>
      h(
        ElSpace,
        null,
        () => (Array.isArray(value) ? value : [value]).map((item: string) =>
          h(ElTag, { type: 'primary', size: 'small' }, () => item)
        )
      )
  },
  { value: 'remark', label: '备注' }
]

const detail = {
  name: '张三',
  tel: '18100000000',
  address: '江苏省苏州市吴中区吴中大道 1188 号',
  email: '1234567890@qq.com',
  age: 18,
  sex: '男',
  city: '广州',
  district: '天河区',
  hobby: ['打篮球', '打游戏', '看书', '听音乐', '看电影'],
  remark: '这是一个备注'
}
</script>
