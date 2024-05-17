<template>
  <div class="page-content">
    <div>表单demo</div>
    <div class="form-container">
      <div class="form-content">
        <CustomFormComponent
          ref="formRef"
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
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { CustomFormComponent, useSendMsg } from '@szhou/components';
import { createFile, validateMobilePhone, validateMsgCode } from '@szhou/script-tools';
import { IFormEventParam, ISendMsgBtnType } from '@szhou/components/dist/vue/types/common';
import { VUE_APP_CLIENT_ID } from '@/constants/config';
import { getCaptcha } from '@/services/login';

defineOptions({ name: 'CustomFormComponentTest' });

const formRef = ref();
const formData = reactive({
  userName: '',
  msgCode: '',
  msgKey: '',
  captcha: {
    image: '',
    key: '',
  },
  captchaCode: '',
  comment: '回填的comment数据',
  div: '这是一段文案',
  link: '这是一条链接文字',
});

function handleEvent(params: IFormEventParam) {
  const { prop } = params;
  // eslint-disable-next-line no-console
  console.log('formData', formData, 'prop', prop);
  switch (prop) {
    case 'sendMsg':
      formRef.value?.validateField(['userName']).then((isValid: boolean) => {
        // eslint-disable-next-line no-console
        console.log('isValid', isValid);
        if (isValid) {
          const result = timerWorkFunc();
          if (result) {
            //请求发送验证码的接口
            // eslint-disable-next-line no-console
            console.log('开始请求发送验证码的接口');
            // const { timer } = result;
            //获取定时器的timer，在验证码倒计时组件销毁的时候清除定时器
          }
        }
      });
      break;
    case 'submit':
      // ElMessage.success('提交成功');
      break;
    default:
      break;
  }
}

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
      },
    ],
    [
      {
        eType: 'Input',
        placeholder: '请输入手机验证码',
        label: '手机验证码',
        prop: 'msgCode',
        span: 18,
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
        eType: 'InputNumber',
        placeholder: '请输入证件签发次数',
        label: '证件签发次数',
        prop: 'idcardRenewalOrIssuanceCount',
        span: 24,
        noShow: false,
        suffixIcon: '',
        clearable: true,
        min: 0,
        max: 10,
      },
    ],
    [
      {
        eType: 'Select',
        label: '附件类型',
        placeholder: '请选择附件类型',
        prop: 'attachType',
        span: 24,
        offset: 0,
        options: [
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' },
        ],
        filterable: true,
        clearable: true,
        disabled: false,
      },
    ],
    [
      {
        eType: 'Upload',
        label: '附件文件',
        prop: 'file',
        action: '/files',
        noShow: false,
        span: 24,
        offset: 0,
        suffixIcon: '',
        drag: true,
        tip: true,
        multiple: false,
        uploadFileType: 'pngAndPdf',
        tipDesc: '',
        listType: 'text',
        // showButton: true,
        showFileList: true,
        errorTip: '',
        fileList: [],
        headers: {
          corpId: 'corpId',
        },
        data: {
          currentFolder: '/files/temp',
        },
      },
    ],
    [
      {
        eType: 'Check',
        label: '应用管理',
        prop: 'appIds',
        options: [
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' },
        ],
        span: 24,
      },
    ],
    [
      {
        eType: 'Radio',
        label: '启用状态',
        placeholder: '请输入启用状态',
        prop: 'isEnable',
        noShow: false,
        clearable: true,
        span: 24,
        options: [
          {
            label: '启用',
            value: 'Y',
          },
          {
            label: '禁用',
            value: 'N',
          },
        ],
      },
    ],
    [
      {
        eType: 'Switch',
        placeholder: '请选择是否支持多文件上传',
        label: '支持多文件上传',
        prop: 'multiFileUpload',
        noShow: false,
        span: 24,
      },
    ],
    [
      {
        eType: 'Div',
        prop: 'div',
        label: 'div',
        span: 24,
      },
    ],
    [
      {
        eType: 'Link',
        prop: 'link',
        label: 'link',
        type: 'primary',
        href: 'https://api.zhoushoujian.com',
        target: '_blank',
        span: 24,
      },
    ],
    [
      {
        eType: 'DatePicker',
        label: '项目开始日期',
        placeholder: '请输入项目开始日期',
        prop: 'effectDate',
        noShow: false,
        valueFormat: 'YYYY-MM-DD',
        clearable: true,
        span: 24,
      },
    ],
    [
      {
        eType: 'TimePicker',
        label: '项目开始时间',
        placeholder: '请输入项目开始时间',
        prop: 'effectTime',
        noShow: false,
        clearable: true,
        span: 24,
      },
    ],
    [
      {
        eType: 'DatePicker',
        label: '项目日期时间',
        placeholder: '请输入项目日期时间',
        prop: 'effectDateTime',
        type: 'datetime',
        noShow: false,
        clearable: true,
        span: 24,
      },
    ],
    [
      {
        eType: 'DatePicker',
        type: 'datetimerange',
        label: '操作时间：',
        prop: 'createTime',
        span: 24,
        format: 'YYYY-MM-DD HH:mm',
        dateFormat: 'MMM DD, YYYY',
        timeFormat: 'HH:mm',
      },
    ],
    [
      {
        eType: 'Input',
        type: 'textarea',
        maxlength: 100,
        showWordLimit: true,
        autosize: { minRows: 8, maxRows: 10 },
        label: '意见：',
        placeholder: '请输入审批意见',
        prop: 'comment',
        span: 24,
        noShow: false,
        clearable: true,
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
        offset: 5,
        span: 19,
        style: 'width: 100%;',
      },
    ],
  ],
});

const { timerWorkFunc } = useSendMsg(formCols.value[1][1] as ISendMsgBtnType);

onMounted(() => {
  getCaptchaFunc();
});

const rules = {
  userName: [{ validator: validateMobilePhone, trigger: 'blur', required: true }],
  msgCode: [{ validator: validateMsgCode, trigger: 'blur', required: true }],
  captchaCode: [{ required: true }],
};

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
.page-content {
  padding: 24px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  .form-container {
    width: 100%;
    margin: 36px 0;
    display: flex;
    justify-content: center;
    overflow: auto;
    height: calc(100% - 66px);
    .form-content {
      width: 480px;
    }
  }
}
</style>
