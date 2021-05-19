<template>
  <div class="airplane-info">
    <!--Tabs标签页-->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="航空公司维护表" name="first">
        <airline-maintain ref="maintain"
                          @getTableData="getTableData"
                          :tableData="tableData"
                          @edit="maintainEdit"
                          @editChild="editChild"
                          @delete="maintainDelete"
                          @childDelete="childDelete"
                          @confirm="maintainConfirm"
                          @childConfirm="childConfirm"
                          @handleSizeChange="handleSizeChange"
                          @handleCurrentChange="handleCurrentChange">
        </airline-maintain>
      </el-tab-pane>
      <el-tab-pane label="机号信息" name="second">
        <airline-message ref="message"
                         @getMessageTableData="getMessageTableData"
                         :codeTableData="codeTableData"
                         @edit="messageEdit"
                         @delete="messageDelete"
                         @confirm="messageConfirm"
                         @messageHandleSizeChange="messageHandleSizeChange"
                         @messageHandleCurrentChange="messageHandleCurrentChange">
        </airline-message>
      </el-tab-pane>
      <el-tab-pane label="航司结算类型维护" name="third">
        <airline-settle>

        </airline-settle>
      </el-tab-pane>
      <el-tab-pane label="航司清算项目" name="fourth">
        <airline-clearing ref="clearing"
                          @getClearingTableData="getClearingTableData"
                          :clearingTableData="clearingTableData"
                          @clearingHandleSizeChange="clearingHandleSizeChange"
                          @clearingHandleCurrentChange="clearingHandleCurrentChange">
        </airline-clearing>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import AirlineMaintain from '@/views/system/airplaneInfo/airlineMaintain'
  import AirlineMessage from '@/views/system/airplaneInfo/airlineMessage'
  import AirlineSettle from '@/views/system/airplaneInfo/airlineSettle'
  import AirlineClearing from '@/views/system/airplaneInfo/airlineClearing'
  import { getPage, Save, Delete, Details} from "@/api/airlineMaintain";
  import {getMessagePage,messageSave,messageDelete,downloadByUrl,downloadTmp,uploadFile,messageDetails} from "@/api/airlineMessage";
  export default {
    name: 'airplaneInfo',
    components: {
      AirlineMaintain,
      AirlineMessage,
      AirlineSettle,
      AirlineClearing
    },
    data () {
      return {
        activeName: 'first',
        dialogAddVisible: false,
        //当前页
        currentPage: 1,
        showDialog: false,
        dialogTitle: '新增航空公司',
        id: null,
        tableData: [],
        codeTableData: [],
        settleTableData: [],
        clearingTableData: [],
        fullscreenLoading: false,
        tableColumn: [
          {
            label: "航空公司名称",
            prop: "airplaneName",
            width: ""
          },
          {
            label: "航司二字码",
            prop: "airplaneCode2",
            width: ""
          },
          {
            label: "航司三字码",
            prop: "airplaneCode3",
            width: ""
          }
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        this.getTableData();
        this.getMessageTableData()
        this.getChildTableData()
        // this.getMessageTableData();
        // this.getClearingTableData();
      })
    },
    methods: {
      //获取航司维护表数据
      getTableData() {
        this.fullscreenLoading = true;
        console.log(this.$refs.maintain)
        getPage(this.$refs.maintain.formInline).then(res => {
          if(res.code == 1) {
            console.log(this.tableData)
            this.tableData= res.data.list;

            this.$refs.maintain.total = res.data.total;
            // console.log(this.$refs.maintain.total)
            // console.log(this.tableData)
          } else {
            this.$message.error(res.message);
          }
        })
        // setTimeout(() => {
        //   this.fullscreenLoading = false;
        // }, 2000);
        // this.cols = [
        //   { label: "航空公司名称", prop: "airplaneName" },
        //   { label: "航司二字码", prop: "airplaneCode2" },
        //   { label: "航司三字码", prop: "airplaneCode3" },
        // ];
        // this.settleCols = [
        //   { label: "结算类型", prop: "settleType" },
        //   { label: "财务统计类型", prop: "statisticsType" },
        //   { label: "排列顺序", prop: "sort" }
        // ];
        // this.tableData = [
        //   {
        //     airplaneName: "南方航空",
        //     airplaneCode2: "CZ",
        //     airplaneCode3: "CSN",
        //     children: [
        //       {
        //         airplaneName: "南航总部",
        //         airplaneCode2: "CZ",
        //         airplaneCode3: "C01"
        //       },
        //       {
        //         airplaneName: "南航上海",
        //         airplaneCode2: "CZ",
        //         airplaneCode3: "C07"
        //       }
        //     ]
        //   },
        //   {
        //     airplaneName: "东方航空",
        //     airplaneCode2: "MU",
        //     airplaneCode3: "CES",
        //     children: [
        //       {
        //         airplaneName: "东方卫视",
        //         airplaneCode2: "MU",
        //         airplaneCode3: "CSN"
        //       }
        //     ]
        //   },
        //   {
        //     airplaneName: "深圳航空",
        //     airplaneCode2: "ZH",
        //     airplaneCode3: "CSZ"
        //   },
        // ];
        // this.codeTableData = [
        //   {
        //     airplaneCode: "B1006",
        //     airplanetype: "Boeing 777",
        //     maxHeight: 89.0,
        //     capacity: 25.0,
        //     maxSeat: 198,
        //     airplaneForm: "窄体机",
        //     airplaneProperty: "客机",
        //     airplaneCode3: "ABC",
        //     airplaneCode2: "CBD",
        //     airline: "中国国际航空",
        //     startTime: "2020-02-02",
        //     endTime: "2021-01-01"
        //   }
        // ],
        //   this.settleTableData = [
        //     {
        //       settleType: "月结",
        //       StatisticsType: "A",
        //       sort: "1"
        //     }
        //   ];
        // this.clearingTableData = [
        //   {
        //     airplaneName: "南方航空",
        //     firstClassService: "9999",
        //     cardService: "8888",
        //     vipService: "7777",
        //     internalVipService: "66666",
        //     bothService: "55555",
        //     importantService: "444444",
        //     firstClassCharge: "333333",
        //     importantCharge: "100",
        //     cardCharge: "1000"
        //   }
        // ]
      },
      //获取航司维护子表数据
      getChildTableData() {
        this.fullscreenLoading = true;
        getPage(this.$refs.maintain.formInline).then(res => {
          if(res.code == 1) {
            console.log(res)
            // this.tableData= res.data.list.airlinelist;
            this.tableData = res.data.list
            console.log(this.tableData)
          } else {
            this.$message.error(res.message);
          }
        })
      },

      //获取机号信息数据
      getMessageTableData() {
        this.fullscreenLoading = true;
        getMessagePage(this.$refs.message.searchForm).then(res => {
          if (res.code == 1) {
            this.codeTableData = res.data.list;
            this.$refs.message.total = res.data.total;
            console.log(this.codeTableData);
          } else {
            this.$message.error(res.message);
          }
        })
      },
      //获取航司清算数据
      getClearingTableData() {
        this.fullscreenLoading = true;
        getPage(this.$refs.clearing.clearingInline).then(res => {
          if(res.code == 1) {
            console.log(res)
            this.clearingTableData = res.data.list;
            this.$refs.clearing.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
      },
      // 航司维护表提交
      maintainConfirm() {
        let form = this.$refs.maintain.$refs.ruleForm.$refs.mtForm
        form.validate((valid) => {
          if (valid) {
            console.log(this.$qs.stringify(this.$refs.maintain.form));
            Save(this.$refs.maintain.form).then(res => {
              if (res.code == 1) {
                this.$message.success(res.message);
                console.log(res)
                this.$refs.maintain.showDialog = false;
                // console.log(this.$refs.maintain)
                this.$refs.maintain.$refs.ruleForm.$children[0].resetFields();
                this.getTableData();
              } else {
                this.$message.error(res.message);
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //航司维护子表提交
      childConfirm() {
        let form = this.$refs.maintain.$refs.childRuleForm.$refs.mtForm
        console.log(this.$refs.maintain.childForm)
        form.validate((valid) => {
          if (valid) {
            console.log(this.$qs.stringify(this.$refs.maintain.childForm));
            console.log(this.$refs.maintain.childForm)
            Save(this.$refs.maintain.childForm).then(res => {
              if (res.code == 1) {
                this.$message.success(res.message);
                console.log(res)
                this.$refs.maintain.showChildDialog = false;
                console.log(this.$refs.maintain)
                this.$refs.maintain.$refs.childRuleForm.$refs.mtForm.resetFields();
                this.getChildTableData();
              } else {
                this.$message.error(res.message);
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //机号提交
      messageConfirm() {
        let form = this.$refs.message.$refs.codeRule.$refs.mtForm
        console.log(this.$refs.message.codeForm);
        form.validate((valid) => {
          if (valid) {
            console.log(this.$qs.stringify(this.$refs.message.codeForm));
            messageSave(this.$refs.message.codeForm).then(res => {
              if (res.code == 1) {
                this.$message.success(res.message);
                this.$refs.message.showDialog = false;
                this.$refs.message.$refs.codeRule.$children[0].resetFields();
                this.getMessageTableData();

              } else {
                this.$message.error(res.message);
              }
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //添加分公司
      // addBranch(index, row) {
      //   this.dialogTitle = "添加分公司";
      //   this.showDialog = true;
      //   Details({id: row.id}).then(res => {
      //     if(res.row == 1) {
      //       console.log(res.data);
      //       this.$refs.maintain.form = res.data;
      //     }
      //   })
      // },

      //航司维护子公司编辑
      editChild(index, row) {
        this.$refs.maintain.dialogChildTitle = "编辑";
        this.$refs.maintain.showChildDialog = true;
        console.log(row)
        Details({id: row.id}).then(res => {
          if(res.code == 1) {
            console.log(res.data);
            this.$refs.maintain.childForm = res.data;
            this.$refs.maintain.$refs.childRuleForm.$children[0].resetFields();
            this.$forceUpdate();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      //航司维护编辑
     maintainEdit(indenx, row) {
        this.$refs.maintain.dialogTitle = "编辑";
        this.$refs.maintain.showDialog = true;
        Details({id: row.id}).then(res => {
          if(res.code == 1) {
            console.log(res.data);
            this.$refs.maintain.form = res.data;
            this.$refs.maintain.$refs.ruleForm.$children[0].resetFields();
            this.$forceUpdate();
          } else {
            this.$message.error(res.message);
          }
        })
        // this.$refs.maintain.form = row;
      },
      //机号编辑
      messageEdit(index, row) {
        this.$refs.message.dialogTitle = "编辑";
        this.$refs.message.showDialog = true;
        messageDetails({id: row.id}).then(res => {
          if(res.code == 1) {
            console.log(res.data)
            this.$refs.message.codeForm = res.data;
            this.$refs.message.$refs.codeRule.$children[0].resetFields();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      //航司维护表删除
      maintainDelete(index, row) {
          this.$confirm("确定删除这条数据?", "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          }).then(() => {
            Delete({ ids: row.id }).then(res => {
              if (res.row == 1) {
                this.$message.success(res.message);
                this.getTableData();
                this.$forceUpdate();
              } else {
                this.$message.error(res.message);
              }
              //   this.$message({
              //     type: "success",
              //     message: "删除成功!",
              //   });
              //   this.tableData.splice(index, 1);
              //   this.getTableData();
              // }).catch(() => {
              //   this.$message({
              //     type: "info",
              //     message: "已取消删除"
              //   });
              // });
            })
          })
      },
      //航司维护子表数据删除
      childDelete(index, row) {
        this.$confirm("确定删除这条数据?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }).then(() => {
          Delete({ ids: row.id }).then(res => {
            if (res.row == 1) {
              this.$message.success(res.message);
              this.getChildTableData();
              this.$forceUpdate();
            } else {
              this.$message.error(res.message);
            }
            //   this.$message({
            //     type: "success",
            //     message: "删除成功!",
            //   });
            //   this.tableData.splice(index, 1);
            //   this.getTableData();
            // }).catch(() => {
            //   this.$message({
            //     type: "info",
            //     message: "已取消删除"
            //   });
            // });
          })
        })
      },
      //机号信息删除
      messageDelete(index, row) {
        this.$confirm("确定删除这条数据?", "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          }).then(() => {
            messageDelete({ ids: row.id }).then(res => {
              if (res.row == 1) {
                this.$message.success(res.message);
                this.getMessageTableData();
                this.$forceUpdate();
              } else {
                this.$message.error(res.message);
              }
            // this.codeTableData.splice(index, 1);
          })
        })
      },
      // 每页条数
      handleSizeChange(val) {
        this.$refs.maintain.formInline.pageSize = val;
        this.getTableData();
      },
      // 翻页
      handleCurrentChange(val) {
        this.$refs.maintain.formInline.pageNum = val;
        this.getTableData();
      },
      // 每页条数
      messageHandleSizeChange(val) {
        this.$refs.message.searchForm.pageSize = val;
        this.getMessageTableData();
      },
      // 翻页
      messageHandleCurrentChange(val) {
        this.$refs.message.searchForm.pageNum = val;
        this.getMessageTableData();
      },
      // 每页条数
      clearingHandleSizeChange(val) {
        this.$refs.clearing.clearingInline.pageSize = val;
        this.getClearingTableData();
      },
      // 翻页
      clearingHandleCurrentChange(val) {
        this.$refs.clearing.clearingInline.pageNum = val;
        this.getClearingTableData();
      },
      // 没有children则不展开
      getRowClassName({ row, rowIndex }) {
        if (row.need == 0) {
          return "row-expand-cover";
        }
        // if (row.children == undefined || row.children.length == 0) {
        //   return "row-expand-cover";
        // }
      },

      // handleChange(file, fileList) {
      //   this.time = this.time + 1;
      //   for (var i = 0; i < fileList.length; i++) {
      //     this.fileLists.push(fileList[i].raw);
      //   }
      // }
    }
  }
</script>
<style>
  /*.el-input__inner {*/
  /*  font-size: 12px;*/
  /*}*/
  .form-inline {
    text-align: right;
  }
  .mt-form {
    height: 300px;
  }
</style>
