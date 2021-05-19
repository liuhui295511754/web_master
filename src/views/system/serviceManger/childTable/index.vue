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
      <el-table-column prop="name" label="子服务名称"> </el-table-column>

      <el-table-column prop="need" label="是否需要分配厅房">
        <template slot-scope="scope">
          {{ scope.row.need == 1 ? "需要" : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="serviceOne" label="服务人数">
        <template slot-scope="scope">
          {{ scope.row.serviceOne == 1 ? "获取登机牌、" : ""
          }}{{ scope.row.serviceTwo == 1 ? "手动输入" : "" }}
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="说明"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "childTable",
  props: {
    data: Array,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {},
  methods: {
    handleEdit(index, row) {
      this.$emit("edit", index, row);
    },
    handleDelete(index, row) {
      this.$emit("det", index, row);
    },
  },
};
</script>
