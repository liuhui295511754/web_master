<template>
  <div>
    <p>结算价格</p>
    <el-card>
      <el-form :model="formPriceLabel" ref="form">
        <el-table :data="formData" border stripe style="width: 100%;">
          <el-table-column prop="settlementName" label="结算类型">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.settlementName" disabled></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="selfPrice" label="本人(价格)">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.selfPrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="entouragePrice" label="随行(价格)">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.entouragePrice"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="entourageNum" label="随行人数">
            <template slot-scope="scope">
              <el-form-item>
                <el-input v-model="scope.row.entourageNum"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props:{
    formData:{
      type:Array,
      required:true
    },
    formPriceLabel:{
      type:Object,
      required:true
    }
  },
  created() {
    // this.formData.tableData = this.sss;
    // console.log(this.formData.tableData);
    // console.log(this.formData.oneself);
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
