import { IApiResponse } from '@szhou/components';
import request from '@/utils/request';

export const getCaptcha = (data: { clientId: string }): IApiResponse<{ image: string; key: string }> => {
  return request({
    url: '/portal/oauth/web/captcha/get',
    method: 'POST',
    data,
  });
};

type ILoginReq = {
  username: string;
  password: string;
  channelCode: string;
  rememberMe?: boolean;
  loginType: string;
  clientId: string;
  captchaCode: string;
  captchaKey: string;
};
export const login = (data: ILoginReq) => {
  return request({
    url: '/portal/oauth/web/login',
    method: 'POST',
    data,
  });
};
