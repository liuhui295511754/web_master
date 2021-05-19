<template>
  <div>
    <!--表单 -->
    <el-form ref="ruleForm" :model="formlist">
      <!-- 树形菜单 -->
      <el-form-item
        label="提醒类型:"
        prop="name"
        :rules="[{ required: true, message: '请选择', trigger: 'blur' }]"
      >
        <el-input clearable v-model="formlist.name"></el-input>
      </el-form-item>
      <el-form-item label="关联服务单配置:"> </el-form-item>
      <el-row :gutter="10">
        <el-col :sm="24" :md="24" :xl="6">
          <!-- 左侧树状结构 -->
          <div class="dialog-left">
            <div class="tree-title">服务单类型</div>
            <div
              style="
                text-align: center;
                margin-top: 10px;
                color: red;
                line-height: 1.5;
              "
            >
              提示:先勾选,后配置!
              <br />
              每次勾选会覆盖之前编辑内容
            </div>
            <!-- 新增树 -->
            <el-tree
              :data="treeData"
              accordion
              v-show="showTree"
              show-checkbox
              node-key="id"
              class="mt-tree"
              ref="tree"
              @check="handleCheckChange"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="node.level == 1">{{ data.placestate }}</span>
                <span>{{ data.name }}</span>
              </span>
            </el-tree>
            <!-- 编辑树 -->
            <el-tree
              :default-checked-keys="treeItem"
              :default-expanded-keys="treeItem"
              :data="treeData"
              v-show="!showTree"
              accordion
              show-checkbox
              node-key="id"
              class="mt-tree"
              ref="tree1"
              @check-change="handleCheckChange1"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="node.level == 1">{{ data.placestate }}</span>

                <span>{{ data.name }}</span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :sm="24" :md="24" :xl="18">
          <!-- 右边列表 -->
          <el-card
            class="box-card"
            v-for="(item, index) in formlist.remindServiceVOs"
            :key="index"
          >
            <div slot="header" class="clearfix">{{ item.serviceName }}</div>
            <div style="text-align: right; margin-bottom: 20px">
              <el-button
                size="mini"
                class="add-btn"
                @click="addListData(item.remindRules)"
                >新增</el-button
              >
            </div>

            <el-table
              :data="item.remindRules"
              border
              :header-cell-style="{
                'text-align': 'center',
              }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column prop="judgeType" label="判断">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`remindServiceVOs.${index}.remindRules.${scope.$index}.judgeType`"
                    :rules="{
                      required: true,
                      message: '请选择',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      v-model="scope.row.judgeType"
                      @change="selectVal(scope.row)"
                    >
                      <el-option label="之前" :value="0"></el-option>
                      <el-option label="等于" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="valueType" label="取值字段">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`remindServiceVOs.${index}.remindRules.${scope.$index}.valueType`"
                    :rules="{
                      required: true,
                      message: '请选择',
                      trigger: 'change',
                    }"
                  >
                    <el-select v-model="scope.row.valueType">
                      <el-option label="计划到达时间" :value="0"></el-option>
                      <el-option label="实际到达时间" :value="1"></el-option>
                      <el-option label="服务到期时间" :value="2"></el-option>
                      <el-option label="计划起飞时间" :value="3"></el-option>
                      <el-option label="实际登机时间" :value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="minute"
                label="字段判断时间（分钟）"
                width="165"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`remindServiceVOs.${index}.remindRules.${scope.$index}.minute`"
                    :rules="{
                      required: true,
                      message: '请输入数字',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      maxlength="3"
                      clearable
                      type="text"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                      v-model="scope.row.minute"
                      :disabled="scope.row.judgeType == 1"
                      @blur="changeProgram"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="triggerStatus" label="是否触发预警">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`remindServiceVOs.${index}.remindRules.${scope.$index}.triggerStatus`"
                    :rules="{
                      required: true,
                      message: '请选择',
                      trigger: 'change',
                    }"
                  >
                    <el-select
                      clearable
                      v-model="scope.row.triggerStatus"
                      @change="selectVal(scope.row)"
                    >
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="未确认触发预警时间（分钟）"
                width="160"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="`remindServiceVOs.${index}.remindRules.${scope.$index}.triggerMinute`"
                    :rules="{
                      required: true,
                      message: '请输入数字',
                      trigger: ['blur', 'change'],
                    }"
                  >
                    <el-input
                      clearable
                      maxlength="2"
                      type="text"
                      onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                      v-model="scope.row.triggerMinute"
                      :disabled="scope.row.triggerStatus == 0"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="
                      DeleteListData(item.remindRules, scope.$index, scope.row)
                    "
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { DataList, Detail, Save, Delete, listByAll } from "@/api/toastManager";
export default {
  name: "editForm",
  props: {
    //   表单数据
    formlist: {
      type: Object,
      default: {},
    },
    //
    treeItem: {
      type: Array,
      default: [],
    },
    // 新增/编辑
    showTree: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 树形控件数据源
      treeData: [],
      flag: null,
    };
  },
  created() {
    this.getTreeData();
  },

  //   watch: {
  //     "formlist.remindServiceVOs": {
  //       handler(newValue, oldValue) {
  //         this.changeProgram();
  //       },
  //     },
  //     treeItem(newVal, oldVal) {
  //       this.treeItem = newVal;
  //       return newVal;
  //     },
  //   },
  methods: {
    //需要保留当前选中的选项，再去除在arr中已经有的选项
    changeProgram() {
      console.log(11);
      this.formlist.remindServiceVOs.forEach((item) => {
        let arr = item.remindRules;
        console.log(222);
        for (var j = 0; j < arr.length - 1; j++) {
          for (var j = 0; j < arr.length; j++) {
            if (
              arr[j + 1] &&
              arr[j].judgeType == arr[j + 1].judgeType &&
              arr[j].valueType == arr[j + 1].valueType &&
              arr[j].minute == arr[j + 1].minute
            ) {
              this.$message.error("已有该预警，请重新选择");
              arr[j + 1].judgeType = null;
              arr[j + 1].valueType = null;
              arr[j + 1].minute = null;
            }
          }
        }
      });
    },
    // 获取关联服务单
    getTreeData() {
      listByAll().then((res) => {
        if (res.code == 1) {
          res.data.forEach((item) => {
            item.children.forEach((element) => {
              element.menuName = item.placestate;
              element.id = item.code + "-" + element.id;
              element.children.forEach((ele) => {
                ele.id = item.code + "-" + ele.id;
                ele.menuName = item.placestate;
              });
            });
          });
          this.treeData = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //新增 选中子菜单
    handleCheckChange(data, checked, indeterminate) {
      let array = this.$refs.tree.getCheckedNodes(); //每次勾选的数组
      this.formlist.remindServiceVOs = [];
      if (checked) {
        this.flag = data.name;
      }
      array = array.filter((item) => {
        if (item.children == null || item.children.length < 1) {
          return item;
        }
      });
      //   给左侧树赋值
      array.forEach((item, i) => {
        this.formlist.remindServiceVOs.push({
          selectIdsArr: [],
          name: item.menuName,
          serviceId: Number(item.id.split("-")[item.id.split("-").length - 1]),
          serviceName: item.name,
          remindRules: [
            {
              judgeType: null,
              minute: null,
              triggerMinute: null,
              triggerStatus: null,
              valueType: null,
            },
          ],
        });
      });
    },
    sortArray(arr) {
      let returnArr = arr.reduce((cur, next) => {
        !cur.includes(next) && cur.push(next);
        return cur;
      }, []);
      return returnArr;
    },
    // 编辑 选中子菜单
    handleCheckChange1(data, checked) {
      // 选中则添加追加数据
      if (checked) {
        this.formlist.remindServiceVOs.push({
          selectIdsArr: [],
          name: data.menuName,
          serviceId: data.id,
          serviceName: data.name,
          remindRules: [
            {
              judgeType: null,
              minute: null,
              triggerMinute: null,
              triggerStatus: null,
              valueType: null,
            },
          ],
        });
        this.formlist.remindServiceVOs = this.sortArray(
          this.formlist.remindServiceVOs
        );
      } else {
        //   没有选中则删除数据
        // this.formlist.remindServiceVOs = this.formlist.remindServiceVOs.filter(
        //   (item) => {
        //     if (data.id != undefined && data.id.indexOf("-") != -1) {
        //       data.id = Number(
        //         data.id.split("-")[data.id.split("-").length - 1]
        //       );
        //       console.log(data.id);
        //     }
        // console.log(data.id);
        // if (data.id != item.serviceId) {
        //   return item;
        // }
        //   }
        // );
      }
    },
    // 新增表格行内表单
    addListData(data) {
      if (data.length >= 5) {
        this.$message.error("最多只能添加5条预警通知信息");
        return;
      }
      data.push({
        judgeType: null,
        minute: "",
        triggerMinute: "",
        triggerStatus: null,
        valueType: null,
      });
    },
    // 删除
    DeleteListData(list, index, row) {
      this.$confirm("确定删除这条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          if (list.length === 1) {
            this.$message.info("至少保存一条数据");
            return;
          }
          list.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    //清空input
    selectVal(row) {
      // 判断为 等于
      if (row.judgeType == 1) {
        row.minute = 0;
      }
      //   是否触发预警为 否
      if (row.triggerStatus == 0) {
        row.triggerMinute = 0;
      }
    },
  },
};
</script>
<style lang="scss">
// 树形控件 去掉一级菜单和二级菜单的checkbox
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
<style>
.tree-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  font-size: 18px;
}
.dialog-body {
  display: flex;
  justify-content: space-between;
}
.label {
  font-size: 14px;
  color: #606266;
  font-weight: 700;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
}
</style>