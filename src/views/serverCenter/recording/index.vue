<template>
  <div>
    <!-- 查询条件 -->
    <mt-search-content>
      <search-form></search-form>
    </mt-search-content>
    <!-- 表格 -->
    <mt-data-content>
      <el-table
        border
        :data="tableData"
        :currentPage="currentPage"
        :total="tableData.length"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          v-for="(item, index) in cols"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
        <el-table-column label="预约状态" prop="name1"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </mt-data-content>
    <!-- 弹窗 -->
    <mt-dialog title="查看" v-model="showDialog" @confirmBtn="confirm">
      <template slot="dialog-body"> 11 </template>
    </mt-dialog>
  </div>
</template>
<script>
import searchForm from "./searchForm";
export default {
  components: {
    searchForm,
  },
  data() {
    return {
      showDialog: false,
      cols: [
        { label: "订单号", prop: "name1" },
        { label: "登记位置", prop: "name1" },
        { label: "接待时间", prop: "name1" },

        { label: "客户类型", prop: "name1" },

        { label: "接待单位/卡号", prop: "name1" },

        { label: "结算类型/套餐", prop: "name1" },

        { label: "旅客姓名", prop: "name1" },

        { label: "航班号/航空公司/机号", prop: "name1" },

        { label: "随行人数", prop: "name1" },

        { label: "总服务人数", prop: "name1" },
        { label: "订单总金额", prop: "name1" },
        { label: "状态", prop: "name1" },
        { label: "复核人", prop: "name1" },
        { label: "复核时间", prop: "name1" },
        { label: "机号维护状态", prop: "name1" },
      ],
      tableData: [],
      currentPage: 1,
    };
  },
  methods: {
    handleView(index, row) {
      this.showDialog = true;
    },
    confirm() {},
  },
};
</script>