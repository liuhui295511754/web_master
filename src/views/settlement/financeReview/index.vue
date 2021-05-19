<template>
  <div>
    <mt-upload-excel
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    ></mt-upload-excel>
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      border
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt"].some(
        (item) => item === types
      );
      if (!fileType) {
        this.$message.error("格式错误！请重新选择");
        return false;
      }
      if (isLt1M) {
        return true;
      }
      this.$message.error("请不要上传超过1M大小的文件.");
      return false;
    },
    handleSuccess({ results, header }) {
      console.log(results);
      this.tableData = results;
      this.tableHeader = header;
    },
  },
};
</script>