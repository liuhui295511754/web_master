<template>
  <div>
    <!-- 搜索表单 -->
    <el-form :model="form" class="demo-form-inline">
      <el-row :gutter="20" v-if="type == 'airplane'">
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.updateCode"
              placeholder="更新批号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select
              clearable
              v-model="form.updateMethod"
              placeholder="更新方式"
            >
              <el-option label="新增" :value="0"></el-option>
              <el-option label="导入" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select
              clearable
              v-model="form.updateStatus"
              placeholder="更新结果"
            >
              <el-option label="正常" :value="0"></el-option>
              <el-option label="异常" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-date-picker
              clearable
              v-model="form.updateMouth"
              value-format="yyyy-MM"
              format="yyyy-MM"
              type="month"
              placeholder="更新月份"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search">查询 </el-button></el-col
        >
      </el-row>
      <el-row :gutter="20" v-else>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.twoCode"
              placeholder="二字码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.flightNumber"
              placeholder="航班号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input
              clearable
              v-model="form.deviceNumber"
              placeholder="机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select
              filterable
              clearable
              v-model="form.airlinesName"
              placeholder="航空公司"
            >
              <el-option
                v-for="item in airplane"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search">查询 </el-button></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { airplaneList } from "@/api/serverCenter";
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
    data() {
      return {
        airplane: [],
      };
    },
  },
  created() {
    this.getAirplaneList();
  },
  methods: {
    //   搜索
    search() {
      this.$emit("search");
    },
    // 获取航空公司
    async getAirplaneList() {
      const res = await airplaneList();
      if (res.code != 1) return this.$message.error(res.message);
      this.airplane = res.data;
    },
  },
};
</script>
<style>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>