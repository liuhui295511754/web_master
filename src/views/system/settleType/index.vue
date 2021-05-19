<template>
  <div>
    <div class="clearfix">
      <el-button
        style="float: right; margin: 15px 0"
        type="primary"
        @click="addUser"
        size="mini"
        >新增</el-button
      >
    </div>
    <mt-table
      :data="tableData"
      :currentPage="config.pageNum"
      :pageSize="config.pageSize"
      :headerStyle="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :total="total"
      @currentChange="getSettleChange"
      @size-change="handleSizeChange"
    >
      <!-- <el-table-column
        v-for="item in tablecolumn"
        :key="item.id"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column> -->
      <el-table-column prop="name" label="结算类型"> </el-table-column>

      <el-table-column label="财务统计类型">
        <template slot-scope="scope">
          <span v-if="scope.row.statisticalType == 0">VIP旅客</span>
          <span v-if="scope.row.statisticalType == 1">CIP旅客</span>
          <span v-if="scope.row.statisticalType == 2">持卡旅客</span>
          <span v-if="scope.row.statisticalType == 3">头等舱旅客</span>
        </template>
      </el-table-column>

      <el-table-column prop="sn" label="排列顺序"> </el-table-column>
      <el-table-column label="操作">
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
            >删除</el-button
          >
        </template>
      </el-table-column>
    </mt-table>

    <!-- 弹窗 -->
    <mt-dialog
      :title="dialogTitle"
      v-model="TypeisShow"
      style="text-align: center"
      @confirmBtn="confirm"
      width="40%"
    >
      <template slot="dialog-body">
        <dictionary-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          ref="form"
        ></dictionary-form>
      </template>
    </mt-dialog>
  </div>
</template>
<script>
import DictionaryForm from "@/components/other/Dictionary/DictionaryForm";
import DictionaryTable from "@/components/other/Dictionary/DictionaryTable";
import {
  settlementList,
  settlementSave,
  settlementDel,
  settlementEdit,
} from "@/api/settlementType";
export default {
  components: {
    DictionaryForm,
    DictionaryTable,
  },
  data() {
    return {
      dialogTitle: "新增",
      TypeisShow: false,
      tableData: [],
      // tableData: [
      //   {
      //     name: "a",
      //     age: "af",
      //     sexLabel: "1"
      //   },
      //   {
      //     name: "b",
      //     age: "aq",
      //     sexLabel: "2"
      //   },
      //   {
      //     name: "c",
      //     age: "aw",
      //     sexLabel: "3"
      //   },
      //   {
      //     name: "d",
      //     age: "asf",
      //     sexLabel: "1"
      //   }
      // ],
      tableLabel: [
        {
          prop: "name",
          label: "结算类型",
        },
        {
          prop: "statisticalType",
          label: "财务统计类型",
        },
        {
          prop: "sn",
          label: "排列顺序",
        },
      ],
      total: 100,
      config: {
        pageNum: 1,
        pageSize: 10,
        loading: false,
      },
      operateForm: {
        name: "",
        statisticalType: "",
        sn: "",
      },
      operateFormLabel: [
        {
          model: "name",
          label: "结算类型",
          type: "input",
        },
        {
          label: "财务统计类型",
          model: "statisticalType",
          type: "select",
          opts: [
            {
              label: "VIP旅客",
              value: "0",
            },
            {
              label: "CIP旅客",
              value: "1",
            },
            {
              label: "持卡旅客",
              value: "2",
            },
            {
              label: "头等舱旅客",
              value: "3",
            },
          ],
        },
        {
          model: "sn",
          label: "排列顺序",
          type: "sn",
        },
      ],
    };
  },
  created() {
    this.getSettleList();
  },
  methods: {
    async getSettleList() {
      const res = await settlementList(this.config);
      if (res.code !== 1) return this.$message.error("输入错误，请重新输入");
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },

    confirm() {
      console.log(this.$refs.form.form);
      this.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("输入错误，请重新输入");
        const res = await settlementSave(this.$refs.form.form);
        if (res.code !== 1) return this.$message.error(res.message);
        this.TypeisShow = false;
        this.getSettleList();
      });
    },
    addUser() {
      this.dialogTitle = "新增";
      this.TypeisShow = true;
      this.operateForm = {};
    },
    //编辑
    async editUser(id) {
      const res = await settlementEdit({
        id: id,
      });
      if (res.code !== 1) return this.$message.error("请求错误");
      this.operateForm = res.data;
      console.log(res);
      this.dialogTitle = "修改";
      this.TypeisShow = true;
    },
    //分页
    getSettleChange(val) {
      this.config.pageNum = val;
      this.getSettleList();
    },
    //页数
    handleSizeChange(val) {
      this.config.pageSize = val;
      this.getSettleList();
    },
    //删除
    delUser(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await settlementDel({ ids: id });
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
            this.getSettleList();
          }
        })
        .catch(() => {});
    },
  },
};
</script>
