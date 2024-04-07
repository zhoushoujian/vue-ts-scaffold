<template>
  <div class="http-code-container">
    <div class="http-code">
      <div class="pic-code">
        <img class="pic-code__parent" src="../../assets/403.png" alt="403" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">403错误!</div>
        <div class="bullshit__info">抱歉，你无权访问该页面</div>
        <router-link to="/login" class="bullshit__return-home"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
