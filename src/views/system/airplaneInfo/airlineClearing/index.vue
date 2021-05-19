<template>
  <div class="airline-clearing">
    <el-tabs type="card">
      <!--上传-->
      <mt-search-content>
        <el-form class="form-upload">
          <el-form-item>
            <mt-upload-image
              class="upload"
              type="file"
              ref="upload"
              action="http://192.168.1.154:8080/airlineClear/importExcel"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList2">
            </mt-upload-image>
          </el-form-item>
        </el-form>
      </mt-search-content>
      <!--table-->
      <mt-data-content>
        <mt-table
          :data="clearingTableData"
          :currentPage=clearingInline.pageNum
          :total="total"
          :cell-style="{ 'text-align': 'center' }"
          :header-style="{ 'text-align': 'center' }"
          @currentChange="handleCurrentChange"
          @size-change="handleSizeChange"
        >
          <el-table-column
            v-for="(item, index) in clearingCols"
            :key="index"
            :label="item.label"
            :prop="item.prop"
          ></el-table-column>
        </mt-table>
      </mt-data-content>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'airlineClearing',
  props: {
    clearingTableData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      activeName: 'second',
      currentPage: 1,
      showDialog: false,
      dialogTitle: '新增',
      clearingCols: [
        { label: "航空公司名称", prop: "airplaneName" },
        { label: "头等舱旅客服务", prop: "firstClassService" },
        { label: "持卡旅客服务", prop: "cardService" },
        { label: "贵宾旅客服务", prop: "vipService" },
        { label: "国内贵宾(重要旅客)服务", prop: "internalVipService" },
        { label: "国内头等舱、公务舱旅客服务", prop: "bothService" },
        { label: "重要旅客服务", prop: "importantService" },
        { label: "头等舱旅客随行服务费", prop: "firstClassCharge" },
        { label: "重要旅客随行服务费", prop: "importantCharge" },
        { label: "持卡旅客随行服务费", prop: "cardCharge" }
      ],
      fullscreenLoading: false,
      fileList2: [],
      total: null,
      clearingInline: {
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    //查詢
    getTableData() {
      this.$emit('getClearingTableData')
    },
    //編輯
    handleEdit(index, row) {
      this.$emit('edit', index, row)
    },
    //刪除
    handleDelete(index, row) {
      this.$emit('delete', index, row)
    },
    confirm(val) {
      this.$emit('clearingConfirm', val)
    },
    // 每页条数
    handleSizeChange(val) {
      this.$emit('clearingHandleSizeChange', val)
    },
    // 翻页
    handleCurrentChange(val) {
      this.$emit('clearingHandleCurrentChange', val)
    },

    // 没有children则不展开
    getRowClassName({ row, rowIndex }) {
      if (row.children == undefined || row.children.length == 0) {
        return "row-expand-cover";
      }
    },
    handleExceed(files, fileList2) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList2.length} 个文件`);
    }
  }
}
</script>

<style scoped>

</style>
