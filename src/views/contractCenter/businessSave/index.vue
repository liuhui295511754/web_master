<template>
  <div class="business-save-container">
    <!-- 搜素区域 -->
    <div class="search-container">
      <el-form ref="form" :model="searchForm" :inline="true">
        <el-form-item>
          <el-select v-model="searchForm.receptionUnitId"
                     clearable
                     placeholder="请选择商旅公司">
            <el-option
              v-for="item in businessCompanyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="searchForm.status"
            clearable
            placeholder="合同状态"
            class="handle-select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="beginDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同开始时间"
            end-placeholder="合同开始时间"
            style="width:310px"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="endDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同到期时间"
            end-placeholder="合同到期时间"
            style="width:310px"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="addcontract">新增</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <mt-table
      v-loading="tableLoading"
      :data="tableData"
      :total="total"
      :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum"
      :headerStyle="{ 'text-align': 'center' }"
      :cellStyle="addClass"
      @currentChange="SavePageChange"
      @size-change="handleSizeChange"
    >

      <template v-for="(item, index) in tableColumn">
        <el-table-column
          v-if="item.prop == 'contractStatus'"
          :key="index"
          label="服务内容及收费标准"
          prop="contractStatus"
          :width="item.width"
        >
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="handlePreviewSave(scope.row.id, scope.row)"
              >查看合同详情</el-link
            >
          </template>
        </el-table-column>

        <el-table-column
         v-else-if="item.prop == 'settlementCycle'"
          :key="index"
          label="合同有效期"
          :width="item.width"
        >
          <template slot-scope="scope">
<!--            <span>{{scope.row.beginDate | sexIdcardFilter}}至{{scope.row.endDate | sexIdcardFilter}}</span>-->
            <span>{{scope.row.beginDate}}至{{scope.row.endDate}}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.prop == 'status'"
          :key="index"
          label="合同状态"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未生效</span>
            <span v-if="scope.row.status==1">生效</span>
            <span v-if="scope.row.status==2">即将到期</span>
            <span v-if="scope.row.status==3">失效</span>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        ></el-table-column>
      </template>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-row :gutter="5">
            <el-col :span="3.42">
              <el-link
                :underline="false"
                @click="handleEdit(scope.row.id, scope.row)"
                >修改</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link
                :underline="false"
                @click="handleDelete(scope.row.id, scope.row)"
                >删除</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handlePrice(scope.row)"
                >修改价格</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handleDelay(scope.row)"
                >延期</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handleRevise(scope.row)"
                >储值</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handleCeduce(scope.row)"
                >扣减</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handlebalance(scope.row)"
                >修订记录</el-link
              ></el-col
            >
          </el-row>
        </template>
      </el-table-column>
    </mt-table>

    <!-- 扣减 储值 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      width="40%"
      center
      :visible.sync="dialogFormVisible"
    >
      <!-- <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form :model="formLabel" size="small" style="width:300px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in form"
              :key="index"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formLabel[item.model]"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-row v-if="balanceHandle == false">
              <el-form-item label="本次储值" :label-width="formLabelWidth">
                <el-input v-model="formLabel.store"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="formLabel.mark"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row> -->
      <!-- <el-row v-if="balanceHandle !== false">
        <el-alert
          title="温馨提示：合同已到期，点击“确定平账”后，系统会将剩余余额一次性扣除，请谨慎操作！"
          type="error"
          :closable="false"
        >
        </el-alert>
      </el-row> -->
      <business-stored :dialogTitle='dialogTitle' :form='delay'></business-stored>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getDialogData">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 商旅合同新增 -->
    <el-dialog :visible.sync="dialogAddVisible" width="70%" center>
      <div slot="title" class="business-title">
        <span>新增商旅合同</span>
      </div>
      <business-basis ref='form'
                      :formLabel="form"
                      :searchLable='searchLable'
                      :contractAfter="contractAfter"
                      :service='service'
                      :airlinesBasic='airlinesBasic'
                      :dialogViewContract="dialogViewContract"
                      :contractAfterView='contractAfterView'
      ></business-basis>
      <div slot="footer" class="dialog-footer" v-if="footerbtn=='查看合同'">
        <el-button type="primary" style="width:120px" @click="dialogAddVisible = false">关闭</el-button>
      </div>

      <div slot="footer" class="dialog-footer" v-else>
        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
        <el-button @click="dialogAddVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改价格 -->
    <el-dialog :visible.sync="dialogmodifyPrice" width="70%" center>
      <div slot="title" class="business-title">
        <span>修改价格</span>
      </div>
      <business-price :formLabel="formLabel"></business-price>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogmodifyPrice = false"
          >确 定</el-button
        >
       <el-button @click="dialogmodifyPrice = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogdelay" center>
      <div slot="title" class="business-title">
        <span>合同延期</span>
      </div>
      <business-delay :form='delay'></business-delay>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getDialogDelay">确 定</el-button>
        <el-button @click="dialogdelay = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="合同修订记录"
      :visible.sync="DialogModifyHistory"
      width="30%"
      center
    >
      <business-modifyed></business-modifyed>
      <div slot="footer" class="dialog-footer" >

        <el-button type="primary" @click="DialogModifyHistory = false"
          >确 定</el-button
        >
        <el-button @click="DialogModifyHistory = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BusinessContract from "../Business/BusinessContract";
