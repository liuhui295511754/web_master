<template>
  <div>
    <!-- 搜索 -->
    <mt-search-content>
      <search-form
        v-loading.fullscreen.lock="fullscreenLoading"
        ref="searchForm"
        :form="searchForm"
        type="reserve"
        @submit="search"
        @reset="resetForm"
      ></search-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <!-- 新增 -->
      <mt-button
        txt="新增"
        style="float: right; margin-bottom: 10px"
        @click="add"
      ></mt-button>
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
        <el-table-column label="预计起飞/到达时间" prop="sa"></el-table-column>
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
            <el-button type="text" @click="edit(scope.row, false)"
              >查看</el-button
            >
            <el-button type="text" @click="del(scope.row, '取消预约')"
              >取消预约</el-button
            >
            <el-button type="text" @click="edit(scope.row, true)"
              >编辑</el-button
            >
            <el-button type="text" @click="del(scope.row, '接待登记')"
              >接待登记</el-button
            >
            <el-button type="text" @click="editHistory(scope.row, 'service')"
              >修改记录</el-button
            >
          </template>
        </el-table-column>
      </mt-table>
    </mt-data-content>
    <!-- 编辑 -->
    <mt-edit-content>
      <mt-dialog
        v-model="dialogShow"
        :title="dialogTitle"
        :showConfirm="showConfirm"
        @confirmBtn="handConfirm"
      >
        <template slot="dialog-body">
          <reserveForm :form="form" ref="form6"></reserveForm>
          <customer-info-form :form="form" ref="form1"></customer-info-form>
          <customer-type-form
            :form="form"
            ref="form2"
            :flag="false"
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
import {
  reserveSearch,
  reserveDelete,
  reserveSave,
  reserveDetail,
  reserveUpdatState,
  verification,
} from "@/api/serverCenter";
import searchForm from "@/views/serverCenter/regist/searchForm";
import customerInfoForm from "@/views/serverCenter/components/customerInfoForm";
import customerTypeForm from "@/views/serverCenter/components/customerTypeForm";
import entourageInfoForm from "@/views/serverCenter/components/entourageInfoForm";
import reserveForm from "@/views/serverCenter/components/reserveForm";
import editHistory from "./../components/editHistory";
import dispacthForm from "./../components/dispacthForm";
import serviceInfoForm from "@/views/serverCenter/components/serviceInfoForm";
import orderInfoForm from "@/views/serverCenter/components/orderInfoForm";
export default {
  components: {
    searchForm,
    customerInfoForm,
    customerTypeForm,
    entourageInfoForm,
    serviceInfoForm,
    orderInfoForm,
    dispacthForm,
    reserveForm,
  },
  data() {
    return {
      fullscreenLoading: false,
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
        state: 0, //预约记录
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      tableData: [],
      dialogTitle: "新增",
      dialogShow: false,
      showConfirm: true,
      personList: [],
      form: {
        id: 0,
        name: "", //预约人/单位
        phone: null, //预约电话
        date: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), //预约日期
        startTime: "", //开始时间
        endTime: "",
        carNumber: "",
        words: null,
        placeState: null, //接待登记
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
        orderInfoVO: {
          subscribeId: 0,
          passengerInfoVOS: [],
          serviceInfoVOS: [],
        },
        // 客户信息
        customerType: null, //客户类型
        receptionUnit: null, //接待单位
        settlementType: 2, //结算类型
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
    // 查询
    search() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getTableData();
    },
    // 重置
    resetForm() {
      this.searchForm = {
        customerType: null,
        dateOne: null,
        dateTwo: null,
        fam: null,
        name: null,
        customerType: null,
        placeState: null,
        rc: null,
        sname: null,
        state: 0,
        pageNum: 1,
        pageSize: 10,
      };
      this.getTableData();
    },
    //   查询
    async getTableData() {
      this.fullscreenLoading = true;
      const res = await reserveSearch(this.searchForm);
      this.fullscreenLoading = false;
      if (res.code == 1) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else {
        this.$message.error(res.message);
      }
    },
    // 新增
    add() {
      this.dialogShow = true;
      this.dialogTitle = "新增";
      this.form = {
        id: 0,
        name: "",
        phone: null,
        date: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        startTime: "",
        endTime: "",
        carNumber: "",
        words: null,
        placeState: null,
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
        orderInfoVO: {
          subscribeId: 0,
          passengerInfoVOS: [],
          serviceInfoVOS: [],
        },

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
      this.$refs.form6.$children[0].resetFields();
      this.$refs.form1.$children[0].resetFields();
      this.$refs.form2.$children[0].resetFields();
      this.$refs.form3.$children[0].resetFields();
      this.$refs.form4.$children[0].resetFields();
      this.$refs.form5.$children[0].resetFields();
    },
    // 详情
    preview(row) {},
    // 删除
    del(row, title) {
      this.$confirm("确定" + title + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res =
            title == "取消预约"
              ? await reserveDelete({ ids: row.id })
              : await reserveUpdatState({ id: row.id });
          if (res.code !== 1) return this.$message.error(res.message);
          this.$message.success(res.message);
          this.getTableData();
        })
        .catch(() => {});
    },
    // 编辑
    edit(row, flag) {
      this.$nextTick(() => {
        reserveDetail({ id: row.id }).then((res) => {
          if (res.code == 1) {
            this.dialogShow = true;
            this.dialogTitle = "编辑";
            this.showConfirm = flag;
            this.form = res.data;
            this.form.serviceItem = [];

            this.form.passengerInfoVOS = this.form.orderInfoVO.passengerInfoVOS;
            this.form.serviceInfoVOS = this.form.orderInfoVO.serviceInfoVOS;
            this.form.customerType = this.form.orderInfoVO.customerType;
            this.form.receptionUnit = this.form.orderInfoVO.receptionUnit;
            this.form.settlementType = this.form.orderInfoVO.settlementType;
            this.form.signer = this.form.orderInfoVO.signer;
            this.form.servicePersonal = this.form.orderInfoVO.servicePersonal;
            this.form.servicemanagePeople = this.form.orderInfoVO.servicemanagePeople;
            this.form.serviceTime = this.form.orderInfoVO.serviceTime;
            this.form.orderAmount = this.form.orderInfoVO.orderAmount;
            this.form.discountRate = this.form.orderInfoVO.discountRate;
            this.form.settlementAmount = this.form.orderInfoVO.settlementAmount;
            this.form.orderInfoVO.serviceInfoVOS.forEach((item) => {
              this.form.serviceItem.push(item.servicemanageId);
            });
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    // 修改记录
    editHistory(row) {},

    // 提交保存
    handConfirm() {
      const form6 = new Promise((resolve, reject) => {
        this.$refs.form6.$children[0].validate((valid) => {
          if (valid) resolve();
        });
      });
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
      Promise.all([form6, form1, form2, form3, form4, form5]).then(() => {
        this.form.orderInfoVO.passengerInfoVOS = this.form.passengerInfoVOS;
        this.form.orderInfoVO.serviceInfoVOS = this.form.serviceInfoVOS;
        this.form.orderInfoVO.customerType = this.form.customerType;
        this.form.orderInfoVO.receptionUnit = this.form.receptionUnit;
        this.form.orderInfoVO.settlementType = this.form.settlementType;
        this.form.orderInfoVO.signer = this.form.signer;
        this.form.orderInfoVO.servicePersonal = this.form.servicePersonal;
        this.form.orderInfoVO.servicemanagePeople = this.form.servicemanagePeople;
        this.form.orderInfoVO.serviceTime = this.form.serviceTime;
        this.form.orderInfoVO.orderAmount = this.form.orderAmount;
        this.form.orderInfoVO.discountRate = this.form.discountRate;
        this.form.orderInfoVO.settlementAmount = this.form.settlementAmount;
        verification(this.form).then((res) => {
          if (res.code == 1) {
            reserveSave(this.form).then((res) => {
              console.log(res.code == 1);
              if (res.code == 1) {
                this.dialogShow = false;
                this.$message.success(res.message);
                this.getTableData();
                // 清空表单
                this.$refs.form6.$children[0].resetFields();
                this.$refs.form1.$children[0].resetFields();
                this.$refs.form2.$children[0].resetFields();
                this.$refs.form3.$children[0].resetFields();
                this.$refs.form4.$children[0].resetFields();
                this.$refs.form5.$children[0].resetFields();
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            this.$confirm(res.message + ", 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                reserveSave(this.form).then((res) => {
                  console.log(res.code == 1);
                  if (res.code == 1) {
                    this.dialogShow = false;
                    this.$message.success(res.message);
                    this.getTableData();
                    // 清空表单
                    this.$refs.form6.$children[0].resetFields();
                    this.$refs.form1.$children[0].resetFields();
                    this.$refs.form2.$children[0].resetFields();
                    this.$refs.form3.$children[0].resetFields();
                    this.$refs.form4.$children[0].resetFields();
                    this.$refs.form5.$children[0].resetFields();
                  } else {
                    this.$message.error(res.message);
                  }
                });
              })
              .catch(() => {});
          }
        });
      });
    },
  },
};
</script>
<style>
.el-select {
  width: 100%;
}
</style>
