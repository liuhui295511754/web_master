<template>
  <div>
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="机号信息更新">
        <search-form
          :type="type"
          :form="searchForm"
          v-loading.fullscreen.lock="fullscreenLoading"
          @search="search"
        ></search-form>
        <div style="float: right; margin-bottom: 20px">
          <mt-button
            txt="更新机号信息"
            @click="add('更新机号信息')"
          ></mt-button>
          <mt-button txt="下载机号更新表模板"></mt-button>
          <mt-button
            txt="导入机号更新信息"
            @click="importExcel('导入机号信息更新表')"
          ></mt-button>
        </div>
        <mt-table
          :data="tableData"
          :cellStyle="cellStyle"
          :headerStyle="{ 'text-align': 'center' }"
          :currentPage="searchForm.pageNum"
          :pageSize="searchForm.pageSize"
          :total="total"
        >
          <el-table-column label="更新方式" prop=""></el-table-column>
          <el-table-column label="更新结果" prop=""></el-table-column>
          <el-table-column label="机号更新月份" prop=""></el-table-column>
          <el-table-column label="操作人" prop=""></el-table-column>
          <el-table-column label="修改时间" prop=""></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handlePrieview(scope.row)"
                >详情</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row, '删除')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </mt-table>
      </el-tab-pane>
      <el-tab-pane label="湿租规则更新">
        <search-form
          :type="type"
          :form="searchForm"
          @search="search"
        ></search-form>
        <div style="float: right; margin-bottom: 20px">
          <mt-button txt="执行记录"></mt-button>
          <mt-button
            txt="执行湿租规则"
            @click="importExcel('湿租规则执行')"
          ></mt-button>
          <mt-button txt="新增" @click="add('湿租规则执行记录')"></mt-button>
        </div>
        <mt-table
          :data="tableData"
          :cellStyle="cellStyle"
          :currentPage="searchForm.pageNum"
          :pageSize="searchForm.pageSize"
          :total="total"
          :headerStyle="{ 'text-align': 'center' }"
          @currentChange="currentChange"
          @size-change="sizeChange"
        >
          <el-table-column label="二字码" prop="twoCode"></el-table-column>
          <el-table-column label="航班号" prop="flightNumber"></el-table-column>
          <el-table-column label="机号" prop="deviceNumber"></el-table-column>
          <el-table-column
            label="航空公司"
            prop="airlinesName"
          ></el-table-column>
          <el-table-column label="状态" prop="state">
            <template slot-scope="scope">
              {{ scope.row.state == 1 ? "正常" : "已废弃" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handlePrieview(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                :type="scope.row.state == 1 ? 'info' : 'success'"
                @click="handleDelete(scope.row, '废弃/恢复')"
                >{{ scope.row.state == 1 ? "废弃" : "恢复" }}</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="EditHistory(scope.row)"
                >修订记录</el-button
              >
            </template>
          </el-table-column>
        </mt-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增编辑组件 -->
    <mt-dialog
      width="35%"
      v-model="showDialog"
      :title="dialogTitle"
      @confirmBtn="saveForm"
    >
      <template slot="dialog-body">
        <add-form
          :type="type"
          :airplane="airplane"
          ref="addForm"
          :form="addForm"
        ></add-form>
      </template>
    </mt-dialog>
    <!-- 上传组件 -->
    <upload-form
      ref="uploadForm"
      v-model="uploadDialog"
      :title="uploadDialogTitle"
      @confirm="handleConfirmUpload"
    ></upload-form>
    <!-- 表格组件 -->
    <!-- 新增编辑组件 -->
    <el-dialog
      :title="detailDialogTitle"
      :visible.sync="detailDialogVisible"
      center
    >
      <detailForm></detailForm>
    </el-dialog>
  </div>
</template>
<script>
import {
  airplaneData,
  airplaneDelete,
  airplaneList,
  airplaneSave,
  airplaneDetail,
  airplaneUpload,
} from "@/api/serverCenter";
import searchForm from "./searchForm";
import addForm from "./addForm";
import uploadForm from "./uploadForm";
import detailForm from "./detailForm";
export default {
  components: {
    searchForm,
    addForm,
    uploadForm,
    detailForm,
  },
  data() {
    return {
      fullscreenLoading: false,
      type: "airplane",
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        updateCode: null,
        updateMethod: null,
        updateMouth: null,
        updateStatus: null,
      },
      url: "number/info/page",
      tableData: [],
      total: null,
      airplane: [],
      showDialog: false,
      dialogTitle: "更新机号信息",
      addForm: {
        updateMouth: null,
        departureDate: null,
        twoCode: null,
        planeNumber: null,
        state: null,
        movementsDate: null,
        machineNumber: null,
        airplaneId: null,
        airplaneName: null,
      },
      uploadDialog: false,
      uploadDialogTitle: "",
      detailDialogTitle: "机号更新详情",
      detailDialogVisible: false,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //   tab切换
    tabClick(val) {
      if (val.label == "机号信息更新") {
        this.url = "number/info/page";
        this.type = "airplane";
        this.searchForm = {
          pageNum: 1,
          pageSize: 10,
          updateCode: null,
          updateMethod: null,
          updateMouth: null,
          updateStatus: null,
        };
        this.addForm = {
          updateMouth: null,
          departureDate: null,
          twoCode: null,
          planeNumber: null,
          state: null,
          movementsDate: null,
          machineNumber: null,
          airplaneId: null,
          airplaneName: null,
        };
      } else {
        this.type = "rules";
        this.searchForm = {
          pageNum: 1,
          pageSize: 10,
          twoCode: null,
          flightNumber: null,
          deviceNumber: null,
          airlinesName: null,
        };
        this.addForm = {
          twoCode: null,
          planeNumber: null,
          machineNumber: null,
          airplaneId: null,
          airplaneName: null,
        };
        this.url = "rrule/info/page";
      }
      this.getTableData();
    },
    // 搜索
    search() {
      this.searchForm.pageSize = 10;
      this.searchForm.pageNum = 1;
      this.getTableData();
    },
    currentChange(val) {
      this.searchForm.pageNum = val;
      this.getTableData();
    },
    sizeChange(val) {
      this.searchForm.pageSize = val;
      this.getTableData();
    },
    async getTableData() {
      this.fullscreenLoading = true;
      const res = await airplaneData(this.url, this.searchForm);
      this.fullscreenLoading = false;
      if (res.code != 1) return this.$$message.error(res.message);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    // 更新结果
    cellStyle() {
      return { "text-align": "center" };
    },
    // 详情
    async handlePrieview(row) {
      let url =
        this.type == "airplane" ? "number/info/view" : "rrule/info/view";
      const res = await airplaneDetail(url, { id: row.id });
      if (res.code !== 1) return this.$message.error(res.message);
      this.getAirplaneList();
      this.showDialog = true;
      this.dialogTitle =
        this.type == "airplane" ? "更新机号信息" : "修改湿租规则";
      this.addForm = res.data;
    },
    // 删除/废弃
    handleDelete(row, title) {
      let param = {};
      if (title == "删除") {
        param = { ids: row.id };
      } else {
        param = {
          id: row.id,
          state: row.state == 0 ? 1 : 0,
        };
      }
      let url = title == "删除" ? "number/info/del" : "rrule/info/update";
      this.$confirm(`您确定${title}此条数据, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //
          const res = await airplaneDelete(url, param);
          if (res.code != 1) return this.$message.error(res.message);
          this.$message.success(res.message);
          this.getTableData();
        })
        .catch(() => {});
    },
    // 新增
    add(title) {
      this.showDialog = true;
      this.dialogTitle = title;
      this.getAirplaneList();
      this.$nextTick(() => {
        this.$refs.addForm.$children[0].resetFields();
      });
    },
    // 保存
    saveForm() {
      this.$refs.addForm.$children[0].validate(async (valid) => {
        if (valid) {
          let url =
            this.type == "airplane" ? "number/info/save" : "rrule/info/save";
          const res = await airplaneSave(url, this.addForm);
          if (res.code != 1) return this.$message.error(res.message);
          this.showDialog = false;
          this.$message.success(res.message);
          this.$refs.addForm.$children[0].resetFields();
          this.getTableData();
        }
      });
    },
    // 导入机号信息
    importExcel(title) {
      this.uploadDialogTitle = title;
      this.uploadDialog = true;
    },
    // 提交文件上传
    handleConfirmUpload() {
      console.log(this.$refs);
      this.$refs.uploadForm.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.uploadDialogTitle == "导入机号信息更新表") {
            this.$refs.uploadForm.$refs.upload.submit();
          } else {
            let param = { updateMouth: this.$refs.uploadForm.form.updateMouth };
            const res = await airplaneUpload(param);
            if (res.code != 1) return this.$message.error(res.message);
            this.$message.success(res.message);
            this.$refs.uploadForm.$refs.form.resetFields();
          }
          this.uploadDialog = false;
          this.getTableData();
        }
      });
    },
    //修订记录
    EditHistory(row) {},
    // 获取航空公司
    async getAirplaneList() {
      const res = await airplaneList();
      if (res.code != 1) return this.$message.error(res.message);
      this.airplane = res.data;
    },
  },
};
</script>