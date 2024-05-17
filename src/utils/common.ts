import { JSEncrypt } from 'jsencrypt';
import { VUE_APP_PUBLIC_KEY } from '@/constants/config';

// 加密
export function encrypt(value: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(VUE_APP_PUBLIC_KEY); // 设置公钥
  return encrypt.encrypt(value); // 对数据进行加密
}
