<template>
  <div class="airline-maintain">
    <el-tabs type="card">
      <!--查詢-->
      <mt-search-content>
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item class="input-name">
            <el-input v-model="formInline.name" placeholder="按航空公司名称查询"></el-input>
          </el-form-item>
          <el-form-item class="input-code">
            <el-input v-model="formInline.code"
                      onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                      placeholder="按航空公司二字码/三字码查询"
                      style="width: 230px">
            </el-input>
          </el-form-item>
          <el-form-item class="airplane-table">
            <mt-button
              txt="查询"
              v-loading.fullscreen.lock="fullscreenLoading"
              @click="getTableData"
            ></mt-button>
            <mt-button
              txt="新增航空公司"
              @click="addAirlineData"
            ></mt-button>
          </el-form-item>
        </el-form>
      </mt-search-content>
      <!--table-->
      <mt-data-content>
        <mt-table
          :data="tableData"
          :currentPage=formInline.pageNum
          :total="total"
          :cell-style="{ 'text-align': 'center' }"
          :header-style="{ 'text-align': 'center' }"
          :row-class-name="getRowClassName"
          :default-expand-all="false"
          @currentChange="handleCurrentChange"
          @size-change="handleSizeChange"
        >
          <!-- 子表table -->
          <el-table-column type="expand" prop="airlinelist">
            <template slot-scope="scope">
              <childTable
                :childTableData="scope.row.airlinelist"
                ref="childTable"
                @editChild="handleChildEdit"
                @delChild="handleChildDelete"
              ></childTable>
            </template>
          </el-table-column>

          <el-table-column
            v-for="(item, index) in cols"
            :key="index"
            :label="item.label"
            :prop="item.prop"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="(showChildDialog = true), (dialogChildTitle = '添加分公司'), onChange(scope.$index, scope.row)">
                添加分公司
              </el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
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
        <!--父-->
        <mt-dialog
          v-model="showDialog"
          :title="dialogTitle"
          @confirmBtn="confirm"
        >
          <template slot="dialog-body">
            <mt-form
              :col="1"
              :model="form"
              :rules="rules"
              ref="ruleForm"
              label-width="140px"

            >
              <mt-form-item label="航空公司名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </mt-form-item>
              <mt-form-item label="航司二字码" prop="twoCharacterCode">
                <el-input v-model="form.twoCharacterCode"
                          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                          maxlength="2">
                </el-input>
              </mt-form-item>
              <mt-form-item label="航司三字码" prop="threeCharacterCode">
                <el-input v-model="form.threeCharacterCode"
                          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                          maxlength="3">
                </el-input>
              </mt-form-item>
            </mt-form>
          </template>
        </mt-dialog>

        <!--子-->
        <mt-dialog
          v-model="showChildDialog"
          :title="dialogChildTitle"
          @confirmBtn="childConfirm"
        >
          <template slot="dialog-body">
            <mt-form
              :col="1"
              :model="childForm"
              :rules="childRules"
              ref="childRuleForm"
              label-width="140px"
            >
              <mt-form-item label="分公司名称" prop="name">
                <el-input v-model="childForm.name"></el-input>
              </mt-form-item>
              <mt-form-item label="航司二字码" prop="twoCharacterCode">
                <el-input v-model="childForm.twoCharacterCode"
                          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                          maxlength="2"
                          disabled >
                </el-input>
              </mt-form-item>
              <mt-form-item label="航司三字码" prop="threeCharacterCode">
                <el-input v-model="childForm.threeCharacterCode"
                          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                          maxlength="3">
                </el-input>
              </mt-form-item>
            </mt-form>
          </template>
        </mt-dialog>
        </mt-edit-content>
    </el-tabs>
  </div>
</template>

