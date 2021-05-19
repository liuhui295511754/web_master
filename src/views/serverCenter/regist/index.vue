<template>
  <div>
    <!-- 查询 表单 -->
    <mt-search-content>
      <search-form
        type="regist"
        :form="searchForm"
        @add="Add"
        v-loading.fullscreen.lock="fullscreenLoading"
        @submit="search"
        @reset="Reset"
        @print="print"
      ></search-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <data-table
        :data="tableData"
        @preview="preview"
        @edit="edit"
        @write="write"
        @child-edit="edit"
        @child-preview="preview"
        @child-dispatch="dispatch"
      ></data-table>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" class="page">
        <el-pagination
          class="mt-page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.pageNum"
          :page-size="searchForm.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :total="total"
          layout="sizes, prev, pager, next, jumper,total"
        ></el-pagination>
      </el-col>
      <!-- 订单修改记录 -->
      <!-- <edit-history :data="historyData"></edit-history> -->
      <!-- 调度 -->
      <dispacth-form
        v-model="dispatchFlag"
        @confirm="confirmDispatch"
        :form="form"
      >
      </dispacth-form>
    </mt-data-content>
    <!-- 弹窗 -->
    <mt-edit-content>
      <mt-dialog
        :title="dialogTitle"
        v-model="show"
        @confirmBtn="confirm"
        :showConfirm="showConfirm"
      >
        <template slot="dialog-body">
          <!--旅客信息-->
          <customer-info-form
            ref="customerInfoForm"
            class="form"
            :form="form"
          ></customer-info-form>
          <!--客户属性-->
          <customer-type-form
            ref="customerTypeForm"
            :options="options"
            :cardList="cardList"
            class="form"
            :form="form"
          ></customer-type-form>
          <!--随行信息-->
          <entourage-info-form
            ref="entourageInfoForm"
            :form="form"
            :personList="personList"
            class="form"
          ></entourage-info-form>
          <!-- 服务信息 -->
          <service-info-form
            ref="serviceInfoForm"
            :form="form"
            :personList="personList"
            class="form"
            :cabin="false"
          ></service-info-form>
          <!-- 订单信息 -->
          <order-info-form
            ref="orderInfoForm"
            :form="form"
            class="form"
          ></order-info-form>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import searchForm from "./searchForm";
