import Vue from 'vue'
import Vuex from 'vuex'
//注册Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    // 仓库中要操作的数据
    state: {
        // 定义将来仓库中要操作的数据
        userInfo: {
            name: '花花',
            age:10
        },
        count:0
    }
})
//导出之后记得要注入到根实例上去
export default store