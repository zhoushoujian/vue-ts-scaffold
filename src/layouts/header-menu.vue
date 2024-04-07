<template>
  <div class="qiankun-page-container">
    <div class="qiankun-header-top">
      <div>服务热线：021-80339150(工作日 周一到周五 9:00-18:00</div>
      <div class="qiankun-menu">
        <div class="qiankun-item">
          <i class="el-icon-s-order icon"></i>
          <span>待办</span>
        </div>
        <div class="qiankun-item">
          <i class="el-icon-bell icon"></i>
          <span>消息</span>
        </div>
        <div class="qiankun-item">
          <i class="el-icon-user icon"></i>
          <span>您好，{{ states.nickname }}</span>
        </div>
        <div class="qiankun-item">
          <i class="el-icon-s-home icon"></i>
          <span>门户官网</span>
        </div>
        <div class="qiankun-item" @click="logout">
          <i class="el-icon-switch-button icon"></i>
          <span>退出</span>
        </div>
      </div>
    </div>
    <el-menu
      :default-active="states.activeIndex"
      class="qiankun-el-menu-container"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img src="../assets/logo.png" height="100%" alt="Element logo" />
      </el-menu-item>
      <div class="qiankun-flex-grow" />
      <el-menu-item index="1">子应用1(占位)</el-menu-item>
      <el-menu-item index="payment">支付结算</el-menu-item>
    </el-menu>
    <div class="qiankun-main-container">
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import routers from '@/routers';

const states = reactive({
  activeIndex: '',
  nickname: '用户',
});

onMounted(() => {
  const { pathname } = location;
  if (pathname.startsWith('/portal/payment')) {
    states.activeIndex = 'payment';
  } else {
    states.activeIndex = '1';
  }
});

const user = localStorage.getItem('user');
try {
  if (user) {
    const userInfo = JSON.parse(user);
    states.nickname = userInfo.nickname;
  }
} catch (_err) {
  //
}

const handleSelect = (key, keyPath) => {
  // eslint-disable-next-line no-console
  console.log(key, keyPath);
  if (key === '1') {
    routers.push('/sso');
  } else if (key === 'payment') {
    routers.push('/payment/my-account');
  }
};

const logout = () => {
  routers.push('/login');
};
</script>

<style lang="scss" scoped>
.qiankun-page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  .qiankun-el-menu-container {
    width: 100%;
    height: 60px;
    display: flex;
    .qiankun-flex-grow {
      flex-grow: 1;
    }
  }
  .qiankun-main-container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
  }
}
</style>
