<template>
  <div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="厅房区域">
          <div class="Addbtn">
            <el-button size="mini" type="primary" @click="addUser"
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
            @currentChange="dictionaryManageChange"
            @size-change="handleSizeChange"
          >
            <el-table-column prop="name" label="厅房所在区域">
            </el-table-column>

            <el-table-column label="区域类型">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 0">隔离区内</span>
                <span v-if="scope.row.type == 1">隔离区外</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="编号"> </el-table-column>

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
        </el-tab-pane>

        <el-tab-pane label="客户类型">
          <dictionary-public
            :tableName="dicPublicOne"
            :title="dicPublicOneUser"
          ></dictionary-public>
        </el-tab-pane>
        <el-tab-pane label="服务类型">
          <dictionary-public
            :tableName="dicPublicTwo"
            :title="dicPublicOneService"
          ></dictionary-public>
        </el-tab-pane>

        <el-tab-pane label="调度任务类型">
          <div class="Addbtn">
            <el-button size="mini" type="primary" @click="addUsertype"
              >新增</el-button
            >
          </div>
          <!-- <dictionary-table
            :tableData="tableSchedulingData"
            :tableLabel="tableSchedulingLabel"
            :config="config"
            @changePage="SchedulingListGet()"
            @edit="editScheduling"
            @del="delScheduling"
          ></dictionary-table> -->
          <mt-table
            :data="tableSchedulingData"
            :currentPage="config.pageNum"
            :pageSize="config.pageSize"
            :headerStyle="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            :total="config.total"
            @currentChange="SchedulingChange"
            @size-change="ScheduSizeChange"
          >
            <el-table-column prop="name" label="调度任务类型">
            </el-table-column>

            <el-table-column label="调度方式">
              <template slot-scope="scope">
                <span v-if="scope.row.schedulingMode == 0">手持接收</span>
                <span v-if="scope.row.schedulingMode == 1">后台调度</span>
              </template>
            </el-table-column>
            <el-table-column prop="dispatchTypename" label="服务类型">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="editScheduling(scope.row.id, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="delScheduling(scope.row.id, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </mt-table>
        </el-tab-pane>

        <el-tab-pane label="固定资产类型">
          <dictionary-public
            :tableName="dicPublicThree"
            :title="dicPublicOneType"
          ></dictionary-public>
        </el-tab-pane>

        <el-tab-pane label="合同到期提醒">
          <mt-table
            :data="tableDateData"
            :currentPage="config.pageNum"
            :pageSize="config.pageSize"
            :headerStyle="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            :total="config.total"
            @currentChange="dictionaryManageChange"
            @size-change="handleSizeChange"
          >
            <el-table-column align="center" label="提醒类型">
              <template slot-scope="scope">
                <span v-if="scope.row.remindType == 0">航司合同</span>
                <span v-if="scope.row.remindType == 1">商旅合同(后结算)</span>
                <span v-if="scope.row.remindType == 2">商旅合同(预储值)</span>
                <span v-if="scope.row.remindType == 3">特殊合同</span>
                <span v-if="scope.row.remindType == 4">采购合同</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="expiration"
              align="center"
              label="到期时间 (天)"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  @click="handleContract(scope.row.id, scope.row)"
                  >修改合同时间</el-link
                >
              </template>
            </el-table-column>
          </mt-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增编辑 -->
    <mt-dialog
      :title="dialogTitle"
      v-model="isShow"
      style="text-align: center"
      @confirmBtn="confirm"
      width="40%"
      @closeFunc="closeFunc"
    >
      <template slot="dialog-body">
        <dictionary-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          ref="form"
        ></dictionary-form>
      </template>
    </mt-dialog>

    <!-- 修改时间弹窗 -->
    <el-dialog
      title="修改提醒时间"
      :visible.sync="DialogHandleDate"
      width="40%"
      center
    >
      <mt-form
        :col="1"
        label-width="120px"
        :model="tableDateForm"
        :rules="rules"
        ref="form"
      >
        <mt-form-item label="服务内容" prop="expiration" :spans="24">
          <el-col :span="5">
            <span>合同到期</span>
          </el-col>
          <el-col :span="10">
            <el-input
              v-model.number="tableDateForm.expiration"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
            ></el-input>
          </el-col>
          <el-col :span="5" :offset="2">
            <span> 天</span>
          </el-col>
        </mt-form-item>
      </mt-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleDateBtn()">确 定</el-button>
        <el-button @click="DialogHandleDate = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增调度任务类型 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="DialogaddUsertype"
      width="40%"
      center
    >
      <mt-form
        :col="1"
        label-width="120px"
        :model="tableDateconData"
        :rules="rules"
      >
        <mt-form-item label="调度任务类型" prop="name">
          <el-input
            v-model="tableDateconData.name"
            placeholder="请输入调度任务类型 "
          ></el-input>
        </mt-form-item>
        <mt-form-item label="调度方式" prop="name">
          <el-radio v-model="tableDateconData.schedulingMode" :label="0"
            >手持接收</el-radio
          >
          <el-radio v-model="tableDateconData.schedulingMode" :label="1"
            >后台调度</el-radio
          >
        </mt-form-item>
        <mt-form-item
          label="服务类型"
          v-show="tableDateconData.schedulingMode == 0"
          prop="type"
        >
          <el-checkbox-group v-model="tableDateconData.dispatchTypelist">
            <el-checkbox
              v-for="item in service"
              :label="item"
              :key="item.serviceId"
              >{{ item.serviceName }}
            </el-checkbox>
          </el-checkbox-group>
        </mt-form-item>
      </mt-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SchedulingAddBtn">确 定</el-button>
        <el-button @click="DialogaddUsertype = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import DictionaryForm from "@/components/other/Dictionary/DictionaryForm";
import DictionaryTable from "@/components/other/Dictionary/DictionaryTable";
import DictionaryPublic from "../dictionaryPublic";
import {
  dictionaryList,
  dictionaryDel,
  dictionarySave,
  dictionaryEdit,
  dictionaryDateList,
  dictionaryDateDel,
  dictionaryDateEdit,
  dictionaryDateSave,
  SchedulingList,
  SchedulingDel,
  SchedulingEdit,
  SchedulingSave,
  SchedulingSonList,
} from "@/api/dictionaryManage";
export default {
  components: {
    DictionaryForm,
    DictionaryTable,
    DictionaryPublic,
  },
  data() {
    return {
      dicPublicOne: "zh_ct_customer", //客戶类型
      dicPublicOneUser: "客户",
      dicPublicTwo: "zh_ct_type", //服务类型
      dicPublicOneService: "服务",
      dicPublicThree: "zh_ct_assets", //固定资产类型
      dicPublicOneType: "固定资产",
      dialogTitle: "新增",
      radio: "",
      total: 10,
      isShow: false,
      DialogHandleDate: false,
      DialogaddUsertype: false,
      tableData: [],
      tableDateForm: {
        remindType: "",
        expiration: null,
      },
      tableDateData: [], //到期时间
      tableSchedulingData: [], //调度任务
      tableDateconData: {
        name: "",
        schedulingmode: "1",
        dispatchTypename: "",
        dispatchTypelist: [],
        updator: "1",
      },

      rules: {
        expiration: [
          { required: true, message: "日期不能为空" },
          { type: "number", message: "日期必须为数字值" },
        ],
        name: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          { required: true, message: "至少选择一项", trigger: ["change"] },
        ],
      },
      config: {
        pageNum: 1,
        pageSize: 10,
        total: 100,
        loading: false,
      },
      serviceinfo: ["后台调度"],
      operateForm: {
        name: "",
        type: "",
        code: "",
        sn: "",
      },
      service: [],
      operateFormLabel: [
        {
          model: "type",
          label: "区域类型",
          type: "select",
          opts: [
            {
              label: "隔离区内",
              value: 0,
            },
            {
              label: "隔离区外",
              value: 1,
            },
          ],
        },

        {
          model: "name",
          label: "厅房区域",
          type: "input",
        },
        {
          model: "code",
          label: "编号",
          type: "input",
        },
        {
          model: "sn",
          label: "排列顺序",
          type: "sn",
        },
      ],
      date_id: "",
    };
  },
  created() {
    this.dictionaryManageGet();
    this.dictionaryDateGet();
    this.SchedulingListGet();
    this.getSchedulingSonList();
  },
  methods: {
    //厅房区域
    dictionaryManageGet() {
      dictionaryList(this.config).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    //到期时间
    dictionaryDateGet() {
      dictionaryDateList(this.config).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.tableDateData = res.data.list;
          this.config.total = res.data.total;
        }
      });
    },
    //调度任务
    SchedulingListGet() {
      SchedulingList(this.config).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.tableSchedulingData = res.data.list;
          this.config.total = res.data.total;
        }
      });
    },
    //调度分页
    SchedulingChange(val) {
      this.config.pageNum = val;
      this.SchedulingListGet();
    },
    //厅房分页
    dictionaryManageChange(val) {
      this.config.pageNum = val;
      this.dictionaryManageGet();
    },
    //厅房页数
    handleSizeChange(val) {
      this.config.pageSize = val;
      this.dictionaryManageGet();
      this.dictionaryDateGet();
    },
    //调度页数
    ScheduSizeChange(val) {
      this.config.pageSize = val;
      this.dictionaryManageGet();
    },
    //确定
    confirm() {
      console.log(this.$refs.form.form);
      this.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("必填项不能为空");

        const res = await dictionarySave(this.$refs.form.form);
        console.log(res);
        if (res.code !== 1) return this.$message.error(res.message);
        if (res.code == 1) {
          this.$message.success("保存成功");
          this.$nextTick(() => {
            this.$refs.form.resetFields();
            this.form = {};
          });
          this.isShow = false;
          this.dictionaryManageGet();
        }
      });
    },

    //修改合同
    async handleContract(id, row) {
      const res = await dictionaryDateEdit({
        id: id,
      });
      this.date_id = id;
      console.log(this.date_id);
      if (res.code !== 1) return this.$message.error("请求错误");
      this.tableDateForm = res.data;
      this.DialogHandleDate = true;
    },

    //时间确定
    HandleDateBtn() {
      this.$refs.form.$children[0].validate(async (valid) => {
        if (!valid) return this.$message.error("日期必须为数字");
        const res = await dictionaryDateSave({
          id: this.date_id,
          expiration: this.tableDateForm.expiration,
        });
        if (res.code !== 1) return this.$message.error(res.message);
        if (res.code == 1) {
          this.$message.success("保存成功");
        }
        this.DialogHandleDate = false;
        this.dictionaryDateGet();
      });
    },

    //调度保存
    async SchedulingAddBtn() {
      const res = await SchedulingSave(this.tableDateconData);
      console.log(res);
      // console.log(this.tableDateconData);
      if (res.code !== 1) return this.$message.error(res.message);
      this.DialogaddUsertype = false;
      this.SchedulingListGet();
    },
    //退出
    closeFunc() {
      this.$refs.form.resetFields();
    },

    addUser() {
      this.operateForm = {};
      this.dialogTitle = "新增";
      this.isShow = true;
    },
    //服务类型
    async getSchedulingSonList() {
      const res = await SchedulingSonList();
      console.log(res);
      this.service = [];
      let array = res.data;
      array.forEach((item) => {
        this.service.push({
          serviceId: item.id,
          serviceName: item.name,
          updator: "2",
        });
      });
    },
    //调度任务新增
    addUsertype() {
      // this.getSchedulingSonList()
      // this.service=res.data
      this.dialogTitle = "新增调度任务类型";
      this.DialogaddUsertype = true;
    },
    //编辑
    async editUser(id) {
      const res = await dictionaryEdit({
        id: id,
      });
      if (res.code !== 1) return this.$message.error("请求错误");
      this.operateForm = res.data;
      console.log(this.operateForm);
      this.dialogTitle = "修改";
      this.isShow = true;
    },
    //删除
    delUser(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await dictionaryDel({ ids: id });
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
            this.dictionaryManageGet();
          }
        })
        .catch(() => {});
    },
    //调度编辑
    async editScheduling(id) {
      const res = await SchedulingEdit({
        id: id,
      });
      console.log(res, 11);
      if (res.code !== 1) return this.$message.error("请求错误");
      this.tableDateconData = res.data;
      this.getSchedulingSonList();
      this.dialogTitle = "修改调度任务类型";
      this.DialogaddUsertype = true;
    },

    //调度删除
    delScheduling(id) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          const res = await SchedulingDel({ ids: id });
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
            this.SchedulingListGet();
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.el-card {
  margin: 15px;
}
.Addbtn {
  margin: 15px;
  text-align: right;
}

.el-row {
  margin: 25px 0;
}
</style>
