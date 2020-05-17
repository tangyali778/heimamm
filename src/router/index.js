import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// login文件夹下是index.js.所以下面导入的时候选到文件夹这里就行了,会自动选中index.js文件
import Login from "@/views/login";
import Layout from "@/views/layout";

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/layout',
            component: Layout
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
});

export default router;