<template>
  <div class="login-component">
    <div class="login-page-wrap">
      <img class="login-logo" src="../../assets/logo.png" alt="" />
      <div class="login-main-login">
        <div class="login-subtitle">用户登录</div>
        <LoginCard
          :loginFunc="loginFunc"
          :showVerifyCode="true"
          :verifyCodeKey="validateForm.key"
          :verifyCodeSrc="createImg(validateForm.image)"
          :handleVerifyCodeImgClick="getCaptchaFunc"
        />
        <div class="actions">
          <RouterLink to="/forget-password">忘记密码？</RouterLink>
        </div>
      </div>
    </div>
    <div class="login-page-footer">
      <FooterComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { LoginCard } from '@szhou/components';
import { createFile } from '@szhou/script-tools';
import { useRouter } from 'vue-router';
import { IFormState } from '@szhou/components/dist/vue/base/login-card/index.vue.d';
import { getCaptcha, login } from '@/services/login';
import { VUE_APP_CLIENT_ID } from '@/constants/config';
import FooterComponent from '@/layouts/footer-component.vue';
import { encrypt } from '@/utils/common';

onMounted(() => {
  getCaptchaFunc();
});

const router = useRouter();

const validateForm = reactive<{
  image: string;
  key: string;
}>({
  image: '',
  key: '',
});

const loginFunc = (formState: IFormState) => {
  const { username, password, verifyCode } = formState;
  return login({
    username,
    password: encrypt(password) as string,
    channelCode: 'PROTAL_CORP',
    loginType: 'password',
    clientId: VUE_APP_CLIENT_ID,
    captchaCode: verifyCode,
    captchaKey: validateForm.key,
  }).then((res: any) => {
    if (res.data) {
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('expiresTime', (res.data.expiresIn * 1000 + Date.now()).toString());
    }
    const tempLocation = localStorage.getItem('tempLocation');
    if (tempLocation) {
      window.location.href = tempLocation;
      localStorage.removeItem('tempLocation');
    } else {
      router.push('/redirect');
    }
    // if (res.rspCode !== '00000000') {
    //   getCaptchaFunc();
    // }
  });
};

const getCaptchaFunc = () => {
  return getCaptcha({ clientId: VUE_APP_CLIENT_ID }).then((res) => {
    const { image, key } = res.data || {};
    validateForm.image = image;
    validateForm.key = key;
  });
};

const createImg = (params: string) => {
  if (params) {
    const file = createFile(params, true);
    return URL.createObjectURL(file!);
  } else {
    return undefined;
  }
};
</script>

<style lang="scss" scoped>
.login-component {
  height: 100%;
  width: 100%;

  .login-page-wrap {
    height: calc(100% - 280px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../../assets/login-bg.png');
    background-size: cover;
    .login-main-login {
      width: 320px;
      background-color: white;
      border-radius: 8px;
      position: absolute;
      right: 200px;
      padding: 0 24px;

      .login-subtitle {
        text-align: center;
        margin: 20px 0 20px 0;
        cursor: default;
        font-size: 18px;
        color: $primaryColor;
        padding: 8px 20px;
      }
      .actions {
        margin-bottom: 12px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .login-logo {
    position: absolute;
    left: 200px;
    top: 20px;
  }
}
</style>
