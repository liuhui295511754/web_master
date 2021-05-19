<template>
  <div class="sever-price-container">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" :model="form" class="search-select">
        <el-form-item>
          <el-input
            clearable
            v-model="form.serviceName"
            placeholder="请输入服务类型"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.hallId" placeholder="请选择厅房" clearable>
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
            <el-option label="包厅2" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          ><el-input
            clearable
            v-model="form.areaName"
            placeholder="区域"
          ></el-input>
        </el-form-item>
        <mt-button
          txt="查询"
          v-loading.fullscreen.lock="fullscreenLoading"
          @click="search"
        ></mt-button>
        <mt-button txt="新增" @click="addListData"></mt-button>
      </el-form>
    </mt-search-content>
    <!-- 列表区域 -->
    <mt-data-content>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column
          v-for="item in cols"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" width="140">
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
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.pageSize"
        layout="sizes, prev, pager, next, jumper,total"
        :total="total"
      >
      </el-pagination>
    </mt-data-content>
    <!-- 编辑区域 -->
    <mt-edit-content>
      <mt-dialog
        v-model="visible"
        @confirmBtn="handConfirm"
        :title="dialogTitle"
      >
        <template slot="dialog-body">
          <editForm ref="editForm"></editForm>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import editForm from "./editForm";
import { DataList, Save, Detail, Delete } from "@/api/servicePrice";
import { SelectList } from "@/api/hallManage";
export default {
  components: { editForm },
  data() {
    return {
      fullscreenLoading: false,
      visible: false,
      dialogTitle: "新增",
      cols: [],
      tableData: [],
      hallList: [], //厅房下拉框
      total: null,
      form: {
        areaName: "", //厅房区域
        hallId: null, //厅房id
        serviceName: "", //服务name
        pageNum: 1,
        pageSize: 10,
      },
      editForm: null,
    };
  },
  created() {
    this.getHallData();
    this.getTableData();
  },
  methods: {
    //   获取厅房类型
    getHallData() {
      SelectList().then((res) => {
        if (res.code == 1) {
          this.hallList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    search() {
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getTableData();
    },
    // 查询
    getTableData() {
      this.fullscreenLoading = true;
      DataList(this.form).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
      this.cols = [
        { label: "服务类型", prop: "serviceName", width: "" },
        { label: "区域", prop: "areaName", width: "" },
        { label: "厅房", prop: "hallName", width: "" },
        { label: "价格", prop: "price", width: "80" },
        { label: "面积（m²）", prop: "area", width: "100" },
        { label: "座位数", prop: "seating", width: "80" },
        { label: "服务标准", prop: "serviceStandard", width: "" },
        { label: "差异化项目", prop: "differentiatedServices" },
        { label: "备注", prop: "remark" },
      ];
    },
    // 新增
    addListData() {
      this.visible = true;
      this.dialogTitle = "新增";
      if (this.$refs.editForm) {
        this.$refs.editForm.$children[0].resetFields();
      }
    },
    // 编辑
    handleEdit(index, row) {
      this.visible = true;
      this.dialogTitle = "编辑";
      Detail({ id: row.id }).then((res) => {
        if (res.code == 1) {
          this.$refs.editForm.form = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("确定删除这条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        Delete({ ids: row.id }).then((res) => {
          if (res.code == 1) {
            this.$message.success(res.message);
            this.getTableData();
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    // 提交
    handConfirm() {
      this.$refs.editForm.$children[0].validate((valid) => {
        if (valid) {
          Save(this.$refs.editForm.form).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.visible = false;
              this.getTableData();
              this.$refs.editForm.$children[0].resetFields();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
      //   this.getTableData();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.getTableData();
    },
  },
};
</script>
<style>
.sever-price-container {
  padding: 20px;
}
.search-select {
  text-align: right;
}
</style>