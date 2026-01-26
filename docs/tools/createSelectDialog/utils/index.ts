import type { UserItem } from '@docs/_apis/mockTable'
import { createSelectDialog } from 'gi-component'
import TreeTable from '../components/TreeTable.vue'

/**
 * 选择用户列表对话框
 * TreeTable组件需要暴露getSelectedData方法
 */
export const SelectUserListDialog = createSelectDialog<UserItem[]>({
  title: '选择用户',
  component: TreeTable,
  componentProps: {
    style: { height: '500px' }
  }
})
