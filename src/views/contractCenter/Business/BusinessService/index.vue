<template>
  <!-- 包厅服务 查看合同与新增合同 -->

  <div class="business-service-container">
    <!-- <p>包厅服务</p> -->
    <div v-if="dialogViewContract !== false">
      <!-- <mt-form ref="form" :model="formLabel" label-width="100px">
        <el-row :gutter="40">

            <mt-form-item label="服务内容" :spans="24">
              <el-input
                type="textarea"
                v-model="formLabel.customerName"
                class="resizeNone"
                :rows="3"
                resize="none"
                placeholder="请输入内容 "
              ></el-input>
            </mt-form-item>

        </el-row>
      </mt-form> -->
      <el-table
        :data="tableData"
        :headerStyle="{ 'text-align': 'center' }"
        :cell-style="{ textAlign: 'center' }"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column label="厅房" type="index" width="85">
          <template slot-scope="scope">
            <span>{{ scope.row.hallName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="座位数">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" align="center" label="面积">
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="number" label="所属区域">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="number" label="区域类型">
          <template slot-scope="scope">
            <span>{{ scope.row.areaType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="当前散客参考价格(元)">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="discount"
          label="折扣设置(%)"
          width="140"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.discount"
                      maxlength="2"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                      @input="discountInput(scope.row.discount,scope.row.price,scope.$index)"
                      @keyup.native="keyupEvent($event, scope.row.discount)"
                      clearable>
            </el-input>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="prices"
          label="包厅价格(元)"
          width="140"
        >
          <template slot-scope="scope">
            <el-input onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
                      @input="pricesInput(scope.row.prices,scope.row.price,scope.$index)"
                      v-model="scope.row.prices"
                      clearable>
            </el-input>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="80">
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
    </div>

    <!-- <div v-else>
      <mt-form ref="form" :model="formLabel" label-width="100px">
        <el-row :gutter="40">

            <mt-form-item label="服务内容" :spans="24">
              <el-input
                type="textarea"
                v-model="formLabel.customerName"
                class="resizeNone"
                :rows="3"
                resize="none"
                placeholder="请输入内容 "
              ></el-input>
            </mt-form-item>



            <mt-form-item label="嘉宾服务" :spans="12">
              <el-input v-model="formLabel.customerName"></el-input>
            </mt-form-item>

          <el-col :span="12">
            <div class="pricemarign">元/人</div>
          </el-col>

          <el-col>
            <mt-form-item label="收费标准">
              <el-table :data="fromList" border stripe style="width: 100%;">
                <el-table-column
                  align="center"
                  type="index"
                  label="序号"
                  width="150"
                >
                </el-table-column>
                <el-table-column align="center" prop="seat" label="座位">
                </el-table-column>
                <el-table-column align="center" prop="area" label="面积(㎡)">
                </el-table-column>
                <el-table-column align="center" prop="region" label="所属区域">
                </el-table-column>
                <el-table-column align="center" prop="type" label="区域类型">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="price"
                  label="收费标准(元/房)"
                  width="160"
                >
                </el-table-column>
              </el-table>
            </mt-form-item>
          </el-col>
        </el-row>
      </mt-form>
    </div> -->
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
    tableData: {
      type: Array,
      required: true,
    },
    dialogViewContract: {
      type: Boolean,
      required: true,
    },
  },
  computed: {

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
          this.tableData.splice(index, 1);
        });
    },
    // getComputedData(val) {
    //   if(this.formLabel.serviceHalls.price && this.formLabel.serviceHalls.discount) {
    //     val = parseFloat(this.formLabel.serviceHalls.price) * parseFloat(1 - this.formLabel.serviceHalls.discount /100)
    //   }
    //   return val.toFixed(4);
    //   // return this.prices = this.price * (1 - this.discount/100)
    // },
    // 只能输入正整数和两位小数点
    //包厅服务-折扣设置
    discountInput(val,price,index){
      if(price !== 0 && val > 0 && val < 100) {
        this.tableData[index].prices = parseFloat(price) * parseFloat(1 - val/100);
        return this.tableData[index].prices.toFixed(4);
      }
    },
    //包厅服务-包厅价格设置
    pricesInput(val, price, index) {
      if(this.tableData[index].price && val) {
        this.tableData[index].discount = 100 - parseFloat(val) / parseFloat(price) * 100;
        return this.tableData[index].discount.toFixed(2);
      }
    },
    keyupEvent(e, input) {
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
      e.target.value = e.target.value.replace(/\.{2,}/g, ".");
      e.target.value = e.target.value.replace(/^\./g, "0.");
      e.target.value = e.target.value.replace(
        /^\d*\.\d*\./g,
        e.target.value.substring(0, e.target.value.length - 1)
      );
      e.target.value = e.target.value.replace(/^0[^\.]+/g, "0");
      e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
      input = e.target.value;
    },

  },
};
</script>

<style lang="scss" scoped>
.serveadd {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pricemarign {
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
}
</style>