import BusinessPrice from "../Business/BusinessPrice";
import BusinessDelay from "../Business/BusinessDelay";
import BusinessBasis from "../Business/BusinessBasis";
import BusinessService from "../Business/BusinessService";
import BusinessModifyed from "../Business/BusinessModifyed";
import BusinessStored from "../Business/BusinessStored";

import {
  businessBeforeList,
  businessBeforeSave,
  businessBeforeDel,
  businessBeforeEdit,
  SchedulingSonList,
  hallList,
  businessBeforeDelay, businessStored
} from '@/api/businessSave'
import {businessAfterDelay, businessAfterEdit, receptionListType} from "@/api/businessAfter";
import {airlinesEdit} from "@/api/airlines";

export default {
  components: {
    BusinessContract,
    BusinessPrice,
    BusinessDelay,
    BusinessBasis,
    BusinessService,
    BusinessModifyed,
    BusinessStored
  },
  data() {
    return {
      dialogTitle: "储值",
      value1: "",
      footerbtn:'',
      beginDateAll:[],
      endDateAll:[],
      businessCompanyList: [],//商旅公司
      total:100,
      options: [
       {
          label: "生效",
          value: 1
        },
        {
          label: "失效",
          value: 3
        },
        {
          label: "即将到期",
          value:2
        },
        {
          label: "未生效",
          value: 0
        },
      ],

      searchForm: {
        receptionUnitName:null,
        receptionUnitId:null,
        value: null,
        status: null,
        beginDateOne:null,
        beginDateTwo:null,
        endDateOne:null,
        endDateTwo:null,
        pageNum:1,
        pageSize:10,
      },
      delay:{
        code:"",
        name:'',
        receptionUnitName:"",
        storedMoney: null,
        currentStored: null,
        remark: "",
      },
      searchLable:[],
      service:[],
      airlinesBasic:'预储值',
      dialogFormVisible: false,
      dialogmodifyPrice: false,
      dialogdelay: false,
      contractAfterView:false,
      dialogAddVisible: false,
      balanceHandle: false,
      tableLoading: false,
      dialogViewContract: false,
      DialogModifyHistory: false,
      contractAfter:false,
      formLabelWidth: "80px",
      tableData:[],
      formLabel: {
        contractNumber: "",
        customerName: "",
        contractNamer: "",
        contractBalance: "",
        store: "",
        mark: "",
        type:[]
      },
      form:{
        code:"",
        receptionUnitName:"",//接待单位名称
        receptionUnitId:null,//接待单位id
        name:"",
        contractStatus:"",//查看详情
        balance:"",
        usedAmount:"",
        status:"",
        settlementCycle:"",//合同有效期 开始-结束
        days:"",
        settleType:"",
        list:[],
        contractAirline:[],
        fee:null,
        fileName:"",//合同扫描
        fileUrl:"",
        money:null,
        packageName:"",
        packageId:null,
        packageRemark:"",
        serviceHalls:[],//包厅服务子表
        settleWay:"",
        storedAmount:"",
        storedMoney:"",
        warningMoney: "",
        id:0,
      },
      tableColumn: [
        {
          label: "合同编号",
          prop: "code",
          width: ""
        },
        {
          label: "客户名称",
          prop: "receptionUnitName",
          width: ""
        },
        {
          label: "合同名称",
          prop: "name",
          width: ""
        },
        {
          label: "服务内容及收费标准",
          prop: "contractStatus",
          width: "110"
        },
        {
          label: "合同余额",
          prop: "balance",
          width: "60"
        },
        {
          label: "已使用金额",
          prop: "usedAmount",
          width: ""
        },
        {
          label: "历史储值总额",
          prop: "storedAmount",
          width: "80"
        },
        {
          label: "合同状态",
          prop: "status",
          width: "60"
        },
        {
          label: "合同有效期",
          prop: "settlementCycle",
          width: "80"
        },
        {
          label: "距离失效天数",
          prop: "days",
          width: "80"
        },
        {
          label: "到期平帐",
          prop: "settleType",
          width: ""
        }
      ],

    };
  },
  created() {
    this.getBusinessSaveList()
    this.beforeServeData()
    this.gethallList()
    this.getReceptionType()
  },
  methods: {
    //分页查询
   async getBusinessSaveList(){
      const res=await businessBeforeList(this.searchForm)
      console.log(res);
      this.tableData=res.data.list
      this.total=res.data.total
    },

    //获取商旅公司(接待单位) 查询
    async getReceptionType() {
      const res = await receptionListType({type:1})
      if(res.code == 1) {
        this.businessCompanyList = res.data;
        console.log(this.businessCompanyList);
        this.businessCompanyList.forEach(item => {
          this.form.receptionUnitId = item.id;
        })
      } else {
        this.$message.error(res.message);
      }
    },
    //保存
    confirm(){
      console.log(this.form);
      console.log(this.$refs.form);
      this.form.beginDate=this.form.settlementCycle[0]
      this.form.endDate=this.form.settlementCycle[1]
      this.$refs.form.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("输入错误，请重新输入");
        const res = await businessBeforeSave(this.form);
        console.log(res,1112);
        if (res.code !== 1) return this.$message.error(res.message);
        this.dialogAddVisible = false;
        this.getBusinessSaveList();
      });

    },


    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 8) {
        if (row.contractStatus == 1) {
          return { background: "#F56C6C", "text-align": "center" };
        }
      }
      return { "text-align": "center" };
    },
    //修改
    async handleEdit(id) {
      const res = await businessBeforeEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      console.log(res);
      this.form = res.data;
      this.form.list = []
      // res.data.contractAirline.forEach((item)=>{
      //   this.form.list.push(item.serviceId, item.serviceName)
      // })
      this.dialogTitle = '修改商旅合同(预储值)'
      this.dialogAddVisible = true
      let a = this.form.beginDate;
      let b = this.form.endDate;
      this.form.settlementCycle = []
      this.form.settlementCycle.push(a,b)
      // console.log(index, row);
      // this.dialogAddVisible = true;
    },
     //服务
    async beforeServeData(){
    const res = await SchedulingSonList();
      console.log(res);
      this.service = [];
      let array = res.data;
      array.forEach(item => {
        this.service.push({
          serviceId: item.id,
          serviceName: item.name,
          contents:"",
          updator:'2'
        });
      });
    },
    //包厅服务子表
    async gethallList(){
      const res=await hallList({type:0})
      console.log(res);
      this.form.serviceHalls = [];
      let array = res.data;
      array.forEach(item => {
        this.form.serviceHalls.push({
          serviceId:item.id,
          price: item.price,
          areaType: item.areaType,
          areaName:item.areaName,
          area:item.area,
          number:item.number,
          hallName:item.name,
          updator:'3',
          discount:"",
          prices:""

        });
      });
    },
    //删除
    handleDelete(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(async () => {
          const res = await businessBeforeDel({ ids: id });
          if (res.code !== 1) {
            this.$message({
              type: "info",
              message: "删除失败"
            });
          } else {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getBusinessSaveList();
          }
        })
    },
    //查看合同详情
    async handlePreviewSave(id) {
      const res = await businessBeforeEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      console.log(res);
      this.form = res.data;
      this.form.list = []
      res.data.contractAirline.forEach((item)=>{
        this.form.list.push(item.serviceId, item.serviceName)
      })
      let a = this.form.beginDate;
      let b = this.form.endDate;
      this.form.settlementCycle = []
      this.form.settlementCycle.push(a,b)
      this.footerbtn='查看合同'
      this.dialogAddVisible = true;
      this.dialogViewContract = false;
    },
    //价格
    handlePrice(row) {
      this.dialogmodifyPrice = true;
    },
    //储值
    handleRevise(row) {
      this.balanceHandle = false;
      this.dialogTitle = "储值";
      this.dialogFormVisible = true;
      // this.formLabel = row;
      this.delay = row;
    },
    //储值保存
    async getDialogData() {
      console.log(this.delay.currentStored);
     if(this.dialogTitle = "储值") {
        this.delay.storedMoney = Number(this.delay.currentStored)  + this.delay.storedMoney;
     }
     const res = await businessStored(this.delay)
      this.dialogFormVisible = false;
      this.getBusinessSaveList()
    },
    //储值保存
    // async getStoredDelay() {
    //  const res = await businessStored({})
    // },
    //延期弹窗
    handleDelay(row) {
      this.delay=row
      this.dialogdelay = true;
    },
    //延期保存
    async getDialogDelay(){
      const res=await businessBeforeDelay({
        id:this.delay.id,
        endDate:this.delay.endDate
      })
      this.dialogdelay=false
      this.getBusinessSaveList()
    },
    //删除合同
    delContract() {},
    //分页
    SavePageChange(val){
      this.searchForm.pageNum = val;
      this.getBusinessSaveList()
    },
    //页数
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getBusinessSaveList()
    },
     //查询重置
    search(){
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getBusinessSaveList();
    },
    //扣减
    handleCeduce(row) {
      this.balanceHandle = false;
      this.dialogTitle = "扣减";
      this.dialogFormVisible = true;
      // this.formLabel = row;
      this.delay = row;
    },
    //储值保存
    async getDialogSaveData() {
      console.log(this.delay.currentStored);
      if(this.dialogTitle = "扣减") {
        this.delay.storedMoney = this.delay.storedMoney - Number(this.delay.currentStored) ;
      }
      const res = await businessStored(this.delay)
      this.dialogFormVisible = false;
      this.getBusinessSaveList()
    },
    //新增合同
    addcontract() {
      this.dialogAddVisible = true;
      this.dialogViewContract = true;
    },
    //修订记录
    handlebalance() {
      this.DialogModifyHistory = true;
    },
    formatterDays(row) {
      var date2 = new Date();
      var date1 = new Date(Date.parse(row.contractValidate.replace(/-/g, "/")));
      var iDays = parseInt(
        Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24
      );
      return iDays + "天";
    }
  }
};
</script>
<style></style>
<style lang="scss" scoped>
.business-save-container {
  padding: 20px;
  .search-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .handle-select {
    width: 120px;
  }

  .business-title {
    height: 50px;
    line-height: 50px;
    background-color: #eee;
    font-size: 20px;
    text-align: left;
  }

  .dialog-footer{
    border-top: 1px solid #eee;
    padding: 20px;
  }


}
</style>

<style lang="scss">
.el-dialog__headerbtn {
  line-height: 50px;
  .el-dialog__close {
    font-size: 30px !important;
  }
}

</style>
