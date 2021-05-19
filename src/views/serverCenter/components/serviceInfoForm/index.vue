<template>
  <div>
    <el-divider content-position="left" id="serviceInfo">
      <span class="info">服务信息</span></el-divider
    >
    <el-form ref="serviceInfo" label-width="110px" :model="form">
      <el-form-item
        label="服务类型:"
        prop="serviceItem"
        :rules="{
          type: 'array',
          required: true,
          message: '请至少选择一个',
          trigger: 'change',
        }"
      >
        <el-checkbox-group v-model="form.serviceItem" @change="selectChange">
          <el-checkbox
            v-for="item in service"
            :label="item.id"
            :key="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-card
        class="box-card"
        v-for="(item, index) in form.serviceInfoVOS"
        :key="index"
      >
        <div slot="header" class="clearfix">{{ item.servicemanageName }}</div>
        <el-row>
          <!-- 服务人数 -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="!cabin">
            <el-form-item
              label="服务人数:"
              :prop="'serviceInfoVOS.' + index + '.servicemanagePeople'"
              :rules="{
                required: true,
                message: '服务人数不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="item.servicemanagePeople" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- 厅房 -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item
              label="厅房:"
              :prop="'serviceInfoVOS.' + index + '.hallName'"
              :rules="{
                required: true,
                message: '请选择厅房',
                trigger: 'change',
              }"
            >
              <el-input
                placeholder="请选择厅房"
                v-model="form.serviceInfoVOS[index].hallName"
                :suffix-icon="
                  item.show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
                @click.native="item.show = true"
                readonly="readonly"
              ></el-input>
              <!-- 厅房 -->
              <div v-if="item.show" class="treeDiv" ref="tableList">
                <el-table
                  ref="moviesTable"
                  :data="tableData"
                  border
                  :cell-class-name="rowClass"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column label="选择" width="50">
                    <template scope="scope">
                      <el-radio
                        :label="scope.row.name"
                        v-model="item.hallName"
                        @change.native="getTemplateRow(index, scope.row)"
                      ></el-radio>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column type="index" label="序号"></el-table-column> -->
                  <el-table-column label="区域类型" prop="areaType">
                    <template slot-scope="scope">
                      {{ scope.row.areaType == 1 ? "隔离区外" : "隔离区内" }}
                    </template>
                  </el-table-column>
                  <el-table-column label="厅房名称" prop="name">
                  </el-table-column>
                  <el-table-column label="当前接待人数" prop="area">
                  </el-table-column>
                  <el-table-column label="厅房座位数" prop="number">
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
          </el-col>
          <!-- 备注 -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="!cabin">
            <el-form-item label="备注:" prop="remark">
              <el-input v-model="item.remark" clearable> </el-input>
            </el-form-item>
          </el-col>
          <!-- 旅客明细 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="!cabin">
            <el-form-item label="旅客明细:" :required="true">
              <el-table
                border
                ref="multipleTable"
                show-overflow-tooltip
                :data="form.passengerInfoVOS"
                @selection-change="(val) => handleSelectionChange(val, index)"
              >
                <el-table-column type="selection"> </el-table-column>
                <el-table-column label="姓名" prop="name"> </el-table-column>
                <el-table-column label="身份证号" prop="idNumber">
                </el-table-column>
                <el-table-column label="登机牌" prop="boardingPass">
                </el-table-column>
                <el-table-column label="航班号" prop="flightNumber">
                </el-table-column>
                <el-table-column label="舱位" prop="shippingSpace">
                </el-table-column>
                <el-table-column label="座位号" prop="seatNumber">
                </el-table-column>
                <el-table-column label="客票号" prop="ticketNumber">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import { serviceType } from "@/api/servicePrice";
