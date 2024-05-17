<template>
  <MenuComponent
    :defaultOpeneds="states.openIds"
    :resourceList="states.resourceList"
    :currentOpenRoute="commonStore.currentOpenRoute"
    :serviceName="routerPrefix"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import type { IMenuList } from '@szhou/script-tools';
import { MenuComponent } from '@szhou/components';
import { useCommonStore } from '@/stores/common';
import { routerPrefix } from '@/constants/enums';
import data from './data';

const route = useRoute();
const commonStore = useCommonStore();
const { resourceList } = data.data;
const states = reactive<{ openIds: string[]; resourceList: IMenuList[] }>({
  openIds: [],
  resourceList,
});

const openIds: string[] = [];
let activeKey = '';

watch(
  () => commonStore.currentOpenRoute,
  (newValue) => {
    if (newValue) {
      findMenuDefaultKeysFunc(newValue);
    }
  },
);

watch(
  () => route.path,
  (newValue) => {
    //监听路由路径是否发生变化
    if (route.meta?.activeRoutePath) {
      const path = route.meta.activeRoutePath as string;
      commonStore.updateCurrentOpenRoute(path, false);
      findMenuDefaultKeysFunc(path);
    } else {
      commonStore.updateCurrentOpenRoute(newValue, true);
    }
  },
  { immediate: true },
);

//模拟动态设置菜单的场景
// watch(
//   () => commonStore.openChannelList,
//   (newValue) => {
//     if (!newValue.includes(1)) {
//       states.resourceList = states.resourceList.filter((item: any) => {
//         return item.menuCode !== 'registrationManagement' && item.menuCode !== 'bidding-management';
//       });
//     } else {
//       states.resourceList = moduleMenus.tradingMarket || [];
//     }
//   },
//   { deep: true, immediate: true },
// );

watchEffect(() => {
  sortFunc(states.resourceList);
  const path = commonStore.currentOpenRoute || location.pathname.replace(routerPrefix, '');
  findMenuDefaultKeysFunc(path);
  commonStore.updateCurrentOpenRoute(activeKey, false);
});

function sortFunc(childList: IMenuList[]) {
  childList.forEach((item) => {
    if (Array.isArray(item.childList)) {
      sortFunc(item.childList);
    }
  });
  childList.sort((a, b) => a.sort - b.sort);
}

function findMenuDefaultKeysFunc(path: string) {
  findMenuDefaultKeys(states.resourceList, openIds, path);
  states.openIds = [...openIds];
  openIds.length = 0;
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
      const result = findMenuDefaultKeys(item.childList, openIds, currentRoute);
      if (result) {
        openIds.push(item.id);
      }
      return result;
    }
    return false;
  });
}

const handleSelect = (path: string) => {
  commonStore.updateCurrentOpenRoute(path, true);
};
</script>
