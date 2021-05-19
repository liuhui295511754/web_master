<template>
  <div>
    <el-form :model="dialogForm" inline class="rule-form">
      <el-form-item>
        <el-input
          placeholder="更新订单号"
          v-model="dialogForm.orderNo"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          placeholder="机号"
          v-model="dialogForm.machineNumber"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="二字码/三字码"
          v-model="dialogForm.characterCode"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="二字码"
          v-model="dialogForm.twoCode"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="航班号"
          v-model="dialogForm.airlinesNuber"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="航空公司/航空公司代码"
          v-model="dialogForm.airplane"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="机号更新结果"
          v-model="dialogForm.updateStatus"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <mt-button txt="查询"></mt-button>
      </el-form-item>
    </el-form>
    <mt-button
      :txt="btnTitle"
      style="float: right; margin-bottom: 10px"
    ></mt-button>
    <mt-table
      :data="tableData"
      :cell-style="addClass"
      :headerStyle="{ 'text-align': 'center' }"
      :cellStyle="{ 'text-align': 'center' }"
      :total="total"
      :currentPage="currentPage"
      @size-change="SizeChange"
      @currentChange="CurrentChange"
    >
      <template v-for="(col, index) in column">
        <el-table-column :key="index" :prop="col.prop" :label="col.label">
        </el-table-column>
      </template>
    </mt-table>
  </div>
</template>
<script>
export default {
  name: "detailForm",

  data() {
    return {
      // 机号更新详情 /湿租规则执行记录
      btnTitle: "导出机号更新详情",
      dialogForm: {
        airplane: null,
        characterCode: null,
        machineNumber: null,
        orderNo: null,
        twoCode: null,
        pageNum: 1,
        pageSize: 10,
        planeNumber: null,
        updateStatus: null,
      },
      tableData: [],
      column: [
        {
          label: "更新批号",
          prop: "",
        },
        {
          label: "机号（JH）",
          prop: "",
        },
        {
          label: " 航班实际起飞/降落日期（DATE)",
          prop: "",
        },
        {
          label: "实际起飞/降落时间（QJSJ）",
          prop: "",
        },
        {
          label: "二字码/三字码（CYR)",
          prop: "",
        },
        {
          label: "航班号（HBH)",
          prop: "",
        },
        {
          label: "进出港（IO）",
          prop: "",
        },
        {
          label: "航空公司（HKGS）",
          prop: "",
        },
      ],
    };
  },
  methods: {
    //判断更新结果异常
    addClass({ row, column, rowIndex, columnIndex }) {
      return { "text-align": "center" };
    },

    // 每页条数发生变化
    SizeChange(val) {
      this.$emit("size-change", val);
    },
    // 当前页发生变化
    CurrentChange(val) {
      this.$emit("current-change", val);
    },
  },
};
</script>