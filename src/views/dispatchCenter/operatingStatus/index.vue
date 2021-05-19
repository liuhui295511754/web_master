<template>
    <div class="operating-status">
      <div class="left">
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>一号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>二号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>三号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>四号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="open" style="margin: 10px 10px; height: 60px">
            <div>五号厅</div>
            <div>当前旅客人数: 10(10)</div>
          </el-button>
        </el-row>
      </div>

      <!-- 贵宾调度航班保障 -->
      <el-card style="width: 85%">
        <div slot="header" class="first-table">
          <p class="first-title">贵宾调度航班保障</p>
          <el-button style="float: right; padding-top: 0px" type="text" @click="getDispatcherTask">临时调度任务(已完成: {{this.date}}, 未完成: {{this.date}})</el-button>
          <el-checkbox v-model="checked" style="float: right; margin-right: 100px">显示已起飞航班</el-checkbox>
        </div>
        <mt-data-content>
          <el-table :data="vipData"
                    style="width: 100%; margin-bottom: 15px; margin-top: 15px; font-size: 12px"
                    border
                    :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              v-for="item in vipCols"
              :key="item.id"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            ></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-button
                      size="mini"
                      @click="sendInfo(scope.$index, scope.row)"
                    >发送引领通知</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </mt-data-content>
      </el-card>

      <!-- 航班接机保障 -->
      <el-card>
        <div slot="header" class="second-table">
          <p class="second-title">航班接机保障</p>
        </div>
        <mt-data-content>
          <el-table :data="flightData"
                    style="width: 100%; margin-bottom: 20px; font-size: 12px"
                    border
                    :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              v-for="item in flightCols"
              :key="item.id"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            ></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-button
                      size="mini"
                      @click="sendDispatch(scope.$index, scope.row)"
                    >发起调度</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </mt-data-content>
      </el-card>

      <!-- 全流程送机 -->
      <el-card>
        <div slot="header" class="third-table">
          <p class="third-title">全流程送机</p>
        </div>
        <mt-data-content>
          <el-table :data="plantWideData"
                    style="width: 100%; margin-bottom: 20px; font-size: 12px"
                    border
                    :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              v-for="item in plantWideCols"
              :key="item.id"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            ></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-button
                      size="mini"
                      @click="sendMessage(scope.$index, scope.row)"
                    >发送引领通知</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </mt-data-content>
      </el-card>

      <!--公务机及政要航班保障-->
      <el-card>
        <div slot="header" class="fourth-table">
          <p class="fourth-title">公务机及政要航班保障</p>
        </div>
        <mt-data-content>
          <el-table :data="airplaneData"
                    style="width: 100%; margin-bottom: 20px; font-size: 12px"
                    border
                    :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column label="作业编号" prop="number"></el-table-column>
            <el-table-column label="航班号" prop="airlinerNo"></el-table-column>
            <el-table-column label="预计起飞" prop="departureTime"></el-table-column>
            <el-table-column label="预计到场" prop="predictArrive"></el-table-column>
            <el-table-column label="登机口" prop="departureGate"> </el-table-column>
            <el-table-column label="到场通报" prop="arriveNotification"> </el-table-column>
            <el-table-column label="总人数" prop="totalPeople"> </el-table-column>
            <el-table-column label="开始" prop="start"> </el-table-column>
            <el-table-column label="厅室准备" prop="arriveNotification"> </el-table-column>
            <el-table-column label="信息核对" prop="arriveNotification"> </el-table-column>
            <el-table-column label="安检">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="保安">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="监护">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="行李搬运">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="车辆">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="登机">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
            <el-table-column label="登机完成">
              <el-table-column label="预约" prop="reserve"></el-table-column>
              <el-table-column label="到达" prop="arrive"></el-table-column>
            </el-table-column>
          </el-table>
        </mt-data-content>
      </el-card>

    </div>
</template>
<script>

