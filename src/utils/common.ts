import { JSEncrypt } from 'jsencrypt';
import { watch, ref } from 'vue';
import { VUE_APP_PUBLIC_KEY } from '@/constants/config';
import { ISendMsgBtnType } from '@/types/common';

// 加密
export function encrypt(value: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(VUE_APP_PUBLIC_KEY); // 设置公钥
  return encrypt.encrypt(value); // 对数据进行加密
}

export const useSendMsg = (info: ISendMsgBtnType) => {
  let hasSendCode = false;
  const leftTime = ref(0);

  watch(
    () => leftTime.value,
    (newValue: number) => {
      info.value = newValue ? `已发送 ${newValue}` : hasSendCode ? '重新发送' : '发送验证码';
    },
  );

  const timerWorkFunc = () => {
    if (leftTime.value === 0) {
      leftTime.value = 60;
      hasSendCode = true;
      const timer = setInterval(() => {
        leftTime.value--;
        if (leftTime.value === 0) {
          clearInterval(timer);
        }
      }, 1000);
    }
  };

  return {
    timerWorkFunc,
  };
};
