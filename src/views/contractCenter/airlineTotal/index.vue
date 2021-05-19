<template>
  <div class="contract-businessTotal-container">
     <el-form :model="searchForm" :inline="true">
      <el-row >
          <el-form-item>
            <el-select
              v-model="searchForm.airlineId"
              clearable
              placeholder="请选择航司"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="searchForm.name"
              placeholder="合同名称"
              style="width:170px"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="searchForm.supplierName"
              placeholder="合同编号"
              style="width:170px"
            ></el-input>
          </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="beginDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同开始时间"
            end-placeholder="合同开始时间"
            style="width:260px"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="endDateAll"
            type="daterange"
            range-separator="至"
            start-placeholder="合同到期时间"
            end-placeholder="合同到期时间"
            style="width:260px"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">导出</el-button>
          </el-form-item>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import {getAirline} from "@/api/airlineMessage";

  export default {
    data() {
      return {
        beginDateAll:[],
        endDateAll:[],
        options: [],
        searchForm:{
          code:null,
          name:null,
          airlineId:null,
          supplierName:null,
          pageNum:1,
          pageSize:10,

        },
        form: {
          airlineId:'',//客户ID
          airlineName:"",//客户名称
          code: null,//合同编号
          name: null,//合同名称
          deposit: null,//合同保证金
        }
      }
    },
    created() {
      this.getAirline();
    },
    methods: {
      async getAirline() {
        const res = await getAirline()
        if(res.code == 1) {
          console.log(res);
          this.options = res.data;
          this.options.forEach(item => {
            this.form.airlineId = item.id
          })
        } else {
          this.$message.error(res.message);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
