<template>
  <div>
    <div class="Addbtn">
      <el-button size="mini" type="primary" @click="addUser">新增</el-button>
    </div>
    <div class="common-table">
      <el-table
        :data="tableData"
        style="font-size: 14px"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        stripe
        border
      >
        <el-table-column label="序号" type="index" width="85">
        </el-table-column>
        <el-table-column prop="name" label="客户类型" v-if="title == '客户'">
        </el-table-column>
        <el-table-column
          prop="name"
          label="服务类型"
          v-else-if="title == '服务'"
        >
        </el-table-column>
        <el-table-column prop="name" label="固定资产类型" v-else>
        </el-table-column>
        <el-table-column prop="code" label="编码"> </el-table-column>
        <el-table-column prop="sn" label="排列顺序"> </el-table-column>
        <el-table-column align="center" label="操作">
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
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="text-align: right"
        @current-change="dictionaryManageChange"
        :current-page.sync="config.pageNum"
        :page-size="config.pageSize"
        layout="sizes,prev, pager,next,jumper,total"
        :total="total"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>

    <mt-dialog
      :title="dialogTitle"
      v-model="isShow"
      style="text-align: center"
      @confirmBtn="confirm"
      width="40%"
    >
      <template slot="dialog-body">
        <el-form
          :model="form"
          ref="ruleForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="客户类型" prop="name" v-if="title == '客户'">
            <!-- <el-input v-model="form.name"></el-input> -->
            <el-select
              v-model="form.name"
              placeholder="请选择客户类型"
              style="width: 100%"
              filterable
              allow-create
              default-first-option
            >
              <el-option label="航司客户" value="航司客户"></el-option>
              <el-option
                label="商旅客户(后结算)"
                value="商旅客户(后结算)"
              ></el-option>
              <el-option
                label="商旅客户(预储值)"
                value="商旅客户(预储值)"
              ></el-option>
              <el-option label="自费散客" value="自费散客"></el-option>
              <el-option label="会员卡客户" value="会员卡客户"></el-option>
              <el-option label="政府签单" value="政府签单"></el-option>
              <el-option label="领导签单" value="领导签单"></el-option>
              <el-option label="公务机" value="公务机"></el-option>
              <el-option label="体验卡" value="体验卡"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="服务类型"
            prop="name"
            v-else-if="title == '服务'"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="固定资产类型" prop="name" v-else>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="排列顺序" prop="sn">
            <el-input
              v-model.number="form.sn"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </mt-dialog>
  </div>
</template>

<script>
import {
  publicList,
  publicSave,
  publicDel,
  publicEdit,
} from "@/api/dictionaryPublic";
export default {
  data() {
    return {
      isShow: false,
      dialogTitle: "新增",
      form: {
        name: [],
        code: null,
        sn: null,
        tableName: "",
      },
      total: 100,
      config: {
        pageNum: 1,
        pageSize: 10,
        tableName: "",
      },
      tableData: [],
      rules: {
        name: {
          required: true,
          message: "请选择客户类型",
          trigger: ["change", "blur"],
        },
        code: {
          required: true,
          message: "请输入编码",
          trigger: "blur",
        },
        sn: [
          { required: true, message: "排列顺序不能为空" },
          { type: "number", message: "排列顺序必须为数字值" },
        ],
      },
    };
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      this.config.tableName = this.tableName;
      const res = await publicList(this.config);
      console.log(res);
      if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    //编辑
    async handleEdit(id) {
      const res = await publicEdit({
        id: id,
        tableName: this.config.tableName,
      });
      if (res.code !== 1) return this.$message.error("请求错误");
      this.form = res.data;
      this.dialogTitle = "修改";
      this.isShow = true;
    },

    //页数
    handleSizeChange(val) {
      this.config.pageSize = val;
      this.getTableData();
    },
    //分页
    dictionaryManageChange(val) {
      this.config.pageNum = val;
      this.getTableData();
    },
    //删除
    handleDelete(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await publicDel({
            ids: id,
            tableName: this.config.tableName,
          });
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
            this.getTableData();
          }
        })
        .catch(() => {});
    },
    //增加
    addUser() {
      this.isShow = true;
      this.form = {};
      console.log(this.$refs.ruleForm);
    },
    //确认
    confirm() {
      this.$refs.ruleForm.validate(async (valid) => {
        // console.log(this.form);
        if (!valid) return this.$message.error("必填项不能为空");
        this.form.tableName = this.tableName;
        const res = await publicSave(this.form);
        if (res.code !== 1) return this.$message.error(res.message);
        console.log(res);
        this.isShow = false;
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
          this.form = {};
        });
        this.getTableData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Addbtn {
  margin: 15px;
  text-align: right;
}
</style>
