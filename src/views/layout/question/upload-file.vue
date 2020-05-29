<template>
  <div class="uploadFile">
    <el-upload
      class="avatar-uploader"
      :action="BASE_URL+'/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="type==='video'">
        <video v-if="value" :src="BASE_URL+'/'+value" controls class="avatar"></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <img v-if="value" :src="BASE_URL+'/'+value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  //接受父组件传来的值
  props: {
    type: {
      type: String, //这里表示type类型是字符串
      default: "image" //这个代表接受父组件传来的type的值,如果没有传递参数默认就是image
    },
    value: String
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASEURL
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      // 1、res.data.url ===> 父组件(question-add-or-update.vue) questionForm.video
      // 2、让我们该子组件中的内容，根据实际情况进行渲染（有可能渲染图片、有可能渲染视频)
      this.$emit("input", res.data.url);
    },
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        const isVideo = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isVideo) {
          this.$message.error("上传的文件只能是 mp4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传文件大小不能超过 2MB!");
        }
        return isVideo && isLt2M;
      } else {
        const isImage =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error("上传图片只能是 JPG/PNG/GIF 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isImage && isLt2M;
      }
    }
  }
};
</script>

<style lang="less">
.uploadFile {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>