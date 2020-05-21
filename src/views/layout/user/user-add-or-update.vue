<template>
  <div class="userEdit">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <!-- 标题 -->
      <div class="title" slot="title">{{modal=='add'?'新增用户':'编辑用户'}}</div>
      <!-- form表单 -->
      <el-form label-width="80px" :model="addForm">
        <el-form-item label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input  v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input  v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select  v-model="addForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="学生" value="3"></el-option>
            <el-option label="老师" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注">
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
  data() {
    return {
      dialogVisible: false, //控制Dialog的显示与否
      modal: "", //决定是新增还是编辑点的,add是新增,edit是编辑
      addForm: {
        username: "", // 用户名
        email: "",// 邮箱
        phone: "", // 手机号
        role_id: "",// 角色 1：超级管理员 2：管理员 3：老师 4：学生
        status: "",// 状态 1：启用 0：禁用
        remark: ""// 备注
      }
    };
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
