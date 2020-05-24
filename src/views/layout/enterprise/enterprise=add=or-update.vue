<template>
  <div class="enterprise">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <div class="title" slot="title">{{modal==='add'?'新增企业':'编辑企业'}}</div>
      <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="addForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="addForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="addForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="addForm.remark"></el-input>
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
      modal: "", // 新增(add) & 修改(edit)
      //提交给后台的数据
      addForm: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //简称
        intro: "", //企业简介
        remark: "" //备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },

  methods: {
    //   点击确定按钮
    submit() {
      //做最后一次校验
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return; //校验不成功

        // 校验成功发送请求
        let res = "";
        if (this.modal == "add") {
          res = await this.$axios.post("/enterprise/add", this.addForm);
        } else {
          res = await this.$axios.post("/enterprise/edit", this.addForm);
        }

        if (res.data.code == 200) {
          //提示
          this.$message({
            type: "success",
            message: this.modal === "add" ? "新增成功" : "编辑成功"
          });
          // 关掉当前对话框
          this.dialogVisible = false;
          //刷新列表
          // 方式1，通过 $emit
          // this.$emit('search')
          // 方式2，通过 $parent
          this.$parent.search();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  // 监听器们
  watch: {
    //当dialogVisible为true出现的时候清空校验
    // dialogVisible(newValue){
    //   if (newValue) {
    //     this.$nextTick(()=>{
    //        this.$refs.addFormRef.clearValidate(); //清空校验
    //     })
    //   }
    // }
    //当dialogVisible为false出现的时候清空校验
    // 这里不用写$nextTick因为这个时候dom已经渲染出来了
    dialogVisible(newValue) {
      if (!newValue) {
        this.$refs.addFormRef.clearValidate(); //清空校验
      }
    }
  }
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