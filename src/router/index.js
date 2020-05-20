import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 按需导入
import {
    getToken
} from '@/ultils/token'

// login文件夹下是index.js.所以下面导入的时候选到文件夹这里就行了,会自动选中index.js文件
import Login from "@/views/login";
import Layout from "@/views/layout";
import Chart from "@/views/layout/chart";
import User from "@/views/layout/user";
import Enterprise from "@/views/layout/enterprise";
import Question from "@/views/layout/question";
import Subject from "@/views/layout/subject";




const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/layout',
            component: Layout,
            children: [
                {path:'chart',component:Chart},
                {path:'user',component:User},
                {path:'enterprise',component:Enterprise},
                {path:'question',component:Question},
                {path:'subject',component:Subject},
            ]
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
});



// 全局导航守卫
router.beforeEach((to, from, next) => {
    //console.log(to);
    // console.log(from);

    //先判断to的是不是登录页面,如果是登录页面就没必要守卫直接通关
    if (to.fullPath == "/login") {
        next()
    } else {
        // 如果to的不是非登录页面,那就判断你有没有先登录能不能取到token,如果能就表示你登录了让你通关,没有登录就打回登录页面
        const token = getToken()
        if (token) {
            next(); //去到你想去的地方
        } else {
            next("/login")
        }
    }

})

export default router;