<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
      <el-form-item label="服务名称" prop="name">
        <el-input
          clearable
          v-model="form.name"
          placeholder="服务名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="唯一标识" prop="code">
        <el-input
          clearable
          maxlength="10"
          v-model.number="form.code"
          placeholder="唯一标识"
        ></el-input>
      </el-form-item>
      <el-form-item label="支持客户" prop="list">
        <template>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="form.list"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, i) in customerType"
              :label="item.customerId"
              :key="i"
              >{{ item.customerName }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
      </el-form-item>
      <el-form-item label="支持录入位置" :required="true" prop="placeStateOne">
        <el-checkbox
          v-model="form.placeStateOne"
          :true-label="1"
          :false-label="0"
          >预约记录</el-checkbox
        >
        <el-checkbox
          v-model="form.placeStateTwo"
          :true-label="1"
          :false-label="0"
          >接待登记</el-checkbox
        >
        <el-checkbox
          v-model="form.placeStateThere"
          :true-label="1"
          :false-label="0"
          >两舱服务</el-checkbox
        >
      </el-form-item>
      <el-form-item label="区分进港/离港" prop="inoutharbor">
        <el-radio v-model="form.inoutharbor" :label="1" @change="radioChange"
          >是</el-radio
        >
        <el-radio v-model="form.inoutharbor" :label="0" @change="radioChange"
          >否</el-radio
        >
      </el-form-item>
      <!-- 进出港子表 -->
      <div v-if="form.inoutharbor == 1">
        <div v-for="(item, i) in form.children" :key="i" style="display: flex">
          <el-form-item :label="i == 0 ? '离港服务' : '进港服务'">
            <el-card>
              <el-form-item
                label="子服务名称"
                :prop="'children.' + i + '.name'"
                :spans="16"
                :rules="children.name"
              >
                <el-input clearable v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item
                label="是否需要分配厅房"
                :prop="'children.' + i + '.need'"
                :rules="children.need"
              >
                <el-radio v-model="item.need" :label="1">需要</el-radio>
                <el-radio v-model="item.need" :label="0">不需要</el-radio>
              </el-form-item>
              <el-form-item label="服务人数" :required="true">
                <el-checkbox
                  label="获取登机牌"
                  v-model="item.serviceOne"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
                <el-checkbox
                  label="手动输入"
                  v-model="item.serviceTwo"
                  :true-label="1"
                  :false-label="0"
                ></el-checkbox>
                <el-link :underline="false" type="warning"
                  >温馨提示:
                  同时勾选"获取登机牌"和"手动输入"时,以手动输入为主,登机牌则作为提醒用途</el-link
                >
              </el-form-item>
              <el-form-item label="说明" prop="remark">
                <el-input
                  type="textarea"
                  maxlength="200"
                  v-model="item.remark"
                ></el-input>
              </el-form-item>
            </el-card>
          </el-form-item>
        </div>
      </div>
      <!-- 主表 -->
      <el-form-item label="是否需要分配厅房" prop="need">
        <el-radio v-model="form.need" :label="1">需要</el-radio>
        <el-radio v-model="form.need" :label="0">不需要</el-radio>
      </el-form-item>

      <el-form-item label="服务人数" :required="true">
        <el-checkbox
          label="获取登机牌"
          v-model="form.serviceOne"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>

        <el-checkbox
          label="手动输入"
          v-model="form.serviceTwo"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
        <el-link :underline="false" type="warning"
          >温馨提示:
          同时勾选"获取登机牌"和"手动输入"时,以手动输入为主,登机牌则作为提醒用途</el-link
        >
      </el-form-item>

      <el-form-item label="说明" :spans="16" prop="remark">
        <el-input
          clearable
          maxlength="200"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.remark"
          :autosize="false"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { CustomerType } from "@/api/serviceManage";
export default {
  name: "editForm",
  data() {
    return {
      customerType: [{ customerId: "", customerName: "" }],
      checkAll: false, //全选状态
      isIndeterminate: false,
      positionList: [],
      form: {
        name: "",
        code: null,
        list: [],
        customer: [],
        placeStateOne: 0,
        placeStateTwo: 0,
        placeStateThere: 0,
        inoutharbor: null, //进出港
        need: null,
        serviceOne: 0, //服务人数 获取登机牌
        serviceTwo: 0, //服务人数 手动输入
        remark: "",
        children: [],
      },
      children: {
        name: [{ required: true, message: "请输入服务名称", trigger: "blur" }],

        need: [
          {
            required: true,
            message: "请选择是否需要分配厅房",
            trigger: "change",
          },
        ],
      },
      rules: {
        name: [{ required: true, message: "请输入服务名称", trigger: "blur" }],
        code: [
          {
            type: "number",
            required: true,
            message: "请输入唯一标识",
            trigger: "blur",
          },
        ],
        list: [],
        inoutharbor: [
          {
            required: true,
            message: "请选择是否区分进港/离岗",
            trigger: "change",
          },
        ],
        need: [
          {
            required: true,
            message: "请选择是否需要分配厅房",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getCustomerType();
  },
  methods: {
    //   客户类型下拉框
    getCustomerType() {
      CustomerType().then((res) => {
        this.customerType = [];
        let array = res.data;
        array.forEach((item) => {
          this.customerType.push({
            customerId: item.id,
            customerName: item.name,
          });
        });
        this.$forceUpdate();
      });
    },
    // 全选
    handleCheckAllChange(val) {
      if (val) {
        this.customerType.forEach((item, index) => {
          this.form.list.push(item.customerId);
        });
      } else {
        this.form.list = [];
      }
      this.$forceUpdate();
      this.isIndeterminate = false;
    },
    // 多选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.customerType.length;
    },
    // 区分进港/离港
    radioChange(val) {
      if (val == 1) {
        this.form.children = [
          {
            name: "",
            need: null,
            serviceOne: 0,
            serviceTwo: 0,
            remark: "",
          },
          {
            name: "",
            need: null,
            serviceOne: 0,
            serviceTwo: 0,
            remark: "",
          },
        ];
      } else {
        this.form.children = [];
      }
    },
  },
};
</script>
<style scoped>
.box-card {
  padding: 20px 0;
  transition: 0.2s;
}
</style>
