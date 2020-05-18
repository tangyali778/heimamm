<template>
  <div class="register">
    <el-dialog title="注册" center :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">注册</div>
      <el-form  :model="registerForm" label-width="100px">
        <el-form-item label="昵称">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
         <el-form-item label="手机">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
         <el-form-item label="密码">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
         <el-form-item label="图形码">
          <el-row>
              <el-col :span="17">
                  <el-input  v-model="registerForm.code"></el-input>
              </el-col>
              <el-col style="margin-left:10px"  :span="6">
                  <img class="captcha" src="http://47.106.148.205/heimamm/public/captcha?type=sendsms&t=1589773089302" alt="">
              </el-col>
          </el-row>
        </el-form-item>
            <el-form-item label="验证码">
          <el-row>
              <el-col :span="17">
                  <el-input v-model="registerForm.rcode"></el-input>
              </el-col>
              <el-col style="margin-left:10px"  :span="6">
                 <el-button>获取用户验证码</el-button>
              </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  //   props: ["isShow"],
  data() {
    return {
      dialogVisible: false,
      //   dialogVisible: this.isShow
      registerForm: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        code:"",//图形码
        rcode: "" //验证码
      }
    };
  }
  //   watch: {
  //       isShow:function(newValue){
  //           this.dialogVisible=newValue
  //       }
  //   },
};
</script>

 <style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>