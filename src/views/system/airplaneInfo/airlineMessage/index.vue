<template>
  <div class="airline-message">
    <el-tabs type="card">
      <!--查詢-->
      <mt-search-content>
        <el-form :inline="true" :model="searchForm" class="form-inline">
          <el-form-item>
            <el-input v-model="searchForm.machineNumber" placeholder="请输入机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select clearable
                       style="width: 250px"
                       v-model="searchForm.airlineId"
                       placeholder="请选择航空公司/航空公司代码"
                       @select="selectAirlineCode">
              <el-option
                v-for="item in airlineCodeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <mt-button
              txt="查询"
              v-loading.fullscreen.lock="fullscreenLoading"
              @click="getTableData"
            ></mt-button>
            <mt-button
              txt="新增"
              @click="addMessageData"
            ></mt-button>
            <mt-upload-image
              class="upload"
              type="file"
              :action="actionUrl"
              multiple
              :limit="3"
              :file-list="fileList"
              @success="upLoadSuccess"
              @fail="uploadFail">
<!--              <el-button size="small" type="primary">导入excel表</el-button>-->
            </mt-upload-image>
<!--            <el-button size="small" type="primary" @click="exportExcel">导出模板</el-button>-->
            <el-button size="small" type="primary">导出模板</el-button>
          </el-form-item>
        </el-form>
      </mt-search-content>
      <!--table-->
      <mt-data-content>
        <mt-table
          :data="codeTableData"
          :currentPage="searchForm.pageNum"
          :pageSize="searchForm.pageSize"
          :headerStyle="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          :total="total"
          @currentChange="handleCurrentChange"
          @size-change='handleSizeChange'
        >
          <el-table-column prop="machineNumber" label="机号"></el-table-column>
          <el-table-column prop="model" label="机型"></el-table-column>
          <el-table-column prop="maxTakeoffWeight" label="最大起飞重量"></el-table-column>
          <el-table-column prop="yeZai" label="业载"></el-table-column>
          <el-table-column prop="maxSeat" label="最大座位"></el-table-column>
          <el-table-column prop="type" label="宽/窄机">
            <template slot-scope="scope">
              {{ scope.row.type == 1 ? "宽体机" : "窄体机" }}
            </template>
          </el-table-column>
          <el-table-column prop="airplaneType" label="飞机属性">
            <template slot-scope="scope">
              {{ scope.row.airplaneType == 1 ? "客机" : "货机" }}
            </template>
          </el-table-column>
          <el-table-column prop="airlineThreeCode" label="航空公司三字码"></el-table-column>
          <el-table-column prop="airlineTwoCode" label="航空公司二字码"></el-table-column>
          <el-table-column prop="airlineName" label="航空公司"></el-table-column>
          <el-table-column prop="beginDate" label="开始时间"></el-table-column>
          <el-table-column prop="endDate" label="结束时间"></el-table-column>
