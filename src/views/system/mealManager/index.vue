<template>
  <div class="sever-price-container">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" :model="form" class="search-select">
        <el-form-item>
          <el-input
            clearable
            v-model="searchform.name"
            placeholder="请输入套餐名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          ><el-input
            clearable
            v-model="searchform.remark"
            placeholder="说明"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchform.state"
            placeholder="请选择套餐状态"
            clearable
          >
            <el-option label="启用" value="1"> </el-option>
            <el-option label="停用" value="0"> </el-option>
          </el-select>
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
        <el-table-column label="套餐名称" prop="name"></el-table-column>
        <el-table-column
          label="套餐包含服务"
          prop="packages"
          width="300"
        ></el-table-column>
        <el-table-column label="说明" prop="remark"></el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            {{ scope.row.state == 1 ? "启用" : "停用" }}
          </template>
        </el-table-column>
        <el-table-column label="创建者" prop="creator"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-button
                  size="mini"
                  :type="scope.row.state == 1 ? 'info' : 'success'"
                  @click="handleChangeStatus(scope.$index, scope.row)"
                >
                  {{ scope.row.state == 1 ? "停用" : "启用" }}</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
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
        :current-page.sync="searchform.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchform.pageSize"
        layout="sizes, prev, pager, next, jumper,total"
        :total="total"
      >
      </el-pagination>
    </mt-data-content>
    <!-- 编辑 -->
    <mt-dialog v-model="visible" @confirmBtn="handConfirm">
      <template slot="dialog-body">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
          <el-form-item label="套餐名称" prop="name">
            <el-input clearable v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="包含服务" prop="list">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="form.list"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in packagesServiceList"
                :label="item.serviceId"
                :key="item.serviceId"
                >{{ item.serviceName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="说明" prop="remark">
            <el-input
              clearable
              type="textarea"
              maxlength="200"
              v-model="form.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </mt-dialog>
  </div>
</template>
<script>
import {
  DataList,
  Detail,
  Save,
  Stop,
  Delete,
  serviceType,
} from "@/api/mealManager";

export default {
  data() {
    return {
      fullscreenLoading: false,
      visible: false,
      dialogTitle: "新增",
      tableData: [],
      total: null,
      packagesServiceList: [],
      checkAll: false, //全选状态
      isIndeterminate: false,
      searchform: {
        name: "",
        state: null,
        pageNum: 1,
        pageSize: 10,
        remark: "",
      },
      form: {
        name: "",
        list: [],
        packagesService: [],
        remark: "",
        state: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        list: [
          {
            type: "array",
            required: true,
            message: "请至少选择一种服务",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getTableData();
    this.getSelectList();
  },

  methods: {
    //   新增
    addListData() {
      this.visible = true;
      this.dialogTitle = "新增";
      this.$nextTick(() => {
        // this.form = {
        //   name: "",
        //   list: [],
        //   packagesService: [],
        //   remark: "",
        //   state: 1,
        // };
        this.checkAll = false;
        this.$refs.form.clearValidate("list");
        this.rules.list = [];
        this.$refs.form.resetFields();
        // this.$refs.form.$children[0].resetFields();
      });
    },
    //   查询
    search() {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = 10;
      this.getTableData();
    },
    getTableData() {
      this.fullscreenLoading = true;
      DataList(this.searchform).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取服务类型
    getSelectList() {
      serviceType().then((res) => {
        this.packagesServiceList = [];
        let array = res.data;
        array.forEach((item) => {
          this.packagesServiceList.push({
            serviceId: item.id,
            serviceName: item.name,
          });
        });
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.visible = true;
      this.dialogTitle = "编辑";
      Detail({ id: row.id }).then((res) => {
        if (res.code == 1) {
          this.form = res.data;
          let arr = [];
          res.data.packagesService.forEach((item) => {
            arr.push(item.serviceId);
          });
          //   this.form.list = arr;
          this.$set(this.form, "list", arr);
          //   console.log(this.form.list);
          this.checkAll =
            this.form.list.length === this.packagesServiceList.length;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 停用/启用
    handleChangeStatus(index, row) {
      let msg = row.state == 1 ? "停用" : "启用";
      let url = row.state == 1 ? "base/package/stop" : "base/package/start";
      this.$confirm("确定" + msg + "该套餐", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Stop(url, { ids: row.id }).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.getTableData();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
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
      this.rules.list = [
        {
          type: "array",
          required: true,
          message: "请至少选择一种服务",
          trigger: "change",
        },
      ];
      this.$refs.form.validate((valid) => {
        console.log(valid);
        if (valid) {
          let arr = [];
          this.packagesServiceList.forEach((item, index) => {
            this.form.list.forEach((element) => {
              if (item.serviceId == element) {
                arr.push(this.packagesServiceList[index]);
              }
            });
          });
          this.form.packagesService = arr;
          Save(this.form).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.data.message);
              this.$refs.form.resetFields();
              this.visible = false;
              this.checkAll = false;
              this.getTableData();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.searchform.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.searchform.pageNum = val;
      this.getTableData();
    },
    // 全选服务类型
    handleCheckAllChange(val) {
      if (val) {
        this.packagesServiceList.forEach((item) => {
          this.form.list.push(item.serviceId);
        });
      } else {
        this.form.list = [];
      }
      this.isIndeterminate = false;
    },
    // 多选服务类型
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.packagesServiceList.length;
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