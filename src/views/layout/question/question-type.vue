<template>
  <div>
    <!-- 选中单选的时候 -->
    <div v-if="questionForm.type==1">
      <div v-for="(item, index) in questionForm.select_options" :key="index" class="item">
        <!-- 单选radio -->
        <el-radio v-model="questionForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <!-- input -->
        <el-input v-model="item.text" style="margin-right:15px"></el-input>
        <!-- image -->
        <upload-file></upload-file>
      </div>
    </div>
    <!-- 选中多选的时候 -->
    <div v-if="questionForm.type==2">
      <div v-for="(item, index) in questionForm.select_options" :key="index" class="item">
        <!-- 多选checkbox -->
        <el-checkbox v-model="questionForm.multiple_select_answer" :label="item.label"></el-checkbox>
        <!-- input -->
        <el-input v-model="item.text" style="margin-left:15px;margin-right:15px"></el-input>
         <!-- image -->
        <upload-file></upload-file>
      </div>
    </div>
    <!-- 选中简答的时候 -->
    <div v-if="questionForm.type==3">
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="questionForm.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
// 导入子组件上传组件
import UploadFile from "./upload-file";
export default {
  name: "QuestionType",
  // 注册上传组件
  components: {
    UploadFile
  },
  props: ["questionForm"],
  data() {
    return {};
  }
};
</script>

<style lang='less'>
.item {
  display: flex;
  align-items: center;
}
</style>