<!--          <el-table-column-->
<!--            v-for="(item, index) in codeCols"-->
<!--            :key="index"-->
<!--            :label="item.label"-->
<!--            :prop="item.prop"-->
<!--          ></el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
              >
            </template>
          </el-table-column>
        </mt-table>
      </mt-data-content>
      <!-- dialog -->
      <mt-edit-content>
        <mt-dialog
          v-model="showDialog"
          :title="dialogTitle"
          @confirmBtn="confirm"
        >
          <template slot="dialog-body">
            <mt-form
              :col="3"
              :model="codeForm"
              :rules="codeRules"
              ref="codeRule"
              label-width="140px"
            >
              <mt-form-item label="机号:" prop="machineNumber">
                <el-input v-model="codeForm.machineNumber" placeholder="请输入机号"></el-input>
              </mt-form-item>
              <mt-form-item label="机型:" prop="model">
                <el-input v-model="codeForm.model" placeholder="请输入机型"></el-input>
              </mt-form-item>
              <mt-form-item label="最大起飞重量:" prop="maxTakeoffWeight">
                <el-input type="text"
                          onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
						              v-model="codeForm.maxTakeoffWeight"
						              placeholder="请输入最大起飞重量">
				        </el-input>
              </mt-form-item>
              <mt-form-item label="业载:" prop="yeZai">
                <el-input type="text"
                          onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
						              v-model="codeForm.yeZai"
						              placeholder="请输入业载">
				        </el-input>
              </mt-form-item>
              <mt-form-item label="最大座位:" prop="maxSeat">
                <el-input type="text"
                          oninput = "value=value.replace(/[^\d]/g,'')"
						              v-model="codeForm.maxSeat"
						              placeholder="请输入最大座位">
				        </el-input>
              </mt-form-item>
              <mt-form-item label="宽/窄机:" prop="type">
                <el-select v-model="codeForm.type" placeholder="宽/窄机">
                  <el-option label="宽体机" value="0"></el-option>
                  <el-option label="窄体机" value="1"></el-option>
                </el-select>
              </mt-form-item>
              <mt-form-item label="飞机属性:" prop="airplaneType">
                <el-select v-model="codeForm.airplaneType" placeholder="飞机属性">
                  <el-option label="客机" value="0"></el-option>
                  <el-option label="货机" value="1"></el-option>
                </el-select>
              </mt-form-item>
              <mt-form-item label="航空公司二字码:" prop="airlineTwoCode">
                <el-input v-model="codeForm.airlineTwoCode" disabled></el-input>
              </mt-form-item>
              <mt-form-item label="航空公司三字码:" prop="airlineThreeCode">
                <el-input v-model="codeForm.airlineThreeCode" disabled></el-input>
              </mt-form-item>
              <mt-form-item label="开始时间:" prop="beginDate">
                <el-date-picker
                  v-model="codeForm.beginDate"
                  type="datetime"
                  placeholder="选择日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </mt-form-item>
              <mt-form-item label="结束时间:" prop="endDate">
                <el-date-picker
                  v-model="codeForm.endDate"
                  type="datetime"
                  placeholder="选择日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </mt-form-item>
              <mt-form-item label="航空公司:" prop="airlineName">
                <el-select clearable
                           v-model="codeForm.airlineName"
                           placeholder="请选择航空公司"
                           @change="selectAirline"
                >
                  <el-option v-for="item in airlineList"
                             :key="item.id"
                             :label="item.name"
                             :value="item.name"
                             >
                  </el-option>
                </el-select>
              </mt-form-item>
            </mt-form>
          </template>
        </mt-dialog>
      </mt-edit-content>
    </el-tabs>
  </div>
</template>

