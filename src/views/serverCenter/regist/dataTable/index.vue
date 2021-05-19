<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%; margin-bottom: 20px"
      border
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      :row-class-name="getRowClassName"
    >
      <el-table-column type="expand" prop="serviceInfoTwoVOS">
        <template slot-scope="scope">
          <childTable
            :data="scope.row.serviceInfoTwoVOS"
            ref="childTable"
            @edit="handleEdit"
            @preview="preview"
            @child-dispatch="dispatch"
          ></childTable>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="订单号" prop="orderNo"></el-table-column>
      <el-table-column label="接待时间" prop="receptionTime"></el-table-column>
      <el-table-column label="客户类型" prop="customerType"></el-table-column>
      <el-table-column label="接待单位/卡号" prop="rc"></el-table-column>
      <el-table-column label="结算类型/套餐" prop="sm"></el-table-column>
      <el-table-column label="旅客姓名" prop="name"></el-table-column>
      <el-table-column
        label="航班号/航空公司/机号"
        prop="fam"
      ></el-table-column>
      <el-table-column
        label="随行人数"
        prop="accompanyPeople"
      ></el-table-column>
      <el-table-column
        label="总服务人数"
        prop="servicePeople"
      ></el-table-column>
      <el-table-column label="订单总金额" prop="orderAmount"></el-table-column>
      <el-table-column
        label="服务完成度"
        prop="serviceCompletion"
      ></el-table-column>
      <el-table-column label="订单状态" prop="state">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">新增</span>
          <span v-else-if="scope.row.state == 1">服务中</span>
          <span v-else-if="scope.row.state == 2">已完成</span>
          <span v-else-if="scope.row.state == 3">已复核</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="handDetail(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="Edit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handleWrite(scope.row)"
            >修改记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import childTable from "./../childTable/index";
export default {
  components: { childTable },
  name: "dataTable",
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    //查看
    handDetail(row) {
      this.$emit("preview", row, "主表");
    },
    //编辑
    handleEdit(row) {
      this.$emit("child-edit", row, "子表");
    },
    Edit(row) {
      this.$emit("edit", row, "主表");
    },
    //修改记录
    handleWrite(row) {
      this.$emit("write", row);
    },
    preview(row) {
      this.$emit("child-preview", row, "子表");
    },
    dispatch(row) {
      this.$emit("child-dispatch", row, "子表");
    },
    // 没有子表 默认不展开
    getRowClassName({ row, rowIndex }) {
      if (row.serviceInfoTwoVOS.length == 0) {
        return "row-expand-cover";
      }
    },
  },
};
</script>
<style>
/* 表格没有子表不展开 */
.row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}

.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}
</style>