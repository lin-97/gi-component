<template>
  <div style="height: 500px">
    <el-splitter layout="vertical">
      <el-splitter-panel :size="50">
        <el-alert title="Info alert" type="info" :closable="false" />
      </el-splitter-panel>
      <el-splitter-panel>
        <gi-card
          title="卡片标题"
          bordered
          style="height: 100%"
          :body-style="{ overflowY: 'auto' }"
        >
          <template #extra>
            <el-space>
              <el-button type="primary">保存</el-button>
              <el-button>返回</el-button>
            </el-space>
          </template>
          <el-space wrap>
            <el-button v-for="i in 100" :key="i" type="primary"
              >
按钮{{ i }}
</el-button
            >
          </el-space>
        </gi-card>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>
