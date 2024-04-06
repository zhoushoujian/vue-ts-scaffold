<template>
  <!-- todo -->
  <el-config-provider :locale="zhCn" namespace="ep">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>
