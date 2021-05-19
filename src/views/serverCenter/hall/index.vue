<template>
  <div>
    <!-- 搜索 -->
    <mt-search-content>
      <el-form :inline="true">
        <el-form-item label="当前厅房:" label-width="80px">
          <el-cascader
            placeholder="请选择厅房"
            v-model="searchForm.hallIds"
            :options="options"
            :props="{ multiple: true, value: 'id', label: 'name' }"
            clearable
            @change="handChange"
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-input
            style="width: 100%"
            clearable
            v-model="searchForm.flightNumber"
            placeholder="航班号"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button
            type="warning"
            @click="dispatch"
            :disabled="dispatchList.length == 0 ? true : false"
            >调度</el-button
          >
        </el-form-item>
      </el-form>
    </mt-search-content>
    <!-- 表格 -->

    <mt-data-content>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="航班" prop="flightNumber"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="舱位" prop="shippingSpace"></el-table-column>
        <el-table-column label="座位号" prop="seatNumber"></el-table-column>
        <el-table-column
          label="预计起飞时间"
          prop="startingTime"
        ></el-table-column>
        <el-table-column label="航班状态" prop=""></el-table-column>
        <el-table-column label="登机口" prop=""></el-table-column>
        <el-table-column label="随行" prop="accompanyPeople"></el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column
          label="结算类型"
          prop="settlementType"
        ></el-table-column>
        <el-table-column
          label="服务人员"
          prop="servicePersonal"
        ></el-table-column>
        <el-table-column label="服务类型" prop="services"></el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                <el-button type="text" @click="printCard(scope.row)"
                  >打印休息卡</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                <el-button type="text" @click="Preview(scope.row)"
                  >查看</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                <el-button type="text" @click="leaveCabin(scope.row)"
                  >离舱</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4">
                <el-button type="text" @click="dispatch(scope.row)"
                  >调度</el-button
                >
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" class="page">
        <el-pagination
          class="mt-page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.pageNum"
          :page-size="searchForm.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :total="total"
          layout="sizes, prev, pager, next, jumper,total"
        ></el-pagination>
      </el-col>
    </mt-data-content>
    <!-- 编辑 -->
    <mt-edit-content>
      <!-- 调度 -->
      <dispatchForm v-model="dispatchFlag" @confirm="Save" :form="form">
      </dispatchForm>
      <!-- 查看 -->
      <mt-dialog v-model="showDialog" title="查看" :showConfirm="false">
        <template slot="dialog-body">
          <customer-info-form :form="form" ref="form1"></customer-info-form>
          <customer-type-form :form="form" ref="form2"></customer-type-form>
          <entourage-info-form
            :form="form"
            :personList="personList"
            ref="form3"
          ></entourage-info-form>
          <service-info-form
            :form="form"
            :personList="personList"
            :cabin="true"
            ref="form4"
          ></service-info-form>
          <order-info-form :form="form" ref="form5"></order-info-form>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import { SearchPageThree, Leave, Dispatch, Detail } from "@/api/serverCenter";
import { SelectList } from "@/api/hallManage";
import editForm from "./editForm";
import dispatchForm from "./../components/dispacthForm";
import customerInfoForm from "@/views/serverCenter/components/customerInfoForm";
import customerTypeForm from "@/views/serverCenter/components/customerTypeForm";
import entourageInfoForm from "@/views/serverCenter/components/entourageInfoForm";
import serviceInfoForm from "@/views/serverCenter/components/serviceInfoForm";
import orderInfoForm from "@/views/serverCenter/components/orderInfoForm";
export default {
  components: {
    editForm,
    dispatchForm,
    customerInfoForm,
    customerTypeForm,
    entourageInfoForm,
    serviceInfoForm,
    orderInfoForm,
  },
  data() {
    return {
      options: [],
      hallId: [],
      searchForm: {
        flightNumber: "", //航班号
        hallIds: [], //服务厅房id
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      tableData: [],
      showDialog: false, //查看
      personList: [],
      form: {},
      dispatchFlag: false, //调度弹窗
      dispatchList: [], //调度
      timer: null,
      notice: null,
    };
  },
  created() {
    this.hallOptions();
    this.getData();
    // this.openNotify();
  },
  //   beforeRouteLeave(to, from, next) {
  //     // console.log("我离开了");
  //     // this.notice.close();
  //     clearInterval(this.timer);
  //   },
  watch: {
    "searchForm.hallIds"(val) {
      console.log(val);
    },
  },
  methods: {
    handChange(val) {
      this.searchForm.hallIds = [];
      val.forEach((item, index) => {
        this.searchForm.hallIds.push(item[0]);
      });
    },
    //   查询厅房
    hallOptions() {
      SelectList().then((res) => {
        if (res.code == 1) {
          this.options = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //   查询
    getData() {
      this.searchForm.hallIds = this.searchForm.hallIds.toString();
      SearchPageThree(this.searchForm).then((res) => {
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重置
    reset() {},
    // 打印休息卡
    printCard() {},
    // 查看
    async Preview(row) {
      this.fullscreenLoading = true;
      const res = await Detail({ id: row.orderId });
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      this.showDialog = true;
      this.dialogTitle = "新增";
      this.form = res.data;
      this.form.serviceItem = [];
      this.form.serviceInfoVOS.forEach((item) => {
        this.form.serviceItem.push(item.servicemanageId);
      });
      console.log(this.form.serviceItem);
    },
    // 离舱
    leaveCabin(row) {
      this.$confirm("确定离舱?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Leave({ id: row.id }).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.getData();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch();
    },
    // 勾选
    handleSelectionChange(val) {
      this.dispatchList = val;
    },
    // 同一厅房、同一航班号才可调度
    selected(row, index) {
      console.log(row.flightNumber);
      //   if (row.flightNumber.is_confirm == 1) {
      //     return false; //不可勾选
      //   } else {
      //     return true; //可勾选
      //   }
    },
    // 调度
    async dispatch(row) {
      this.dispatchList = [row];
      console.log(this.dispatchList);
      const res = await Dispatch(this.dispatchList);
      if (res.code != 1) return this.$message.error(res.message);
      this.dispatchFlag = true;
    },
    // 保存
    Save() {},
    //   分页
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getData();
    },
    // 条数变化
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getData();
    },
    //消息提醒
    openNotify() {
      for (let i = 0; i < 3; i++) {
        this.timer = window.setTimeout(() => {
          //   const h = this.$createElement;
          let msg =
            "<div><div style='padding:20px;border:1px solid #ddd;margin-top:10px'>旅客：陈大民、张三、李四<br/><br/><br/>通知时间：12:00</div></div>";
          this.notice = this.$notify({
            title: "请航班SZ6985旅客准备登机，预计起飞时间为：12:40",
            customClass: "warning",
            dangerouslyUseHTMLString: true,
            message: msg,
            position: "bottom-right",
            duration: 0,
            onClose: function () {
              console.log(111);
            },
          });
        }, 0);
      }
    },
  },
};
</script>
<style>
.el-cascader {
  width: 100%;
}
.el-select {
  width: 100%;
}
.margin-bottom {
  margin-bottom: 10px;
}
.warning {
  width: 460px;
}
.mt-page {
  text-align: right;
  margin-top: 10px;
}
</style>