<script>
  import { getAirline } from "@/api/airlineMessage";
  // import FileSaver from "file-saver";
  // import XLSX from "xlsx";
  export default {
    name: 'airlineMessage',
    components: {
      getAirline,
      // FileSaver,
      // XLSX
    },
    props: {
      codeTableData: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        airlineList: [],
        airlineCodeList: [],
        activeName: 'second',
        showDialog: false,
        dialogTitle: '新增',
        fullscreenLoading: false,
        actionUrl: "https://192.168.1.88:8080/airline/machine/importExcel",
        fileList: [],
        total: 100,
        searchForm: {
          airlineId: '',
          machineNumber: '',
          airlineName: '',
          pageNum: 1,
          pageSize: 10
        },
        // codeCols: [
        //   { label: "机号", prop: "machineNumber" },
        //   { label: "机型", prop: "model" },
        //   { label: "最大起飞重量", prop: "maxTakeoffWeight" },
        //   { label: "业载", prop: "yeZai" },
        //   { label: "最大座位", prop: "maxSeat" },
        //   { label: "宽/窄机", prop: "type" },
        //   { label: "飞机属性", prop: "airplaneType" },
        //   { label: "航空公司三字码", prop: "airlineThreeCode" },
        //   { label: "航空公司二字码", prop: "airlineTwoCode" },
        //   { label: "航空公司", prop: "airlineName" },
        //   { label: "开始时间", prop: "beginDate" },
        //   { label: "结束时间", prop: "endDate" }
        // ],
        codeForm: {
          airlineId: null,
          airlineName: null,
          machineNumber: "",
          model: null,
          maxTakeoffWeight: null,
          yeZai: null,
          maxSeat: null,
          type: null,
          airplaneType: null,
          airlineTwoCode: null,
          airlineThreeCode: null,
          beginDate: "",
          endDate: ""
        },
        codeRules: {
          machineNumber: {
            required: true,
            message: "请输入机号",
            trigger: "blur",
          },
          type: {
            required: true,
            message: "宽/窄机",
            trigger: "blur",
          },
          airplaneType: {
            required: true,
            message: "飞机属性",
            trigger: "blur",
          },
          airlineName: {
            required: true,
            message: "航空公司",
            trigger: "blur",
          },
          airlineTwoCode: {
            required: true,
            message: "航空公司二字码",
            trigger: "blur",
          },
          airlineThreeCode: {
            required: true,
            message: "航空公司三字码",
            trigger: "blur",
          },
          beginDate: {
            required: true,
            message: "开始时间",
            trigger: "blur",
          },
          endDate: {
            required: true,
            message: "结束时间",
            trigger: "blur",
          },
        },
      }
    },
    created() {
      this.getAirlineList()
    },
    methods: {
      //获取航空公司
      getAirlineList(){
        getAirline().then(res => {
          if(res.code == 1) {

            this.airlineList = res.data;
            this.airlineCodeList = res.data;
            console.log(this.airlineList)
            console.log(this.airlineCodeList)
          } else {
            this.$message.error(res.message);
          }
        })
      },
      //选择航空公司
      selectAirline(val) {
        this.airlineList.forEach(item => {
          if(item.name == val) {
            this.codeForm.airlineId = item.id
            this.codeForm.airlineTwoCode = item.threeCharacterCode
            this.codeForm.airlineThreeCode = item.twoCharacterCode
          }
        })
      },
      //查询选择航空公司/代码
      selectAirlineCode(val) {
        this.airlineCodeList.forEach(item => {
          if(item.name == val ){
            this.codeForm.airlineId = item.id
            console.log(this.codeForm.airlineId);
            this.codeForm.airlineTwoCode = item.threeCharacterCode
            this.codeForm.airlineThreeCode = item.twoCharacterCode
          }
        })
      },
      //新增
      addMessageData() {
        this.showDialog = true;
        this.dialogTitle = '新增';
        console.log(this.$refs);
        if(this.$refs.codeRule) {
          this.$refs.codeRule.$children[0].resetFields();
        }
      },
      //查詢
      getTableData() {
        this.searchForm.pageSize = 10;
        this.searchForm.pageNum = 1;
        this.$emit('getMessageTableData')
      },
      //編輯
      handleEdit(index, row) {
        console.log(row);
        this.$emit('edit', index, row)
      },
      //刪除
      handleDelete(index, row) {
        this.$emit('delete', index, row)
      },
      confirm() {
        this.$emit('confirm')
      },
      // 每页条数
      handleSizeChange(val) {
        this.$emit('messageHandleSizeChange', val)
      },
      // 翻页
      handleCurrentChange(val) {
        this.$emit('messageHandleCurrentChange', val)
      },
      //上传成功
      upLoadSuccess(response, file, fileList) {
        this.$emit('uploadSuccess', response, file, fileList)
      },
      //上传失败
      uploadFail(err, file, fileList) {
        this.$emit('uploadFail', err, file, fileList)
      },
      // 没有children则不展开
      getRowClassName({ row, rowIndex }) {
        // if (row.children == undefined || row.children.length == 0) {
        //   return "row-expand-cover";
        // }
      },
      //导出Excel表格事件
      // exportExcel() {
      //   var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      //   var wbout = XLSX.write(wb, {
      //     bookType: "xlsx",
      //     bookSST: true,
      //     type: "array"
      //   });
      //   try {
      //     FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }),"机号信息.xlsx");
      //   } catch (e) {
      //     if (typeof console !== "undefined")
      //       console.log(e, wbout);
      //   }
      //   return wbout;
      // }
    }
  }
</script>

<style scoped>

</style>
