<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="@/assets/layout_icon.png" class="marginlr" alt />
        <span class="title">黑马面面</span>
      </div>

      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{username}},您好</span>
        <el-button size="mini" type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!-- 左侧导航栏 -->
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="/layout/welcome">
            <i class="el-icon-date"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="background-color: #e8e9ec">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 按需导入
import { removeToken } from "@/ultils/token";
export default {
  data() {
    return {
      isCollapse: false, //导航栏是否展示
      avatar: "", //用户头像
      username: "", //
      defaultActive: "" //菜单选中的值
    };
  },
  methods: {
    // 发送请求得到用户信息
    async getUserData() {
      const res = await this.$axios.get("/info", {
        //这个在发送axios里面带过去也可以,但是后面每个请求都要写并且post与get方法写的地方还不一样
        // 就很麻烦,可以写在拦截器里面,只要发送请求都会先经过那里
        // headers: {
        //   token: getToken(),//在请求头把token带过去
        // }
      });
      // console.log(res);
      if (res.data.code == 200) {
        this.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
        this.username = res.data.data.username;
      }
    },
    // 退出
    logout() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.get("/logout");
          if (res.data.code == 200) {
            //退出要把token删掉
            removeToken();
            //还要去到登录页面
            this.$router.push("/login");
          }
        })
        .catch(() => {});
    }
  },
  //法1:在登录成功之后那里写 this.$router.push("/layout/welcome")跳转到欢迎页面,
  created() {
    this.getUserData();
    this.defaultActive = this.$route.fullPath;
  }
  //法2:从这里修改登录之后默认显示user页面
  // created() {
  //   this.getUserData();
  //   //进来的路由是哪个组件,左边菜单就高亮哪个菜单,并且刷新还是那个
  //   if (this.$route.fullPath == "/layout") {
  //     //默认就是用户列表菜单高亮且右边显示用户列表组件
  //     this.defaultActive = "/layout/user";
  //     this.$router.push("/layout/user");
  //   } else {
  //     this.defaultActive = this.$route.fullPath;
  //   }
  // }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
