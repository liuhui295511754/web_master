<template>
  <div class="business-after-container">
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
      @currentChange="afterPageChange"
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
              @click="handlePreviewAfter(scope.row.id, scope.row)"
              >查看合同详情</el-link
            >
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
          v-else
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        ></el-table-column>

      </template>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-row :gutter="10">
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
                @click="handleDelete(scope.row.id)"
                >删除</el-link
              ></el-col
            >
            <el-col :span="3.42">
              <el-link :underline="false" @click="handleDelay(scope.row)"
                >延期</el-link
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogAddcontract"
      width="70%"
      center
    >
      <business-basis
        ref='form'
        :formLabel="form"
        :contractAfter="contractAfter"
        :dialogViewContract="dialogViewContract"
        :airlinesBasic='airlinesBasic'
        :searchLable='searchLable'
        :contractAfterView='contractAfterView'
        :service="service"
      ></business-basis>
      <!-- <business-guest
        :formLabel="form"
        :tableData="form.serviceGuests"
      ></business-guest>
      <business-process
        :formLabel="form"
        :tableData="form.serviceProcesses"
      ></business-process>
      <business-security
        :formLabel="form"
        :tableData="form.serviceSecurities"
      ></business-security>
      <business-reception :formLabel="formLabel"></business-reception>

      <business-service
        :formLabel="form"
        :tableData="form.serviceHalls"
        :dialogViewContract="dialogViewContract"
      ></business-service>

      <business-named :formLabel="form" :contractAfterView='contractAfterView'></business-named>
       -->

      <div slot="footer" class="dialog-footer" v-if="footerbtn">
        <el-button type="primary" style="width:120px" @click="dialogAddcontract = false">关闭</el-button>
      </div>

      <div slot="footer" class="dialog-footer" v-else>

        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
        <el-button @click="dialogAddcontract = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="合同修订记录"
      :visible.sync="DialogModifyHistory"
      width="30%"
      center>
      <business-modifyed></business-modifyed>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogModifyHistory = false">确 定</el-button>
        <el-button @click="DialogModifyHistory = false">取 消</el-button>
      </span>
    </el-dialog>

 <!-- 延期 -->
  <el-dialog :visible.sync="dialogDelay" center>
      <div slot="title" class="business-title">
        <span>合同延期</span>
      </div>
      <business-delay :form='delay'></business-delay>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getDialogDelay">确 定</el-button>
        <el-button @click="dialogDelay = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import BusinessBasis from "../Business/BusinessBasis";
import BusinessGuest from "../Business/BusinessGuest";
import BusinessProcess from "../Business/BusinessProcess";
import BusinessSecurity from "../Business/BusinessSecurity";
import BusinessReception from "../Business/BusinessReception";
import BusinessService from "../Business/BusinessService";
import BusinessNamed from "../Business/BusinessNamed";
import BusinessModifyed from "../Business/BusinessModifyed";
import BusinessDelay from "../Business/BusinessDelay";
import {businessAfterList,
        businessAfterSave,
        businessAfterDel,
        businessAfterEdit,
        SchedulingSonList,
        hallList,
        businessAfterDelay,
        receptionListType} from '@/api/businessAfter'
import {getAirline} from "@/api/airlineMessage";
import {airlinesEdit} from "@/api/airlines";

