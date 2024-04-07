<template>
  <div class="micro-container">
    <div
      v-if="commonStore.microAppLoading"
      v-loading="commonStore.microAppLoading"
      class="loading-container"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    ></div>
    <div :id="containerId"></div>
  </div>
</template>

<script setup>
import { start, registerMicroApps } from 'qiankun';
import { onMounted } from 'vue';
import { backToLoginFunc } from '@/utils/common';
import { useCommonStore } from '@/stores/common';

const containerId = '__qiankun_micro-app-page-container__';

const commonStore = useCommonStore();
const { updateMicroAppLoading } = commonStore;

onMounted(() => {
  start();
});

registerMicroApps(
  [
    //todo
    {
      name: 'payment',
      entry: `/payment/`,
      container: `#${containerId}`,
      activeRule: '/portal/payment',
      props: {
        payment: {
          backToLoginFunc,
        },
      },
    },
  ],
  {
    beforeLoad: () => {
      updateMicroAppLoading(true);
      return Promise.resolve();
    },
    afterMount: () => {
      return Promise.resolve().then(() => {
        setTimeout(() => {
          updateMicroAppLoading(false);
        }, 1500);
      });
    },
  },
);

onMounted(() => {
  start();
});
</script>

<style scoped lang="scss">
.micro-container {
  width: 100%;
  height: 100%;
  .loading-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  #__qiankun_micro-app-page-container__ {
    width: 100%;
    height: 100%;
  }
}
</style>
