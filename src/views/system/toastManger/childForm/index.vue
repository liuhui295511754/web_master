<template>
  <div>
    <el-card class="box-card" v-if="flag != null">
      <div slot="header" class="clearfix">{{ flag.serviceName }}</div>
      <div style="text-align: right; margin-bottom: 20px">
        <el-button size="mini" class="add-btn" @click="addListData"
          >新增</el-button
        >
        <el-button
          size="mini"
          type="primary"
          class="add-btn"
          @click="saveListData"
          >保存</el-button
        >
      </div>
      <el-table
        :data="ruleVoList"
        border
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
        }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="judge" label="判断">
          <template slot-scope="scope">
            <el-form-item
              :prop="`ruleVoList.${scope.$index}.judgeType`"
              :rules="rules.judge"
            >
              <el-select clearable v-model="scope.row.judgeType">
                <el-option label="之前" :value="0"></el-option>
                <el-option label="等于" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="valueType" label="取值字段">
          <template slot-scope="scope">
            <el-form-item
              :prop="`ruleVoList.${scope.$index}.valueType`"
              :rules="rules.valueType"
            >
              <el-select clearable v-model="scope.row.valueType">
                <el-option label="计划到达时间" :value="0"></el-option>
                <el-option label="实际到达时间" :value="1"></el-option>
                <el-option label="服务到期时间" :value="2"></el-option>
                <el-option label="计划起飞时间" :value="3"></el-option>
                <el-option label="实际登机时间" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="minute" label="字段判断时间">
          <template slot-scope="scope">
            <el-form-item
              :prop="`ruleVoList.${scope.$index}.minute`"
              :rules="rules.minute"
            >
              <el-input
                clearable
                v-model.number="scope.row.minute"
                :disabled="scope.row.judgeType == 1"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="triggerStatus" label="是否触发预警">
          <template slot-scope="scope">
            <el-form-item
              :prop="`ruleVoList.${scope.$index}.triggerStatus`"
              :rules="rules.triggerStatus"
            >
              <el-select clearable v-model="scope.row.triggerStatus">
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
              :prop="`ruleVoList.${scope.$index}.triggerMinute`"
              :rules="rules.triggerMinute"
            >
              <el-input
                clearable
                v-model.number="scope.row.triggerMinute"
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
              @click="DeleteListData(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleVoList: [
        {
          serviceName: "", //服务名称
          serviceId: null, //服务id
          judgeType: null, //判断类型
          minute: "", //判断时间
          triggerMinute: "", //未确认触发预警时间
          triggerStatus: null, //触发预警状态
          valueType: null, //取值字段
        },
      ],
      rules: {
        name: [{ required: true, message: "请选择", trigger: "blur" }],
        judgeType: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        valueType: [{ required: true, message: "请选择", trigger: "changge" }],
        minute: [
          { required: true, message: "请输入数字", trigger: "blur" },
          { type: "number", message: "请输入数字" },
        ],
        triggerStatus: [
          { required: true, message: "请选择", trigger: "changge" },
        ],
        triggerMinute: [
          {
            required: true,
            message: "请输入数字",
            trigger: "blur",
          },
          { type: "number", message: "请输入数字" },
        ],
      },
    };
  },
  methods: {
    // 新增表格行内表单
    addListData() {
      this.formlist.ruleVoList.push({
        serviceName: this.flag.serverName,
        serviceId: this.flag.id,
        judgeType: null,
        minute: "",
        triggerMinute: "",
        triggerStatus: null,
        valueType: null,
      });
    },
    saveListData() {
      let t = {
        id: JSON.parse(JSON.stringify(this.idList)),
        list: JSON.parse(JSON.stringify(this.formlist.ruleVoList)),
      };
      this.sessionList.push(t);
      // 如果二次提交以最新提交为主, 更新保存数据
      this.sessionList = this.formeArray(this.sessionList, "id");
      console.log("this.sessionList", this.sessionList);
    },
    DeleteListData(index, row) {
      this.$confirm("确定删除这条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        if (this.formlist.ruleVoList.length === 1) {
          this.$message.info("至少保存一条订单");
          return;
        }
        this.formlist.ruleVoList.splice(index, 1);
        this.$message.success("删除成功");
      });
    },
  },
};
</script>

<style>
</style>