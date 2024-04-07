import request from '@/utils/request';

type ILoginReq = {
  username: string;
  password: string;
  loginType: 'password';
  clientId: '1651978103';
  phone?: string;
  smsKey?: string;
  smsCode?: string;
  code?: string;
};
export const login = (data: ILoginReq) => {
  return request({
    url: '/base/admin/oauth/web/login',
    method: 'POST',
    data,
  });
};

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/base/admin/uas/auth-user/info',
    method: 'post',
  });
}
