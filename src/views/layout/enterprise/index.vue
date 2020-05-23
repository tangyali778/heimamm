<template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-form inline :model="searchForm" ref="searchFormRef">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:15px;">
      <!-- 表格部分 -->
      <el-table :data="enterpriseList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.status===1?'#85ce61':'red'}"
            >{{scope.row.status===1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===1?'info':'success'"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button @click="deleteUser(scope.row.name,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:15px;text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EnterPrise",
  data() {
    return {
      //模型
      searchForm: {
        eid: "", //企业id
        name: "", //企业名称
        username: "", //用户名
        status: "" //状态
      },
      page: 1, // 页码
      limit: 2, // 页容量
      enterpriseList: [], // table展示所需要的数据
      total: 0 // 总条数
    };
  },
  methods: {
    async getEnterPriseData() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          ...this.searchForm,
          page: this.page,
          limit: this.limit
        }
      });
      //console.log(res);
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 点击搜索按鈕
    search() {
      this.page = 1;
      this.getEnterPriseData();
    },
    //清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 页容量改变
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.page = val;
      this.getEnterPriseData();
    },
    //改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/enterprise/status", { id });
      if (res.data.code == 200) {
        //提示
        this.$message({
          message: "更改成功",
          type: "success"
        });
        //重新查询,展示第一页的数据内容
        this.search();
      }
    },
    //删除
    deleteUser(eid, id) {
      this.$confirm(`确定删除${name}这个企业吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/enterprise/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          // 重新搜索
          this.search()
        })
        .catch(() => {});
    },
    // 新增企业
    add() {}
  },
  created() {
    this.getEnterPriseData();
  }
};
</script>

<style>
</style>