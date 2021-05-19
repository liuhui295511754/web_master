<template>
  <!-- 冠名厅服务 -->
  <div class="business-named-container">
    <!-- <p>冠名厅服务</p> -->
    <div>
      <mt-form ref="form" :col="1" :model="formLabel" label-width="120px">
        <mt-form-item label="收费标准" :spans="24">
          <div class="named-title" v-if="contractAfterView">
            <span
              >提示：厅房冠名费指的是按照结算周期支付的厅房冠名费。例如结算周期为3个月，则指的是累计3个月的厅房冠名费！</span
            >
          </div>
          <div class="named-title" v-else>
            <span>提示：厅房冠名费指的是按月支付的厅房冠名费。</span>
            <el-button type="success" @click="addNamed" size="mini"
              >新增</el-button
            >
          </div>

          <el-table
            :data="formLabel.serviceNamings"
            :headerStyle="{ 'text-align': 'center' }"
            border
          >
            <el-table-column label="厅房" type="index" :index="101" width="150">
              <template slot-scope="scope">
                <el-select v-model="scope.row.hallName">
                  <el-option
                    v-for="item in formLabel.serviceNamings"
                    :key="item.id"
                    :label="item.hallName"
                    :value="item.hallName"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="number" label="座位">
            </el-table-column>
            <el-table-column align="center" prop="area" label="面积(㎡)">
            </el-table-column>
            <el-table-column align="center" prop="areaName" label="所属区域">
            </el-table-column>
            <el-table-column align="center" prop="areaType" label="区域类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fee"
              label="冠名费（元/㎡/月）"
              width="100"
            >
              <template slot-scope="scope">
                 <el-input v-model="scope.row.fee"
                           onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''">
                 </el-input>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="fees"
              label="厅房冠名费（元）"
              width="100"
            >
              <template slot-scope="scope">
                {{ (scope.row.fees = scope.row.fee * scope.row.area) }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="140">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </mt-form-item>
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
      required: true,
    },
    contractAfterView: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.formLabel.serviceNamings.splice(index, 1);
        })
        .catch(() => {});
    },
    // getComputed(val, area, index) {
    //   console.log(111)
    //   if(area !== 0 && val !== 0) {
    //     console.log(222)
    //     this.formLabel.serviceNamings[index].fees = parseFloat(area) * parseFloat(val);
    //     return this.formLabel.serviceNamings[index].fees.toFixed(4);
    //   }
    // },
    addNamed() {
      let obj = {
        seat: "",
        area: "",
        region: "",
        type: "",
        price: "",
        discount: "",
      };
      this.formLabel.serviceNamings.push(obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.business-named-container {
  .named-title {
    color: rgb(64, 168, 134);
    margin-left: 20px;
    .el-button {
      float: right;
    }
  }
}
</style>
