<template>
  <div>
    <el-divider content-position="left" id="customer"
      ><span class="info">预约信息</span></el-divider
    >
    <el-form
      :model="form"
      ref="customerInfo"
      label-width="110px"
      class="customer-form"
      :rules="rules"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="预约人/单位：" prop="name">
            <el-input
              clearable
              placeholder="请输入预约人/单位"
              v-model="form.name"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="联系电话:" prop="phone">
            <el-input
              placeholder="请输入联系电话"
              maxlength="11"
              clearable
              v-model="form.phone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="预约日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="时间" prop="startTime">
            <el-time-picker
              @change="changeTime"
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="hh:mm:ss"
              format="hh:mm:ss"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="接送车牌号:" prop="carNumber">
            <el-input
              clearable
              placeholder="请输入接送车牌号"
              v-model="form.carNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="接机牌迎送语:" prop="words">
            <el-input
              clearable
              placeholder="请输入接机牌迎送语"
              v-model="form.words"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="登记位置:" prop="placeState">
            <el-radio v-model="form.placeState" :label="0">两舱服务</el-radio>
            <el-radio v-model="form.placeState" :label="1">接待登记</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-alert
      v-if="false"
      type="warning"
      description="航班号【xxxx】在 2020-08-21 10：00：00
      已进行登记提醒，请及时通知旅客!"
      show-icon
    >
    </el-alert>
  </div>
</template>
<script>
export default {
  name: "customerInfoForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };

    return {
      value1: "",
      rules: {
        sname: [{ required: true, message: "请输入预约人", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        date: [{ required: true, message: "请输入预约日期", trigger: "blur" }],
        placeState: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  created() {},
  methods: {
    changeTime(val) {
      if (val != null && val.length > 0) {
        this.form.startTime = this.form.date.split(" ")[0] + " " + val[0];
        this.form.endTime = this.form.date.split(" ")[0] + " " + val[1];
      } else {
        this.form.startTime = "";
        this.form.endTime = "";
      }
      console.log(this.form.startTime, this.form.endTime);
    },
  },
};
</script>
<style>
.el-alert__description {
  font-size: 18px;
}

.info {
  font-size: 20px;
  font-weight: 700;
}
</style>