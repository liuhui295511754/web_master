<template>
  <div>
    <el-table
      class="child-table"
      border
      :data="data"
      v-if="data.length > 0"
      :header-cell-style="{
        background: '#f5f7fa',
        'text-align': 'center',
      }"
      :cell-style="{ background: '#f5f7fa', 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="serviceNumber" label="服务单号"> </el-table-column>
      <el-table-column prop="servicemanageName" label="服务类型">
      </el-table-column>
      <el-table-column prop="hallName" label="服务厅房"> </el-table-column>
      <el-table-column prop="servicemanagePeople" label="服务人数">
      </el-table-column>

      <el-table-column prop="serviceAmount" label="服务金额"> </el-table-column>

      <el-table-column prop="state" label="服务单状态">
        <template slot-scope="scope">
          {{ scope.row.state == 0 ? "服务中" : "已完成" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="preview(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="warning" @click="dispatch(scope.row)"
            >调度</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "childTable",
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    preview(row) {
      this.$emit("preview", row);
    },
    dispatch(row) {
      this.$emit("child-dispatch", row);
    },
  },
};
</script>
