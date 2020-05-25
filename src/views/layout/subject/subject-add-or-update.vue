<template>
  <div class="subject">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">{{ modal === "add" ? "新增学科" : "编辑学科" }}</div>
      <!-- form表单 -->
      <el-form :model="subjectForm" :rules="rules" ref="subjectFormRef" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="subjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="subjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="subjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 两个按钮 -->
      <span slot="footer">
        <el-button @click=" dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SubjectEdit",
  data() {
    return {
      dialogVisible: false,
      modal: "", //add新增 edit编辑
      //这里面定义的属性是要提交给后台的
      subjectForm: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入学科简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入学科简介", trigger: "blur" }],
        remark: [{ required: true, message: "请输入学科备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击确定按钮
    submit() {
      this.$refs.subjectFormRef.validate(async valid => {
        if (!valid) return;

        let res = "";
        if (this.modal === "add") {
          res = await this.$axios.post("/subject/add", this.subjectForm);
        } else {
          res = await this.$axios.post("/subject/edit", this.subjectForm);
        }

        if (res.data.code == 200) {
          //提示
          this.$message({
            type: "success",
            message: this.modal === "add" ? "新增成功" : "编辑成功"
          });

          //关闭当前对话框
          this.dialogVisible = false;
          //调用父组件的search方法刷新学科列表
          this.$parent.search();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  //监听dialogVisible的变化
  watch: {
    dialogVisible(newValue) {
      //当dialogVisible为false的时候
      if (!newValue) {
        this.$refs.subjectFormRef.clearValidate(); //清空校验
      }
    }
  }
};
</script>

<style lang="less">
.subject {
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