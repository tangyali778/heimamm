import Vue from 'vue';
import axios from 'axios';
// 按需导入
import { getToken } from "@/ultils/token";
import { removeToken } from "@/ultils/token";
import router from '@/router/index'

// // 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许携带cookie
axios.defaults.withCredentials=true;


// 请求拦截器,发送请求前要经过这里,发送请求要把token带过去可以在这里面写
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


//响应拦截器,返回的数据都要先经过这里,可以把token过期的处理可以在这里写
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // 如果响应回来的code为206说明就是token过期了,那就要返回登录页面并且把token删除
    if (response.data.code == 206) {
        removeToken();
        // 这个js里面可以把router文件夹下的index.js实例化的router拿过来就相等于vue的单文件组件的this.$router
        router.push('/login')
        return;
    }

    //如果没问题就返回响应
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

// 全局配置
Vue.prototype.$axios = axios