<template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
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
            <el-button type="primary" @click="editEnterprise(scope.row)">编辑</el-button>
            <!-- <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===1?'info':'success'"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button> -->
             <el-button
              @click="changeStatus('/enterprise/status',scope.row.id)"
              :type="scope.row.status===1?'info':'success'"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <!-- <el-button @click="deleteEnterprise(scope.row.name,scope.row.id)">删除</el-button> -->
            <el-button @click="del('/enterprise/remove',scope.row.id)">删除</el-button>

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
    <enterprise-edit ref="enterpriseEditRef"></enterprise-edit>
  </div>
</template>

<script>
// 导入子组件
import EnterpriseEdit from "./enterprise=add=or-update";
//1.导入混入对象
import common from '@/mixins/common'
export default {
  //2. 在自身组件中进入混入
  mixins:[common],
  name: "EnterPrise",
  //局部注册
  components: {
    EnterpriseEdit
  },
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
    async getListData() {
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
      this.getListData();
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
      this.getListData();
    },
    //改变状态
    // async changeStatus(id) {
    //   const res = await this.$axios.post("/enterprise/status", { id });
    //   if (res.data.code == 200) {
    //     //提示
    //     this.$message({
    //       message: "更改成功",
    //       type: "success"
    //     });
    //     //刷新
    //     this.getListData();
    //   }
    // },
    //删除
    // del(id) {
    //   this.$confirm(`确定删除这个企业吗`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$axios.post("/enterprise/remove", { id });
    //       if (res.data.code == 200) {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!"
    //         });
    //       }
    //       // 重新搜索
    //       this.search();
    //     })
    //     .catch(() => {});
    // },
    // 点击新增企业按钮
    add() {
      this.$refs.enterpriseEditRef.modal = "add"; //告诉子组件是新增点过来的不是编辑
      this.$refs.enterpriseEditRef.dialogVisible = true; //子组件可见
      //清空内容
      this.$refs.enterpriseEditRef.addForm = {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //简称
        intro: "", //企业简介
        remark: "" //备注
      };
      // this.$nextTick(() => {
      //   this.$refs.enterpriseEditRef.$refs.addFormRef.clearValidate(); //清空校验
      // });
    },
    // 点击编辑企业按钮
    editEnterprise(row) {
      //console.log(row);
      this.$refs.enterpriseEditRef.modal = "edit";
      this.$refs.enterpriseEditRef.dialogVisible = true;
      const { id, eid, name, short_name, intro, remark } = row; //把row里面的部分属性的值赋值给左边那些属性
      this.$refs.enterpriseEditRef.addForm = {
        id,
        eid,
        name,
        short_name,
        intro,
        remark
      };
      // this.$nextTick(() => {
      //  this.$refs.enterpriseEditRef.$refs.addFormRef.clearValidate(); //清空校验
      // });
    }
  },
  created() {
    this.getListData();
  }
};
</script>

<style>
</style>