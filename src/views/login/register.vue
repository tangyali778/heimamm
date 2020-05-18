<template>
  <div>
    <el-dialog title="注册" :visible.sync="dialogVisible" width="600px">
      <span>这是一段信息</span>
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
    };
  },
//   watch: {
//       isShow:function(newValue){
//           this.dialogVisible=newValue
//       }
//   },

};
</script>

<style>
</style>