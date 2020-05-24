<template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-form inline :model="searchForm" ref="searchFormRef" :rules="rules" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="searchForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科姓名" prop="name">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格部分 -->
    <el-card style="margin-top:15px"></el-card>
  </div>
</template>

<script>
export default {
  name: "Subject",
  data() {
    return {
      //模型,后台需要的
      searchForm: {
        rid: "", //学科编号
        name: "", //学科姓名
        username: "", //创建者
        status: "" //状态
      },
      page: 1, //页码
      limit: 2, //页容量
      subjectList: [], //学科列表
      total: 0 //总条数
    };
  },
  created() {
    this.getSubjectData();
  },
  methods: {
    // 获取学科列表
    async getSubjectData() {
      const res = await this.$axios.get("/subject/list", {
        params: {
          ...this.searchForm,
          page: this.page,
          limit: this.limit
        }
      });
      if (res.data.code == 200) {
        // console.log(res);
        this.subjectList = res.data.data.item;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getSubjectData();
    },
    //清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      // 显示第一页
      this.search();
    },
    // 新增学科
    add() {}
  }
};
</script>

<style>
</style>