<template>
  <div>
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" class="search-select">
        <el-row>
          <el-col :xs="24" :sm="6" :md="5" :lg="3" :xl="3">
            <el-form-item>
              <el-input
                clearable
                v-model="searchForm.ss"
                placeholder="流水号/服务单号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="4" :lg="3" :xl="3">
            <el-form-item>
              <el-select
                clearable
                v-model="searchForm.moveType"
                placeholder="动账类型"
              >
                <el-option label="入账" :value="0"> </el-option>
                <el-option label="出账" :value="1"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="3" :xl="3">
            <el-form-item>
              <el-select
                clearable
                v-model="searchForm.operationType"
                placeholder="操作类型"
              >
                <el-option label="储值" value="储值"> </el-option>
                <el-option label="扣减" value="扣减"> </el-option>
                <el-option label="创建订单" value="创建订单"> </el-option>
                <el-option label="修改订单" value="修改订单"> </el-option>
                <el-option label="到期自动平账" value="到期自动平账">
                </el-option>
                <el-option label="到期手工平账" value="到期手工平账">
                </el-option>
                <el-option label="记录复核" value="记录复核"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="3" :xl="3">
            <el-form-item>
              <el-input
                clearable
                v-model="searchForm.crm"
                placeholder="合同编号/客户名称/合同名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="3" :xl="3">
            <el-form-item>
              <el-input
                clearable
                v-model="searchForm.creator"
                placeholder="操作者"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="操作时间：">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <mt-button
              txt="查询"
              v-loading.fullscreen.lock="fullscreenLoading"
              @click="search"
            ></mt-button>
          </el-form-item>

          <el-form-item>
            <mt-button
              icon="el-icon-download"
              :loading="downloadLoading"
              txt="导出"
              @click="exportExcel"
            ></mt-button>
          </el-form-item>
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
        <el-table-column label="流水号" prop="storedId"></el-table-column>
        <el-table-column label="动账类型" prop="moveType">
          <template slot-scope="scope">
            {{ scope.row.moveType == 0 ? "入账" : "出账" }}
          </template>
        </el-table-column>
        <el-table-column label="操作类型" prop="operationType">
        </el-table-column>
        <el-table-column label="动账金额" prop="moveAmount"> </el-table-column>
        <el-table-column label="合同余额" prop="area"> </el-table-column>

        <el-table-column label="备注" prop="remark"> </el-table-column>
        <el-table-column label="服务单号" prop="serviceNumber">
        </el-table-column>
        <el-table-column label="合同编号" prop="sn"> </el-table-column>
        <el-table-column label="客户名称" prop="sn"> </el-table-column>
        <el-table-column label="合同名称" prop="sn"> </el-table-column>
        <el-table-column label="操作者" prop="sn"> </el-table-column>
        <el-table-column label="操作时间" prop="sn">
        </el-table-column> </mt-table
    ></mt-data-content>
  </div>
</template>
<script>
import { DataList, Detail, Save, Delete } from "@/api/settlement";
export default {
  data() {
    return {
      fullscreenLoading: false,
      downloadLoading: false,
      value: "",
      searchForm: {
        createTimeOne: null,
        createTimeTwo: null,
        creator: null,
        crm: null,
        moveType: "",
        operationType: "",
        ss: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      tableData: [],
    };
  },
  created() {
    this.getDataList();
  },
  watch: {
    value(val) {
      if (val != null && val.length > 0) {
        this.searchForm.createTimeOne = val[0];
        this.searchForm.createTimeTwo = val[1];
      } else {
        this.searchForm.createTimeOne = "";
        this.searchForm.createTimeTwo = "";
      }
    },
  },
  methods: {
    search() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.searchForm = {
        createTimeOne: null,
        createTimeTwo: null,
        creator: null,
        crm: null,
        moveType: "",
        operationType: "",
        ss: null,
        pageNum: 1,
        pageSize: 10,
      };
      this.searchForm.pageNum = val;
      this.getDataList();
    },
    handleSizeChange(val) {
      this.searchForm = {
        createTimeOne: null,
        createTimeTwo: null,
        creator: null,
        crm: null,
        moveType: "",
        operationType: "",
        ss: null,
        pageNum: 1,
        pageSize: 10,
      };
      this.searchForm.pageSize = val;
      this.getDataList();
    },
    changeTime(val) {},
    async getDataList() {
      const res = await DataList(this.searchForm);
      if (res.code != 1) return this.$message.error(res.$message);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    exportExcel() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "流水号",
          "动账类型",
          "操作类型",
          "动账金额",
          "合同余额",
          "备注",
          "服务单号",
          "合同编号",
          "客户名称",
          "合同名称",
          "操作者",
          "操作时间",
        ];
        const filterVal = [
          "storedId",
          "moveType",
          "operationType",
          "moveAmount",
          "balance",
          "remark",
          "serviceNumber",
          "code",
          "receptionUnitName",
          "name",
          "creator",
          "createTime",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "预储值流水",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "moveType") {
            return v[j] == 0 ? "入账" : "出账";
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>
