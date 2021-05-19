<template>
  <div class="crew-scheduling">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" class="search-select">
        <el-row style="float: right">
          <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
            <el-form-item>
              {{date}}
            </el-form-item>
          </el-col>
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
        </el-row>
      </el-form>
    </mt-search-content>
  </div>
</template>

<script>
  export default {
    name: "crewScheduling",
    data() {
      return {
        date: "2021-01-25"
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