export default {
  name: 'operatingStatus',
  data () {
    return {
      vipData: [],
      flightData: [],
      plantWideData: [],
      airplaneData:  [],
      date: 5,
      checked: false,
      //贵宾调度航班保障
      vipCols: [
        { label: "航班号", prop: "airlinerNo", width: "" },
        { label: "预计起飞", prop: "departureTime", width: "" },
        { label: "航班状态", prop: "airlinerstatus", width: "" },
        { label: "预计到场", prop: "predictArrive", width: "80" },
        { label: "到场通报", prop: "arriveNotification", width: "100" },
        { label: "登机口", prop: "departureGate", width: "80" },
        { label: "总人数", prop: "totalPeople", width: "" },
        { label: "引领通知", prop: "notification" },
        { label: "手动引领通知", prop: "manualNotification" },
        { label: "登机通知", prop: "boardingInfo" },
        { label: "车辆预约", prop: "VehicleReservations" },
        { label: "车辆到达", prop: "VehicleArrives" },
        { label: "安检通知", prop: "securityCheckInfo" },
        { label: "安检到达", prop: "securityCheckArrive" }
      ],
      //航班接机保障
      flightCols: [
        { label: "航班号", prop: "airlinerNo", width: "" },
        { label: "预计到达", prop: "arriveTime", width: "" },
        { label: "航班状态", prop: "airlinerStatus", width: "" },
        { label: "停机位", prop: "gatePosition", width: "" },
        { label: "总人数", prop: "totalPeople", width: "" },
        { label: "第一次通知", prop: "firstNotification" },
        { label: "第二次通知", prop: "secondNotification" }
      ],
      //全流程送机
      plantWideCols: [
        { label: "航班号", prop: "airlinerNo", width: "" },
        { label: "预计起飞", prop: "departureTime", width: "" },
        { label: "航班状态", prop: "airlinerStatus", width: "" },
        { label: "预计到场", prop: "predictArrive", width: "" },
        { label: "到场通报", prop: "arriveNotification", width: "" },
        { label: "登机口", prop: "departureGate", width: "80" },
        { label: "总人数", prop: "totalPeople", width: "" },
        { label: "引领通知", prop: "notification" },
        { label: "手动引领通知", prop: "manualNotification" },
        { label: "登机通知", prop: "aboardNotification" },
        { label: "车辆预约", prop: "VehicleReservations" },
        { label: "车辆到达", prop: "VehicleArrives" },
        { label: "安检通知", prop: "securityCheckInfo" },
        { label: "安检到达", prop: "securityCheckArrive" }
      ],
      //公务机及政要航班保障
      airplaneCols: [
        { label: "航班号", prop: "airlinerNo", width: "" },
        { label: "预计到达", prop: "departureTime", width: "" },
        { label: "航班状态", prop: "airlinerstatus", width: "" },
        { label: "停机位", prop: "gatePosition", width: "" },
        { label: "总人数", prop: "totalPeople", width: "" },
        { label: "第一次通知", prop: "firstNotification" },
        { label: "第二次通知", prop: "secondNotification" }
      ],
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {


    },
    //贵宾调度航班保障-发送引领通知
    sendInfo(index, row) {
      console.log(index, row);
    },
    //航班接机保障-发起调度
    sendDispatch(index, row) {
      console.log(index, row);
    },
    //全流程送机-发送引领通知
    sendMessage(index, row) {
      console.log(index, row);
    },
    open() {
      console.log(12345)
    },
    getDispatcherTask() {

    }

  }
}
</script>

<style scoped>
  .left {
    float: left;
    overflow: hidden ;
  }
  .first-title, .second-title, .third-title, .fourth-title {
    display: inline;
    margin-bottom: 5px;
    margin-left: 0;
  }
  .right {
    float: right;
    margin-left: 100px;
    color: #1a99ff;
  }
  .el-checkbox {
    float: right;
  }
  .first-table, .second-table, .third-table, .fourth-table {
    float: right;
    width: 1140px;
  }
</style>
