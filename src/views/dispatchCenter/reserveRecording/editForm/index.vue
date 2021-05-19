<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="全流程保障:" prop="processGuarantee">
            <el-switch v-model="form.processGuarantee" disabled> </el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="旅客姓名:" prop="touristName">
            <el-input v-model="form.touristName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="旅客人数:" prop="touristNumber">
            <el-input v-model="form.touristNumber"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="telephoneNumber">
            <el-input type="number" v-model="form.telephoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="航班号:" prop="departureNumber">
            <el-input v-model="form.departureNumber"></el-input>
          </el-form-item>
          <el-form-item label="起飞/到达:" prop="upDown">
            <el-input v-model="form.upDown"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="起飞时间:" prop="upTime">
            <el-input v-model="form.upTime"></el-input>
          </el-form-item>
          <el-form-item label="到达时间:" prop="downTime">
            <el-input v-model="form.downTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="停机位:" prop="gatePosition">
            <el-input v-model="form.gatePosition"></el-input>
          </el-form-item>
          <el-form-item label="登机口:" prop="boardingGate">
            <el-input v-model="form.boardingGate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="服务厅房:" prop="serverHall">
            <el-select v-model="form.serverHall" clearable>
              <el-option label="包厅1" value="1"> </el-option>
              <el-option label="包厅2" value="11"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分配角色:" prop="apportionRole">
            <el-input v-model="form.apportionRole"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="备注:" prop="remark">
            <el-input
              type="textarea"
              maxlength="200"
              v-model="form.remark"
              clearable
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
  data() {
    return {
      form: {
        processGuarantee: true,
        touristName: null,
        touristNumber: null,
        telephoneNumber: null,
        departureNumber: null,
        upDown: null,
        upTime: null,
        downTime: null,
        gatePosition: null,
        boardingGate: null,
        serverHall: null,
        apportionRole: null,
        remark: null,
      },
      rules: {
        touristName: {
          required: true,
          trigger: "blur",
        },
        apportionRole: {
          required: true,
          trigger: "blur",
        },
      },
    };
  },
};
</script>

<style scoped>
</style>
