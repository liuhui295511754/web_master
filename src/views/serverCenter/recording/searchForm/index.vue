<template>
  <div>
    <el-form :model="form" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select v-model="form.name1" placeholder="服务厅房">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-input v-model="form.name1" placeholder="旅客姓名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="8" :md="5" :lg="3" :xl="3">
          <el-form-item>
            <el-select v-model="form.name1" placeholder="客户类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input
              v-model="form.name1"
              placeholder="航班号/航空公司/机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input
              v-model="form.name1"
              placeholder="接待单位/卡号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-date-picker
              v-model="form.name1"
              type="date"
              placeholder="接待日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-select v-model="form.name1" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-select v-model="form.name1" placeholder="登记位置">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input
              v-model="form.name1"
              placeholder="结算类型/套餐"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input v-model="form.name1" placeholder="订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-input v-model="form.name1" placeholder="复核人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-select v-model="form.name1" placeholder="机号维护状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="3">
          <el-form-item>
            <el-checkbox :false-label="0" :true-label="1" v-model="form.name2"
              >显示已删除订单</el-checkbox
            >
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="12" :md="8" :lg="4" :xl="5">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">复核</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "searchForm",
  data() {
    return {
      form: {
        name1: "",
        name2: 0,
        region: "",
      },
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
    onSubmit() {},
  },
};
</script>
<style>
/* 日期选择器 宽度100% */
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
.el-select {
  width: 100%;
}
.add_form {
  margin-top: 20px;
  text-align: right;
}
</style>