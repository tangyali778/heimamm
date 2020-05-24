<template>
  <div class="enterprise">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <div class="title" slot="title">{{modal==='add'?'新增企业':'编辑企业'}}</div>
      <el-form :model="addForm" ref="addFormRef" label-width="80px">
        <el-form-item label="企业编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业备注">
          <el-input></el-input>
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
  name: "EnterpriseEdit",
  data() {
    return {
      dialogVisible: false,
      modal: "",// 新增(add) & 修改(edit)
      addForm:{

      }
    };
  },
  methods: {
    //   点击确定按钮
      submit(){

      }
  },
};
</script>

<style lang="less">
.enterprise {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>