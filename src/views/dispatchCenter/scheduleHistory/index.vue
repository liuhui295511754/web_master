<template>
    <div class="schedule-history">
      <!-- 查询 -->
      <mt-search-content>
        <el-form :inline="true" class="search-select">
          <el-row>
            <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
              <el-form-item>
                <el-date-picker
                  v-model="searchForm.applyTime"
                  type="date"
                  placeholder="请选择时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5" style="float: right; padding-right: 0">
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
  name: "scheduleHistory",
  data () {
    return {
      tableData: [],
      actionUrl: "",
      fileList: [],
      total: null,
      searchForm: {
        applyTime: '',
        pageNum: 1,
        pageSize: 10
      }

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
