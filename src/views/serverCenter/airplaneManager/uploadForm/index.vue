<template>
  <div>
    <!-- 上传组件 -->
    <el-dialog
      center
      :title="title"
      :visible="value"
      :close-on-click-dialog="false"
      @close="close"
      width="30%"
      class="ele-dialog"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="110px"
        :rules="rules"
        style="margin-right: 20px"
      >
        <el-form-item
          :label="title == '导入机号信息更新表' ? '机号更新月份' : '执行月份'"
          prop="updateMouth"
        >
          <el-date-picker
            v-model="form.updateMouth"
            value-format="yyyy-MM"
            format="yyyy-MM"
            type="month"
            placeholder="请选择月份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="导入文件"
          prop="file"
          v-if="title == '导入机号信息更新表'"
        >
          <el-upload
            ref="upload"
            :auto-upload="false"
            :before-upload="beforeUploadForm"
            :on-exceed="handleExceed"
            :limit="1"
            :action="actionUrl"
            :data="{ updateMouth: form.updateMouth }"
            accept=".xls,.xlsx"
            :on-change="changeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <slot></slot>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <slot name="dialog-footer">
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </slot>
      </div>
    </el-dialog>
    <!-- 导入结果 -->
    <mt-dialog
      title="导入结果"
      v-model="show"
      @confirmBtn="confirm"
      width="25%"
    >
      <template slot="dialog-body">
        <div>
          <p>本次一共导入<span class="success"> 100</span>条数据，其中</p>
          <p>导入成功数据<span class="success">80</span>条；</p>
          <p>
            导入失败数据<span class="fail">80</span>条。
            <span class="href">点击下载失败数据，查看失败原因</span>
          </p>
        </div>
      </template>
    </mt-dialog>
  </div>
</template>
<script>
export default {
  name: "editForm",
  props: {
    // 标题
    title: {
      type: String,
      default: "新增",
      required: false,
    },
    // 显示与隐藏，绑定到v-model上的值
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      form: {
        updateMouth: "",
        file: null,
      },
      rules: {
        updateMouth: [{ required: true, message: "请输入", trigger: "blur" }],
        file: [{ required: true, message: "请上传", trigger: "change" }],
      },
      actionUrl: process.env.VUE_APP_BASE_API + "number/info/upload",
    };
  },
  created() {
    console.log(this.actionUrl);
  },
  methods: {
    // 开始上传前验证
    beforeUploadForm(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(fileSuffix.indexOf("xls") == -1);
      // 限制文件类型
      if (fileSuffix.indexOf("xls") == -1) {
        this.$message.error(`上传文件只能是xlsx或xls格式`);
        return false;
      }
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message.error(`上传文件大小不能超过${this.formMaxSize}M!`);
        return false;
      }

      return file;
    },
    // 判断图片数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
      return false;
    },
    //   上传成功
    changeUpload(file, fileList) {
      this.form.file = file;
    },
    // 删除
    removeFile(file) {
      console.log(file);
    },
    // 导入结果 确定按钮
    confirm() {
      this.show = false;
    },
    confirmBtn() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("input", false);
    },
  },
};
</script>