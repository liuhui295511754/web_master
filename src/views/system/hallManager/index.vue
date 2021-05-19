<template>
  <div class="hall-content">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" class="search-select">
        <el-row style="float: right">
          <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
            <el-form-item>
              <el-select
                clearable
                v-model="searchForm.areaType"
                placeholder="区域类型（全部）"
              >
                <el-option label="隔离区内" :value="0"> </el-option>
                <el-option label="隔离区外" :value="1"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="5" :xl="5">
            <el-form-item>
              <el-select
                clearable
                v-model="searchForm.twoCabinsStatus"
                placeholder="是否两舱厅（全部）"
              >
                <el-option label="是" :value="1"> </el-option>
                <el-option label="否" :value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="5" :xl="5">
            <el-form-item>
              <el-input
                clearable
                v-model="searchForm.name"
                placeholder="请输入厅房名称或编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="5" :xl="5">
            <el-form-item>
              <el-select
                clearable
                v-model="searchForm.areaName"
                placeholder="所在区域"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-form-item>
            <mt-button
              txt="查询"
              v-loading.fullscreen.lock="fullscreenLoading"
              @click="search"
            ></mt-button>
          </el-form-item>

          <el-form-item>
            <mt-button txt="新增" @click="addListData"></mt-button>
          </el-form-item>
        </el-row>
      </el-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <mt-table
        :data="tableData"
        :currentPage="searchForm.pageNum"
        :total="total"
        :cell-style="{ 'text-align': 'center' }"
        :header-style="{ 'text-align': 'center' }"
        @currentChange="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <el-table-column label="厅房编号/名称" prop="name"></el-table-column>
        <el-table-column label="所在区域" prop="areaName"> </el-table-column>
        <el-table-column label="区域类型" prop="areaType">
          <template slot-scope="scope">
            {{ scope.row.areaType == 0 ? "隔离区内" : "隔离区外" }}
          </template>
        </el-table-column>
        <el-table-column label="是否两舱厅" prop="twoCabinsStatus">
          <template slot-scope="scope">
            {{ scope.row.twoCabinsStatus == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="面积（m²）" prop="area"> </el-table-column>
        <el-table-column label="座位数" prop="number"> </el-table-column>
        <el-table-column label="备注" prop="remark"> </el-table-column>
        <el-table-column label="排序" prop="sn"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </template></el-table-column
        ></mt-table
      ></mt-data-content
    >
    <!-- dialog -->
    <mt-edit-content>
      <mt-dialog
        v-model="showDialog"
        :title="dialogTitle"
        @confirmBtn="confirm"
      >
        <template slot="dialog-body">
          <mt-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="140px"
          >
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item label="厅房编号/名称" prop="name">
                  <el-input clearable v-model="form.name"></el-input>
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item label="所在区域" prop="areaName">
                  <el-select
                    clearable
                    v-model="form.areaName"
                    placeholder="请选择"
                    @change="handSelect"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item label="区域类型" prop="areaType">
                  <el-select v-model="form.areaType" placeholder="请选择">
                    <el-option
                      label="隔离区内"
                      :value="0"
                      :disabled="true"
                    ></el-option>
                    <el-option
                      label="隔离区外"
                      :value="1"
                      :disabled="true"
                    ></el-option>
                  </el-select>
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item
                  label="是否两舱厅"
                  prop="twoCabinsStatus"
                  v-if="form.areaType == 0"
                >
                  <el-select
                    clearable
                    v-model="form.twoCabinsStatus"
                    placeholder="请选择"
                  >
                    <el-option label="是" :value="1"> </el-option>
                    <el-option label="否" :value="0"> </el-option>
                  </el-select>
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item label="面积（㎡）" prop="area">
                  <el-input
                    clearable
                    @keyup.native="keyupEvent($event, form.area)"
                    v-model="form.area"
                    maxlength="10"
                  ></el-input>
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <mt-form-item label="座位数" prop="number">
                  <el-input
                    maxlength="10"
                    type="text"
                    onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                    clearable
                    v-model.number="form.number"
                  ></el-input>
                </mt-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <mt-form-item
                  label="是否需要登机提醒"
                  prop="boardingStatus"
                  label-width="140px"
                >
                  <el-radio v-model="form.boardingStatus" :label="1"
                    >需要</el-radio
                  >
                  <el-radio v-model="form.boardingStatus" :label="0"
                    >不需要</el-radio
                  >
                </mt-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <mt-form-item
                  label="是否需要引领通知"
                  prop="guideStatus"
                  label-width="140"
                >
                  <el-radio v-model="form.guideStatus" :label="1"
                    >需要</el-radio
                  >
                  <el-radio v-model="form.guideStatus" :label="0"
                    >不需要</el-radio
                  >
                </mt-form-item>
              </el-col>
              <mt-form-item
                label="备注"
                :spans="24"
                prop="remark"
                ref="textarea"
              >
                <el-input
                  clearable
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.remark"
                  maxlength="200"
                >
                </el-input>
              </mt-form-item>
              <mt-form-item label="排列顺序" prop="sn">
                <el-input
                  type="text"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                  clearable
                  v-model="form.sn"
                ></el-input>
              </mt-form-item>
            </el-row>
          </mt-form>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import { HallList, Save, Details, Delete, HallRegion } from "@/api/hallManage";
export default {
  data() {
    return {
      options: [],
      showDialog: false,
      dialogTitle: "新增",
      fullscreenLoading: false,
      searchForm: {
        name: "",
        areaName: "",
        pageNum: 1,
        pageSize: 10,
        areaType: "",
        twoCabinsStatus: null,
      },
      tableData: [],
      total: null,
      cols: [
        { label: "厅房编号/名称", prop: "name" },
        { label: "所在区域", prop: "areaName" },
        { label: "区域类型", prop: "areaType" },
        { label: "是否两舱厅", prop: "twoCabinsStatus" },
        { label: "面积（㎡）", prop: "area" },
        { label: "座位数", prop: "number" },
        { label: "备注", prop: "remark" },
        { label: "排序", prop: "sn" },
      ],
      id: null,
      form: {
        name: "", //厅房编号
        areaName: "", //所在区域
        areaId: "", //厅房区域id
        areaType: null, //区域类型
        area: null, //面积
        number: null, //座位数
        boardingStatus: null, //是否需要登记提醒
        guideStatus: null, //是否需要引领通知
        twoCabinsStatus: null, //是否是两舱厅
        remark: "", //备注
        sn: null, //排序
      },
      rules: {
        name: {
          required: true,
          message: "请输入厅房名称/编号",
          trigger: "blur",
        },
        areaName: {
          required: true,
          message: "请选择所在区域",
          trigger: ["change", "blur"],
        },
        areaType: {
          required: true,
          message: "请选择区域类型",
          trigger: ["change", "blur"],
        },
        twoCabinsStatus: {
          required: true,
          message: "请选择是否是两舱厅",
          trigger: "blur",
        },
        area: [
          {
            required: true,
            message: "请输入面积",
            trigger: "blur",
          },
        ],
        number: [
          {
            required: true,
            message: "请输入座位数",
            trigger: "blur",
          },
          { type: "number", message: "请输入数字" },
        ],
        boardingStatus: {
          required: true,
          message: "请选择是否需要登记提醒",
          trigger: "change",
        },
        guideStatus: {
          required: true,
          message: "请选择是否需要引领通知",
          trigger: "change",
        },
        sn: [{ required: true, message: "请输入排序顺序", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getTableData();
    this.getHallRegionData();
  },

  methods: {
    // 新增
    addListData() {
      this.showDialog = true;
      this.dialogTitle = "新增";
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.$children[0].resetFields();
      }
    },
    search() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getTableData();
    },
    //   获取数据
    getTableData() {
      this.fullscreenLoading = true;
      HallList(this.searchForm).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 1) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    //获取厅房区域
    getHallRegionData() {
      HallRegion().then((res) => {
        if (res.code == 1) {
          this.options = res.data;
        }
      });
    }, // 勾选厅房区域
    handSelect(val) {
      this.options.forEach((item) => {
        if (item.name == val) {
          this.form.areaId = item.id;
          this.form.areaType = item.type;
        }
      });
      console.log(this.form.areaName);
    },
    // 提交
    confirm(val) {
      this.$refs.ruleForm.$children[0].validate((valid) => {
        if (valid) {
          Save(this.form).then((res) => {
            if (res.code == 1) {
              this.showDialog = false;
              this.$message.success(res.message);
              this.$nextTick(() => {
                this.$refs.ruleForm.$children[0].resetFields();
                this.form.remark = "";
              });

              setTimeout(() => {
                this.getTableData();
              }, 1000);
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.showDialog = true;
      Details({ id: row.id }).then((res) => {
        if (res.code == 1) {
          this.form = res.data;
          console.log(this.form);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          Delete({ ids: row.id }).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              setTimeout(() => {
                this.getTableData();
              }, 1000);
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getTableData();
    },
    //只能输入数字并且保留两位小数
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
      this.form.area = e.target.value;
    },
  },
};
</script>
<style>
.el-select {
  width: 100%;
}
</style>
<style scoped>
.hall-content {
  padding: 20px;
}
.search-select {
  width: 100%;
}
.mt-form {
  height: 300px;
}
</style>