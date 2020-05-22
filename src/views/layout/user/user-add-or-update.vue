<template>
  <div class="userEdit">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <!-- 标题 -->
      <div class="title" slot="title">{{modal=='add'?'新增用户':'编辑用户'}}</div>
      <!-- form表单 -->
      <el-form label-width="80px" :model="addForm" :rules="rules" ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="addForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="学生" :value="3"></el-option>
            <el-option label="老师" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 两个按钮 -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserEdit",

  //法2: 接受父组件传来的值用props方法
  props: {
    modal: {
      type: String,
      //没有传值的话就用这个default里面的
      default: "add"
    }
  },

  data() {
    return {
      dialogVisible: false, //控制Dialog的显示与否
      //modal: "", //决定是新增还是编辑点的,add是新增,edit是编辑
      addForm: {
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 手机号
        role_id: "", // 角色 1：超级管理员 2：管理员 3：老师 4：学生
        status: "", // 状态 1：启用 0：禁用
        remark: "" // 备注
      },
      //校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                //函数就此打断
                return callback(new Error("请输入邮箱号"));
              }
              //邮箱的正则表达式
              const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱正则
              if (!reg.test(value)) {
                return callback(new Error("邮箱不合法"));
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
                //,函数就此打断
                return callback(new Error("请输入手机号"));
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
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击确定按钮要做最后一次校验
    submit() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return; //校验不成功就此打断

        let res = "";
        if (this.modal == "add") {
          //成功就发送新增用户请求
          res = await this.$axios.post("/user/add", this.addForm);
        } else {
          //成功就发送编辑用户请求
           res = await this.$axios.post("/user/edit", this.addForm);
        }

        if (res.data.code == 200) {
          this.$message({
            message: this.modal == "add" ? "新增成功" : "编辑成功",
            type: "success"
          });
          // 关闭当前对话框
          this.dialogVisible = false;

          // 刷新父组件的search方法,重新展示新增之后的数据
          // 第一种 this.$parent.search()
          // this.$parent.search();
          // 第二种 this.$emit()
          this.$emit('editok');
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>


<style lang="less">
.userEdit {
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: #0e9cfa;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
