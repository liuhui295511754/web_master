<template>
  <div>
    <el-divider content-position="left" id="customerType">
      <span class="info">客户属性</span>
    </el-divider>
    <el-form :model="form" ref="customerType" label-width="110px">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item
            label="客户类型："
            prop="customerType"
            :rules="{
              required: true,
              message: '请选择活动区域',
              trigger: 'change',
            }"
          >
            <el-select
              v-model="form.customerType"
              clearable
              placeholder="请选择"
              @change="handSelectChangeCustomerType"
              @clear="clearSelect"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="接待单位:" prop="receptionUnit">
            <el-autocomplete
              class="inline-input"
              v-model="form.receptionUnit"
              :fetch-suggestions="remoteMethod"
              placeholder="请输入接待单位"
              value-key="receptionUnitName"
              @select="handleSelect"
              @clear="clearSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-col>

        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          v-if="form.code == 'slkh'"
        >
          <el-form-item label="结算模式:" prop="settlementType">
            <el-select
              v-model="form.settlementType"
              clearable
              placeholder="请选择"
              @clear="clearSelect"
              @change="handSelectSettlementType"
            >
              <el-option label="预储值" :value="0"> </el-option>
              <el-option label="后结算" :value="1"> </el-option>
              <el-option label="全部" :value="2"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          v-if="form.code == 'hskh' && form.receptionUnit != null"
        >
          <el-form-item label="结算类型:" prop="settlementType">
            <el-select
              v-model="form.settlementType"
              clearable
              placeholder="请选择"
              @clear="clearSelect"
              @change="handSelectSettlementType"
            >
              <el-option
                v-for="(item, index) in settlementTypeList"
                :key="index"
                :label="item.settlementName"
                :value="item.settlementId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          v-if="form.code == 'hu'"
        >
          <el-form-item label="会员卡卡种:" prop="settlementType">
            <el-select
              v-model="form.settlementType"
              clearable
              placeholder="请选择"
              @clear="clearSelect"
              @change="handSelectCardType"
            >
              <el-option
                v-for="item in cardList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="常旅客卡号:" prop="cardNumber">
            <el-input clearable v-model="form.cardNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="签单人:" prop="signer">
            <el-input
              placeholder="请输入签单人"
              clearable
              v-model="form.signer"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="接待时间:" prop="receptionTime" v-if="flag">
            <el-date-picker
              v-model="form.receptionTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-alert
      type="error"
      description="该接待单位合同已到期，请提醒旅客续约!"
      show-icon
    >
    </el-alert>
  </div>
</template>
<script>
import { unitType } from "@/api/serverCenter";
export default {
  name: "customeTypeForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
    // 客户类型
    options: {
      type: Array,
      default: [],
    },
    // 会员卡卡种
    cardList: {
      type: Array,
      default: [],
    },
    flag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,

      restaurants: [], //接待单位 数据源
      settlementTypeList: [], //结算类型 数据源
    };
  },
  created() {
    // this.customerTypeData();
    // this.unitTypeData();
  },
  methods: {
    //   客户类型
    async customerTypeData() {
      const res = await customerType();
      if (res.code != 1) return this.$message.error(res.message);
      this.options = res.data;
    },
    // 接待单位
    async unitTypeData() {
      const res = await unitType({ customerCode: this.form.code });
      if (res.code != 1) return this.$message.error(res.message);
      this.receptionUnit = res.data.receptionUnitName;
      this.restaurants = res.data;
      if (this.form.code == "slkh") {
        //商旅客户
        //mode
      } else if (this.form.code == "hskh") {
        //航司客户
        //settlementName
        let array = [];
        res.data.forEach((item) => {
          item.contractSettlement.forEach((element) => {
            array.push({
              settlementId: element.settlementId,
              settlementName: element.settlementName,
            });
            this.settlementTypeList = array;
          });
        });
      }
    },
    // 选中客户类型
    handSelectChangeCustomerType(val) {
      this.form.receptionUnit = null;
      this.form.settlementType = null;
      this.options.forEach((item) => {
        if (item.id == val) {
          this.form.customerName = item.name;
          this.form.code = item.code;
          this.unitTypeData();
        }
      });
    },

    // 选中接待单位
    handleSelect(item) {
      this.settlementTypeList = item.contractSettlement;
    },
    // 模糊查询 接待单位
    remoteMethod(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return item.receptionUnitName
          .toUpperCase()
          .match(queryString.toUpperCase());
      };
    },
    // 选中结算类型
    handSelectSettlementType(val) {
      this.settlementTypeList.forEach((item) => {
        if (item.settlementId == val) {
          this.form.settlementName = item.settlementName;
        }
      });
    },
    // 选中会员卡卡种
    handSelectCardType(val) {},
    // 清除选中数据
    clearSelect() {
      this.form.customerType = null;
      this.form.customerName = "";
      this.form.receptionUnit = "";
      this.form.receptionId = null;
      this.form.settlementType = "";
    },
  },
};
</script>
<style>
.el-alert .el-alert__description {
  font-size: 16px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.info {
  font-size: 20px;
  font-weight: 700;
}
</style>