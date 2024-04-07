<template>
  <div class="login-component">
    <div class="login-page-wrap">
      <div class="login-main-login">
        <div class="login-subtitle">用户登录</div>
        <div class="login-form-wrap">
          <el-form ref="formRef" :model="validateForm" label-width="0">
            <el-form-item label="" prop="username" :rules="[{ required: true, message: '请输入登录名' }]">
              <el-input
                v-model="validateForm.username"
                prefix-icon="el-icon-user"
                type="text"
                autocomplete="off"
                placeholder="登录名"
              />
            </el-form-item>
            <el-form-item label="" prop="password" :rules="[{ required: true, message: '请输入密码' }]">
              <el-input
                v-model="validateForm.password"
                prefix-icon="el-icon-lock"
                :show-password="true"
                type="password"
                autocomplete="off"
                placeholder="密码"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="submitForm(formRef)">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { Message } from 'element-ui';
import { VUE_APP_CLIENT_ID } from '@/constants/config';
import { getInfo, login } from '@/services/login';
import routers from '@/routers/index';
import { setAppId, setCorpId, setOrgId, setRefreshToken, setSecret, setToken, setUserInfo } from '@/utils/auth';

const formRef = ref();

const validateForm = reactive({
  username: '',
  password: '',
});

onMounted(() => {
  polyfillTest();
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const { username, password } = validateForm;
      login({
        username,
        password,
        loginType: 'password',
        clientId: VUE_APP_CLIENT_ID,
      }).then((res) => {
        if (res.rspCode !== '00000000') {
          Message.error('账号密码不正确');
          return undefined;
        } else {
          routers.push('/404');
          setToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          localStorage.setItem('aT', res.data.accessToken);
          localStorage.setItem('rT', res.data.refreshToken);
          setSecret(res.data.secret);
          return getInfo().then((res) => {
            if (res && res.rspCode === '00000000') {
              const user = res.data;
              setCorpId(user?.orgid || '');
              setAppId(user.appid);
              setOrgId(user.orgid);
              setUserInfo(user);
              localStorage.setItem('user', JSON.stringify(user));
            }
          });
        }
      });
    } else {
      return;
    }
  });
};

const polyfillTest = () => {
  //test polyfill,确保用户可以使用低版本的chrome
  //ES2015
  console.log('String.startsWith', 'Object'.startsWith);
  //ES2019
  console.log('Object.fromEntries', Object.fromEntries);
  //ES2020
  console.log('Promise.AllSettled', Promise.allSettled);
  console.log('null ?? 1', null ?? 1);
  //ES2021
  console.log('replaceAll', ''.replaceAll);
  console.log('Promise.any', Promise.any);
  //ES2022
  console.log('Object.hasOwn', Object.hasOwn);
  console.log('obj.hasOwnProperty', {}.hasOwnProperty);
  console.log('array.at', [].at);
  //ES2023
  //@ts-ignore
  console.log('findLast', [1, 2].findLast);
  //@ts-ignore
  console.log('toReversed', Array.prototype.toReversed);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
