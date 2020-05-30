import Vue from 'vue'
import Vuex from 'vuex'
//注册Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    // 仓库中要操作的数据
    state: {
        // 定义将来仓库中要操作的数据
        userInfo: ""
    },

    //所有的更改仓库的操作的方法都写在这里
    mutations: {
        /**
         * 
         * @param {表示上面的state对象} state 
         * @param {表示要传递过来的参数} userInfo 
         */
        setInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    // 所有获取仓库中的值的代码写在getters中
    getters: {
        getInfo(state) {
            return state.userInfo
        }
    }
})
//导出之后记得要注入到根实例上去
export default store