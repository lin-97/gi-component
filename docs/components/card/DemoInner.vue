<template>
  <gi-card title="卡片标题" inner>
    <template #extra>
      <el-space>
        <el-button type="primary">保存</el-button>
        <el-button>返回</el-button>
      </el-space>
    </template>
    <el-alert
      title="内嵌模式消除了左右内边距"
      type="primary"
      :closable="false"
    />
  </gi-card>
</template>
