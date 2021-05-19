<template>
    <div class="dispatch-recording">
      <!-- 查询 -->
      <mt-search-content>
        <el-form :inline="true" :model="searchForm" class="search-select">
          <el-row :gutter="210">
            <el-col :span="3">
              <el-form-item>
                <el-date-picker
                  v-model="searchForm.distributeTime"
                  type="date"
                  placeholder="选择分配时间查询"
                  style="width: 200px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="searchForm.distribute" placeholder="按分配手持查询" clearable style="width: 200px">
                  <el-option label="两舱服务" value="00"> </el-option>
                  <el-option label="接待登记" value="11"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="searchForm.servicer" placeholder="按服务人员查询" clearable style="width: 200px">
                  <el-option label="待分配" value="0"> </el-option>
                  <el-option label="待接收" value="1"> </el-option>
                  <el-option label="进行中" value="2"> </el-option>
                  <el-option label="已完成" value="3"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="searchForm.taskType" placeholder="任务类型" clearable style="width: 200px">
                  <el-option label="两舱服务" value="00"> </el-option>
                  <el-option label="接待登记" value="11"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select v-model="searchForm.status" placeholder="按状态查询" clearable style="width: 200px">
                  <el-option label="两舱服务" value="000"> </el-option>
                  <el-option label="接待登记" value="110"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <mt-button
                  txt="查询"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  @click="getTableData"
                ></mt-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">

            </el-col>
          </el-row>
        </el-form>
      </mt-search-content>

      <!-- 列表 -->
      <mt-data-content>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px; font-size: 12px"
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column
            v-for="item in cols"
            :key="item.id"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="searchForm.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="100"
          layout="sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </mt-data-content>

    </div>
</template>
<script>
export default {
  name: "dispatchRecording",
  data () {
    return {
      tableData: [],
      total: 100,
      searchForm: {
        distributeTime: null,
        distribute: null,
        servicer: null,
        taskType: null,
        status: null,
        pageNum:1,
        pageSize:10
      },
      cols: [
        { label: "任务编号", prop: "taskNo", width: "" },
        { label: "任务类型", prop: "taskType", width: "" },
        { label: "航班编号", prop: "departureNo", width: "" },
        { label: "旅客姓名", prop: "touristName", width: "" },
        { label: "备注", prop: "remark", width: "100"},
        { label: "服务人员", prop: "services", width: "" },
        { label: "分配角色", prop: "apportionRole", width: "" },
        { label: "分配时间", prop: "apportionTime", width: "100" },
        { label: "接收时间", prop: "receiveTime", width: "100"},
        { label: "完成时间", prop: "achieveTime" },
        { label: "状态", prop: "status", width: "" }
      ],
    }
  },
  methods: {
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange() {
      this.form.pageNum = val;
      this.getTableData();
    },
  }
}
</script>
