<template>
  <div id="searchForm">
    <el-form :model="form" class="demo-form-inline" ref="form">
      <el-row :gutter="20">
        <el-col
          :xs="12"
          :sm="8"
          :md="5"
          :lg="3"
          :xl="3"
          v-if="type == 'cabin' || type == 'regist'"
        >
          <el-form-item>
            <el-select clearable v-model="form.hallId" placeholder="服务厅房">
              <el-option
                v-for="item in serviceHall"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <template>
          <el-col
            :xs="12"
            :sm="8"
            :md="5"
            :lg="5"
            :xl="5"
            v-if="type == 'reserve'"
          >
            <el-form-item>
              <el-date-picker
                clearable
                v-model="value"
                type="datetimerange"
                range-separator="至"
                start-placeholder="预约开始日期"
                end-placeholder="预约结束日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                @change="changeDate"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col
            :xs="12"
            :sm="8"
            :md="5"
            :lg="3"
            :xl="3"
            v-if="type == 'reserve'"
          >
            <el-form-item>
              <el-input
                clearable
                v-model="form.sname"
                placeholder="预约人/单位"
              ></el-input>
            </el-form-item>
          </el-col>
        </template>

        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.name"
              placeholder="旅客姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select
              clearable
              v-model="form.customerType"
              placeholder="客户类型"
            >
              <el-option
                v-for="item in serviceType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3" v-if="type == 'cabin'">
          <el-form-item>
            <el-input
              clearable
              v-model="form.boardingPass"
              placeholder="登机牌"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.fam"
              placeholder="航班号/航空公司/机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="12"
          :sm="8"
          :md="4"
          :lg="4"
          :xl="3"
          v-if="type == 'reserve'"
        >
          <el-form-item>
            <el-select
              clearable
              v-model="form.placeState"
              placeholder="登记位置"
            >
              <el-option label="两舱服务" :value="0"></el-option>
              <el-option label="接待登记" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.rc"
              placeholder="接待单位/卡号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="12"
          :sm="8"
          :md="5"
          :lg="4"
          :xl="3"
          v-if="type == 'regist'"
        >
          <el-form-item>
            <el-date-picker
              style="width: 100%"
              clearable
              v-model="form.receptionTimeOne"
              type="date"
              value-format="yyyy-MM-dd 00:00:00"
              format="yyyy-MM-dd"
              placeholder="请选择接待日期"
              @change="changeTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :xs="12"
          :sm="8"
          :md="5"
          :lg="4"
          :xl="3"
          v-if="type == 'cabin' || type == 'regist'"
        >
          <el-form-item>
            <el-select v-model="form.sm" clearable placeholder="结算类型/套餐">
              <el-option label="预储值" :value="0"> </el-option>
              <el-option label="后结算" :value="1"> </el-option>
              <el-option label="全部" :value="2"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="12"
          :sm="8"
          :md="5"
          :lg="4"
          :xl="3"
          v-if="type == 'cabin' || type == 'regist'"
        >
          <el-form-item>
            <el-input
              clearable
              v-model="form.serviceNumber"
              placeholder="服务单号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="12"
          :sm="8"
          :md="5"
          :lg="4"
          :xl="3"
          v-if="type == 'cabin' || type == 'regist'"
        >
          <el-form-item>
            <el-input
              clearable
              v-model="form.orderNo"
              placeholder="订单号"
            ></el-input>
          </el-form-item>
        </el-col>
        <template v-if="type == 'reserve'">
          <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
            <el-form-item>
              <el-select clearable v-model="form.state" placeholder="预约状态">
                <el-option label="新增" :value="0"></el-option>
                <el-option label="接待登记" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
            <el-form-item>
              <el-date-picker
                style="width: 100%"
                v-model="form.name2"
                type="datetime"
                placeholder="申请时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          {{ form.placeState }}
          <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
            <el-form-item>
              <el-select
                clearable
                v-model="form.placeState"
                placeholder="预约渠道"
              >
                <el-option label="两舱服务" :value="0"></el-option>
                <el-option label="接待登记" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <el-col :xs="8" :sm="12" :md="8" :lg="5" :xl="5">
          <el-button type="primary" @click="Submit">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="warning" @click="print" v-if="type != 'reserve'"
            >打印收费单</el-button
          >
          <el-button type="primary" @click="Export" v-else>导出</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-form :inline="true" class="add_form" v-if="type !== 'reserve'">
      <el-form-item>
        <el-input placeholder="请扫码登记旅客">
          <template slot="append">
            <mt-button txt="新增" @click="add"></mt-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { customerTypeList } from "@/api/serverCenter";
import { SelectList } from "@/api/hallManage";
export default {
  name: "searchForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      serviceHall: [],
      serviceType: [],
    };
  },
  created() {
    console.log(this.form);
    this.getHallData();
    this.getServiceData();
  },
  methods: {
    // 获取厅房
    async getHallData() {
      const res = await SelectList();
      if (res.code !== 1) return this.$message.error(res.message);
      this.serviceHall = res.data;
    },
    // 获取服务类型
    async getServiceData() {
      const res = await customerTypeList();
      if (res.code !== 1) return this.$message.error(res.message);
      this.serviceType = res.data;
    },
    changeDate(val) {
      if (val == null) {
        this.form.dateOne = null;
        this.form.dateTwo = null;
      } else {
        this.form.dateOne = val[0];
        this.form.dateTwo = val[1];
      }
      console.log(val);
      //    = this.$moment(this.form.receptionTimeOne).format(
      //     "YYYY-MM-DD 23:59:59"
      //   );
    },
    // 选中时间
    changeTime() {
      this.form.receptionTimeTwo = this.$moment(
        this.form.receptionTimeOne
      ).format("YYYY-MM-DD 23:59:59");
    },
    add() {
      this.$emit("add");
    },
    Submit() {
      this.$emit("submit");
    },
    reset() {
      this.$emit("reset");
    },
    print() {
      this.$emit("print");
    },
    Export() {
      this.$emit("export");
    },
  },
};
</script>
<style>
/* 改变input 复合型输入框背景颜色 */
#searchForm .el-input-group__append,
.el-input-group__prepend {
  background-color: #409eff;
  color: #fff;
  border: none;
}
.add_form {
  margin-top: 20px;
  text-align: right;
}

.el-range-editor.el-input__inner {
  width: 100% !important;
}
</style>