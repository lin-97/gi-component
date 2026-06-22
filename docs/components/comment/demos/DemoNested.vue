<template>
  <gi-comment
    author="张三"
    datetime="2 天前"
    content="我们提供一系列设计原则、实用模式以及高质量的设计资源（Sketch 和 Axure）"
    avatar="https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
  >
    <template #actions>
      <span class="comment-action">回复</span>
    </template>
    <gi-comment
      author="李四"
      datetime="1 天前"
      content="我们提供一系列设计原则、实用模式以及高质量的设计资源（Sketch 和 Axure）"
      avatar="https://s1.ax1x.com/2022/06/14/XhtSwF.jpg"
    >
      <template #actions>
        <span class="comment-action">回复</span>
      </template>
      <gi-comment
        author="王五"
        datetime="12 小时前"
        content="我们提供一系列设计原则、实用模式以及高质量的设计资源（Sketch 和 Axure）"
        avatar="https://s1.ax1x.com/2022/06/14/XhteeO.jpg"
      >
        <template #actions>
          <span class="comment-action">回复</span>
        </template>
      </gi-comment>
      <gi-comment
        author="赵六"
        datetime="6 小时前"
        content="我们提供一系列设计原则、实用模式以及高质量的设计资源（Sketch 和 Axure）"
        avatar="https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      >
        <template #actions>
          <span class="comment-action">回复</span>
        </template>
      </gi-comment>
    </gi-comment>
  </gi-comment>
</template>

<style lang="scss" scoped>
.comment-action {
  cursor: pointer;
}
.comment-action:hover {
  color: var(--el-color-primary);
}
</style>
