<template>
  <div class="question">
    <!-- 搜索内容区域 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="searchForm.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="searchForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="searchForm.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select v-model="searchForm.type" placeholder="请选择题型">
                <el-option v-for="(value,name) in typeObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="searchForm.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input style="width:217px" v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="searchForm.create_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:620px" v-model="searchForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表区域 -->
    <el-card style="margin-top:15px">
      <el-table :data="questionList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="题目" width="300">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <!-- 方法一 -->
        <el-table-column label="学科.阶段" :formatter="formatterSubject"></el-table-column>
        <!-- 方法二 -->
        <!-- <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            <span>{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="题型" :formatter="formatterType">
          <!-- <template slot-scope="scope"> -->
          <!-- 可以使,简单直接 -->
          <!-- <span>{{typeObj[scope.row.type]}}</span> -->
          <!-- 过滤器不好使;过滤器中的this是undefined -->
          <!-- <span>{{scope.row.type | formatType}}</span> -->
          <!-- 计算属性不好使;无法传递以及接收参数 -->
          <!-- <span>{{formatType}}</span> -->
          <!-- 可以使,使用调用方法的形式,既可以接收参数,this也可以获取到 -->
          <!-- <span>{{formatType(scope.row.type)}}</span> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status===1?'#85ce61':'red'}"
            >{{scope.row.status===1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===1?'info':'success'"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:15px;text-align:center">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </el-card>
    <!-- 传给子组件的值 -->
    <qusetion-edit
      ref="questionEditRef"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
    ></qusetion-edit>
  </div>
</template>

<script>
import QusetionEdit from "./question-add-or-update";
export default {
  components: {
    QusetionEdit
  },
  name: "Qusetion",
  data() {
    return {
      page: 1, //页码 默认为1
      limit: 2, //页容量
      questionList: [], //题库列表
      total: 0, //总条数
      //模型提交给后台的
      searchForm: {
        title: "", //标题名称
        subject: "", //学科id
        enterprise: "", //	企业id
        step: "", //	题目阶段:1(初级),2(中级),3(高级)
        type: "", //	题目类型:1(单选),2(多选),3(简答)
        difficulty: "", //	题目难度: 1(简单),2(一般),3(困难)
        username: "", //	作者
        status: "", //状态:0(禁用),1(启用)
        create_date: "" //	创建日期
      },
      subjectList: [], //学科列表
      enterpriseList: [], //企业列表
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //题目阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题目类型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" } //	题目难度
    };
  },
  created() {
    this.getSubjectData();
    this.getEnterpriseData();
    this.getQuestionData();
  },
  methods: {
    //获取所有的学科列表
    async getSubjectData() {
      const res = await this.$axios.get("/subject/list");
      if (res.data.code == 200) {
        this.subjectList = res.data.data.items;
      }
    },
    //获取所有的企业列表
    async getEnterpriseData() {
      const res = await this.$axios.get("/enterprise/list");
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
      }
    },
    //获取的题库列表
    async getQuestionData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          ...this.searchForm,
          page: this.page,
          limit: this.limit
        }
      });
      if (res.data.code == 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    //搜索
    search() {
      this.page = 1;
      this.getQuestionData();
    },
    //清除
    clear() {
      // 如果要调用 form 表单的 resetFields 这个方法，需要给 el-form-item 设置 prop
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 格式化学科.阶段
    formatterSubject(row) {
      return `${row.subject_name}.${this.stepObj[row.step]}`;
    },
    // 格式化题型
    formatterType(row) {
      return this.typeObj[row.type];
    },
    //页容量发生变化
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页发生变化
    currentChange(val) {
      this.page = val;
      this.getQuestionData();
    },
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: "更新状态成功"
        });

        //重新刷新当前页面
        this.getQuestionData();
      } else {
        this.$message.error(res.data.message);
      }
    },
    //删除
    del(id) {
      this.$confirm("确定删除该题目吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            //重新刷新第一页数据
            this.search();
          }
        })
        .catch(() => {});
    },
    //新增
    add() {
      this.$refs.questionEditRef.modal = "add";
      this.$refs.questionEditRef.dialogVisible = true;
    }
    // 好使
    // formatType(val){
    //     return this.typeObj[val]
    // }
  }
  // 不好使,里面的this不是指向vue实例
  // filters:{
  //     formatType(val){
  //        return this.typeObj[val]
  //     }
  // }
  //不好使,不能接收参数
  // computed:{
  //   formatType(val){
  //     console.log('这是',val);//这里面的val不是传来的参数是vue实例而且上面也不能写()传递参数不然会以为是方法
  //     return 'test'
  //   }
  // }
};
</script>

<style>
</style>