<template>
  <div id="entourageInfoForm">
    <el-divider content-position="left" id="entourageInfo">
      <span class="info">随行信息</span></el-divider
    >
    <el-form :model="form" ref="entourageInfo" label-width="110px">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="随行人员:" label-width="110px">
            <el-input placeholder="扫描登机牌">
              <template slot="append">
                <mt-button txt="新增" @click="add"></mt-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="110px">
        <el-table
          :data="form.passengerInfoVOS"
          border
          :header-cell-style="{
            'text-align': 'center',
          }"
          :cell-style="cellStyle"
        >
          <el-table-column type="index" label="序号" width="50">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.name'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]"
              >
                <el-input clearable v-model="scope.row.name"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="idNumber" label="身份证">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.idNumber'"
              >
                <el-input
                  clearable
                  maxlength="18"
                  v-model="scope.row.idNumber"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="boardingPass" label="登机牌">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.boardingPass'"
              >
                <el-input clearable v-model="scope.row.boardingPass"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="flightNumber" label="航班号">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.flightNumber'"
              >
                <el-input clearable v-model="scope.row.flightNumber"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="shippingSpace" label="舱位">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.shippingSpace'"
              >
                <el-input
                  clearable
                  v-model="scope.row.shippingSpace"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="seatNumber" label="座位号">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.seatNumber'"
              >
                <el-input clearable v-model="scope.row.seatNumber"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="ticketNumber" label="客票号">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.ticketNumber'"
              >
                <el-input clearable v-model="scope.row.ticketNumber"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="cardNumber" label="常旅客卡号">
            <template slot-scope="scope">
              <el-form-item
                :prop="'passengerInfoVOS.' + scope.$index + '.cardNumber'"
              >
                <el-input clearable v-model="scope.row.cardNumber"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="Delete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "entourageInfoForm",
  props: {
    form: {
      type: Object,
      default: {},
    },
    // 随行人员信息
    personList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onChangeFlist(row) {
      if (row.rowIndex === 0) {
        return {
          display: "none",
        };
      }
    },
    // 新增随行人员
    add() {
      var id = ""; //订单号
      for (
        var i = 0;
        i < 6;
        i++ //6位随机数，用以加在时间戳后面。
      ) {
        id += Math.floor(Math.random() * 10);
      }
      id = new Date().getTime() + id;
      this.form.passengerInfoVOS.push({
        temporaryId: id,
        name: "", //姓名
        idNumber: null, //身份证
        phone: null, //电话?
        post: "", //职务
        boardingPass: "", //登机牌
        flightNumber: null, //航班号
        startingTime: null, //出发时间
        arrivalTime: null, //到达时间
        airplane: "", //航空公司
        airplaneId: null, //航空公司Id
        seatNumber: null, //座位号
        shippingSpace: null, //舱位
        machine: null, //机号
        ticketNumber: null, //客票号
        type: 0, //主客随从
        cardNumber: null, //常旅客卡号
      });
      this.personList.push({
        passengerId: id, //旅客id
        serviceId: null, //服务id
      });
      this.form.serviceInfoVOS = [];
    },
    // 删除表格数据
    Delete(index, row) {
      this.form.passengerInfoVOS.splice(index, 1);
      this.personList.splice(index, 1);
    },
    // 判断是主客还是随心
    cellStyle(row) {
      // 如果是 两舱服务 ，就隐藏主客信息
      if (row.rowIndex == 0) {
        return { display: "none" };
      }
      // 如果是主客，主客名字变成黄色
      if (row.columnIndex == 1 && row.row.type == 1) {
        return { "background-color": "#e2d380", "text-align": "center" };
      } else {
        return { "text-align": "center" };
      }
    },
  },
};
</script>
<style lang="scss">
/* 改变文字链接颜色 */
.info {
  font-size: 20px;
  font-weight: 700;
}
/* 改变input 复合型输入框背景颜色 */
.el-input-group__append,
.el-input-group__prepend {
  background-color: #409eff;
  color: #fff;
  border: none;
}
</style>