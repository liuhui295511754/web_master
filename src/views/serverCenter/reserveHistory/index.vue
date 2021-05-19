<template>
  <div>
    <!-- 查询条件 -->
    <mt-search-content>
      <search-form
        :form="searchForm"
        type="reserve"
        @submit="getTableData"
        @reset="Reset"
        @export="exportExcel"
      ></search-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <mt-table
        :data="tableData"
        :currentPage="searchForm.pageNum"
        :pageSize="searchForm.pageSize"
        @currentChange="handCurrentChange"
        @size-change="handSizechange"
        :total="total"
        :headerStyle="{ 'text-align': 'center' }"
        :cellStyle="{ 'text-align': 'center' }"
      >
        <el-table-column type="expand" prop="serviceInfoTwoVOS">
          <template slot-scope="scope">
            <el-table
              :header-cell-style="{
                background: '#f5f7fa',
                'text-align': 'center',
              }"
              :cell-style="{ background: '#f5f7fa', 'text-align': 'center' }"
              :data="scope.row.serviceInfoTwoVOS"
              ref="childTable"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
              ></el-table-column>
              <el-table-column prop="servicemanageName" label="服务类型">
              </el-table-column>
              <el-table-column prop="hallName" label="服务厅房">
              </el-table-column>
              <el-table-column prop="servicemanagePeople" label="服务人数">
              </el-table-column>
              <el-table-column prop="name" label="状态"> </el-table-column>
            </el-table> </template
        ></el-table-column>
        <el-table-column label="预约编号" prop="number"></el-table-column>
        <el-table-column label="预约服务事件" prop=""></el-table-column>
        <el-table-column label="预约人/单位" prop="sname"></el-table-column>
        <el-table-column label="客户类型" prop="customerType"></el-table-column>
        <el-table-column label="接待单位/卡号" prop="rc"></el-table-column>
        <el-table-column label="登记位置" prop="placeState"></el-table-column>
        <el-table-column label="旅客姓名" prop="name"></el-table-column>
        <el-table-column
          label="航班号/航空公司/机号"
          prop="fam	"
        ></el-table-column>

        <el-table-column
          label="随行人数"
          prop="accompanyPeople"
        ></el-table-column>
        <el-table-column
          label="总服务人数"
          prop="servicePeople"
        ></el-table-column>
        <el-table-column label="预约服务" prop="state">
          <template slot-scope="scope">
            {{ scope.row.state == 0 ? "两舱服务" : "接待登记" }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="接机牌迎送语" prop="words"></el-table-column>
        <el-table-column label="预约状态" prop="state">
          <template slot-scope="scope">
            {{ scope.row.state == 0 ? "新增" : "接待登记" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="preview(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </mt-table>
    </mt-data-content>
    <!-- 弹窗 -->
    <mt-dialog title="查看" v-model="showDialog" @confirmBtn="confirm">
      <template slot="dialog-body"> 11 </template>
    </mt-dialog>
  </div>
</template>
<script>
import {
  reserveSearch,
  reserveDelete,
  reserveSave,
  reserveDetail,
} from "@/api/serverCenter";
import searchForm from "@/views/serverCenter/regist/searchForm";
export default {
  components: {
    searchForm,
  },
  data() {
    return {
      showDialog: false,
      total: null,
      tableData: [],
      currentPage: 1,
      searchForm: {
        customerType: null, //客户类型
        dateOne: null, //预约日期-范围1
        dateTwo: null, //预约日期-范围2
        fam: null, //航班号/航空公司/机号
        name: null, //客户类型
        customerType: null, //旅客姓名
        placeState: null, //登记位置（0 两舱服务/1 接待登记）
        rc: null, //接待单位/常旅客卡号
        sname: null, //预约人/单位
        state: 1, //预约历史
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //   分页
    handCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getTableData();
    },
    // 条数
    handSizechange(val) {
      this.searchForm.pageSize = val;
      this.getTableData();
    },
    //   查询
    async getTableData() {
      const res = await reserveSearch(this.searchForm);
      if (res.code == 1) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$message.error(res.message);
      }
    },
    //   重置
    Reset() {},
    //  导出
    exportExcel() {},
    preview(index, row) {
      this.showDialog = true;
    },
    confirm() {},
  },
};
</script>