<template>
  <!-- 调用示例 -->
  <!-- <mt-table :data="tableData" :current-page="page" >
      <el-table-column  label="item.label" prop="item.prop"></el-table-column>
    </mt-table> -->

  <div class="mt-table">
    <el-table
      :data="data"
      :border="true"
      :size="size"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-cell-style="{ 'text-align': 'center' }"
      @cell-click="cellClick"
      @row-click="rowClick"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <slot></slot>
    </el-table>
    <!-- 分页 -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" class="page">
      <el-pagination
        class="mt-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :total="total"
        layout="sizes, prev, pager, next, jumper,total"
      ></el-pagination>
    </el-col>
  </div>
</template>
 
<script>
export default {
  name: "MtTable",
  props: {
    //表格数据源
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    size: String,
    rowStyle: [Object, Function],
    cellStyle: [Object, Function],
    headerStyle: [Object, Function],
    // 空数据时显示的文本内容
    emptyText: {
      type: String,
      default: () => {
        return "暂无数据";
      },
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: () => {},
    },
    // 每页显示条目个数
    pageSize: {
      type: Number,
      default: () => {
        return 10;
      },
    },
    // 总条目数
    total: {
      type: Number,
      default: () => {
        return 100;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 点击某个单元格
    cellClick(obj) {
      this.$emit("cell-click", obj);
    },
    // 点击某一行
    rowClick(obj) {
      this.$emit("rowClick", obj);
    },
    // 每页条数发生变化
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    // 当前页发生变化
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    },
  },
};
</script>
<style scoped>
.mt-page {
  text-align: right;
  margin-top: 10px;
}
</style>