# 更新日志

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

新增全局类名 .gi-tool (类名作用请看示例)

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

新增类名.gi-flex-column

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
