<template>
  <div class="demo">
    <gi-nav-tabs v-model="activeValue" :data="tabList" custom>
      <template #left-extra>
        <el-button size="small" type="primary">左插槽</el-button>
      </template>
      <template #default="{ item, active, disabled }">
        <el-dropdown :ref="(el) => setDropdownRef(item.value, el)" trigger="contextmenu" :disabled="disabled"
          @visible-change="(visible) => handleContextMenuVisible(visible, item.value)">
          <el-check-tag :checked="active" :disabled="disabled">
            <el-space :size="4">
              <span>{{ item.label }}</span>
              <div class="close-btn" @click.stop>
                <el-icon>
                  <Close />
                </el-icon>
              </div>
            </el-space>
          </el-check-tag>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>关闭左侧</el-dropdown-item>
              <el-dropdown-item>关闭右侧</el-dropdown-item>
              <el-dropdown-item>关闭其他</el-dropdown-item>
              <el-dropdown-item>关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #right-extra>
        <el-button size="small" type="primary">右插槽</el-button>
      </template>
    </gi-nav-tabs>
  </div>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'
import type { NavTabItem } from 'gi-component'
import { Close } from '@element-plus/icons-vue'
import { ref } from 'vue'

const activeValue = ref('1')

const dropdownRefMap = new Map<string | number, DropdownInstance>()

function setDropdownRef(value: string | number, el: unknown) {
  if (el) {
    dropdownRefMap.set(value, el as DropdownInstance)
  } else {
    dropdownRefMap.delete(value)
  }
}

/** 新开页签右键菜单时，关闭其它页签已打开的菜单 */
function handleContextMenuVisible(visible: boolean, value: string | number) {
  if (!visible) {
    return
  }
  dropdownRefMap.forEach((inst, key) => {
    if (key !== value) {
      inst.handleClose()
    }
  })
}

const tabList = ref<NavTabItem[]>([
  { label: '工作台', value: '1' },
  { label: '分析页', value: '2' },
  { label: '图表页', value: '3', disabled: true },
  { label: '配置页', value: '4' },
  { label: '个人中心', value: '5' },
  { label: '系统日志', value: '6' },
  { label: '帮助文档', value: '7' },
  { label: '关于我们', value: '8' },
  { label: '联系我们', value: '9' },
  { label: '反馈建议', value: '10' },
  { label: '隐私政策', value: '11' },
  { label: '用户协议', value: '12' },
  { label: '条款说明', value: '13' },
  { label: '常见问题', value: '14' },
  { label: '使用指南', value: '15' },
  { label: '更新日志', value: '16' },
  { label: '版本历史', value: '17' },
  { label: '系统设置', value: '18' },
  { label: '用户管理', value: '19' },
  { label: '权限管理', value: '20' },
  { label: '角色管理', value: '21' },
  { label: '日志管理', value: '22' }
])
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  border: 1px solid var(--el-border-color);
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;

  :deep(.el-check-tag) {
    font-size: 12px;
  }

  :deep(.el-check-tag:not(.is-disabled):not(.is-checked)) {
    color: var(--el-text-color-primary);
  }
}

.close-btn {
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  cursor: pointer;

  &:hover {
    color: var(--el-color-white);
    background-color: var(--el-color-info);
  }
}
</style>
