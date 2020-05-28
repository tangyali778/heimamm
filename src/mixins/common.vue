<script>
export default {
  methods: {
    //改变状态
    async changeStatus(url, id) {
      const res = await this.$axios.post(url, { id });
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: "更新状态成功"
        });
        //刷新当前页面
        this.getListData();
      } else {
        this.$message.error(res.data.message);
      }
    },
    //删除
    del(url, id) {
      this.$confirm(`确定删除该用户吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post(url, { id });
          console.log(res);
          // 成功就弹出提示框
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //  并且要重新查询,展示第一页的数据内容
            this.search();
          }
        })
        .catch(() => {});
    }
  }
};
</script>

