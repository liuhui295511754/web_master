<template>
  <div>
    <el-table
      class="child-table"
      border
      :data="childTableData"
      :header-cell-style="{
      background: '#f5f7fa',
      'text-align': 'center',
      }"
      :cell-style="{ background: '#f5f7fa', 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="航空分公司名称"> </el-table-column>
      <el-table-column prop="twoCharacterCode" label="航司二字码"></el-table-column>
      <el-table-column prop="threeCharacterCode" label="航司三字码"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  // import { Details } from "@/api/airlineManage/airlineMaintain";
  export default {
    name: 'childTable',
    props: {
      childTableData: {
        type: Array,
      },
    },
    data() {
      return {
        // childTableData: [],
      };
    },
    created() {
    },
    methods: {
      // getChildTableData() {
      //   this.loading = true;
      //   Details({ id: this.id }).then(res => {
      //     this.loading = false;
      //     if (res.code == 1) {
      //       this.childTableData = res.data;
      //       console.log(this.childTableData);
      //       console.log(res)
      //     } else {
      //       this.$message.error(res.message);
      //     }
      //   });
      // },

      handleEdit(index, row) {
        this.$emit("editChild", index, row);
        console.log(index, row)
      },
      handleDelete(index, row) {
        this.$emit("delChild", index, row);
      },

    }

  }
</script>

<style scoped>

</style>
