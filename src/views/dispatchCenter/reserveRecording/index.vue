<template>
  <div class="reserve-recording">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" :model="searchForm" class="search-select">
        <el-row :gutter="200">
          <el-col :span="4">
            <el-form-item>
              <el-date-picker
                v-model="searchForm.startTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 250px"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item style="">
              <el-input
                v-model="searchForm.touristName"
                placeholder="旅客姓名"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-input
                v-model="searchForm.departureNo"
                placeholder="航班号"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-date-picker
                v-model="searchForm.applyTime"
                type="date"
                placeholder="申请时间"
                style="width: 200px"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchForm.pattern" placeholder="预约渠道" clearable style="width: 200px">
                <el-option label="两舱服务" value="00"> </el-option>
                <el-option label="接待登记" value="11"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 200px">
                <el-option label="待分配" value="0"> </el-option>
                <el-option label="待接收" value="1"> </el-option>
                <el-option label="进行中" value="2"> </el-option>
                <el-option label="已完成" value="3"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item>
              <mt-button
                txt="查询"
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="getTableData"
              ></mt-button>
            </el-form-item>
            <el-form-item>
              <mt-button txt="导出" @click="addListData"></mt-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">重置</el-button>
            </el-form-item>
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
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-button
                  size="mini"
                  @click="distributionOperate(scope.$index, scope.row)"
                >分配作业</el-button
                >
              </el-col>
            </el-row>
          </template>
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

    <!-- 弹窗 -->
    <mt-edit-content>
      <mt-dialog :title="dialogTitle" v-model="show" @confirmBtn="confirm">
        <template slot="dialog-body">
          <edit-form ref="editForm"></edit-form>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
export default {
  name: "reserveRecording",
    data () {
      return {
        tableData: [],
        total:100,
        searchForm: {
          startTime: null,
          touristName: null,
          departureNo: null,
          applyTime: null,
          pattern: null,
          status: null,
          pageNum:1,
          pageSize:10,
        },
        cols: [
          { label: "服务单编号", prop: "serviceNumber", width: "" },
          { label: "进/出港", prop: "in-outPort", width: "" },
          { label: "预约人/单位", prop: "subscribers", width: "" },
          { label: "旅客姓名", prop: "touristName", width: "" },
          { label: "航班号", prop: "departureNo", width: "" },
          { label: "接待单位", prop: "receptionCompany", width: "" },
          { label: "预约服务时间", prop: "serviceTime", width: "100" },
          { label: "预计到达/起飞时间", prop: "time", width: "100"},
          { label: "随行人员", prop: "retinue" },
          { label: "客户类型", prop: "customerType", width: "" },
          { label: "预约厅房", prop: "reserveHall", width: "" },
          { label: "签单人", prop: "signatory", width: ""},
          { label: "备注", prop: "remark", width: "100"},
          { label: "接机牌迎接语", prop: "greetLanguage", width: "100" },
          { label: "状态", prop: "status", width: "" }
        ],


      }
    },
  methods: {
    distributionOperate() {

    },
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
