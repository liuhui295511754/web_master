<template>
  <div class="systen-manager-container">
    <!-- 查询 新增 -->
    <el-form :inline="true" class="manager-top">
      <el-form-item>
        <el-input
          v-model="config.name"
          clearable
          placeholder="卡种名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        ><el-input
          v-model="config.remark"
          clearable
          placeholder="说明"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search"> 查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表单区域 -->

    <mt-table
      :data="tableData"
      :currentPage="config.pageNum"
      :pageSize="config.pageSize"
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
            @click="handleEdit(scope.$index, scope.row)"
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
          ref="ruleForm"
        >
          <mt-form-item label="卡种名称" prop="name" :spans="24">
            <el-input v-model="form.name"></el-input>
          </mt-form-item>
          <mt-form-item label="唯一标识" prop="code" :spans="24">
            <el-input v-model.number="form.code"></el-input>
          </mt-form-item>
          <mt-form-item label="使用区域" prop="useAreaOne" class="useArea-left">
            <el-checkbox
              label="隔离区外"
              v-model="form.useAreaOne"
              :true-label="1"
              :false-label="0"
              name="useArea"
            ></el-checkbox>
            <el-checkbox
              label="隔离区内(不含两舱)"
              v-model="form.useAreaTwo"
              :true-label="1"
              :false-label="0"
              name="useArea"
            ></el-checkbox>
            <el-checkbox
              label="两舱"
              v-model="form.useAreaThree"
              :true-label="1"
              :false-label="0"
              name="useArea"
            ></el-checkbox>
          </mt-form-item>

          <mt-form-item label="使用服务" prop="cardService">
            <el-checkbox-group v-model="form.cardService">
              <el-checkbox
                v-for="item in cardServiceList"
                :label="item"
                :key="item.serviceId"
                >{{ item.serviceName }}
              </el-checkbox>
            </el-checkbox-group>
          </mt-form-item>

          <mt-form-item label="说明" :spans="24">
            <el-input
              type="textarea"
              v-model="form.remark"
              :rows="3"
              resize="none"
              placeholder="请输入内容 "
            ></el-input>
          </mt-form-item>
        </mt-form>
      </template>
    </mt-dialog>
  </div>
</template>

<script>
import {
  cardList,
  cardSave,
  cardDel,
  cardEdit,
  cardSonList,
} from "@/api/vipCard";
export default {
  data() {
    return {
      ManagerisShow: false,
      dialogTitle: "新增卡种",
      checkList: [],
      cardServiceList: [],
      form: {
        name: "",
        code: "",
        useAreas: "",
        cardService: [],
        cards: "",
        remark: "",
        creator: "",
        createTime: "",
        searchname: "",
        useAreaOne: 0,
        useAreaTwo: 0,
        useAreaThree: 0,
      },
      config: {
        name: "",
        remark: "",
        pageNum: 1,
        pageSize: 10,
        type: "会员卡客户",
      },
      total: 100,
      tableData: [],
      tablecolumn: [
        { label: "卡种名称", prop: "name" },
        { label: "使用区域", prop: "useAreas" },
        { label: "使用服务", prop: "cards" },
        { label: "说明", prop: "remark" },
        { label: "创建人", prop: "creator" },
        { label: "创建时间", prop: "createTime" },
      ],
      rules: {
        name: [{ required: true, message: "请输入卡种名称", trigger: "blur" }],
        code: [
          {
            type: "number",
            required: true,
            message: "请输入唯一标识",
            trigger: "blur",
          },
        ],
        useAreaOne: [
          { required: true, message: "请选择使用区域", trigger: "change" },
        ],
        cardService: [
          { required: true, message: "请选择使用服务", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getVipCardList();
    this.getVipCardData();
  },
  methods: {
    async getVipCardList() {
      const res = await cardList(this.config);
      console.log(res);
      if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      this.tableData = res.data.list;
      this.total = res.data.total;
    },

    //获取使用区域 使用服务
    async getVipCardData() {
      const res = await cardSonList();
      console.log(res);
      this.cardServiceList = [];
      let array = res.data;
      array.forEach((item) => {
        this.cardServiceList.push({
          serviceId: item.id,
          serviceName: item.name,
        });
      });
    },
    //新增
    handleAdd() {
      console.log(this.$refs.ruleForm);
      this.ManagerisShow = true;
      this.dialogTitle = "新增卡种";
      this.getVipCardData();
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.$children[0].resetFields();
      }
    },
    //编辑
    async handleEdit(index, row) {
      this.getVipCardData();
      this.ManagerisShow = true;
      this.dialogTitle = "修改";
      const res = await cardEdit({ id: row.id });
      if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      console.log(res);
      this.form.cardService = [];
      this.form = res.data;
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await cardDel({ ids: row.id });
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
            this.getVipCardList();
          }
        })
        .catch(() => {});
    },
    //查询重置
    search() {
      this.config.pageNum = 1;
      this.config.pageSize = 10;
      this.getVipCardList();
    },
    //分页
    dictionaryManageChange(val) {
      this.config.pageNum = val;
      this.getVipCardList();
    },
    //页数
    handleSizeChange(val) {
      this.config.pageSize = val;
      this.getVipCardList();
    },
    //确定
    confirm(val) {
      console.log(this.$refs.ruleForm);
      this.$refs.ruleForm.$children[0].validate(async (valid) => {
        if (valid) {
          let form = this.$refs.ruleForm.model;
          if (
            form.useAreaOne != 1 &&
            form.useAreaTwo != 1 &&
            form.useAreaThree != 1
          ) {
            this.$message.error("请选择使用区域 ");
            return;
          }
          const res = await cardSave(this.$refs.ruleForm.model);
          if (res.code !== 1) return this.$message.error(res.message);
          if (res.code == 1) {
            this.$message.success("保存成功");
            this.ManagerisShow = false;
            this.getVipCardList();
          }
        } else {
          return false;
        }
        // if (!valid) return this.$message.error('输入错误，请重新输入');
        //  const res = await cardSave(this.$refs.ruleForm.model);
        // console.log(res);
        // if (res.code !== 1) return this.$message.error(res.message);
        // this.ManagerisShow = false;
        //  this.getVipCardList()
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.systen-manager-container {
  padding: 20px;
  .manager-top {
    text-align: right;
  }
  .el-checkbox-group {
    text-align: left;
  }
  .useArea-left {
    text-align: left;
  }
}
</style>
