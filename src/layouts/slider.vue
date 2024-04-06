<template>
  <MenuComponent
    :defaultActive="states.active"
    :defaultOpeneds="states.openIds"
    :resourceList="states.resourceList"
    :currentOpenRoute="commonStore.currentOpenRoute"
    :serviceName="routerPrefix"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue';
import type { IMenuList } from '@szhou/script-tools';
import { MenuComponent } from '@szhou/components';
import { useCommonStore } from '@/stores/common';
import { routerPrefix } from '@/constants/enums';
import data from './data';

const commonStore = useCommonStore();
const { resourceList } = data.data;

const states = reactive<{ active: string; openIds: string[]; resourceList: IMenuList[] }>({
  active: '',
  openIds: [],
  resourceList,
});

let activeKey = '';
const openIds: string[] = [];

watch(
  () => commonStore.currentOpenRoute,
  (newValue) => {
    findMenuDefaultKeys(resourceList, openIds, newValue);
    states.active = activeKey;
    states.openIds = [...openIds];
    openIds.length = 0;
  },
  { deep: true },
);

onMounted(() => {
  sortFunc(states.resourceList);
  findMenuDefaultKeys(resourceList, openIds, location.pathname.replace(routerPrefix, ''));
  states.active = activeKey;
  states.openIds = [...openIds];
  openIds.length = 0;
  commonStore.updateCurrentOpenRoute(activeKey);
});

function sortFunc(childList: IMenuList[]) {
  childList.forEach((item) => {
    if (Array.isArray(item.childList)) {
      sortFunc(item.childList);
    }
  });
  childList.sort((a, b) => a.sort - b.sort);
}

function findMenuDefaultKeys(resourceList: IMenuList[], openIds: string[], currentRoute: string): boolean {
  return resourceList.some((item) => {
    const path = item.menuUrl;
    // eslint-disable-next-line no-console
    if (path[0] !== '/') console.log('路由路径必须以/开头');
    if (path === currentRoute) {
      activeKey = path;
      return true;
    }
    if (Array.isArray(item.childList)) {
      openIds.push(item.id);
      return findMenuDefaultKeys(item.childList, openIds, currentRoute);
    }
    openIds.shift();
    return false;
  });
}

const handleSelect = (path: string) => {
  commonStore.updateCurrentOpenRoute(path);
};
</script>
