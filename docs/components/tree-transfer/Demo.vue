<template>
  <gi-tree-transfer v-model:selected-keys="selectedKeys" :titles="['左列表', '右列表']" :data="data"
    :tree-props="treeProps"></gi-tree-transfer>
  <div>{{ selectedKeys }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { data } from './data'

const treeProps = {
  nodeKey: 'id'
}

const selectedKeys = ref<string[]>([])
</script>