import { SelectList } from "@/api/hallManage";
export default {
  name: "serviceInfoForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
    //随行人员信息
    personList: {
      type: Array,
      default: [],
    },
    // 是否是两舱
    cabin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showTree: false,
      service: [], //f服务类型
      selectTableId: null,
      tableData: [],
    };
  },
  created() {
    this.getHallData();
    this.getServiceData();
  },
  methods: {
    //  勾选旅客明细
    handleSelectionChange(val, index) {
      if (this.form.placeState == 1) {
        val.forEach((item, i) => {
          this.form.serviceInfoVOS[index].serviceDetails[i].passengerId =
            val[i].temporaryId;
        });
      }
    },
    //判断当前接待人数大于座位数的厅房
    rowClass(row) {
      if (row.columnIndex == 3) {
        return row.row.area < row.row.number
          ? "bacColor-success"
          : "bacColor-danger";
      }
    },
    //选中厅房
    getTemplateRow(index, row) {
      this.form.serviceInfoVOS[index].show = false;
      this.form.serviceInfoVOS[index].hallId = row.id;
      // if (this.form.serviceInfoVOS[index + 1] != undefined) {
      //   console.log(
      //     this.form.serviceInfoVOS[index].hallId,
      //     this.form.serviceInfoVOS[index + 1].hallId
      //   );
      //   // 如果厅房不一致,旅客明细不能一致
      //   if (
      //     this.form.serviceInfoVOS[index].hallId !=
      //     this.form.serviceInfoVOS[index + 1].hallId
      //   ) {
      //     this.$refs.multipleTable[index].clearSelection();
      //   }
      // }
    },
    // 数组去重
    sortArray(arr) {
      const returnArr = arr.reduce((cur, next) => {
        !cur.includes(next) && cur.push(next);
        return cur;
      }, []);
      return returnArr;
    },
    // 选中服务类型
    selectChange(val) {
      this.form.serviceInfoVOS = [];
      let array = []; //服务类型数组
      let ary = JSON.parse(JSON.stringify(this.personList));
      this.service.forEach((item, index) => {
        val.forEach((element) => {
          if (item.id == element) {
            //   两舱服务
            if (this.form.placeState == 0) {
              ary.forEach((items) => {
                items.serviceId = item.id;
              });
              array.push({
                show: false, //每个厅房的显示隐藏
                hallId: null, //厅房id
                hallName: null, //厅房名称
                servicemanageId: item.id, //服务id
                servicemanageName: item.name, //服务名称
                servicemanagePeople: null, //服务人数
                remark: "",
                subServicemanageId: null, //子服务id
                subServicemanageName: null, //子服务名称
                //服务单详情
                serviceDetails: ary, //   每项服务勾选后默认主客+随行都参与；
              });
            } else {
              //   接待登记
              let arr = [];
              ary.forEach((items) => {
                arr.push({
                  serviceId: item.id,
                  passengerId: null,
                });
              });
              array.push({
                show: false,
                hallId: null,
                hallName: null,
                servicemanageId: item.id,
                servicemanageName: item.name,
                servicemanagePeople: null,
                remark: "",
                subServicemanageId: null,
                subServicemanageName: null,
                //服务单详情
                serviceDetails: arr,
              });
            }
            //   旅客明细 默认全部勾选
            //   this.$nextTick(() => {
            //     this.form.passengerInfoVOS.forEach((ele, i) => {
            //       this.$refs.multipleTable[index].toggleRowSelection(ele, true);
            //     });
            //   });
            this.form.serviceInfoVOS = array;
          }
        });
      });
    },
    // 获取厅房
    async getHallData() {
      const res = await SelectList();
      if (res.code !== 1) return this.$message.error(res.message);
      this.tableData = res.data;
    },
    // 获取服务类型
    async getServiceData() {
      const res = await serviceType();
      if (res.code !== 1) return this.$message.error(res.message);
      this.service = res.data;
    },
  },
};
</script>
<style lang="scss">
.treeDiv {
  //   position: absolute;
  //   top: 40px;
  position: relative;
  top: 0px;
  left: -1px;
  z-index: 88;
  width: 100%;
  height: 200px;
  overflow: auto;
  .el-table {
    border-radius: 6px;
  }

  .el-table >>> td {
    padding: 4px 0;
  }
  //   去掉单选label显示
  .el-radio__label {
    display: none;
  }
}

.bacColor-success {
  background: #67c23a;
}
.bacColor-danger {
  background: #f56c6c;
}
.box-card {
  margin-bottom: 10px;
}

.info {
  font-size: 20px;
  font-weight: 700;
}
</style>