<template>
  <div>
    <el-card>
      <div class="clearfix">
        <el-button
          style="float: right; margin: 15px 0"
          type="primary"
          @click="addUser"
          size="mini"
          >新增</el-button
        >
      </div>

      <dictionary-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getTerminalList()"
        @changeSize="handleSizeChange"
        @edit="editUser"
        @del="delUser"
      ></dictionary-table>
    </el-card>
    <!-- 弹窗 -->
    <mt-dialog
      :title="dialogTitle"
      v-model="isShow"
      @confirmBtn="confirm"
      width="40%"
      style="text-align: center"
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
  terminalList,
  terminalSave,
  terminalEdit,
  terminalDel,
} from "@/api/handTerminal";
export default {
  components: {
    DictionaryForm,
    DictionaryTable,
  },
  data() {
    return {
      dialogTitle: "新增",
      radio: "",
      isShow: false,

      // tableData: [
      //   {
      //     name: "a",
      //     age: "af",
      //     sexLabel: "1",
      //     room: "1"
      //   },
      //   {
      //     name: "b",
      //     age: "aq",
      //     sexLabel: "2",
      //     room: "111"
      //   },
      //   {
      //     name: "c",
      //     age: "aw",
      //     sexLabel: "3",
      //     room: "144"
      //   },
      //   {
      //     name: "d",
      //     age: "asf",
      //     sexLabel: "1",
      //     room: "12"
      //   }
      // ],
      tableData: [],
      tableLabel: [
        {
          prop: "code",
          label: "编号",
        },
        {
          prop: "serialNumber",
          label: "机器序列号",
        },
        {
          prop: "name",
          label: "名称",
        },
        {
          prop: "team",
          label: "所属班组",
        },
      ],
      config: {
        pageNum: 1,
        pageSize: 10,
        total: 100,
        loading: false,
      },
      operateForm: {
        code: "",
        serialNumber: "",
        name: "",
        team: "",
      },
      operateFormLabel: [
        {
          model: "code",
          label: "编号",
          type: "input",
        },
        {
          model: "serialNumber",
          label: "机器列序号",
          type: "input",
        },
        {
          model: "names",
          label: "设备名称",
          type: "input",
        },
        {
          model: "team",
          label: "所属班组",
          type: "input",
        },
      ],
    };
  },
  created() {
    this.getTerminalList();
  },
  methods: {
    async getTerminalList() {
      const res = await terminalList(this.config);
      if (res.code !== 1) return this.$message.error(res.meta.msg);
      console.log(res);
      this.tableData = res.data.list;
      this.config.total = res.data.total;
      console.log(this.tableData);
    },

    //保存
    confirm(val) {
      console.log(this.$refs.form.form);
      this.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("必填项不能为空");
        const res = await terminalSave(this.$refs.form.form);
        if (res.code !== 1) return this.$message.error(res.message);
        if (res.code == 1) {
          this.$message.success("保存成功");
          this.isShow = false;
          this.getTerminalList();
        }
      });
    },
    addUser() {
      // this.operateForm = {};
      console.log(this.$refs.form);
      this.dialogTitle = "新增";
      this.isShow = true;
      if (this.$refs.form) {
        this.$refs.form.$children[0].resetFields();
      }
    },
    //修改
    async editUser(id) {
      const res = await terminalEdit({ id: id });
      console.log(res);
      if (res.code !== 1) return this.$message.error("请求错误");
      this.operateForm = res.data;
      this.dialogTitle = "修改";
      this.isShow = true;
      // this.operateForm = row;
    },
    //页数
    handleSizeChange(val) {
      this.config.pageSize = val;
      this.getTerminalList();
    },
    //删除
    delUser(id) {
      console.log(id);
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await terminalDel({
            ids: id,
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
            this.getTerminalList();
          }
        })
        .catch(() => {});
    },
  },
};
</script>
