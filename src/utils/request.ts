/* eslint-disable new-cap */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Notification } from 'element-ui';
import { VUE_APP_CLIENT_ID } from '@/constants/config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const request: AxiosInstance | any = axios.create({
  baseURL: '/api/',
  withCredentials: false, // 不发送cookie
});

// Request interceptors
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url!.endsWith('/oauth/web/token') || config.url!.endsWith('/oauth/web/refresh')) {
      // 登录接口
      return Promise.resolve(config);
    }
    config.headers!.Clientid = VUE_APP_CLIENT_ID;
    const token = sessionStorage.getItem(`M-Token`);
    if (token) {
      config.headers!.Authorization = JSON.parse(token).value;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);

// Response interceptors
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config;
    const res = { ...response.data };
    if (config.url === '/portal/auth/user/logout') {
      return res;
    }
    if (res.rspCode === '00000011' || res.rspCode === '00000024') {
      res.msg = '登录超时，请重新登录';
      Message({
        message: res.msg || (response as any).rspDesc,
        type: 'error',
        duration: 5 * 1000,
      });
      // router.push('/login');
    } else if (res.rspCode === '00000003' || res.rspCode === '00000022') {
      Message({
        message: res.rspDesc || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      // router.push('/login');
    } else if (res.rspCode !== '00000000') {
      Message({
        message: res.rspDesc || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return res;
  },
  (error: AxiosError<any>) => {
    // eslint-disable-next-line no-console
    console.log(error, 'service.interceptors.response error');
    const status = error.response?.status;
    const url = error.response?.config.url;
    const rspDesc = error.response?.data.rspDesc;
    const statusText = error.response?.statusText;
    const errortext = codeMessage[status as keyof typeof codeMessage] || statusText;
    const errorMsg = rspDesc ? `请求错误 ${status}: ${rspDesc}` : `请求错误 ${status}: ${url}, ${errortext}`;

    Notification.error({
      title: 'error',
      message: errorMsg,
      duration: 5 * 1000,
      showClose: false,
    });

    return Promise.reject(error);
  },
);

export default request;
