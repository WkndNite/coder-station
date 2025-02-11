import axios from "axios";

const service = axios.create({
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求拦截失败", error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("响应拦截失败", error);
    return Promise.reject(error);
  },
);

export default service;
