<template>
  <gi-card title="卡片标题" bordered style="height: 400px" :body-style="{ overflowY: 'auto' }">
    <template #extra>
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </template>
    <el-space wrap>
      <el-button v-for="i in 100" :key="i" type="primary">
        按钮{{ i }}
      </el-button>
    </el-space>
  </gi-card>
</template>
