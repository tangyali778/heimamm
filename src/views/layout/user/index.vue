<template>
  <div class="user">
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input style="width:240px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input style="width:240px" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select style="width:240px" v-model="searchForm.role_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:80px">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary">+ 新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分 -->
    <el-card style="margin-top:20px;">
      <!-- 表格 -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" style="color:red">禁用</span>
            <span v-if="scope.row.status===1" style="color:#6ac144">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              :type="scope.row.status===0? 'success':'info'"
            >{{scope.row.status===0?'启用':'禁用'}}</el-button>
            <el-button>删除</el-button>
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
  name: "UserList",
  data() {
    return {
      // 模型
      searchForm: {
        username: "",
        email: "",
        role_id: "" //角色1、超级管理员 2管理员、3老师、 4学生
      },
      page: 1, // 查询时候的页码
      limit: 2, // 查询时候的页容量(每页查询多少条)
      userList: [], //存放发送请求得到的用户信息
      total: 0,

      options: [
        {
          value: "1",
          label: "超级管理员"
        },
        {
          value: "2",
          label: "管理员"
        },
        {
          value: "3",
          label: "老师"
        },
        {
          value: "4",
          label: "学生"
        }
      ]
    };
  },
  methods: {
    //先发送请求得到用户信息
    async getUserData() {
      const res = await this.$axios.get("/user/list", {
        params: {
          // 这个就相当于...this.searchForm
          //  username: this.searchForm.username,
          //   email: this.searchForm.email,
          //   role_id: this.searchForm.role_id
          ...this.searchForm,
          page: this.page,
          limit: this.limit
        }
      });
      //console.log(res)
      if (res.data.code == 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    //搜索方法
    search() {
      //搜索要显示第一页的数据,不要从当前页
      this.page = 1;
      this.getUserData();
    },
    // 清空方法
    clear() {
      // 调用form表单的重置方法要搭配prop使用
      this.$refs.searchRef.resetFields();
      // 显示第一页
      this.search();
    },
    //每页的容量改变
    handleSizeChange(val) {
      this.limit = val;//页容量改变之后,是从第一页开始搜索
      this.search();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.page=val;//当前页码改变之后,是从选中的那个页码开始发送请求
      this.getUserData()
    }
  },
  created() {
    // 获取用户列表数据,用户内容展示
    this.getUserData();
  }
};
</script>

<style>
</style>