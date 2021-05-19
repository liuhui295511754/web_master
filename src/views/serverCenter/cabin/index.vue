<template>
  <div>
    <!-- 查询 -->
    <mt-search-content>
      <search-form
        ref="searchForm"
        type="cabin"
        :form="searchForm"
        v-loading.fullscreen.lock="fullscreenLoading"
        @add="Add"
        @submit="search"
        @reset="Reset"
        @print="print"
      ></search-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <mt-table
        :data="tableData"
        :currentPage="searchForm.pageNum"
        :total="total"
        :headerStyle="{ 'text-align': 'center' }"
        :cellStyle="{ 'text-align': 'center' }"
        @currentChange="handCurrentChange"
        @size-change="handSizeChange"
      >
        <el-table-column label="服务类型" prop="servicemanageName">
        </el-table-column>
        <el-table-column label="旅客姓名/手机号码" prop="np"> </el-table-column>
        <el-table-column label="航班号/航空公司/机号" prop="fam">
        </el-table-column>
        <el-table-column label="舱位/座位号" prop="ss"> </el-table-column>
        <el-table-column label="航班状态" prop=""></el-table-column>
        <el-table-column label="服务厅房" prop="hallName"> </el-table-column>
        <el-table-column label="接待单位/卡号" prop="rc"></el-table-column>
        <el-table-column
          label="客户类型/付费模式"
          prop="customerName"
        ></el-table-column>
        <el-table-column label="结算类型/套餐" prop="sm"></el-table-column>
        <el-table-column label="服务金额" prop=""></el-table-column>
        <el-table-column label="服务单状态" prop="state">
          <template slot-scope="scope">
            {{ scope.row.state == 0 ? "服务中" : "已完成" }}
          </template>
        </el-table-column>
        <el-table-column
          label="接待时间"
          prop="receptionTime"
        ></el-table-column>
        <el-table-column label="服务单号" prop="serviceNumber">
        </el-table-column>
        <el-table-column label="订单号" prop="orderNo"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="preview(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button type="text" @click="printCard(scope.$index, scope.row)"
              >打印休息卡</el-button
            >
            <el-button type="text" @click="leaveCabin(scope.$index, scope.row)"
              >离舱</el-button
            >
          </template>
        </el-table-column>
      </mt-table>
    </mt-data-content>
    <!-- 弹窗 -->
    <mt-edit-content>
      <mt-dialog
        v-model="showDialog"
        :title="dialogTitle"
        @confirmBtn="confirm"
        :showConfirm="showConfirmBtn"
      >
        <template slot="dialog-body">
          <customer-info-form :form="form" ref="form1"></customer-info-form>
          <customer-type-form
            :form="form"
            :options="options"
            :cardList="cardList"
            ref="form2"
          ></customer-type-form>
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
import searchForm from "@/views/serverCenter/regist/searchForm";
import customerInfoForm from "@/views/serverCenter/components/customerInfoForm";
import customerTypeForm from "@/views/serverCenter/components/customerTypeForm";
import entourageInfoForm from "@/views/serverCenter/components/entourageInfoForm";
import serviceInfoForm from "@/views/serverCenter/components/serviceInfoForm";
import orderInfoForm from "@/views/serverCenter/components/orderInfoForm";
import {
  Save,
  SearchPageOne,
  Detail,
  Leave,
  verification,
  customerTypeList,
  unitType,
  cardType,
  customerList,
} from "@/api/serverCenter";
export default {
  components: {
    searchForm,
    customerInfoForm,
    customerTypeForm,
    entourageInfoForm,
    serviceInfoForm,
    orderInfoForm,
  },
  data() {
    return {
      fullscreenLoading: false,
      searchForm: {
        boardingPass: null, //登机牌
        customerType: null, //客户类型
        fam: null, //航班号/航空公司/机号
        hallId: null, //登机牌
        name: "", //旅客姓名
        orderNo: null, //订单号
        rc: null, //接待单位/常旅客卡号
        serviceNumber: null, //服务单号
        sm: "", //结算类型/套餐名称
        pageNum: 1,
        pageSize: 10,
      },
      cols: [],
      tableData: [],
      personList: [], //随行人员数组
      options: [], //客户类型 数据源
      cardList: [], //会员卡卡种
      total: null,
      showDialog: false,
      showConfirmBtn: true, //隐藏弹窗底部
      dialogTitle: "新增",
      form: {
        placeState: 0, //两舱登记
        //   旅客信息
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
        customerName: null, //客户类型名字
        customerType: null, //客户类型
        receptionUnit: null, //接待单位
        receptionId: null, //接待单位id
        settlementId: null, //结算类型id
        settlementType: null, //结算类型
        cardNumber: null,
        signer: null, //签单人
        receptionTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        // 服务信息
        serviceItem: [], //保存选中的服务类型id
        serviceInfoVOS: [],
        servicePersonal: null, //服务人员
        servicemanagePeople: null, //服务人数
        serviceTime: null, //服务时长
        orderAmount: null, //订单金额
        discountRate: null, //折扣率
        settlementAmount: null, //结算金额
        remark: null, // 备注
        code: null,
      },
    };
  },
  created() {
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
    this.Submit();
  },
  methods: {
    //   新增
    Add() {
      this.showDialog = true;
      this.dialogTitle = "新增";
      this.showConfirmBtn = true;
      this.customerTypeData();
      this.cardTypeData();
      this.$nextTick(() => {
        this.form = {
          placeState: 0,
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

          customerName: null,
          customerType: null,
          receptionUnit: null,
          receptionId: null,
          settlementId: null,
          settlementType: null,
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
          this.$refs.form1.$children[0].resetFields();
          this.$refs.form2.$children[0].resetFields();
          this.$refs.form3.$children[0].resetFields();
          this.$refs.form4.$children[0].resetFields();
          this.$refs.form5.$children[0].resetFields();
        });
      });
    },
    // 搜索
    search() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.Submit();
    },
    //   查询
    async Submit() {
      this.fullscreenLoading = true;
      const res = await SearchPageOne(this.searchForm);
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      //   后期修改成带分页
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    //   重置
    Reset() {
      this.searchForm = {
        boardingPass: null, //登机牌
        customerType: null, //客户类型
        fam: null, //航班号/航空公司/机号
        hallId: null, //登机牌
        name: "", //旅客姓名
        orderNo: null, //订单号
        rc: null, //接待单位/常旅客卡号
        serviceNumber: null, //服务单号
        sm: "", //结算类型/套餐名称
        pageNum: 1,
        pageSize: 10,
      };
      this.Submit();
    },
    //   打印
    print() {},
    // 查看
    async preview(index, row) {
      this.showDialog = true;
      this.dialogTitle = "新增";
      this.showConfirmBtn = false;
      this.fullscreenLoading = true;
      const res = await Detail({ id: row.orderId });
      this.fullscreenLoading = false;
      if (res.code !== 1) return this.$message.error(res.message);
      this.form = res.data;
      this.form.serviceItem = [];
      this.form.serviceInfoVOS.forEach((item) => {
        this.form.serviceItem.push(item.servicemanageId);
      });
    },
    // 打印休息卡
    printCard() {},
    // 离舱
    leaveCabin(index, row) {
      this.$confirm("确定离舱?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Leave({ id: row.id }).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.Submit();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch();
    },
    // 保存
    confirm() {
      const form1 = new Promise((resolve, reject) => {
        this.$refs.form1.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });

      const form2 = new Promise((resolve, reject) => {
        this.$refs.form2.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });

      const form3 = new Promise((resolve, reject) => {
        this.$refs.form3.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      const form4 = new Promise((resolve, reject) => {
        this.$refs.form4.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      const form5 = new Promise((resolve, reject) => {
        this.$refs.form5.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
      //   Promise异步控制多个表单同时验证
      Promise.all([form1, form2, form3, form4, form5]).then(() => {
        verification(this.form).then((res) => {
          if (res.code == 1) {
            this.save(this.form);
          } else {
            this.$confirm(res.message + ", 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.save(this.form);
              })
              .catch(() => {});
          }
        });
      });
    },
    // 提交表单信息
    save(data) {
      Save(data).then((res) => {
        if (res.code == 1) {
          this.showDialog = false;
          this.$message.success(res.message);
          this.Submit();
          // 清空表单
          this.$refs.form1.$children[0].resetFields();
          this.$refs.form2.$children[0].resetFields();
          this.$refs.form3.$children[0].resetFields();
          this.$refs.form4.$children[0].resetFields();
          this.$refs.form5.$children[0].resetFields();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 分页
    handCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.Submit();
    },
    // 条数
    handSizeChange(val) {
      this.searchForm.pageSize = val;
      this.Submit();
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
<style lang="scss">
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
</style>