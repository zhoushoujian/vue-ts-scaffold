<template>
  <div class="forget-password-container">
    <div class="page-content">
      <el-page-header @back="goBack">
        <template #title>返回登录</template>
        <template #content>
          <span class="text-large font-600 mr-3"> 重置密码 </span>
        </template>
      </el-page-header>
      <div class="form-container">
        <div class="form-content">
          <CustomFormComponent
            ref="newPassFormRef"
            :size="'default'"
            :formData="formData"
            :formCols="formCols.value"
            :rules="rules"
            :showFormLineButtons="false"
            :formVerticalRowGutter="16"
            @event="handleEvent"
          >
            <template v-slot:captchaImg>
              <img
                v-show="formData.captcha.key"
                :src="createImg(formData.captcha.image)"
                alt="'code'"
                @click="getCaptchaFunc"
              />
            </template>
          </CustomFormComponent>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <FooterComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { CustomFormComponent, IFormEventParam } from '@szhou/components';
import { validateMobilePhone, validateMsgCode, validatePassword, createFile } from '@szhou/script-tools';
import { InternalRuleItem } from 'async-validator';
import { VUE_APP_CLIENT_ID } from '@/constants/config';
import { getCaptcha } from '@/services/login';
import FooterComponent from '@/layouts/footer-component.vue';
import routers from '@/routers/index';

const newPassFormRef = ref<InstanceType<typeof CustomFormComponent>>();
const formData = reactive({
  userName: '',
  password: '',
  confirmPassword: '',
  msgCode: '',
  msgKey: '',
  channelCode: 'PROTAL_CORP',
  captcha: {
    image: '',
    key: '',
  },
});

const formCols = reactive({
  value: [
    [
      {
        eType: 'Input',
        placeholder: '请输入手机号码',
        label: '手机号码',
        prop: 'userName',

        span: 24,
        suffixIcon: '',
        labelWidth: 100,
      },
    ],
    [
      {
        eType: 'Input',
        placeholder: '请输入手机验证码',
        label: '手机验证码',
        prop: 'msgCode',
        span: 18,
        labelWidth: 100,
      },
      {
        eType: 'Button',
        value: '发送验证码',
        type: 'default',
        prop: 'sendMsg',
        span: 6,
        noFormItem: true,
      },
    ],
    [
      {
        eType: 'Input',
        placeholder: '请输入验证码',
        label: '验证码',
        prop: 'captchaCode',
        span: 18,
        labelWidth: 100,
      },
      {
        eType: 'slot',
        slotName: 'captchaImg',
        span: 6,
        noFormItem: true,
      },
    ],
    [
      {
        eType: 'Input',
        placeholder: '请输入新密码',
        type: 'password',
        label: '新密码',
        prop: 'password',
        span: 24,
        clearable: true,
        labelWidth: 100,
      },
    ],
    [
      {
        eType: 'Input',
        placeholder: '请输入确认密码',
        type: 'password',
        label: '确认密码',
        prop: 'confirmPassword',
        span: 24,
        clearable: true,
        labelWidth: 100,
      },
    ],
    [
      {
        eType: 'Button',
        value: '提交',
        label: '',
        type: 'primary',
        prop: 'submit',
        noFormItem: true,
        // loading: submitLoading,
        span: 24,
        style: 'width: 60%; margin: 0 auto',
        labelWidth: 100,
      },
    ],
  ],
});

onMounted(() => {
  getCaptchaFunc();
});

const compareToPassword = (_rule: InternalRuleItem, value: string, callback: Function) => {
  if (!value) {
    callback('请输入确认密码');
  } else if (value !== formData.password) {
    callback('两次输入的密码不一致');
  } else {
    callback();
  }
};

const rules = {
  userName: [{ validator: validateMobilePhone, trigger: 'blur', required: true }],
  password: [{ validator: validatePassword, trigger: 'blur', title: '登录密码', required: true }],
  confirmPassword: [{ validator: compareToPassword, trigger: 'blur', required: true }],
  msgCode: [{ validator: validateMsgCode, trigger: 'blur', required: true }],
  captchaCode: [{ required: true }],
};

const goBack = () => {
  routers.push('/login');
};

function handleEvent(params: IFormEventParam) {
  const { prop } = params;
  switch (prop) {
    case 'sendMsg':
      newPassFormRef.value?.validateField(['userName']).then((valid) => {
        // eslint-disable-next-line no-console
        console.log('valid', valid);
      });
      break;
    case 'submit':
      if (!formData.captcha.key) {
        ElMessage.error('请先获取验证码！');
        return;
      }
      // eslint-disable-next-line no-console
      console.log('formData', formData, 'params', params);
      ElMessage.success('提交成功');
      break;

    case 'backLogin':
      goBack();
      break;

    default:
      break;
  }
}

const getCaptchaFunc = () => {
  return getCaptcha({ clientId: VUE_APP_CLIENT_ID }).then((res) => {
    const { image, key } = res.data;
    formData.captcha.image = image;
    formData.captcha.key = key;
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
.forget-password-container {
  width: 100%;
  height: 100%;
  .page-content {
    padding: 36px;
    height: calc(100% - 280px);
    .form-container {
      width: 100%;
      margin: 36px 0;
      display: flex;
      justify-content: center;
      .form-content {
        width: 480px;
      }
    }
  }
}
</style>
