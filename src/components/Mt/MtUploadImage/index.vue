<template>
  <div>
    <!-- 上传文件 -->
    <el-upload
      v-if="type == 'file'"
      :action="action"
      :auto-upload="true"
      :data="data"
      :headers="headers"
      :accept="accept"
      :limit="limit"
      :before-upload="beforeUploadForm"
      :on-exceed="handleExceed"
      :on-success="upLoadSuccess"
      :on-error="uploadFail"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <slot></slot>
    </el-upload>
    <!-- 上传图片 -->
    <el-upload
      v-else
      :action="action"
      list-type="picture-card"
      :auto-upload="true"
      :data="data"
      :headers="headers"
      :accept="accept"
      :limit="limit"
      :before-upload="beforeUploadForm"
      :on-exceed="handleExceed"
      :on-success="upLoadSuccess"
      :on-error="uploadFail"
    >
        <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog v-if="type == 'image'" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MtUploadImage",
  props: {
    action: String, // 上传地址
    data: Object, // 上传时附带的额外参数
    headers: Object, // 设置上传的请求头部
    accept: {
      // 上传类型
      type: String,
      default: () => ".jpg, .png, .gif, .jpeg,.xlsx",
    },
    type: String, //上传文件类型  图片还是文件
    limit: Number, // 上传图片的个数
    formMaxSize: {
      default: 10,
      type: Number,
    },
  },
  data() {
    return {
      baseUrl: process.env.BASE_API,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    // 删除
    handleRemove(file) {
      this.$emit("remove", file);
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 开始上传前验证
    beforeUploadForm(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      // 限制文件类型
      if (this.accept.indexOf(fileSuffix) == -1) {
        this.$message.error(`上传文件只能是` + this.accept + `格式`);
        return false;
      }
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message.error(`上传文件大小不能超过${this.formMaxSize}M!`);
        return false;
      }
      this.$emit("before", file);
      return file;
    }, // 判断图片数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件`);
      return false;
    },

    // 上传成功
    upLoadSuccess(response, file, fileList) {
      this.$emit("success", response, file, fileList);
    },
    //   上传失败
    uploadFail(err, file, fileList) {
      this.$emit("fail", err, file, fileList);
    },
  },
};
</script>
