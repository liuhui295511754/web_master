<template>
  <div class="sevice-manger-container">
    <!-- 查询 -->
    <mt-search-content>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form :inline="true" class="search-select">
            <el-form-item>
              <el-input
                placeholder="服务名称"
                v-model="searchArgument.name"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="说明"
                v-model="searchArgument.remark"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <mt-button
                txt="查询"
                v-loading.fullscreen.lock="fullscreenLoading"
                @click="search"
              ></mt-button>
            </el-form-item>
            <el-form-item>
              <mt-button txt="新增" @click="Add"></mt-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :row-class-name="getRowClassName"
        :default-expand-all="false"
      >
        <el-table-column type="expand" prop="children">
          <template slot-scope="scope">
            <childTable
              :data="scope.row.children"
              ref="childTable"
              @edit="(row) => handleEdit(scope.$index, scope.row)"
            ></childTable>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="服务名称"></el-table-column>
        <el-table-column prop="inoutharbor" label="区分进港/离港">
          <template slot-scope="scope">
            {{ scope.row.inoutharbor == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="need" label="是否需要分配厅房">
          <template slot-scope="scope">
            {{ scope.row.need == 1 ? "需要" : "不需要" }}
          </template>
        </el-table-column>
        <el-table-column prop="serviceOne" label="服务人数" width="250">
          <template slot-scope="scope">
            {{ scope.row.serviceOne == 1 ? "获取登机牌" : "" }}&nbsp;{{
              scope.row.serviceTwo == 1 ? "手动输入" : ""
            }}
          </template>
        </el-table-column>
        <el-table-column prop="placeStateOne" label="支持录入位置" width="250">
          <template slot-scope="scope">
            {{ scope.row.placeStateOne == 1 ? "预约记录" : "" }}&nbsp;&nbsp;
            {{ scope.row.placeStateTwo == 1 ? "接待登记" : "" }}
            {{ scope.row.placeStateThere == 1 ? "两舱服务" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
      </el-table>
      <el-pagination
        style="text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchArgument.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchArgument.pageSize"
        layout="sizes, prev, pager, next, jumper,total"
        :total="total"
      >
      </el-pagination>
    </mt-data-content>
    <!-- 弹窗 -->
    <mt-edit-content>
      <mt-dialog v-model="show" :title="dialogTitle" @confirmBtn="confirm">
        <template slot="dialog-body">
          <editForm ref="editForm"></editForm>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import childTable from "./childTable";
import editForm from "./editForm";
import { serviceList, Save, Detail, Delete } from "@/api/serviceManage";
export default {
  components: { childTable, editForm },
  data() {
    return {
      fullscreenLoading: false,
      name: "",
      text: "",
      searchArgument: {
        pageNum: 1,
        pageSize: 10,
      },

      tableData: [],
      total: 100,
      show: false,
      dialogTitle: "新增",
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //   查询
    search() {
      this.searchArgument = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getTableData();
    },
    // 获取数据
    getTableData() {
      this.tableData = [];
      serviceList(this.searchArgument).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    //新增
    Add() {
      this.show = true;
      this.dialogTitle = "新增";
      setTimeout(() => {
        this.$refs.editForm.checkAll = false;
        this.$refs.editForm.form = {
          name: "",
          code: null,
          list: [],
          customer: [],
          placeStateOne: 0,
          placeStateTwo: 0,
          placeStateThere: 0,
          inoutharbor: null, //进出港
          need: null,
          serviceOne: 0, //服务人数 获取登机牌
          serviceTwo: 0, //服务人数 手动输入
          remark: "",
          children: [],
        };
        this.$refs.editForm.$children[0].clearValidate();
        this.$refs.editForm.$children[0].resetFields();
      }, 200);
    },
    // 编辑
    handleEdit(index, row) {
      this.show = true;
      this.dialogTitle = "编辑";

      Detail({ id: row.id }).then((res) => {
        if (res.code == 1) {
          this.$refs.editForm.form = res.data;
          let array = [];
          if (res.data.customer.length > 0) {
            res.data.customer.forEach((item) => {
              array.push(item.customerId);
            });
            this.$set(this.$refs.editForm.form, "list", array);
            this.$refs.editForm.checkAll =
              this.$refs.editForm.form.customer.length ==
              this.$refs.editForm.customerType.length;
            this.$forceUpdate();
          }
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
    // 没有children则不展开
    getRowClassName({ row, rowIndex }) {
      if (row.inoutharbor == 0) {
        return "row-expand-cover";
      }
    },
    // 翻页
    handleCurrentChange(val) {
      this.searchArgument.pageNum = val;
      this.getTableData();
    },
    // 每页条数
    handleSizeChange(val) {
      this.searchArgument.pageSize = val;
      this.getTableData();
    },

    // 提交
    confirm(val) {
      this.$refs.editForm.rules.list = [
        {
          type: "array",
          required: true,
          message: "请至少选择一个客户类型",
          trigger: ["change"],
        },
      ];
      this.$refs.editForm.$children[0].validate((valid) => {
        if (valid) {
          let form = this.$refs.editForm.form;
          if (
            form.placeStateOne != 1 &&
            form.placeStateTwo != 1 &&
            form.placeStateThere != 1
          ) {
            this.$message.error("请选择支持录入位置 ");
            return;
          }

          if (form.serviceOne != 1 && form.serviceTwo != 1) {
            this.$message.error("请选择服务人数 ");
            return;
          }

          if (form.inoutharbor == 1) {
            form.children.forEach((element) => {
              if (element.serviceOne != 1 && element.serviceTwo != 1) {
                this.$message.error("请选择子服务下的服务人数");
              }
            });
          }
          let array = [];
          this.$refs.editForm.customerType.forEach((element) => {
            this.$refs.editForm.form.list.forEach((item, index) => {
              if (element.customerId == item) {
                array.push(element);
              }
            });
          });

          form.customer = JSON.parse(JSON.stringify(array));
          Save(form).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.message);
              this.show = false;
              this.$refs.editForm.$children[0].resetFields();
              //   location.reload();
              this.getTableData();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style>
.row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}

.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}
</style>
<style scoped>
.sevice-manger-container {
  padding: 20px;
}
.search-select {
  text-align: right;
  width: 100%;
}
</style>