export default {
  components: {
    BusinessBasis,
    BusinessGuest,
    BusinessProcess,
    BusinessSecurity,
    BusinessReception,
    BusinessService,
    BusinessNamed,
    BusinessModifyed,
    BusinessDelay
  },
  data() {
    return {
      airlinesBasic:'后结算',
      tableLoading: false,
      dialogAddcontract: false,
      contractAfter: false,   //合同
      dialogViewContract: false,
      contractAfterView: false,
      footerbtn:false,
      DialogModifyHistory:false,
      dialogDelay:false,
      service: [],
      dialogTitle:'新增商旅合同',
      businessCompanyList: [],//商旅公司
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
      form:{
        code:'',//合同编号
        receptionUnitName: '',//接待单位名称
        receptionUnitId: null,//接待单位id
        name: "",//合同名称
        deposit: null,//合同保证金
        contractStatus: "",//查看详情
        cycle: '',//累计结算周期
        settleWay: '',//结算方式
        status: null,//合同状态
        settlementCycle: [],//合同有效期 开始-结束
        days: "",//距离失效天数
        type:'商旅客户(后结算)',
        beginDate:"",//合同开始时间
        endDate:"",//合同结束时间
        list:[],
        contractAirline:[],//合同服务内容
        serviceGuests:[],//嘉宾服务
        serviceHalls:[],//包厅服务子表
        serviceNamings:[],//冠名厅服务子表
        serviceProcesses:[],//全流程服务子表
        serviceSecurities:[],//快速安检服务子表
        // updator:'5',
      },
      searchForm: {
        type: 0,
        receptionUnitId: null,
        code:null,
        beginDateOne:null,
        beginDateTwo:null,
        name: null,
        endDateOne:null,
        endDateTwo:null,
        receptionUnitName:null,
        status: null,
        pageNum: 1,
        pageSize: 10,
      },
      total:100,
      beginDateAll:[],
      endDateAll:[],

      tableData:[],
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
          label: "合同保证金",
          prop: "deposit",
          width: ""
        },
        {
          label: "服务内容及收费标准",
          prop: "contractStatus",
          width: "150"
        },
        {
          label: "结算周期",
          prop: "cycle",
          width: ""
        },
        {
          label: "结算方式",
          prop: "settleWay",
          width: ""
        },
        {
          label: "合同状态",
          prop: "status",
          width: ""
        },
        {
          label: "合同有效期",
          prop: "settlementCycle",
          width: ""
        },
        {
          label: "距离失效天数",
          prop: "days",
          width: "110"
        }
      ],
      searchLable:[
        {
          model: "code",
          prop: "code",
          label: "合同编号",
          type: "input"
        },
        {
          model: "name",
          prop: "name",
          label: "合同名称",
          type: "input"
        },
        {
          model: "receptionUnitName",
          prop: "receptionUnitName",
          label: "客户名称",
          type: "receptionUnitName"
        },
        {
          model: "deposit",
          prop: "deposit",
          label: "合同保证金",
          type: "input"
        },
        {
          model: "cycle",
          prop: "cycle",
          label: "累计结算周期",
          type: "input"
        },
        {
          model: "settlementCycle",
          prop: "settlementCycle",
          label: "合同有效期",
          type: "datetime"
        },
      ],
      delay:{
        code:"",
        name:'',
        contractName:"",
        beginDate:'',
        endDate:"",
      },
      formLabel: {
        contractNumber: "",
        customerName: "",
        contractNamer: "",
        contractBalance: "",
        store: "",
        mark: ""
      }
    };
  },
  created() {
    this.getReceptionType()
    this.getBusinessAfterList()
    // this.AfterServeData()
    this.gethallList()
    this.getNamingData()
  },
  methods: {
    async getBusinessAfterList(){
      this.searchForm.beginDateOne=this.beginDateAll[0]
      this.searchForm.beginDateTwo=this.beginDateAll[1]
      this.searchForm.endDateOne=this.endDateAll[0]
      this.searchForm.endDateTwo=this.endDateAll[1]
      const res = await businessAfterList(this.searchForm)
      console.log(res);
      this.tableData = res.data.list
      this.total = res.data.total
    },
    async getReceptionType() {
      const res = await receptionListType({type:0})
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
    //分页
    afterPageChange(val){
      this.searchForm.pageNum = val;
      this.getBusinessAfterList();
    },
    //页数
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getBusinessAfterList();
    },
    //查询重置
    search(){
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getBusinessAfterList();
    },
    //新增
    addcontract() {
      console.log(this.$refs.form);
      this.dialogTitle='新增商旅合同'
      this.dialogAddcontract = true;
      this.contractAfter = true;
      this.dialogViewContract = true;
      this.footerbtn=false
      this.contractAfterView=false
      // if(this.$refs.form) {
      //   this.$refs.form.$refs.form.$children[0].resetFields();
      // }

    },
    //保存
    confirm(){
      console.log(this.form);
      console.log(this.form.settlementCycle);
      this.form.beginDate=this.form.settlementCycle[0]
      this.form.endDate=this.form.settlementCycle[1]
      this.$refs.form.$refs.form.validate(async (valid) => {
        if (!valid) return this.$message.error("输入错误，请重新输入");
        const res = await businessAfterSave(this.form);
        console.log(this.form.serviceGuests)

        console.log(res);

        if (res.code !== 1) return this.$message.error(res.message);
        this.dialogAddcontract = false;
        this.$refs.form.$refs.form.resetFields();
        await this.getBusinessAfterList();
      });
    },
   //服务
   //  async AfterServeData(){
   //  const res = await SchedulingSonList({type: });
   //    console.log(res);
   //    this.service = [];
   //    let array = res.data;
   //    array.forEach(item => {
   //      this.service.push({
   //        serviceId: item.id,
   //        serviceName: item.name,
   //        contents:"",
   //        tollModel:null,
   //        updator:'2'
   //      });
   //    });
   //  },

    async gethallList(){
      const res=await hallList({type:0})
      console.log(res);
      this.form.serviceHalls = [];
      let array = res.data;
      array.forEach(item => {
        this.form.serviceHalls.push({
          hallId:item.id,
          serviceId:null,
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

   async getNamingData(){
      const res=await hallList({type:1})
      console.log(res);
      this.form.serviceNamings = [];
      let array = res.data;
      array.forEach(item => {
        this.form.serviceNamings.push({
          serviceId:item.id,
          hallName:item.name,
          number:item.number,
          areaName:item.areaName,
          areaType: item.areaType,
          area:item.area,
          fee: '',
          fees:item.price,
          updator:'3'
        });
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
      const res = await businessAfterEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      console.log(res);
      this.form = res.data;
      this.form.list = []
      res.data.contractAirline.forEach((item)=>{
        this.form.list.push(item.serviceId, item.serviceName)
      })
      // var a=this.form.beginDate.replace('+00:00', "Z")
      // var b=this.form.endDate.replace('+00:00', "Z")
      // console.log(a, b);
      let a = this.form.beginDate;
      let b = this.form.endDate;
      this.form.settlementCycle = []
      this.form.settlementCycle.push(a,b)
      this.dialogTitle='修改商旅合同(后结算)'
      this.dialogAddcontract = true
      console.log(this.$refs.form);
    },
    //删除
    handleDelete(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(async () => {
          const res = await businessAfterDel({ ids: id });
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
            this.getBusinessAfterList();
          }
        })
    },
    //延期弹窗
    handleDelay(row) {
      this.delay=row
      this.dialogDelay=true
    },
    //延期保存
    async getDialogDelay(){
       const res=await businessAfterDelay({
        id:this.delay.id,
        endDate:this.delay.endDate
      })
      this.dialogDelay=false
      this.getBusinessAfterList()
    },

    //修改记录
    handlebalance() {
      this.DialogModifyHistory=true
    },
    //查看合同
    async handlePreviewAfter(id){
      const res = await businessAfterEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      console.log(res);
      this.form = res.data;
      this.form.list = []
      res.data.contractAirline.forEach((item)=>{
        this.form.list.push(
          item.serviceId,
          item.serviceName
        )
      })
      let a = this.form.beginDate;
      let b = this.form.endDate;
      this.form.settlementCycle = []
      this.form.settlementCycle.push(a,b)
      this.dialogAddcontract=true
      this.contractAfterView=true
      this.footerbtn=true
    }
  }
};
</script>

<style lang="scss" scoped>
.business-after-container {
  padding: 20px;
  .search-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .handle-select {
    width: 120px;
  }
}
</style>
