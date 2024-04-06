<!-- 自动跳往有权限的第一个页面 -->
<template>
  <div></div>
</template>

<script lang="ts" setup>
import { recursiveMenuPath } from '@szhou/script-tools';
import type { IMenuList } from '@szhou/script-tools';
import { onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import data from '@/layouts/data';

const commonStore = useCommonStore();

onMounted(() => {
  const { resourceList } = data.data;
  sortFunc(resourceList);
  const obj = { path: '' };
  recursiveMenuPath(resourceList, obj);
  commonStore.updateCurrentOpenRoute(obj.path);
});

function sortFunc(childList: IMenuList[]) {
  childList.forEach((item) => {
    if (Array.isArray(item.childList)) {
      sortFunc(item.childList);
    }
  });
  childList.sort((a, b) => a.sort - b.sort);
}
</script>
