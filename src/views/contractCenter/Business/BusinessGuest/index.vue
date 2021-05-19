<template>
  <!-- 嘉宾服务 -->
  <div class="business-guest-container">
    <!-- <p>嘉宾服务</p> -->
    <div>

      <mt-form ref="form" :col="1" :model="formLabel" label-width="120px">
        <!-- <mt-form-item label="收费模式" :spans="12">
          <el-radio-group v-model="radio">
            <el-radio :label="3">隔离区内外统一收费</el-radio>
            <el-radio :label="6">隔离区内外分开收费</el-radio>
          </el-radio-group>
        </mt-form-item> -->

        <div v-if="this.tollModel == 0">
          <div class="guestbtn">
            <el-button type="success" size="mini" @click="addMembers">新增</el-button>
          </div>
          <mt-form-item label="收费标准" :spans="24">
            <el-table :data="formLabel.serviceGuests" border :headerStyle="{ 'text-align': 'center' }">
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

              <el-table-column prop="areaType" label="区域">
                <el-select v-if="this.tollModel == 0" disabled>
                  <el-option label="隔离区内外" value="0"></el-option>
                </el-select>
              </el-table-column>

              <el-table-column
                label="收费类型"
              >
                <template slot-scope="scope">
                  <el-select v-model.number="scope.row.feeType">
                    <el-option label="人均收费" :value="0"></el-option>
                    <el-option label="超出部分人均收费" :value="1"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column
                label="收费标准（元/人）"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fee"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="200" :resizable="false" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="delSingle(scope.$index)"
                  >删除
                  </el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </mt-form-item>
        </div>

        <div v-if="this.tollModel == 1">
          <mt-form-item label="收费标准" :spans="24">
            <el-table :data="tableData" border :headerStyle="{ 'text-align': 'center' }">
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
              <el-table-column prop="contractMargin" label="区域">
                <template slot-scope="scope">
                  <el-select v-model.number="scope.row.areaType">
                    <el-option label="隔离区内" :value="0"></el-option>
                    <el-option label="隔离区外" :value="1"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="收费类型"
              >
                <template slot-scope="scope">
                  <el-select v-model.number="scope.row.feeType">
                    <el-option label="人均收费" :value="0"></el-option>
                    <el-option label="超出部分人均收费" :value="1"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column
                label="收费标准（元/人）"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.fee"></el-input>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="200" :resizable="false" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="goedit(scope.row.id)"
                  >新增
                  </el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    @click="delSingle(scope.row.id)"
                  >删除
                  </el-button
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
      return {
        // radio: "3",
        value: ''
      }
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
      tollModel: {
        type: Number,
        required: true
      }
    },
    created() {
      this.addMemberSeparate()
    },
    methods: {
      delSingle(index) {
        this.formLabel.serviceGuests.splice(index, 1)
      },
      goedit() {
        // console.log(2);
        var member = this.formLabel.serviceGuests
        this.formLabel.serviceGuests.push(
          {
            peopleType: '',
            peopleNumLeft: '',
            peopleNumRight: '',
            areaType: '',
            feeType: '',
            fee: ''
          })
      },
      async addMemberSeparate() {
        if (this.tollModel == 1) {
          var memberSeparate = this.formLabel.serviceGuests
          this.formLabel.serviceGuests.push({
            peopleType: '',
            peopleNumLeft: '',
            peopleNumRight: '',
            areaType: '',
            feeType: '',
            fee: ''
          })
        }
      },
      addMembers() {
        var member = this.formLabel.serviceGuests
        this.formLabel.serviceGuests.push(
          {
            peopleType: '',
            peopleNumLeft: '',
            peopleNumRight: '',
            areaType: '',
            feeType: '',
            fee: ''
          })
      },
      tostr(val) {
        return '"' + val + '"'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guestbtn {
    float: right;
    margin-top: 20px;
  }
</style>
