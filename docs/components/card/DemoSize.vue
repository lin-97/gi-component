<template>
  <gi-card title="卡片标题" bordered size="small" class="gi-card-title">
    <template #extra>
      <el-button type="primary" size="small">保存</el-button>
      <el-button size="small">返回</el-button>
    </template>
    <el-space wrap>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-space>
    <template #footer>
      <el-alert title="Customized close text" type="info" close-text="Gotcha" />
    </template>
  </gi-card>
</template>
