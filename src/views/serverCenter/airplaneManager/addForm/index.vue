<template>
  <div>
    <!-- 机号信息 -->
    <el-form
      style="margin-right: 45px"
      ref="airplaneForm"
      :model="form"
      label-width="135px"
      :rules="rules"
      v-if="type == 'airplane'"
    >
      <el-form-item label="机号更新月份" prop="updateMouth">
        <el-date-picker
          v-model="form.updateMouth"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="选择月份"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="航班实际起降日期" prop="departureDate">
        <el-date-picker
          v-model="form.departureDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="二字码" prop="twoCode">
        <el-input v-model="form.twoCode" placeholder="二字码"></el-input>
      </el-form-item>
      <el-form-item label="航班号" prop="planeNumber">
        <el-input v-model="form.planeNumber" placeholder="二字码"></el-input>
      </el-form-item>
      <el-form-item label="进出港" prop="state">
        <el-radio v-model="form.state" :label="1">进港</el-radio>
        <el-radio v-model="form.state" :label="0">出港</el-radio>
      </el-form-item>
      <el-form-item label="起降时间" prop="movementsDate">
        <el-time-picker
          v-model="form.movementsDate"
          type="date"
          format="hh:mm:ss"
          value-format="hh:mm:ss"
          placeholder="起降时间"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="机号" prop="machineNumber">
        <el-input v-model="form.machineNumber" placeholder="机号"></el-input>
      </el-form-item>

      <el-form-item label="航空公司" prop="airplaneName">
        <el-select
          filterable
          clearable
          v-model="form.airplaneName"
          placeholder="航空公司"
          @change="handleSelect"
        >
          <el-option
            v-for="item in airplane"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 湿租规则 -->
    <el-form
      v-else
      style="margin-right: 45px"
      ref="ruleForm"
      :model="form"
      label-width="135px"
      :rules="rules"
    >
      <el-form-item label="二字码" prop="twoCode">
        <el-input v-model="form.twoCode" placeholder="二字码"></el-input>
      </el-form-item>
      <el-form-item label="航班号" prop="flightNumber">
        <el-input v-model="form.flightNumber" placeholder="二字码"></el-input>
      </el-form-item>
      <el-form-item label="机号" prop="deviceNumber">
        <el-input v-model="form.deviceNumber" placeholder="机号"></el-input>
      </el-form-item>
      <el-form-item label="航空公司" prop="airlinesName">
        <el-select
          filterable
          clearable
          v-model="form.airlinesName"
          placeholder="航空公司"
          @change="handleSelect"
        >
          <el-option
            v-for="item in airplane"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "addForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
    airplane: {
      type: Array,
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      rules: {
        updateMouth: [{ required: true, message: "请选择", trigger: "change" }],
        departureDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        twoCode: [{ required: true, message: "请输入", trigger: "blur" }],
        planeNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        state: [{ required: true, message: "请选择", trigger: "change" }],
        flightNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        deviceNumber: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        movementsDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        machineNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        airplaneName: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        airlinesName: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //   选中航空公司
    handleSelect(val) {
      this.airplane.forEach((item) => {
        if (item.name == val) {
          this.form.airplaneId = item.id;
        }
      });
    },
  },
};
</script>
<style>
.el-select {
  width: 100%;
}
</style>