import dataTable from "./dataTable";
import customerInfoForm from "@/views/serverCenter/components/customerInfoForm";
import customerTypeForm from "@/views/serverCenter/components/customerTypeForm";
import entourageInfoForm from "@/views/serverCenter/components/entourageInfoForm";
import serviceInfoForm from "@/views/serverCenter/components/serviceInfoForm";
import orderInfoForm from "@/views/serverCenter/components/orderInfoForm";
import editHistory from "./../components/editHistory";
import dispacthForm from "./../components/dispacthForm";
import {
  Save,
  SearchPageTwo,
  Detail,
  Dispatch,
  customerTypeList,
} from "@/api/serverCenter";
export default {
  components: {
    searchForm,
    dataTable,
    editHistory,
    customerInfoForm,
    customerTypeForm,
    entourageInfoForm,
    serviceInfoForm,
    orderInfoForm,
    dispacthForm,
  },
  data() {
    return {
      fullscreenLoading: false,
      show: false,
      showConfirm: true,
      dialogTitle: "新增",
      total: null,
      tableData: [],

      dispatchFlag: false, //调度弹窗
      historyData: [], //订单修改记录
      searchForm: {
        stats: 0, //接待登记 1记录复核
        hallId: null, //服务厅房
        name: "", //旅客姓名
        customerType: null, //客户类型
        fam: null, //航班号/航空公司/机号
        rc: null, //接待单位/常旅客卡号
        receptionTimeOne: "", //接待日期
        receptionTimeTwo: "",
        sm: "", //结算类型/套餐名称
        serviceNumber: null, //服务单号
        orderNo: null, //订单号
        pageNum: 1,
        pageSize: 10,
      },
      options: [],
      cardList: [],
      form: {
        stats: 0, //接待登记 1记录复核
        //   旅客信息
        placeState: 1, //接待登记
        passengerInfoVOS: [
          {
            temporaryId: null,
            name: "", //姓名
            idNumber: null, //身份证
            phone: null, //电话
            post: "", //职务
            boardingPass: "", //登机牌
            flightNumber: null, //航班号
            startingTime: this.$moment(new Date()).format(
              "YYYY-MM-DD HH:mm:ss"
            ), //出发时间
            arrivalTime: null, //到达时间
            airplane: "", //航空公司
            airplaneId: null, //航空公司Id
            seatNumber: null, //座位号
            shippingSpace: null, //舱位
            machine: null, //机号
            ticketNumber: null, //客票号
            type: 1, //主客随从
            cardNumber: null, //常旅客卡号
          },
        ],
        // 客户信息
        customerType: null, //客户类型
        receptionUnit: null, //接待单位
        settlementType: 2,
        cardNumber: null,
        signer: null, //签单人
        receptionTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), // 接待时间
        // 服务信息
        serviceItem: [], //保存选中的服务类型id
        serviceInfoVOS: [
          //   {
          //     servicemanageId: null, //服务id
          //     servicemanageName: null, //服务名称
          //     subServicemanageId: null, //子服务id
          //     subServicemanageName: null, //子服务名称
          //     servicePersonal: null, //服务人员
          //     remark: null, // 备注
          //     serviceTime: null, //服务时长
          //     serviceDetails: [
          //       {
          //         passengerId: null, //旅客id
          //         serviceId: null, //服务id
          //       },
          //     ], //服务单详情
          //   },
        ],
        servicePersonal: null, //服务人员
        servicemanagePeople: null, //服务人数
        serviceTime: null, //服务时长
        orderAmount: null, //订单金额
        discountRate: null, //折扣率
        settlementAmount: null, //结算金额
        remark: null, // 备注
      },
    };
  },
  created() {
    this.Submit();
    var id = "";
    for (var i = 0; i < 6; i++) {
      id += Math.floor(Math.random() * 10);
    }

    this.form.passengerInfoVOS[0].temporaryId = new Date().getTime() + id;
    this.personList = [
      {
        passengerId: this.form.passengerInfoVOS[0].temporaryId, //旅客id
        serviceId: null, //服务id
      },
    ];
  },
  methods: {
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.Submit();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.Submit();
    },
    search() {
      this.searchForm.pageSize = 1;
      this.searchForm.pageSize = 10;
      this.Submit();
    },
    //   查询
    async Submit() {
      this.fullscreenLoading = true;

      const res = await SearchPageTwo(this.searchForm);
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    //   重置
    Reset() {
      this.searchForm = {
        boardingPass: null,
        customerType: null,
        fam: null,
        hallId: null,
        name: "",
        orderNo: null,
        rc: null,
        serviceNumber: null,
        sm: "",
        pageNum: 1,
        pageSize: 10,
      };
      this.Submit();
    },
    //   打印
    print() {},

    //   新增
    Add() {
      this.show = true;
      this.dialogTitle = "新增";
      this.customerTypeData();
      this.form = {
        stats: 0,
        placeState: 1,
        passengerInfoVOS: [
          {
            temporaryId: null,
            name: "",
            idNumber: null,
            phone: null,
            post: "",
            boardingPass: "",
            flightNumber: null,
            startingTime: this.$moment(new Date()).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            arrivalTime: null,
            airplane: "",
            airplaneId: null,
            seatNumber: null,
            shippingSpace: null,
            machine: null,
            ticketNumber: null,
            type: 1,
            cardNumber: null,
          },
        ],
        customerType: null,
        receptionUnit: null,
        settlementType: 2,
        cardNumber: null,
        signer: null,
        receptionTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        serviceItem: [],
        serviceInfoVOS: [],
        servicePersonal: null,
        servicemanagePeople: null,
        serviceTime: null,
        orderAmount: null,
        discountRate: null,
        settlementAmount: null,
        remark: null,
      };
      var id = "";
      for (var i = 0; i < 6; i++) {
        id += Math.floor(Math.random() * 10);
      }

      this.form.passengerInfoVOS[0].temporaryId = new Date().getTime() + id;
      this.personList = [
        {
          passengerId: this.form.passengerInfoVOS[0].temporaryId, //旅客id
          serviceId: null, //服务id
        },
      ];
      this.$nextTick(() => {
        this.$refs.customerInfoForm.$children[0].resetFields();
        this.$refs.customerTypeForm.$children[0].resetFields();
        this.$refs.entourageInfoForm.$children[0].resetFields();
        this.$refs.orderInfoForm.$children[0].resetFields();
        this.$refs.serviceInfoForm.$children[0].resetFields();
      });
    },
    // 提交
    confirm() {
      const form1 = new Promise((resolve, reject) => {
        this.$refs.customerInfoForm.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });

      const form2 = new Promise((resolve, reject) => {
        this.$refs.customerTypeForm.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });

      const form3 = new Promise((resolve, reject) => {
        this.$refs.entourageInfoForm.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      const form4 = new Promise((resolve, reject) => {
        this.$refs.orderInfoForm.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      const form5 = new Promise((resolve, reject) => {
        this.$refs.serviceInfoForm.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      //   Promise异步控制多个表单同时验证
      Promise.all([form1, form2, form3, form4, form5])
        .then(() => {
          Save(this.form).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.show = false;
              this.Submit();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
    },
    // 查看 /编辑/修改
    async detail(id) {
      this.show = true;
      this.customerTypeData();
      this.fullscreenLoading = true;
      const res = await Detail({ id: id });
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      this.form = res.data;
      this.form.serviceItem = [];
      this.form.serviceInfoVOS.forEach((item) => {
        this.form.serviceItem.push(item.servicemanageId);
      });
    },
    // 查看
    preview(row, title) {
      this.customerTypeData();
      let id = title == "主表" ? row.id : row.orderId;
      this.dialogTitle = "查看";
      this.showConfirm = false; //隐藏确定按钮
      this.detail(id);
    },
    // 编辑
    edit(row, title) {
      let id = title == "主表" ? row.id : row.orderId;
      this.detail(id);
    },
    // 修改记录
    write(row) {
      this.show = true;
      this.dialogTitle = "修改";
      this.detail(row.id);
    },
    // 调度详情
    async dispatch(row) {
      this.dispatchFlag = true;
      this.fullscreenLoading = true;
      const res = await Dispatch([row]);
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      console.log(res);
      this.form = res.data;
    },
    // 确定调度
    async confirmDispatch(row) {
      this.dispatchFlag = false;
    },
    // 没有children则不展开
    getRowClassName({ row, rowIndex }) {
      if (row.need == 0) {
        return "row-expand-cover";
      }
    },
    //   客户类型
    async customerTypeData() {
      const res = await customerTypeList();
      if (res.code != 1) return this.$message.error(res.message);
      this.options = res.data;
    },
    // 会员卡卡种
    async cardTypeData() {
      const res = await cardType();
      if (res.code != 1) return this.$message.error(res.message);
      this.cardList = res.data;
    },
  },
};
</script>
<style>
.row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}

.el-select {
  width: 100%;
}

.warn-title {
  width: 100%;
  height: 60px;
  background-color: #4fb091;
  line-height: 60px;
  color: #fff;
  text-indent: 20px;
  font-size: 20px;
  margin-bottom: 40px;
}
.el-autocomplete {
  width: 100%;
}
.form {
  margin-bottom: 40px;
}
.mt-page {
  text-align: right;
  margin-top: 10px;
}
</style>