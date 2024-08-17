import axios from "axios";
import { message } from "antd";

const server = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 10000,
});

server.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer 123";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  function (response) {
    if (response.data.msg) {
      message.success(response.data.msg);
    }
    return response.data;
  },
  function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 客户端环境
          window && (location.href = "/login");
        case 500:
          message.error(error.response.data.msg);
      }
    }
    return Promise.reject(error);
  }
);

export default server;
