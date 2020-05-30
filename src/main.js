import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// webpack会让main.js这个入口文件和.less建立依赖联系
// 在js中@表示src的意思
// import '@/styles/base.less'

import router from '@/router';

//improt xxx from 'xxx'与import 'xxx'的区别:
// 前者是要返回一个xxx来用的;后者是该文件依赖'xxx'文件而已,不需要返回什么来用
// 并且前者这种,他的'xxx'文件也有export default xxx导出什么出来;后者就没有导出仅依赖关系而已

// 导入elementui
import '@/plugins/elementui.js'

//导入封装的axios
import '@/ultils/request.js'

// 导入store
import store from '@/store'


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
