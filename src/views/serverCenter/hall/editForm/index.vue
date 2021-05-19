<template>
  <div>
    <el-form
      :model="form"
      ref="dispatchForm"
      label-width="110px"
      class="customer-form"
    >
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="分配角色">
            <el-select clearable v-model="form.name1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="旅客姓名:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="旅客人数:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="手机号码:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="航班号:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="起飞/到达:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="起飞时间:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="到达时间:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="停机位:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="登机口:">
            <el-input clearable v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="服务厅房:">
            <el-select clearable v-model="form.name1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              maxlength="200"
              clearable
              v-model="form.name1"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "editForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "指南",
        },
        {
          value: "2",
          label: "指南",
        },
        {
          value: "3",
          label: "指南",
        },
        {
          value: "4",
          label: "指南",
        },
      ],
    };
  },
};
</script>