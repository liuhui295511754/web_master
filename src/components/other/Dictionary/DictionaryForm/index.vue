<template>
  <!--是否行内表单-->
  <el-form
    :inline="inline"
    :model="form"
    ref="ruleForm"
    :rules="rules"
    label-width="120px"
  >
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      :prop="item.model"
    >
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input'"
      ></el-input>
      <el-input
        v-model.number="form[item.model]"
        :placeholder="'请输入' + item.label"
        onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
        v-if="item.type === 'sn'"
      ></el-input>
      <el-select
        v-model="form[item.model]"
        :placeholder="'请选择' + item.label"
        style="width:100%"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch
        v-model="form[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch>
      <!-- <el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'" value-format="yyyy-MM-dd"> </el-date-picker> -->
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输区域类型", trigger: "blur" }
        ],
        names: [
          { required: true, message: "请输设备名称", trigger: "blur" }
        ],
        team: [
          { required: true, message: "请输入所属班组", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入编号", trigger: "blur" }
        ],
        type: [{ required: true, message: "请至少选择一种", trigger: "blur" }],
        serialNumber: [
          { required: true, message: "请输入机器列序号", trigger: "blur" }
        ],
        sn: [
          { required: true, message: "排列顺序不能为空" },
          { type: "number", message: "排列顺序必须为数字值" }
        ]
      }
    };
  },
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
};
</script>
