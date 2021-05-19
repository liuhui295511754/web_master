<template>
  <div>
    <el-dialog
      title="调度"
      :visible="value"
      :close-on-click-dialog="false"
      @close="close"
      :width="width"
      center
      class="ele-dialog"
    >
      <slot name="dialog-body">
        <el-form
          :model="form"
          :rules="rules"
          label-width="90px"
          label-position="center"
        >
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="分配角色:" prop="">
                <el-select v-model="form.stats">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="航班号:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="起飞/到达:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="起飞时间:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="到达时间:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="停机位:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="登机口:">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item label="服务厅房:">
                <el-select v-model="form.stats"></el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="备注:">
              <el-input type="textarea" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="旅客信息:">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="日期" width="120">
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="旅客姓名" width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="手机号"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-row>
        </el-form>
      </slot>
      <div slot="footer" class="dialog-footer">
        <slot name="dialog-footer">
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
          <el-button @click="close">关 闭</el-button>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dispacthForm",
  props: {
    // 显示与隐藏，绑定到v-model上的值
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    width: {
      type: String,
      default: "50%",
    },
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      rules: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    // 关闭窗口的事件
    close() {
      this.$emit("input", false);
    },
    // 确定
    confirmBtn() {
      this.$emit("confirm");
    },
    handleSelectionChange(val) {},
  },
};
</script>
