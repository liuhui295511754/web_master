<template>
  <div>
    <el-divider content-position="left" id="customer"
      ><span class="info">旅客信息</span></el-divider
    >
    <el-form
      :model="form.passengerInfoVOS[0]"
      ref="customerInfo"
      label-width="110px"
      class="customer-form"
      :rules="rules"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="姓名：" prop="name">
            <el-input
              placeholder="请输入姓名"
              clearable
              v-model="form.passengerInfoVOS[0].name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="身份证号:" prop="idNumber">
            <el-input
              placeholder="请输入身份证号"
              maxlength="18"
              clearable
              v-model="form.passengerInfoVOS[0].idNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="手机号:" prop="phone">
            <el-input
              placeholder="请输入手机号"
              maxlength="11"
              clearable
              v-model="form.passengerInfoVOS[0].phone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="职务:" prop="post">
            <el-input
              placeholder="请输入职务"
              clearable
              v-model="form.passengerInfoVOS[0].post"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="登机牌:" prop="boardingPass">
            <el-input
              placeholder="请输入登机牌"
              clearable
              v-model="form.passengerInfoVOS[0].boardingPass"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航班号:" prop="flightNumber">
            <el-input
              placeholder="请输入航班号"
              clearable
              v-model="form.passengerInfoVOS[0].flightNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="出发/到达:" prop="startingTime">
            <el-input
              placeholder="请输入出发/到达"
              clearable
              v-model="form.passengerInfoVOS[0].startingTime"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航空公司:" prop="airplane">
            <el-input
              placeholder="请输入航空公司"
              clearable
              v-model="form.passengerInfoVOS[0].airplane"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="座位号:" prop="seatNumber">
            <el-input
              placeholder="请输入座位号"
              clearable
              v-model="form.passengerInfoVOS[0].seatNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="舱位:" prop="shippingSpace">
            <el-input
              placeholder="请输入舱位"
              clearable
              v-model="form.passengerInfoVOS[0].shippingSpace"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="机号:" prop="machine">
            <el-input
              placeholder="请输入机号"
              clearable
              v-model="form.passengerInfoVOS[0].machine"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="客票号:" prop="ticketNumber">
            <el-input
              placeholder="请输入客票号"
              clearable
              v-model="form.passengerInfoVOS[0].ticketNumber"
            ></el-input>
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
      rules: {
        name: [{ required: true, message: "请输入旅客姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {},
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