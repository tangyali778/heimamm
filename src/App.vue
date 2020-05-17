<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>


export default {
   name:'App'
}
</script>

<style lang="less">
// 以下两种导入全局样式都可以
// @import url('~@/styles/base.less');
@import './styles/base.less';

</style>
