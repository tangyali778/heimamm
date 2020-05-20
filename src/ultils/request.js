import Vue from 'vue';
import axios from 'axios';
// 按需导入
import { getToken } from "@/ultils/token";

// // 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许携带cookie
axios.defaults.withCredentials=true;

// Add a request interceptor
// 请求拦截器,发送请求要把token带过去可以在这里面写
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken()
    if (token) {
        config.headers.token = token
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 全局配置
Vue.prototype.$axios = axios