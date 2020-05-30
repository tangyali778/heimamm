<template>
  <div class="register">
    <el-dialog  center :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">注册</div>
      <el-form :model="registerForm" :rules="rules" label-width="100px" ref="registerRef">
        <!-- 头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <!-- action 上传文件的url地址,name就是上次文件时候的参数 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="registerForm.code"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
              <img class="captcha" :src="codeURL" @click="getCode" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model.number="registerForm.rcode"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
              <el-button @click="getRcode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
      // 头像的请求地址
      uploadAction: process.env.VUE_APP_BASEURL + "/uploads",
      // 要上传头像的src
      imageUrl: "",
      // 图形码的请求地址
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      dialogVisible: false,
      //   dialogVisible: this.isShow
      registerForm: {
           // 这里面的数据，将来是要提交给服务器
        username: "",
        phone: "",
        email: "",
        avatar: "", //头像地址
        password: "",
        code: "", //图形码
        rcode: "" //验证码
      },
      //校验规则
      rules: {
        avatar:[
           { required: true, message: "头像不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("邮箱不能为空"));
                return;
              }
              // 邮箱的正则
              const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱正则
              if (!reg.test(value)) {
                return callback(new Error("邮箱不合法!"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }

              const reg = /^1[3456789][0-9]{9}$/; //手机号正则
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }

              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "长度在不能小于6个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形码必须是4位", trigger: "blur" }
        ],
        rcode: [
          // { required: true, message: '验证码不能为空', trigger: 'blur' },
          // { min: 4,max:4,message: '验证码必须是4位', trigger: 'blur' }
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }

              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              }

              callback();
            },
            trigger: "blur"
          }
        ]
      }
    };
    //   watch: {
    //       isShow:function(newValue){
    //           this.dialogVisible=newValue
    //       }
    //   },
  },
  methods: {
    getCode() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random() * 999;
    },
    //用async await方式,就不用then了
    async getRcode() {
      const res = await this.$axios.post("/sendsms", {
        code: this.registerForm.code,
        phone: this.registerForm.phone
      });
      if (res.data.code == 200) {
        this.registerForm.rcode = res.data.data.captcha;
      } else {
        //如果错误就弹出错误弹出框提示你
        this.$message.error(res.data.message);
        //   并且重新刷新获得新的图形码
        this.getCode();
      }

      // this.$axios.post("/sendsms", {
      //   code: this.registerForm.code,
      //   phone: this.registerForm.phone
      // })
      // .then(res => {
      //   // console.log(res);
      //   //    把获取回来的验证码输入在rcode输入框中
      //   if (res.data.code == 200) {
      //     this.registerForm.rcode = res.data.data.captcha;
      //   }else{
      //       //如果错误就弹出错误弹出框提示你
      //       this.$message.error(res.data.message);
      //     //   并且重新刷新获得新的图形码
      //        this.getCode()
      //   }
      // });
    },
    //头像上传成功后的回调函数
    handleAvatarSuccess(res) {
      //把返回的路径给imageUrl赋值,让注册页面显示刚上传的头像
      this.imageUrl = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;
      //给registerForm中的avatar模型赋值
      this.registerForm.avatar = res.data.file_path;
    },
    // 头像上传之前的回调函数
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("上传头像图片只能是 JPG/png/ 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //如果是要进行上传文件的请求,我们必须返回true,才能进行文件上传
      return isImage && isLt2M;
    },

    // 点击确定按钮对整个form表单做最后一次校验
    submit() {
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return;

        const res = await this.$axios.post("/register", this.registerForm);
        console.log(res);
        
        //请求成功后
        if (res.data.code == 200) {
            // 弹出登录成功的提示框
          this.$message({
            message: "注册成功",
            type: "success"
          });
          //  请求成功后要把当前窗口消失
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
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
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>