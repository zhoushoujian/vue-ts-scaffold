<template>
  <div :class="projectClassContainer" style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <!-- todo -->
    <div class="qiankun-header-top">
      <div>服务热线：021-80339150(工作日 周一到周五 9:00-18:00</div>
      <div class="qiankun-menu">
        <div class="qiankun-item">
          <el-icon><Document /></el-icon>
          <span>待办</span>
        </div>
        <div class="qiankun-item">
          <el-icon><Bell /></el-icon>
          <span>消息</span>
        </div>
        <div class="qiankun-item">
          <el-icon><User /></el-icon>
          <span>您好，Charm</span>
        </div>
        <div class="qiankun-item">
          <el-icon><HomeFilled /></el-icon>
          <span>门户官网</span>
        </div>
        <div class="qiankun-item" @click="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出</span>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: calc(100% - 40px); display: flex">
      <aside class="qiankun-aside" style="width: 200px; height: 100%; background: #000">
        <Slider />
      </aside>
      <div class="qiankun-right-container" style="width: calc(100% - 200px)">
        <div
          style="
            width: 100%;
            height: 100%;
            background-color: #e7ebf4;
            padding: 12px;
            overflow: hidden;
            display: flex;
            padding: 12px;
          "
        >
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router';
import { Document, Bell, User, HomeFilled, SwitchButton } from '@element-plus/icons-vue';
import { routerPrefix } from '@/constants/enums';
// import { onMounted, onUnmounted } from 'vue';
// import { dealWithUserEvent } from '@/utils/request';
import Slider from './slider.vue';

const projectClassContainer = routerPrefix.slice(0).split('/').join('-');

// const EVENT_NAMES = ['mousedown', 'keydown', 'click', 'resize', 'scroll', 'mouseover'];

//todo - 如果作为子应用，将这些注释删除，如果作为主应用，将注释打开
// onMounted(() => {
//   EVENT_NAMES.forEach((event) => {
//     window.addEventListener(event, dealWithUserEvent);
//   });
// });

// onUnmounted(() => {
//   EVENT_NAMES.forEach((event) => {
//     window.removeEventListener(event, dealWithUserEvent);
//   });
// });

const router = useRouter();
const logout = () => {
  router.push('/login');
};
</script>

<style lang="scss" scoped>
//todo
.qiankun-header-top {
  height: 40px;
  line-height: 40px;
  background: #36292f;
  color: #fffef8;
  padding: 0 24px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  .qiankun-menu {
    display: flex;
    gap: 32px;
  }
  .qiankun-item {
    cursor: pointer;
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .qiankun-icon {
    font-size: 18px;
  }
}
.qiankun-aside {
  :deep(ul) {
    height: 100%;
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 100%;
}

/*定义滚动条的轨道，内阴影及圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/*定义滑块，内阴影及圆角*/
::-webkit-scrollbar-thumb {
  // position: relative;
  width: 10px;
  height: 20px;
  background-color: #ccc;
  border-radius: 4px;
}
</style>
