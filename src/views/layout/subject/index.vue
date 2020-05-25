<template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-form inline :model="searchForm" ref="searchFormRef"  label-width="80px">
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
    <el-card style="margin-top:15px">
      <el-table :data="subjectList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status === 1 ? '#85ce61':'red'}"
            >{{scope.row.status === 1? '启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="280" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status===1?'info':'success'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="danger" @click="deletSubject(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
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
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getSubjectData();
    },
    //清除{}
    clear() {
      this.$refs.searchFormRef.resetFields();
      // 显示第一页
      this.search();
    },
    //改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/subject/status", { id });
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: "更新状态成功"
        });
        // 更改成功之后,发送请求显示当前页面数据
        this.getSubjectData();
      } else {
        this.$message.error(res.data.message);
      }
    },
    //删除
    deletSubject(id) {
      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/subject/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            // 删除成功之后,发送请求显示第一页的数据
            this.search();
          }
        })
        .catch(() => {});
    },
    // 页容量改变
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    //当前页改变
    currentChange(val) {
      this.page = val;
      this.getSubjectData();
    },
    // 新增学科
    add() {},
    // 编辑
    editSubject(row) {
      console.log(row);
    }
  }
};
</script>

<style>
</style>