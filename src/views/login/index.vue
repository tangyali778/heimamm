<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginRef">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <!-- 3.使用 -->
    <register ref="registerRef"></register>
    <!-- <register :isShow="isShow"></register> -->
  </div>
</template>

<script>
//1.导入子组件register
import register from "./register";
//按需导入
import { setToken } from "@/ultils/token";
export default {
  name: "Login",
  // 2.注册子组件
  components: {
    register
  },
  data() {
    return {
      isShow: false,
      //process.env.VUE_APP_BASEURL,就可以拿到开发环境中的基地址,后面接的是要拿验证码的请求
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 模型
      loginForm: {
        phone: "18511111111", //手机号
        password: "12345678", //密码
        code: "", //验证码
        isCheck: true //是否勾选了用户协议
      },
      // 效验规则
      rules: {
        phone: [
          // 是个数组里面可以写多个效验规则
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          //{ min: 11, max: 11, message: '手机号必须是11位', trigger: 'blur' }
          {
            //这里的rule指的是校验对象，value指的是input里面输入的值，，callback就是告诉我们输入的内容ok不ok合法不合法
            validator: (rule, value, callback) => {
              if (!value) {
                //这里的return不是让你返回这个callback是让你不要往下执行了,函数就此打断
                return callback(new Error("手机号不能为空"));
              }
              //手机号的正则表达式
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }

              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度为6到12个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须是4位", trigger: "blur" }
        ],
        isCheck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                //这里的return不是让你返回这个callback是让你不要往下执行了,函数就此打断
                return callback(new Error("必须勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //  点击验证码获取新的验证码,后面要跟一个随机数表示每次发送请求的url不一样,图片的src属性发送请求会有缓存
    getCaptcha() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login&r=" +
        Math.random() * 999;
    },
    //  点击登录按钮的时候 还要最后对form表单做一次校验,保证都填入了内容并且是合法的内容
    loginClick() {
      this.$refs.loginRef.validate(async valid => {
        //console.log(valid);//这里的如果校验通过了就是true,
        //  校验没通过直接退出整个函数
        if (!valid) return;

        // 1.异步代码 如果校验成功就发生请求

        // this.$axios.post("/login", this.loginForm).then(res => {
        //   console.log(res);
        //   if (res.data.code == 200) {
        //     this.$message({
        //       message: "登陆成功",
        //       type: "success"
        //     });
        //     // 登录成功之后要保存token
        //     setToken(res.data.data.token);

        //    // 跳转到layout页面
        //    this.$router.push('/layout')
        //   } else {
        //     this.$message.error(res.data.message);
        //     //  登录失败的话就发送请求重新获得验证码
        //     this.codeURL =
        //       process.env.VUE_APP_BASEURL +
        //       "/captcha?type=login&" +
        //       Math.random() * 999;
        //   }
        // });

        // 2.看起来像同步实际是异步代码的发送请求,与上面的then获得结果都是一样的,用哪个都行
        const res = await this.$axios.post("/login", this.loginForm);
        //console.log(res);

        if (res.data.code === 200) {
          // 提示
          this.$message({
            message: "登录成功~",
            type: "success"
          });

          //  登录成功之后要保存token
          setToken(res.data.data.token);

          // 登录成功后跳转到layout/welcome欢迎页面
          this.$router.push("/layout/welcome");
        } else {
          this.$message.error(res.data.message);

          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&t=" +
            (new Date() - 0);
        }
      });
    },
    registerClick() {
      this.$refs.registerRef.dialogVisible = true;
      // this.isShow=true
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>

