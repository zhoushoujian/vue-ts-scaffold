import axios from 'axios';

const request = axios.create({
  baseURL: '/',
  timeout: 8000,
});

request.interceptors.request.use(
  //@ts-ignore
  function (config) {
    return config;
  },
  function (err) {
    // eslint-disable-next-line no-console
    console.error('axios.interceptors.request err', err);
    return Promise.reject(err);
  },
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error); // 返回接口的错误信息
  },
);
export default request;
