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
import Welcome from "@/views/layout/welcome";
import Chart from "@/views/layout/chart";
import User from "@/views/layout/user";
import Enterprise from "@/views/layout/enterprise";
import Question from "@/views/layout/question";
import Subject from "@/views/layout/subject";




const router = new VueRouter({
    routes: [{
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }

        },
        {
            path: '/layout',
            component: Layout,
            meta: {
                roles: ['超级管理员', '管理员', '老师', '学生']
            },
            children: [{
                    path: 'welcome',
                    component: Welcome,
                    //借助路由元信息,对这条路径做个具体的描述
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-date',
                        fullPath: '/layout/welcome',
                        title: '个人信息'
                    },
                },
                {
                    path: 'chart',
                    component: Chart,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-pie-chart',
                        fullPath: '/layout/chart',
                        title: '数据预览'
                    },
                },
                {
                    path: 'user',
                    component: User,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-user',
                        fullPath: '/layout/user',
                        title: '用户列表'
                    },
                },
                {
                    path: 'enterprise',
                    component: Enterprise,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-office-building',
                        fullPath: '/layout/enterprise',
                        title: '企业列表'
                    },
                },
                {
                    path: 'question',
                    component: Question,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-edit-outline',
                        fullPath: '/layout/question',
                        title: '题库列表'
                    },
                },
                {
                    path: 'subject',
                    component: Subject,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-notebook-2',
                        fullPath: '/layout/subject',
                        title: '学科列表'

                    },
                },
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
//全局后置钩子
router.afterEach((to) => {
    //console.log(to); //这里的to就是上面每一个路由们
    // 进入页面之后要做的事情
    document.title = to.meta.title || '黑马面面'
})

export default router;