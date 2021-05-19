<template>
  <!-- 全流程服务 -->
  <div class="business-process-container">
    <!-- <p>全流程服务</p> -->
    <div aria-disabled="true">
      <mt-form ref="form" :col="1" :model="formLabel" label-width="120px">
        <!-- <fieldset disabled> -->
        <!-- <mt-form-item label="服务内容" :spans="24">
          <el-input
            type="textarea"
            v-model="formLabel.contractAirline[0].contents"
            class="resizeNone"
            :rows="3"
            resize="none"
            placeholder="请输入内容 "
          ></el-input>
        </mt-form-item> -->

        <div>
          <div class="guestbtn">
            <el-button type="success" @click="addProcess" size="mini">新增</el-button>
          </div>
          <mt-form-item label="收费标准" :spans="24">
            <el-table
              :data="tableData"
              :headerStyle="{ 'text-align': 'center' }"
              border
            >
              <el-table-column label="接待人数" width="220">
                <template slot-scope="scope">
                  <el-row :gutter="10">
                    <el-col :span="10">
                    <el-select v-model.number="scope.row.peopleType">
                      <el-option label="范围" :value="0"></el-option>
                      <el-option label="大于" :value="1"></el-option>
                    </el-select>
                  </el-col>
                     <el-col :span="6">
                    <el-input v-model="scope.row.peopleNumLeft"></el-input>
                  </el-col>
                  <el-col :span="2" style="line-height:40px">
                    <span>~</span>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="scope.row.peopleNumRight"></el-input>
                  </el-col>
                  </el-row>
                </template>
              </el-table-column>

              <el-table-column
              label="收费类型"
            >
            <template slot-scope="scope">
              <el-select v-model.number="scope.row.feeType" >
                <el-option label="人均收费" :value="0"></el-option>
                <el-option label="超出部分人均收费" :value="1"></el-option>
              </el-select>
              </template>
            </el-table-column>

              <el-table-column
              label="全流程接机（元/人）"
              align="center"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.receiveFee"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="全流程送机（元/人）"
              align="center"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.sendFee"></el-input>
              </template>
            </el-table-column>



              <el-table-column
                label="操作"
                width="200"
                :resizable="false"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="delSingle(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </mt-form-item>
        </div>
        <!-- </fieldset> -->
      </mt-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    formLabel: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
  },
  methods: {
    addProcess(){
      var member = this.formLabel.serviceProcesses
      this.formLabel.serviceProcesses.push(
    {
      peopleType: '',
      peopleNumLeft: '',
      peopleNumRight: '',
      receiveFee: '',
      sendFee:'',
    })
  },

  }
};
</script>

<style lang="scss" scoped>
.guestbtn {
  float: right;
  margin-top: 20px;
}
</style>
