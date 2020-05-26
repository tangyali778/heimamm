<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <div slot="title" class="title">{{modal==='add'?'新增试题':'编辑试题'}}</div>
      <el-form
        class="form"
        label-position="left"
        :rules="rules"
        :model="questionForm"
        ref="questionFormRef"
        label-width="120px"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questionForm.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questionForm.step" placeholder="请选择阶段">
            <el-option v-for="(value, name) in stepObj" :key="name" :label="value" :value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="questionForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in enterpriseList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            size="large"
            :options="options"
            v-model="questionForm.city"
            :props="{value:'label'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="questionForm.type">
            <el-radio v-for="(value, name) in typeObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio v-for="(value, name) in difficultyObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "QuestionEdit",
  // 接收从父组件传来的值
  //   props: ['subjectList','enterpriseList'],
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object
  },
  data() {
    return {
      dialogVisible: false,// 控制dialog的显示及隐藏
      modal: "",// add 新增 edit 修改
      options: regionData,
      //模型
      questionForm: {
        title: "", //	标题
        subject: "", //		学科id标识
        step: "", //阶段1、初级 2、中级 3、高级
        enterprise: "", //	企业id标识
        city: "", //		[省、市、区县]
        type: "1", //	题型 1单选 、2多选 、3简答
        difficulty: "1", //	题目难度 1简单 、2一般 、3困难
        single_select_answer: "", //	单选题答案
        multiple_select_answer: "", //多选题答案
        short_answer: "", //	简答题答案
        video: "", //	解析视频地址
        answer_analyze: "", //	答案解析
        remark: "", //	答案备注
        select_options: "" //	选项，介绍，图片介绍
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ]
      }
    };
  },
  methods: {
      //新增&修改
    submit() {}
  }
};
</script>

<style lang='less'>
.questionEdit {
  .title {
    height: 53px;
    padding-left: 15px;
    line-height: 53px;
    background-color: #0e9ff9;
    color: #fff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .el-select {
    width: 300px;
  }
}
</style>