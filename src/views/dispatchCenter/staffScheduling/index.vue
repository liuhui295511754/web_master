<template>
  <div class="crew-scheduling">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" class="search-select">
        <el-row>
          <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
            <el-form-item>
              <div class="date">{{date}}</div>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5" style="float: right; margin-right: 0">
            <el-form-item>
              <mt-upload-image
                class="upload"
                type="file"
                :action="actionUrl"
                multiple
                :limit="3"
                :file-list="fileList"
                @success="upLoadSuccess"
                @fail="uploadFail">
              </mt-upload-image>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <mt-table
        :data="tableData"
        :currentPage="searchForm.pageNum"
        :total="total"
        :cell-style="{ 'text-align': 'center' }"
        :header-style="{ 'text-align': 'center' }"
        @currentChange="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
        >
        </el-table-column>
        ></mt-table
      ></mt-data-content
    >
  </div>
</template>
<script>
export default {
    data () {
      return {
        tableData: [],
        date: "2021-01-25",
        actionUrl: "https://192.168.1.88:8080/airline/machine/importExcel",
        fileList: [],
        total: null,
        searchForm: {
          pageNum: 1,
          pageSize: 10
        },
        tableColumn: [
          { label: "姓名", prop: "name" },
          { label: "工号", prop: "staffNo" },
          { label: "角色", prop: "role" },
          { label: "所属班组", prop: "group" },
          { label: "服务厅房", prop: "serverHall" },
          { label: "备注", prop: "remark" },
        ]
      }
    },
  methods: {
    //上传成功
    upLoadSuccess(response, file, fileList) {
      this.$emit('uploadSuccess', response, file, fileList)
    },
    //上传失败
    uploadFail(err, file, fileList) {
      this.$emit('uploadFail', err, file, fileList)
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getTableData();
    },
  }
}
</script>
<style scoped>

</style>
