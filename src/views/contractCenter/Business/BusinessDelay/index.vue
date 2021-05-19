<template>
  <!-- 延期 -->
  <div class="business-delay-container">
    <div class="delayleft">
      <div>合同编号：</div>
      <div>合同名称：</div>
      <div>客户名称：</div>
      <div>当前合同有效期：</div>
      <div>延期至：</div>
    </div>
    <div class="delayright">
      <div>{{form.code}}</div>
      <div>{{form.name}}</div>
      <div>{{form.contractName}}</div>
      <div>{{form.receptionUnitName}}</div>
      <div>{{form.beginDate}}至{{form.endDate}}</div>
    <el-date-picker
      v-model="form.endDate"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      placeholder="请选择合同到期时间">
    </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ""
    };
  },
  props:{
    form:{
      type:Object,
      required:true
    }
  }
};
</script>

<style lang="scss" scoped>
.business-delay-container {
  display: flex;
  line-height: 30px;
  .delayleft {
    flex: 1;
    text-align: right;
  }
  .delayright {
    flex: 1;
  }
}
</style>
