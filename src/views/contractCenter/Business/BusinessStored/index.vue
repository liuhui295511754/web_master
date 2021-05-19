<template>
    <div class="business-stored-container">
    <div class="storedleft">
      <div>合同编号：</div>
      <div>合同名称：</div>
      <div>客户名称：</div>
      <div>当前合同余额：</div>
      <div>本次{{dialogTitle}}：</div>
      <div>备注：</div>
    </div>
    <div class="storedright">
      <div>{{form.code}}</div>
      <div>{{form.name}}</div>
      <div>{{form.receptionUnitName}}</div>
      <div>{{form.storedMoney}}</div>
      <el-row>
        <el-col :span="16"><el-input v-model="form.currentStored"></el-input></el-col>
        <el-col :span="3"></el-col>
        <el-col :span="5"><span>元</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="16"><el-input v-model="form.remark"></el-input></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        props:{
          dialogTitle:{
            type:String,
            required:true
          },
          form:{
            type:Object,
            required:true
          }
        }
    }
</script>

<style lang="scss" scoped>
.business-stored-container {
  display: flex;
  line-height: 30px;
  .storedleft {
    flex: 1;
    text-align: right;
  }
  .storedright {
    flex: 1;
  }
}
</style>
