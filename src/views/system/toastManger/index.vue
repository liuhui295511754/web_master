<template>
  <div>
    <mt-data-content>
      <el-button type="primary" class="add-btn" @click="add">新增</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :row-class-name="getRowClassName"
      >
        <!-- 子表 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              border
              :data="scope.row.remindServiceVOs"
              :header-cell-style="{
                background: '#e4e7ed',
                'text-align': 'center',
              }"
              :cell-style="{ background: '#e4e7ed', 'text-align': 'center' }"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
              ></el-table-column>
              <el-table-column prop="name" label="服务单类型">
              </el-table-column>
              <el-table-column prop="serviceName" label="服务类型">
              </el-table-column>
              <el-table-column label="判断">
                <template slot-scope="scope">
                  <div v-for="(item, i) in scope.row.remindRules" :key="i">
                    {{ item.judgeType == 0 ? "之前" : "等于" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="minute" label="取值字段">
                <template slot-scope="scope">
                  <div v-for="(item, i) in scope.row.remindRules" :key="i">
                    <span v-if="item.valueType == 0">计划到达时间</span>
                    <span v-else-if="item.valueType == 1">实际到达时间</span>
                    <span v-else-if="item.valueType == 2">服务到期时间</span>
                    <span v-else-if="item.valueType == 3">计划起飞时间</span>
                    <span v-else-if="item.valueType == 4">实际登机时间</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="minute" label="字段判断时间（分钟）">
                <template slot-scope="scope">
                  <div v-for="(item, i) in scope.row.remindRules" :key="i">
                    {{ item.minute == null ? "—" : item.minute }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="triggerStatus" label="是否触发预警">
                <template slot-scope="scope">
                  <div v-for="(item, i) in scope.row.remindRules" :key="i">
                    {{ item.triggerStatus == 1 ? "是" : "否" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="triggerMinute"
                label="未确认出发预警时间（分钟）"
              >
                <template slot-scope="scope">
                  <div v-for="(item, i) in scope.row.remindRules" :key="i">
                    {{ item.triggerMinute == null ? "—" : item.triggerMinute }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="提醒类型" prop="name"> </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >配置提醒规则</el-button
                >
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
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
        :current-page.sync="searchForm.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchForm.pageSize"
        layout="sizes, prev, pager, next, jumper,total"
        :total="total"
      >
      </el-pagination>
    </mt-data-content>
    <!-- 编辑区域 -->
    <mt-edit-content>
      <mt-dialog v-model="visible" @confirmBtn="confirm" title="配置提醒规则">
        <template slot="dialog-body">
          <edit-form
            ref="editForm"
            :formlist="formlist"
            :treeItem="treeItem"
            :showTree="tflag"
          ></edit-form>
        </template>
      </mt-dialog>
    </mt-edit-content>
  </div>
</template>
<script>
import { DataList, Detail, Save, Delete, listByAll } from "@/api/toastManager";
import editForm from "./editForm";
export default {
  components: { editForm },

  data() {
    return {
      visible: false,
      searchForm: {
        pageNum: 1,
        pageSize: 10,
      },
      total: null,
      flag: null,
      treeItem: [],
      tableData: [],
      //   编辑 表单
      formlist: {
        id: null,
        name: "",
        remindServiceVOs: [], //保存树数据
      },
      //   选中树形控件的 一级菜单名称
      name: [],
      tflag: true,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //  查询
    getTableData() {
      this.fullscreenLoading = true;
      DataList(this.searchForm).then((res) => {
        this.fullscreenLoading = false;
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 翻页
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.getTableData();
    },
    // 每页条数
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getTableData();
    },
    // 新增
    add() {
      this.visible = true;
      this.formlist = {
        id: null,
        name: "",
        remindServiceVOs: [], //保存左侧树数据
      };
      this.tflag = true;
      this.$forceUpdate();
      this.treeItem = [];
      this.$nextTick(() => {
        this.$refs.editForm.$refs.ruleForm.resetFields();
        this.$refs.editForm.$refs.tree.setCheckedNodes([]);
      });
    },
    // 编辑
    async handleEdit(index, row) {
      this.treeItem = [];
      this.visible = true;
      this.tflag = false;
      this.$forceUpdate();
      const res = await Detail({ id: row.id });
      if (res.code == 1) {
        this.formlist = res.data;
        let array = res.data.remindServiceVOs;
        let arr = [];
        //   设置节点勾选状态
        this.$refs.editForm.treeData.forEach((item) => {
          array.forEach((element, index) => {
            // 判断父节点
            if (item.placestate == element.name) {
              element.serviceId = item.code + "-" + element.serviceId;
              item.children.forEach((ele) => {
                if (ele.children.length == 0 && ele.id == element.serviceId) {
                  arr.push(ele);
                  this.treeItem.push(ele);
                  this.$refs.editForm.$refs.tree1.setCheckedNodes(arr);
                } else {
                  ele.children.forEach((j) => {
                    if (j.id == element.serviceId) {
                      arr.push(j);
                      this.treeItem.push(j);
                      this.$refs.editForm.$refs.tree1.setCheckedNodes(arr);
                    }
                  });
                }
              });
            }
          });
        });
      } else {
        return this.$message.error(res.message);
      }
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
      //   if (row.children == undefined || row.children.length == 0) {
      //     return "row-expand-cover";
      //   }
    },

    // 提交
    confirm() {
      this.$refs.editForm.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return this.$message.error("必填项不能为空");
        if (this.formlist.remindServiceVOs.length == 0)
          return this.$message.error("请选择关联服务单配置");
        this.formlist.remindServiceVOs.forEach((item) => {
          console.log();
          if (
            typeof item.serviceId != "number" &&
            item.serviceId.indexOf("-") != -1
          ) {
            item.serviceId = item.serviceId.split("-")[
              item.serviceId.split("-").length - 1
            ];
          }
        });
        const res = await Save(this.formlist);
        if (res.code == 1) {
          this.$message.success("保存成功");
          this.$refs.editForm.$refs.ruleForm.resetFields();
          this.getTableData();
          this.formlist = {
            id: null,
            name: "",
            remindServiceVOs: [],
          };
          this.visible = false;
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    //取值字段 格式化
    formatValue(row, column) {
      console.log(row, "row");
      switch (row.valueType) {
        case 0:
          return "计划到达时间";
          break;
        case 1:
          return "实际到达时间";
          break;
        case 2:
          return "服务到期时间";
          break;
        case 4:
          return "计划起飞时间";
          break;
        case 5:
          return "实际登机时间";
          break;
      }
    },
    // 数组去重
    sortArray(arr) {
      let returnArr = arr.reduce((cur, next) => {
        !cur.includes(next) && cur.push(next);
        return cur;
      }, []);
      return returnArr;
    },
  },
};
</script>
<style>
/* .row-expand-cover .el-table__expand-icon {
  visibility: hidden;
} */

.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}

.el-card__header {
  padding: 10px 20px;
}
</style>
<style scoped>
.dialog-body {
  display: flex;
  justify-content: space-between;
}
.dialog-left {
  width: 250px;
  border: 1px solid #eee;
}
.three-item:hover {
  color: #409eff;
}
.clearfix {
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
.box-card {
  margin-top: 40px;
}
.tree-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  font-size: 18px;
}
.add-btn {
  margin-bottom: 10px;
  margin-left: 10px;
  float: right;
}
</style>
<style lang="scss">
.el-tree {
  padding-top: 15px;
  padding-left: 10px;
  .el-tree-node {
    .is-leaf + .el-checkbox .el-checkbox__inner {
      display: inline-block;
    }
    .el-checkbox .el-checkbox__inner {
      display: none;
    }
  }
}
</style>