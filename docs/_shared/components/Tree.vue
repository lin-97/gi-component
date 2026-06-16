<template>
  <el-scrollbar max-height="100%">
    <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick" />
  </el-scrollbar>
</template>

<script lang="ts" setup>
interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '总公司',
    id: 'C1',
    children: [
      {
        label: '行政部',
        id: 'C1-1',
        children: [
          {
            label: '行政综合组',
            id: 'C1-1-1'
          },
          {
            label: '后勤保障组',
            id: 'C1-1-2'
          }
        ]
      },
      {
        label: '技术部',
        id: 'C1-2',
        children: [
          {
            label: '前端开发组',
            id: 'C1-2-1',
            children: [
              {
                label: 'Web前端小组',
                id: 'C1-2-1-1'
              },
              {
                label: '移动端小组',
                id: 'C1-2-1-2'
              }
            ]
          },
          {
            label: '后端开发组',
            id: 'C1-2-2',
            children: [
              {
                label: 'API开发小组',
                id: 'C1-2-2-1'
              },
              {
                label: '数据库小组',
                id: 'C1-2-2-2'
              }
            ]
          },
          {
            label: '测试组',
            id: 'C1-2-3'
          }
        ]
      },
      {
        label: '市场部',
        id: 'C1-3',
        children: [
          {
            label: '品牌推广组',
            id: 'C1-3-1'
          },
          {
            label: '渠道拓展组',
            id: 'C1-3-2'
          }
        ]
      }
    ]
  },
  {
    label: '分公司',
    id: 'C2',
    children: [
      {
        label: '销售一部',
        id: 'C2-1',
        children: [
          {
            label: '华东区域组',
            id: 'C2-1-1'
          },
          {
            label: '华南区域组',
            id: 'C2-1-2'
          }
        ]
      },
      {
        label: '销售二部',
        id: 'C2-2',
        children: [
          {
            label: '华北区域组',
            id: 'C2-2-1'
          },
          {
            label: '西部区域组',
            id: 'C2-2-2'
          }
        ]
      },
      {
        label: '客服部',
        id: 'C2-3',
        children: [
          {
            label: '售前咨询组',
            id: 'C2-3-1'
          },
          {
            label: '售后服务组',
            id: 'C2-3-2'
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}
</script>

<style lang="scss" scoped>
.tree {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