<script>
  import childTable from "./childTable";
  export default {
    name: 'airlineMaintain',
    components: {
      childTable
    },
    props: {
      tableData: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        currentPage: 1,
        showDialog: false,
        dialogTitle: '新增航空公司',
        showChildDialog: false,
        dialogChildTitle: '新增航空公司分公司',
        fullscreenLoading: false,
        total: null,
        cols: [
          { label: "航空公司名称", prop: "name" },
          { label: "航司二字码", prop: "twoCharacterCode" },
          { label: "航司三字码", prop: "threeCharacterCode" },
        ],
        formInline: {
          name: '',
          code: '',
          pageNum: 1,
          pageSize: 10
        },
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
        ],
        form: {
          name: "",
          twoCharacterCode: null,
          threeCharacterCode: null,
        },
        childForm: {
          parentId: null,
          name: "",
          twoCharacterCode: null,
          threeCharacterCode: null,
        },
        rules: {
          name: {
            required: true,
            message: "请输入航空公司名称",
            trigger: "blur",
          },
          twoCharacterCode: {
            required: true,
            message: "请输入航司二字码",
            trigger: "blur",
          },
          threeCharacterCode: {
            required: false,
            message: "请输入航司三字码",
            trigger: "blur",
          }
      },
        childRules: {
          name: {
            required: true,
            message: "请输入航空公司名称",
            trigger: "blur",
          },
          twoCharacterCode: {
            required: true,
            message: "请输入航司二字码",
            trigger: "blur",
          },
          threeCharacterCode: {
            required: true,
            message: "请输入航司三字码",
            trigger: "blur",
          }
        }
      }
    },
    created() {

    },
    methods: {
      // getTableData() {
      //   this.fullscreenLoading = true;
      //   getPage(this.formInline).then(res => {
      //     this.fullscreenLoading = false;
      //     this.tableData = res.data.list;
      //   })
      //   // setTimeout(() => {
      //   //   this.fullscreenLoading = false;
      //   // }, 2000);
      //   this.cols = [
      //     { label: "航空公司名称", prop: "airplaneName" },
      //     { label: "航司二字码", prop: "airplaneCode2" },
      //     { label: "航司三字码", prop: "airplaneCode3" },
      //   ];
      //   this.tableData = [
      //     {
      //       airplaneName: "南方航空",
      //       airplaneCode2: "CZ",
      //       airplaneCode3: "CSN",
      //       children: [
      //         {
      //           airplaneName: "南航总部",
      //           airplaneCode2: "CZ",
      //           airplaneCode3: "C01"
      //         },
      //         {
      //           airplaneName: "南航上海",
      //           airplaneCode2: "CZ",
      //           airplaneCode3: "C07"
      //         }
      //       ]
      //     },
      //     {
      //       airplaneName: "东方航空",
      //       airplaneCode2: "MU",
      //       airplaneCode3: "CES",
      //       children: [
      //         {
      //           airplaneName: "东方卫视",
      //           airplaneCode2: "MU",
      //           airplaneCode3: "CSN"
      //         }
      //       ]
      //     },
      //     {
      //       airplaneName: "深圳航空",
      //       airplaneCode2: "ZH",
      //       airplaneCode3: "CSZ"
      //     },
      //   ];
      // },

      //新增
      addAirlineData() {
        this.showDialog = true;
        this.dialogTitle = '新增航空公司';
        console.log(this.$refs.ruleForm);
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.$children[0].resetFields();
        }
      },
      //查詢
      getTableData() {
        this.formInline.pageSize = 10;
        this.formInline.pageNum = 1;
        this.$emit('getTableData')
      },
      onChange(index, row) {
        console.log(index, row)//airlinelist
        this.childForm.twoCharacterCode = row.twoCharacterCode
        row.parentId = row.id
        this.childForm.parentId = row.id
        console.log(this.$refs);
        if (this.$refs.childRuleForm) {
          this.$refs.childRuleForm.$children[0].resetFields();
        }

      },
      //编辑子公司
      handleChildEdit(index, row) {
        this.$emit('editChild', index, row)
        console.log(index)
      },
      //編輯
      handleEdit(index, row) {
        this.$emit('edit', index, row)
      },
      //子表删除
      handleChildDelete(index, row) {
        this.$emit('childDelete',index, row)
      },
      //刪除
      handleDelete(index, row) {
        this.$emit('delete', index, row)
      },
      //父
      confirm() {
        this.$emit('confirm')
      },
      //子
      childConfirm() {
        this.$emit('childConfirm')

      },
      // 每页条数
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val)
      },
      // 翻页
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val)
      },

      // 没有children则不展开
      getRowClassName({ row, rowIndex }) {
        // console.log(row);
        if (row.children == undefined || row.children.length == 0) {
          return "row-expand-cover";
        }
      },

    }
  }
</script>

<style scoped>

</style>
