# 更新日志

## v0.0.55 (2026-06-23)

修复 Button 自定义 `type`（upload / download / print 等）透传至 ElButton 导致控制台警告

Button 抽离 `CustomButtonType`，优化 `bindProps` 类型推导

修复 TableColumn 无效 `v-slots` 指令警告，列插槽改用 provide / inject 转发

修复 Table `append`、`empty` 插槽未转发至 ElTable 的问题

优化 Dialog / Drawer 命令式 API 销毁逻辑，防止重复卸载

Dialog 合并 info / success / warning / error 公共配置构建，收紧 `DialogOptions` 与 `update` 类型

Drawer 同步销毁逻辑优化，收紧 `DrawerOptions` 与 `update` 类型

EditTable 补全可移植的 EditTableProps 与组件实例类型导出

修复 EditTable 打包后 dist 类型生成问题

## v0.0.54 (2026-06-22)

新增 Comment 评论组件

## v0.0.53 (2026-06-18)

Dialog 新增 `showFullscreen` 属性控制全屏切换按钮显示

Drawer 自定义标题及图标关闭按钮

## v0.0.52 (2026-06-17)

修复 table 打包后泛型类型丢失问题，补全可移植的 TableProps 与事件类型

修复 form / table / dialog / drawer 的 dist 类型生成问题

## v0.0.50 (2026-06-16)

优化 npm 发布类型导出配置

useTable 重构为 `options + listAPI` 模式，文档示例迁移至 `_shared/hooks`

createBaseAPI 文档重构为 RESTful 风格，新增 `search` 接口说明及与 useTable 配合示例

::: danger 注意
TypeScript 全局组件类型引用路径变更：`gi-component/packages/components.d.ts` 已改为 `gi-component/global`
:::

## v0.0.49 (2026-06-11)

PageLayout 新增 `autoCollapse` 属性，支持根据容器宽度自动折叠/展开左侧面板

PageLayout 新增 `collapseBreakpoint` 属性，用于设置自动折叠断点阈值（单位 px）

Flex 新增 `full` 属性，为根元素添加 `flex--full` 类名，实现宽高 100%

## v0.0.48 (2026-05-29)

修复Button组件控制台报错问题

## v0.0.47 (2026-05-28)

NavTabs新增内容溢出自动出现左右滚动按钮

## v0.0.46 (2026-05-26)

修复NavTabs导航页签组件打包产物使用异常问题

## v0.0.45 (2026-05-25)

新增NavTabs导航页签组件

## v0.0.44 (2026-05-14)

::: danger 注意
该版本存在破坏性更新：内置全局css类名前缀从gi改为g，避免与组件类名冲突

如：gi-w-full 已改为 g-w-full
:::

## v0.0.43 (2026-05-14)

Flex组件justify和align支持start和end值

## v0.0.42 (2026-04-15)

Flex组件vertical属性改为column（兼容前版本）

Card组件修复size="small"下inner属性不生效的问题

## v0.0.41 (2026-03-24)

新增Tag标签组件

## v0.0.39 (2026-03-16)

新增Descriptions描述组件

## v0.0.38 (2026-03-13)

新增Flex组件

## v0.0.37 (2026-02-09)

优化Form组件，FormColumnItem的props里面的属性类型改为可选

## v0.0.36 (2026-02-05)

Card组件默认宽度设置为100%

Form组件，新增suffix属性

## v0.0.35 (2026-02-02)

::: danger 注意
去除了 --padding-x: 14px;--padding-x-small: 10px;--padding-y: 12px;--padding-y-small: 8px;等css内置变量
:::

Card组件的extra插槽默认使用el-space包裹

文档页面优化调整

## v0.0.33 (2026-01-31)

修复page-layout组件设置collapse为false还能拉伸问题

## v0.0.32 (2026-01-29)

修复Dialog.success、Dialog.waring、Dialog.error没有导出问题

删除内置useTable

## v0.0.27 (2026-01-26)

新增全局类名 .g-tool (类名作用请看示例)

createSelectDialog增强优化

::: danger 注意
Form组件存在破坏性更新：0.0.27版本之后，如果是用reactive定义，使用@update:model-value="Object.assign(form, $event)"配合来监听数据变化，如果是ref定义，可以直接使用v-model
:::

## v0.0.26 (2025-12-15)

Table组件的pagination属性支持boolean类型

Table组件修复默认值

Table组件补充插槽类型提示

Button组件类型样式调整

## v0.0.22 (2025-12-12)

新增类名.g-flex-column

## v0.0.21 (2025-12-09)

完善Form组件类型

## v0.0.20 (2025-11-28)

新增Dot组件

## v0.0.18 (2025-11-27)

树穿梭框组件优化
Form组件分组标题优化

## v0.0.16 (2025-11-26)

新增Dialog.info函数、Dialog.success函数、Dialog.warning函数、Dialog.error函数

## v0.0.13 (2025-11-25)

优化input-group组件

## v0.0.12 (2025-11-21)

新增函数Drawer抽屉

## v0.0.11 (2025-11-21)

新增抽屉Drawer组件

## v0.0.10 (2025-11-20)

组件内部element plus组件导入优化

## v0.0.9 (2025-09-26)

修复Form校验没有显示校验错误信息

## v0.0.8 (2025-09-22)

代码格式化
文档修复
文档修复
createBaseAPI封装参考示例

## v0.0.7 (2025-09-12)

组件的类型优化

## v0.0.6 (2025-09-12)

Form组件新增表单控制属性fc

## v0.0.5 (2025-09-11)

新增useTable组合函数

## v0.0.4 (2025-09-11)

编辑表格EditTable配置属性columns数据结构调整

## v0.0.3 (2025-09-11)

createSelectDialog支持更多入参

## v0.0.2 (2025-09-10)

构建调整

## v0.0.1 (2025-09-10)

第一次发版
