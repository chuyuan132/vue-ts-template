import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

/** 统一维护请求头信息 */
const handleRequestHeader = (config: any) => {
  return config;
};

service.interceptors.request.use(
  (config: any) => {
    config = handleRequestHeader(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    // 根据业务状态码自行处理..
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
