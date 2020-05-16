import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// ,webpack会让main.js这个入口文件和.less建立依赖联系
// 在js中@表示src的意思
// import '@/styles/base.less'

import router from '@/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
