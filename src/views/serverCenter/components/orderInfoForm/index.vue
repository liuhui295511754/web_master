<template>
  <div class="new-append" style="margin-top: 40px">
    <el-form ref="orderInfo" label-width="110px" :model="form">
      <el-divider content-position="left" id="orderInfo">
        <span class="info">订单信息</span></el-divider
      >
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务人员:" prop="servicePersonal">
            <el-input
              placeholder="请输入服务人员"
              v-model="form.servicePersonal"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务时长:" prop="serviceTime">
            <el-input
              placeholder="请输入服务时长"
              v-model="form.serviceTime"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="订单金额:" prop="orderAmount">
            <el-input
              placeholder="请输入订单金额"
              maxlength="10"
              onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
              v-model="form.orderAmount"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="折扣率:" prop="discountRate">
            <el-input
              placeholder="请输入折扣率"
              maxlength="10"
              @keyup.native="keyupEvent($event, form.discountRate)"
              v-model="form.discountRate"
              clearable
            >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="结算金额:" prop="settlementAmount">
            <el-input
              placeholder="请输入结算金额"
              maxlength="10"
              onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
              :value="computedAttr(form.settlementAmount)"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注:" prop="remark">
        <el-input
          placeholder="请输入备注"
          v-model="form.remark"
          clearable
          type="textarea"
          maxlength="200"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "orderInfoForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
  },
  methods: {
    //结算金额=订单金额*折扣率
    computedAttr(val) {
      if (this.form.orderAmount && this.form.discountRate) {
        val =
          parseFloat(this.form.orderAmount) *
          parseFloat(this.form.discountRate / 100);
        return val.toFixed(2);
      }
    },
    // 只能输入正整数和两位小数点
    keyupEvent(e, input) {
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
      e.target.value = e.target.value.replace(/\.{2,}/g, ".");
      e.target.value = e.target.value.replace(/^\./g, "0.");
      e.target.value = e.target.value.replace(
        /^\d*\.\d*\./g,
        e.target.value.substring(0, e.target.value.length - 1)
      );
      e.target.value = e.target.value.replace(/^0[^\.]+/g, "0");
      e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
      input = e.target.value;
    },
  },
};
</script>
<style>
.info {
  font-size: 20px;
  font-weight: 700;
}
.new-append .el-input-group__append,
.el-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
  border-left: none;
  /* display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap; */
}
</style>