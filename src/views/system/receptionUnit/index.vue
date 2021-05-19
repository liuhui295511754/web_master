<template>
  <div class="system-manager-container">
    <!-- 查询 新增 -->
    <el-form :inline="true" class="manager-top">
      <el-form-item>
        <el-input
          v-model="searchform.name"
          clearable
          placeholder="接待单位名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="status" clearable placeholder="结算类型(全部)">
          <el-option label="后结算" value="0"></el-option>
          <el-option label="预储值" value="1"></el-option>
          <el-option label="后结算、预储值" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表单区域 -->
    <mt-table
      :data="tableData"
      :currentPage="searchform.pageNum"
      :pageSize="searchform.pageSize"
      :headerStyle="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :total="total"
      @currentChange="dictionaryManageChange"
      @size-change="handleSizeChange"
    >
      <el-table-column
        v-for="item in tablecolumn"
        :key="item.id"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)"
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
    </mt-table>

    <!-- 弹窗 -->
    <mt-dialog
      :title="dialogTitle"
      v-model="ManagerisShow"
      style="text-align: center"
      @confirmBtn="confirm"
      width="40%"
    >
      <template slot="dialog-body">
        <mt-form
          :col="1"
          label-width="120px"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <mt-form-item label="接待单位名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </mt-form-item>

          <mt-form-item
            label="结算类型"
            prop="settlementOne"
            class="settlement-left"
          >
            <el-checkbox
              label="后结算"
              v-model="form.settlementOne"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
            <el-checkbox
              label="预储值"
              v-model="form.settlementTwo"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
          </mt-form-item>
          <mt-form-item label="公司编码" prop="companyCode">
            <el-input v-model="form.companyCode"></el-input>
          </mt-form-item>
          <mt-form-item label="排列顺序" prop="sn">
            <el-input
              v-model.number="form.sn"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
            ></el-input>
          </mt-form-item>
        </mt-form>
      </template>
    </mt-dialog>
  </div>
</template>

<script>
import {
  receptionList,
  receptionSave,
  receptionDel,
  receptionEdit,
} from "@/api/requestReception";
export default {
  data() {
    return {
      ManagerisShow: false,
      dialogTitle: "新增",
      checkList: [],
      total: 100,
      status: null,
      searchform: {
        name: "",
        status: null,
        settlementOne: null,
        settlementTwo: null,
        pageNum: 1,
        pageSize: 10,
      },
      form: {
        name: "",
        companyCode: "",
        sn: "",
        settlementOne: 0,
        settlementTwo: 0,
      },
      TypeList: [],
      tableData: [],

      tablecolumn: [
        { label: "商旅接待单位名称", prop: "name" },
        { label: "结算类型", prop: "settlements" },
        { label: "公司编码", prop: "companyCode" },
        { label: "排列顺序", prop: "sn" },
      ],
      rules: {
        name: [
          { required: true, message: "请输入接待单位名称", trigger: "blur" },
        ],
        settlementOne: [
          { required: true, message: "请至少选择一种", trigger: "blur" },
        ],
        companyCode: [
          { required: true, message: "请输入公司编码", trigger: "blur" },
        ],
        sn: [
          { required: true, message: "排列顺序不能为空" },
          { type: "number", message: "排列顺序必须为数字值" },
        ],
      },
    };
  },
  created() {
    this.getReceptionList();
  },
  methods: {
    async getReceptionList() {
      console.log(this.status);
      if (this.status == 0) {
        this.searchform.settlementOne = 1;
        this.searchform.settlementTwo = "";
      } else if (this.status == 1) {
        (this.searchform.settlementOne = ""),
          (this.searchform.settlementTwo = 1);
      } else if (this.status == 2) {
        (this.searchform.settlementOne = 1),
          (this.searchform.settlementTwo = 1);
      }
      const res = await receptionList(this.searchform);
      if (res.code !== 1) return this.$message.error("必填项不能为空");
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    handleAdd() {
      console.log(this.$refs.form);
      this.ManagerisShow = true;
      this.dialogTitle = "新增";
      if (this.$refs.form) {
        this.$refs.form.$children[0].resetFields();
      }
    },
    //编辑
    async handleEdit(id) {
      const res = await receptionEdit({ id: id });
      if (res.code !== 1) return this.$message.error("请求错误");
      this.form = res.data;
      this.ManagerisShow = true;
      this.dialogTitle = "修改";
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await receptionDel({ ids: row.id });
          console.log(res);
          if (res.code !== 1) {
            this.$message({
              type: "info",
              message: "删除失败",
            });
          } else {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getReceptionList();
          }
        })
        .catch(() => {});
    },
    //分页
    dictionaryManageChange(val) {
      this.searchform.pageNum = val;
      this.getReceptionList();
    },
    //页数
    handleSizeChange(val) {
      this.searchform.pageSize = val;
      this.getReceptionList();
    },
    //查询重置
    search() {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = 10;
      this.getReceptionList();
    },
    confirm(val) {
      console.log(this.$refs.form.model);
      this.$refs.form.$children[0].validate(async (valid) => {
        if (valid) {
          let form = this.$refs.form.model;
          if (form.settlementOne != 1 && form.settlementTwo != 1) {
            this.$message.error("请选择结算类型 ");
            return;
          }
          const res = await receptionSave(this.$refs.form.model);
          console.log(res);
          if (res.code !== 1) return this.$message.error(res.message);
          if (res.code == 1) {
            this.$message.success("保存成功");
            this.ManagerisShow = false;
            this.getReceptionList();
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.system-manager-container {
  padding: 20px;
  .manager-top {
    text-align: right;
  }
  .el-checkbox-group {
    text-align: left;
  }
  .settlement-left {
    text-align: left;
  }
}
</style>
