<template>
<!-- 快速安检服务 -->
    <div class="business-secueity-container">
        <!-- <p>快速安检服务</p> -->
        <div>
      <mt-form ref="form" :col="1" :model="formLabel" label-width="120px">
        <!-- <mt-form-item label="服务内容" :spans="24">
          <el-input
            type="textarea"
            v-model="formLabel.customerName"
            class="resizeNone"
            :rows="3"
            resize="none"
            placeholder="请输入内容 "
          ></el-input>
        </mt-form-item> -->

        <div>
          <div class="guestbtn">
            <el-button type="success" size="mini" @click="addmembers">新增</el-button>
          </div>
          <mt-form-item label="收费标准" :spans="24">
            <el-table
              :data="formLabel.serviceSecurities"
              border
              :headerStyle="{ 'text-align': 'center' }"
            >
              <el-table-column label="接待人数" align="center" width="220">
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
              label="快速安检服务（元/人）"
              align="center"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.fee"></el-input>
              </template>
            </el-table-column>

              <el-table-column
                label="操作"
                width="220"
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
    addmembers(){
      var member = this.formLabel.serviceSecurities
      this.formLabel.serviceSecurities.push(
         {
          peopleType: '',
          peopleNumLeft: '',
          peopleNumRight: '',
          feeType: '',
          fee:'',
        }
      )
    },
  }
}
</script>

<style lang="scss" scoped>
.guestbtn {
  float: right;
  margin-top: 20px;
}
</style>
