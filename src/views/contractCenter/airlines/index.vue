<template>
  <div class="contract-airline-container">
    <!-- 查询 -->
   <el-form :model="searchForm" :inline="true">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item>
            <el-select
              v-model="searchForm.airlineId"
              clearable
              placeholder="请选择航司"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.name"
              clearable
              placeholder="合同名称"
              style="width:250px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.contractName"
              clearable
              placeholder="承租方名称"
              style="width:250px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="searchForm.status" clearable placeholder="合同状态(全部)">
              <el-option
                v-for="item in optionstatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="getAirlinesData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="airlinesAdd">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.code"
              placeholder="合同编号"
              style="width:250px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-form-item>
          <el-date-picker
            v-model="beginDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同开始时间"
            end-placeholder="合同开始时间"
            style="width:360px"
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
            style="width:360px"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- 表单 -->
    <mt-table
      v-loading="tableLoading"
      :data="tableData"
      :total="total"
      :pageSize="searchForm.pageSize"
      :currentPage="searchForm.pageNum"
      :headerStyle="{ 'text-align': 'center' }"
      :cellStyle="addClass"
      @currentChange="getAirlinesChange"
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
          v-else-if="item.prop == 'postponeStatus'"
          :key="index"
          label="是否自动延顺"
          disabled="true"
        >
            <template slot-scope="scope">
              {{ scope.row.postponeStatus == 1 ? true : false }}
            </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.prop == 'clearStatus'"
          :key="index"
          label="是否清算"
          disabled="true"
        >
          <template slot-scope="scope">
            {{ scope.row.clearStatus == 1 ? true : false }}
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
          prop="status"
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

       <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="3.42">
              <el-link
                :underline="false"
                @click="handleEdit(scope.row.id)"
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

    <!-- 新增弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="TypeisShow"
      center
      width="70%"
    >
      <business-basis ref='form'
                      :formLabel="form"
                      :service='service'
                      :airlinesBasic='airlinesBasic'
                      :searchLable='searchLable'
                      :contractAfter='contractAfter'
                      :dialogViewContract="dialogViewContract"
                      :contractAfterView='contractAfterView'>
      </business-basis>
      <business-settleprice ref='form'
                            :formData='form.contractSettlement'
                            :formPriceLabel='formPriceLabel'>
      </business-settleprice>
      <div slot="footer" class="dialog-footer" v-if="dialogTitle=='查看航司合同'">
        <el-button type="primary" style="width:120px" @click="TypeisShow = false">关闭</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="TypeisShow = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 合同修订记录 -->
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
import BusinessBasis from '../Business/BusinessBasis'
import BusinessSettleprice from '../Business/BusinessSettleprice'
import BusinessDelay from "../Business/BusinessDelay";
import BusinessModifyed from "../Business/BusinessModifyed";
import {airlinesList,airlinesEdit,airlinesDel,airlinesSave,SchedulingSonList,settlementList,airlineList,contractDelay} from '@/api/airlines'
import {getAirline} from "@/api/airlineMessage";
import {businessAfterEdit} from "@/api/businessAfter";
export default {
  components:{
    BusinessBasis,
    BusinessSettleprice,
    BusinessDelay,
    BusinessModifyed
  },
  data() {
    return {
      searchLable:[],
      total:100,
      beginDateAll:[],
      endDateAll:[],
      config:{
        pageNum:1,
        pageSize:10,
      },
      tableData:[],
      formPriceLabel: {
        settlementName:'',
        entouragePrice:'',
        entourageNum:"",
        selfPrice:''

      },
      dialogTitle:'新增航司合同',
      contractAfter:true,
      contractAfterView: false,
      dialogViewContract:false,
      tableLoading: false,
      TypeisShow:false,
      DialogModifyHistory:false,//修订记录
      dialogDelay:false,//延期
      airlinesBasic:'信息',
      searchForm: {
        airlineId:null,
        beginDateOne:null,
        beginDateTwo:null,
        code: null,
        contractName:null,
        endDateOne:null,
        endDateTwo:null,
        name:null,
        status: null,
        pageNum:1,
        pageSize:10,
      },
      form:{
        code:'',
        airlineName:"",
        remark:"",
        contractName:"",
        name:"",
        settlementCycle:[],//合同有效期 开始-结束
        beginDate:"",
        endDate:"",
        settleWay:'',
        contractStatus:"",//查看详情
        status:"",
        days:"",
        postponeStatus:'', //是否自动延顺
        clearStatus:"",
        list:[],
        contractAirline:[],//合同服务内容
        contractSettlement:[],//合同价格结算
        type:'航司客户',
        updator:'5',
        airlineId:'',
      },
      delay:{
        code:"",
        name:'',
        contractName:"",
        beginDate:'',
        endDate:"",
      },
      service:[],
       formLabel: {
        contractNumber: "",
        customerName: "",
        contractNamer: "",
        contractBalance: "",
        store: "",
        mark: "",
        switchValueOne:true,
        switchValueTwo:true,
      },
      options: [],
      optionstatus: [
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
      tableColumn: [
        {
          label: "合同编号",
          prop: "code",
          width: ""
        },
        {
          label: "航司名称",
          prop: "airlineName",
          width: ""
        },
        {
          label: "备注",
          prop: "remark",
          width: ""
        },
        {
          label: "承租方名称(合同)",
          prop: "contractName",
          width: ""
        },
        {
          label: "合同名称",
          prop: "name",
          width: "150"
        },
        {
          label: "合同有效期",
          prop: "settlementCycle",
          width: ""
        },
        {
          label: "结算方式",
          prop: "settleWay",
          width: ""
        },
        {
          label: "收费标准",
          prop: "contractStatus",
          width: ""
        },
        {
          label: "合同状态",
          prop: "status",
          width: ""
        },
        {
          label: "距离失效天数",
          prop: "days",
          width: "110"
        },
        {
          label: "是否清算",
          prop: "clearStatus",
          width: "110"
        },
        {
          label: "是否自动延顺",
          prop: "postponeStatus",
          width: "110"
        }
      ]
    };
  },
  created() {
    this.getAirlinesData()
    this.getsettlementList()
    this.airlinesAddData()
    this.getAirline()

  },
  methods: {
   async getAirlinesData(){
     this.searchForm.beginDateOne=this.beginDateAll[0]
     this.searchForm.beginDateTwo=this.beginDateAll[1]
     this.searchForm.endDateOne=this.endDateAll[0]
     this.searchForm.endDateTwo=this.endDateAll[1]
     const res=await airlinesList(this.searchForm)
     if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
    //  console.log(res);
     this.tableData=res.data.list
    },

    async getAirline() {
      const res = await getAirline()
      if(res.code == 1) {
        console.log(res);
        this.options = res.data;
        this.options.forEach(item => {
          this.form.airlineId = item.id
        })
      } else {
        this.$message.error(res.message);
      }
    },

    async getsettlementList(){
      const res=await settlementList()
      // console.log(res);
      // this.form.contractSettlement=res.data
       this.form.contractSettlement = [];
      let array = res.data;
      array.forEach(item => {
        this.form.contractSettlement.push({
          settlementId: item.id,
          settlementName: item.name,
          selfPrice:item.selfPrice,
          entourageNum:item.entourageNum,
          entouragePrice:item.entouragePrice,
          updator:'3'
        });
      });
    },

    //分页
    getAirlinesChange(val){
      this.searchForm.pageNum = val;
      this.getAirlinesData();
    },
    //页数
    handleSizeChange(val) {
     this.searchForm.pageSize = val;
     this.getAirlinesData();
    },
    //服务
    async airlinesAddData(){
     const res = await SchedulingSonList({type: "航司客户"});
      // console.log(res);
      this.service = [];
      let array = res.data;
      array.forEach(item => {
        this.service.push({
          serviceId: item.id,
          serviceName: item.name,
          updator:'2'
        });
      });
    },

    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 9) {
        if (row.status == 2) {
          return { background: "#F56C6C", "text-align": "center" };
        }
      }
      return { "text-align": "center" };
    },
    //新增
   airlinesAdd(){
     this.airlinesAddData()
     this.dialogTitle='新增航司合同'
     this.TypeisShow=true

    },
    //保存
    confirm(){
      console.log(this.form);
      this.form.beginDate=this.form.settlementCycle[0]
      this.form.endDate=this.form.settlementCycle[1]
      // if(this.postponeStatus == true) {
      //
      // }
      this.$refs.form.$refs.form.validate(async (valid) => {
        if (!valid) return this.$message.error("输入错误，请重新输入");
        const res = await airlinesSave(this.form);
        console.log(res);
        if (res.code !== 1) return this.$message.error(res.message);
        this.$refs.form.$refs.form.resetFields();
        this.TypeisShow = false;
        this.getAirlinesData();
      });
    },
    //修改
    async handleEdit(id){
      const res = await airlinesEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      this.form = res.data;
      console.log(this.form);
      this.airlinesAddData()
      let a=this.form.beginDate;
      let b=this.form.endDate;
      // var a=this.form.beginDate.replace('+00:00', "Z")
      // var b=this.form.endDate.replace('+00:00', "Z")
      this.form.settlementCycle=[]
      this.form.settlementCycle.push(a,b)
      this.dialogTitle='修改航司合同'
      this.TypeisShow=true
    },
    //删除
    handleDelete(id){
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(async () => {
          const res = await airlinesDel({ ids: id });
          // console.log(res);
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
            this.getAirlinesData();
          }
        })
    },
    //延期
    handleDelay(row){
      this.delay=row
      this.dialogDelay=true
    },
    //延期保存
   async getDialogDelay(){
       const res=await contractDelay({
        id:this.delay.id,
        endDate:this.delay.endDate
      })
      // console.log(res);
    this.dialogDelay=false
    this.getAirlinesData()
    },
    //查看合同
    async handlePreviewAfter(id) {
      const res = await airlinesEdit({id: id});
      if (res.code !== 1) return this.$message.error("请求错误");
      console.log(res);
      this.form = res.data;
      let a = this.form.beginDate;
      let b = this.form.endDate;
      this.form.settlementCycle = []
      this.form.settlementCycle.push(a,b)
      this.dialogTitle = '查看航司合同'
      this.TypeisShow = true
      // this.$refs.form.$refs.form.resetFields();
    },
    //修订记录
    handlebalance(){
      this.DialogModifyHistory=true
    }
  }
};
</script>

<style lang="scss" scoped></style>
