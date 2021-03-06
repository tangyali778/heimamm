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
            <el-option v-for="(value, name) in stepObj" :key="name" :label="value" :value="+name"></el-option>
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
            <el-radio v-for="(value, name) in typeObj" :key="name" :label="+name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio v-for="(value, name) in difficultyObj" :key="name" :label="+name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <hr class="hrMargin" />
        <el-form-item label="试题标题" prop="title" class="setMargin">
          <quill-editor
            :options="{placeholder:'请输入标题....'}"
            v-model="questionForm.title"
            @change="onEditorChange('title')"
          ></quill-editor>
        </el-form-item>

        <el-form-item
          :label="typeObj[questionForm.type]"
          :prop="validateQuestionTypeObj[questionForm.type]"
        >
          <!-- 单选多选简答子组件 -->
          <question-type :questionForm="questionForm" @childChange="onChildChange"></question-type>
        </el-form-item>

        <hr class="hrMargin" />
        <el-form-item label="解析视频">
          <!-- 把 questionForm中的video的值传递给子组件-->
          <upload-file type="video" v-model="questionForm.video"></upload-file>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="答案解析" prop="answer_analyze" class="setMargin">
          <quill-editor
            :options="{placeholder:'请输入答案解析....'}"
            v-model="questionForm.answer_analyze"
            @change="onEditorChange('answer_analyze')"
          ></quill-editor>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="试题备注" prop="remark">
          <el-input v-model="questionForm.remark"></el-input>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
//导入子组件题型组件
import questionType from "./question-type";
// 导入子组件上传组件
import UploadFile from "./upload-file";
export default {
  components: {
    quillEditor,
    questionType,
    UploadFile
  },
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
      //校验题型的时候prop要看情况看是单选还是多选还是简答
      validateQuestionTypeObj: {
        1: "single_select_answer",
        2: "multiple_select_answer",
        3: "short_answer"
      },
      dialogVisible: false, // 控制dialog的显示及隐藏
      modal: "", // add 新增 edit 修改
      options: regionData,
      //模型
      questionForm: {
        title: "", //	标题
        subject: "", //		学科id标识
        step: "", //阶段1、初级 2、中级 3、高级
        enterprise: "", //	企业id标识
        city: [], //		[省、市、区县]
        type: 1, //	题型 1单选 、2多选 、3简答
        difficulty: 1, //	题目难度 1简单 、2一般 、3困难
        single_select_answer: "", //	单选题答案
        multiple_select_answer: [], //多选题答案
        short_answer: "", //	简答题答案
        video: "", //	解析视频地址
        answer_analyze: "", //	答案解析
        remark: "", //	答案备注
        select_options: [
          {
            label: "A",
            text: "splice",
            image: ""
          },
          {
            label: "B",
            text: "slice",
            image: ""
          },
          {
            label: "C",
            text: "pop",
            image: ""
          },
          {
            label: "D",
            text: "shift",
            image: ""
          }
        ] //	选项，介绍，图片介绍
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
        ],
        title: [{ required: true, message: "请输入标题", trigger: "change" }],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "change" }],
        single_select_answer: [
          { required: true, message: "请输入单选答案", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "请输入多选答案", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "请输入简答题答案", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 对富文本编辑器中字段进行校验(试题标题跟答案解析)
    onEditorChange(value) {
      // 一改变就做校验
      //validateField对对部分表单字段进行校验的方法
      this.$refs.questionFormRef.validateField(value);
    },
    // 对QuestionType子组件中的 单选或多选或简答及时校验
    onChildChange() {
      //一改变就校验
      this.$refs.questionFormRef.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    //新增&修改
    submit() {
      this.$refs.questionFormRef.validate(async valid => {
        if (!valid) return;

        let res = "";
        if (this.modal == "add") {
          res = await this.$axios.post("/question/add", this.questionForm);
        } else {
          // 发送编辑请求的时候又要是字符串
          this.questionForm.city = this.questionForm.city.join(",");
          res = await this.$axios.post("/question/edit", this.questionForm);
        }

        if (res.data.code == 200) {
          //提示
          this.$message({
            type: "success",
            message: this.modal === "add" ? "新增成功" : "编辑成功"
          });
          //把当前对话框关掉
          this.dialogVisible = false;
          // 调用父组件search方法
          this.$parent.search();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  //监听器
  watch: {
    dialogVisible(newValue) {
      //当dialogVisible是true的时候
      if (newValue) {
        this.$nextTick(() => {
          this.$refs.questionFormRef.clearValidate(); //清空校验
        });
      }
    }
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
  .hrMargin {
    margin-bottom: 20px;
  }
  .setMargin {
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 40px;
    }
  }
  .ql-editor {
    height: 100px;
  }
}
</style>