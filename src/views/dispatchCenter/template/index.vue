<template>
  <div class="template">
    <!-- 查询 -->
    <mt-search-content>
      <el-form :inline="true" :model="searchForm" class="search-select">
        <el-row style="float: right">
          <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
            <el-form-item>
              <el-input
                v-model="searchForm.templateName"
                placeholder="按模板名称查询"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="5" :lg="5" :xl="5">
            <el-form-item>
              <el-input
                v-model="searchForm.templateContent"
                placeholder="按模板内容查询"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-form-item>
            <mt-button
              txt="查询"
              v-loading.fullscreen.lock="fullscreenLoading"
              @click="getTableData"
              style="float: right"
            ></mt-button>
          </el-form-item>
          <el-form-item>
            <mt-button
              txt="新增"
              @click="(showDialog = true), (dialogTitle = '新增')"
            ></mt-button>
          </el-form-item>
        </el-row>
      </el-form>
    </mt-search-content>

    <!-- 列表 -->
    <mt-data-content>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px; font-size: 12px"
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
            <el-button
              size="mini"
              type="primary"
              @click="editUser(scope.row.id, scope.row)"
            >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delUser(scope.row.id, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchForm.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </mt-data-content>
  </div>
</template>
<script>

export default {
  name: "template",
  data () {
    return {
      tableData: [],
      showDialog: false,
      dialogTitle: '新增',
      fullscreenLoading: false,
      total: 100,
      searchForm: {
        templateName: null,
        templateContent: null,
        pageNum:1,
        pageSize:10
      },
      cols: [
        { label: "模板名称", prop: "templateName", width: "" },
        { label: "模板内容", prop: "templateContent", width: "" },
        { label: "创建时间", prop: "createTime", width: "" }
      ]
    }
  },
  methods: {
    //获取航司维护表数据
    getTableData() {
      this.fullscreenLoading = true;
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.showDialog = true;

    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {

        })
        .catch(() => {});
    },



    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange() {
      this.form.pageNum = val;
      this.getTableData();
    },
  }
}
</script>
