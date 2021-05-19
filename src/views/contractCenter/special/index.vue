<template>
  <div class="special">
    <div class="box">
      <div class="one-box">
        <div class="top">
          <span>公司领导合同</span>
        </div>
        <div class="bottom">
          <div>合同编号：<span>2</span></div>
          <div>合同名称：<span>2</span></div>
          <div>客户名称：<span>2</span></div>
          <div>合同保证金：<span>2</span></div>
          <div>结算周期：<span>2</span></div>
          <div>结算方式：<span>2</span></div>
          <div>合同状态：<span>2</span></div>
          <div>合同有效期：<span>2</span></div>
          <div>距离失效天数：<span>2</span></div>
          <div>
            <el-button>查看</el-button>
            <el-button>修改</el-button>
            <el-button>延期</el-button>
            <el-button>修订记录</el-button>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="top">
          <span>政府签单合同</span>
        </div>
        <div class="bottom">
          <div>合同编号：<span>2</span></div>
          <div>合同名称：<span>2</span></div>
          <div>客户名称：<span>2</span></div>
          <div>合同保证金：<span>2</span></div>
          <div>结算周期：<span>2</span></div>
          <div>结算方式：<span>2</span></div>
          <div>合同状态：<span>2</span></div>
          <div>合同有效期：<span>2</span></div>
          <div>距离失效天数：<span>2</span></div>
          <div>
            <el-button>查看</el-button>
            <el-button>修改</el-button>
            <el-button>延期</el-button>
            <el-button>修订记录</el-button>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="top">
          <span>公务机合同</span>
        </div>
        <div class="bottom">
          <div>合同编号：<span>2</span></div>
          <div>合同名称：<span>2</span></div>
          <div>客户名称：<span>2</span></div>
          <div>合同保证金：<span>2</span></div>
          <div>结算周期：<span>2</span></div>
          <div>结算方式：<span>2</span></div>
          <div>合同状态：<span>2</span></div>
          <div>合同有效期：<span>2</span></div>
          <div>距离失效天数：<span>2</span></div>
          <div>
            <el-button @click="handleView"> 查看 </el-button>
            <el-button @click="handleModify"> 修改 </el-button>
            <el-button @click="handlePostpone"> 延期 </el-button>
            <el-button @click="handleRevise"> 修订记录 </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增修改弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="TypeisShow"
      center
      width="70%"
    >
      <business-basis
        ref="form"
        :formLabel="form"
        :service="service"
        :airlinesBasic="airlinesBasic"
        :searchLable="searchLable"
        :contractAfter="contractAfter"
        :dialogViewContract="dialogViewContract"
        :contractAfterView="contractAfterView"
      >
      </business-basis>
      <business-settleprice
        ref="form"
        :formData="form.contractSettlement"
        :formPriceLabel="formPriceLabel"
      >
      </business-settleprice>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="dialogTitle == '查看航司合同'"
      >
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

    <!-- 合同修订记录 -->
    <el-dialog
      title="合同修订记录"
      :visible.sync="DialogModifyHistory"
      width="30%"
      center
    >
      <business-modifyed></business-modifyed>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogModifyHistory = false"
          >确 定</el-button
        >
        <el-button @click="DialogModifyHistory = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 延期 -->
    <el-dialog :visible.sync="dialogDelay" center>
      <div slot="title" class="business-title">
        <span>合同延期</span>
      </div>
      <business-delay :form="delay"></business-delay>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getDialogDelay">确 定</el-button>
        <el-button @click="dialogDelay = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { settlementList } from "@/api/settlementType";
import BusinessDelay from "../Business/BusinessDelay";
import BusinessModifyed from "../Business/BusinessModifyed";
import BusinessBasis from "../Business/BusinessBasis";
export default {
  components: {
    settlementList,
    BusinessDelay,
    BusinessModifyed,
    BusinessBasis,
  },
  data() {
    return {
      airlinesBasic: "特殊合同",
      config: {
        pageNum: 1,
        pageSize: 3,
      },
      dialogTitle: "修改合同",
      TypeisShow: false,
      pagesize: 10, //每页多少数据
      currentPage: 1,
      tableLabel: [
        {
          prop: "name",
          label: "合同编号",
        },
        {
          prop: "type",
          label: "合同名称",
        },
        {
          prop: "code",
          label: "客户名称",
        },
        {
          prop: "sn",
          label: "合同保证金",
        },
      ],
      tableData: [],
    };
  },
  created() {
    this.getSettleList();
  },
  methods: {
    async getSettleList() {
      const res = await settlementList(this.config);
      // if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      console.log(res);
      this.tableData = res.data.list;
      // this.total = res.data.total;
    },
    //查看
    handleView() {
      this.dialogTitle = "查看航司合同";
      this.TypeisShow = true;
    },
    handleModify() {},
  },
};
</script>
<style lang="scss">
.special {
  width: 1202px;
  height: 700px;
  border: 1px solid black;

  .box {
    width: 1202px;
    .one-box {
      margin: 20px;
      width: 360px;
      height: 600px;
      border: 1px solid slategrey;
      float: left;
      .top {
        height: 50px;
        border-bottom: 1px solid black;
        text-align: center;
        line-height: 50px;
      }
      .bottom {
        text-align: center;
        div {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
