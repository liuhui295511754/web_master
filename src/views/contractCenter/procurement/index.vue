<template>
  <div class="contract-procurement-container">
    <!-- 查询 -->
    <el-form :model="searchForm" :inline="true">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.code"
              placeholder="合同编号"
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.name"
              placeholder="合同名称"
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input
              v-model="searchForm.corporate"
              placeholder="公司名称"
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="合同状态(全部)">
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
            <el-button type="primary" @click="getProcurementList"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="airlinesAdd">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-date-picker
            v-model="beginDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同开始时间"
            end-placeholder="合同开始时间"
            style="width: 360px"
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
            style="width: 360px"
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
      @currentChange="getProcurement"
    >
      <template v-for="(item, index) in tableColumn">
        <el-table-column
          v-if="item.prop == 'settlementCycle'"
          :key="index"
          label="合同有效期"
          :width="item.width"
        >
          <template slot-scope="scope">
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
            <span v-if="scope.row.status == 0">未生效</span>
            <span v-if="scope.row.status == 1">生效</span>
            <span v-if="scope.row.status == 2">即将到期</span>
            <span v-if="scope.row.status == 3">失效</span>
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

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="3.62">
              <el-link :underline="false" @click="handleView(scope.row.id)"
                >查看</el-link
              ></el-col
            >
            <el-col :span="3.62">
              <el-link :underline="false" @click="handleEdit(scope.row.id)"
                >修改</el-link
              ></el-col
            >
            <el-col :span="3.62">
              <el-link :underline="false" @click="handleDelete(scope.row.id)"
                >删除</el-link
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
      <business-basis
        ref="form"
        :formLabel="form"
        :service="checklist"
        :airlinesBasic="airlinesBasic"
        :searchLable="searchLable"
        :contractAfter="contractAfter"
        :contractAfterView="contractAfterView"
        :dialogViewContract="dialogViewContract"
      >
      </business-basis>
      <div slot="footer" class="dialog-footer" v-if="dialogTitle == '查看'">
        <el-button
          type="primary"
          style="width: 120px"
          @click="TypeisShow = false"
          >关闭</el-button
        >
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="TypeisShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BusinessBasis from "../Business/BusinessBasis";
import {
  procurementList,
  procurementSave,
  procurementDel,
  procurementEdit,
} from "@/api/procurement";
export default {
  components: {
    BusinessBasis,
  },
  data() {
    return {
      contractAfterView: false,
      dialogViewContract: false,
      contractAfter: false,
      tableLoading: false,
      TypeisShow: false,
      airlinesBasic: "采购",
      dialogTitle: "新增",
      total: 100,
      beginDateAll: [],
      endDateAll: [],
      searchForm: {
        code: null,
        name: null,
        pageNum: 1,
        pageSize: 10,
        status: null,
        corporate: null,
        beginDateOne: "",
        beginDateTwo: "",
        endDateOne: "",
        endDateTwo: "",
      },
      form: {
        code: "",
        name: "",
        corporate: "",
        deposit: "",
        beginDate: "",
        endDate: "",
        money: "",
        settleWay: "",
        content: "",
        status: "",
        days: "",
        settlementCycle: [],
        updator: "1",
        contractAirline: [],
      },
      searchLable: [
        {
          model: "code",
          prop: "code",
          label: "合同编号",
          type: "input",
        },
        {
          model: "name",
          prop: "name",
          label: "合同名称",
          type: "input",
        },
        {
          model: "corporate",
          prop: "corporate",
          label: "供应商名称",
          type: "input",
        },
        {
          model: "deposit",
          prop: "deposit",
          label: "合同保证金",
          type: "input",
        },
        {
          model: "money",
          prop: "money",
          label: "合同金额",
          type: "input",
        },
        {
          model: "settlementCycle",
          prop: "settlementCycle",
          label: "合同有效期",
          type: "datetime"
        },
      ],
      optionstatus: [
        {
          label: "生效",
          value: 1,
        },
        {
          label: "失效",
          value: 3,
        },
        {
          label: "即将到期",
          value: 2,
        },
        {
          label: "未生效",
          value: 0,
        },
      ],
      tableData: [],
      tableColumn: [
        {
          label: "合同编号",
          prop: "code",
          width: "",
        },
        {
          label: "合同名称",
          prop: "name",
          width: "",
        },
        {
          label: '公司名称',
          prop: 'corporate',
          width: "",
        },
        {
          label: "合同保证金",
          prop: "deposit",
          width: "",
        },
        {
          label: "合同有效期",
          prop: "settlementCycle",
          width: "150",
        },
        {
          label: "合同金额",
          prop: "money",
          width: "",
        },
        {
          label: "结算方式",
          prop: "settleWay",
          width: "",
        },
        {
          label: "合同内容",
          prop: "content",
          width: "",
        },
        {
          label: "合同状态",
          prop: "status",
          width: "",
        },
        {
          label: "距离失效天数",
          prop: "days",
          width: "110",
        },
      ],
      checklist: [],
    };
  },
  created() {
    this.getProcurementList();
  },
  methods: {
    async getProcurementList() {
      this.searchForm.beginDateOne = this.beginDateAll[0];
      this.searchForm.beginDateTwo = this.beginDateAll[1];
      this.searchForm.endDateOne = this.endDateAll[0];
      this.searchForm.endDateTwo = this.endDateAll[1];
      const res = await procurementList(this.searchForm);
      if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },

    //新增
    airlinesAdd() {
      this.dialogTitle = "新增采购合同";
      this.TypeisShow = true;
      this.form = {};
    },
    //分页
    getProcurement(val) {
      this.searchForm.pageNum = val;
      this.getProcurementList();
    },
    //查看
    async handleView(id) {
      const res = await procurementEdit({
        id: id,
      });
      this.form = res.data;
      this.dialogTitle = "查看";
      this.TypeisShow = true;
    },
    //修改
    async handleEdit(id) {
      const res = await procurementEdit({
        id: id,
      });
      if (res.code !== 1) return this.$message.error("请求错误");
      this.form = res.data;
      console.log(res);
      // this.form.settlementCycle=[]
      // this.form.settlementCycle.forEach(item=>{
      //   this.form.settlementCycle.push({
      //     beginDate:this.form.beginDate,
      //     endDate:this.form.endDate
      //   })
      // })
      let a = this.form.beginDate;
      let b = this.form.endDate;
      //  var a=this.form.beginDate.replace('+00:00', "Z")
      // var b=this.form.endDate.replace('+00:00', "Z")
      this.form.settlementCycle=[]
      this.form.settlementCycle.push(a,b)
      this.form.settlementCycle = [];
      this.form.settlementCycle.push(a, b);
      this.dialogTitle = "修改";
      this.TypeisShow = true;
    },
    //删除
    handleDelete(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await procurementDel({ ids: id });
          console.log(res);
          if (res.code !== 1) {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          } else {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getProcurementList();
          }
        })
      },
    //确定
    confirm() {
      console.log(this.$refs.form.formLabel);
      console.log(this.form);
      this.form.beginDate = this.form.settlementCycle[0];
      this.form.endDate = this.form.settlementCycle[1];
      this.form.updator = "1";
      this.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("输入错误，请重新输入");
        const res = await procurementSave(this.form);
        console.log(res);

        if (res.code !== 1) return this.$message.error(res.message);
        this.TypeisShow = false;
        this.$refs.form.$children[0].resetFields();
        this.getProcurementList();
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
  },
};
</script>

<style lang="scss" scoped>
</style>
