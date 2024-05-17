import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';
import { axiosInterceptorsResFunc } from '@szhou/components';
import routers from '@/routers';
import { VUE_APP_CLIENT_ID } from '@/constants/config';
import { setTempLocation } from './utils';

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

const request: AxiosInstance = axios.create({
  baseURL: '/api/',
  withCredentials: false, // 不发送cookie
});

// Request interceptors
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any> | any) => {
    //todo
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token;
    config.headers!.Clientid = VUE_APP_CLIENT_ID;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const backToLoginFunc = () => {
  setTempLocation();
  routers.push('/login'); //如果是微前端子应用。这里要换成主应用传来的返回到登陆页的方法 - todo
};

// Response interceptors
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return axiosInterceptorsResFunc(response, backToLoginFunc);
  },
  (error: AxiosError<any>) => {
    // eslint-disable-next-line no-console
    console.log(error, 'service.interceptors.response error');
    const status = error.response?.status;
    const url = error.response?.config.url;
    const rspDesc = error.response?.data.rspDesc;
    const statusText = error.response?.statusText;
    const errorText = codeMessage[status as keyof typeof codeMessage] || statusText;
    const errorMsg = rspDesc ? `请求错误 ${status}: ${rspDesc}` : `请求错误 ${status}: ${url}, ${errorText}`;

    ElNotification.error({
      title: 'error',
      message: errorMsg,
      duration: 5 * 1000,
      showClose: false,
    });

    return Promise.reject(error);
  },
);

export default request;

//todo 为了不登录也可以正常预览页面，刷新token的逻辑注释掉
//刷新token逻辑
// let eventDebounceTimer: any = 'start';
export const dealWithUserEvent = () => {
  // if (eventDebounceTimer && eventDebounceTimer !== 'start') {
  //   clearTimeout(eventDebounceTimer);
  //   eventDebounceTimer = setTimeout(() => {
  //     eventDebounceTimer = '';
  //   }, 500);
  //   return 0;
  // } else {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   const expiresTime = localStorage.getItem('expiresTime');
  //   const expiresTimeValue = Number(expiresTime);
  //   if (!accessToken || !refreshToken || !expiresTime || Number.isNaN(expiresTimeValue)) {
  //     setTempLocation();
  //     return routers.push('/login');
  //   }
  //   eventDebounceTimer = 'timer';
  //   if (expiresTimeValue && expiresTimeValue < Date.now()) {
  //     ElMessage({
  //       message: '登录超时，请重新登录',
  //       type: 'error',
  //       duration: 5 * 1000,
  //     });
  //     setTempLocation();
  //     localStorage.removeItem('accessToken');
  //     localStorage.removeItem('refreshToken');
  //     return routers.push('/login');
  //   } else if (expiresTimeValue - Date.now() < 10 * 60 * 1000) {
  //     // eslint-disable-next-line no-console
  //     console.info('token过期时间已少于10分钟，正在刷新token，还剩:', (expiresTimeValue - Date.now()) / 60000, '分');
  //     return request('/base/admin/oauth/web/refresh', {
  //       method: 'post',
  //       data: {
  //         grant_type: 'refresh_token',
  //         refreshToken,
  //         clientId: VUE_APP_CLIENT_ID,
  //       },
  //       responseType: 'json',
  //     }).then((res: any) => {
  //       const result = res.data;
  //       if (result) {
  //         const { accessToken, refreshToken, expiresIn } = result;
  //         localStorage.setItem('accessToken', accessToken);
  //         localStorage.setItem('refreshToken', refreshToken);
  //         localStorage.setItem('expiresTime', (expiresIn * 1000 + Date.now()).toString());
  //       }
  //     });
  //   } else {
  //     // no actions
  //     return 0;
  //   }
  // }
};
