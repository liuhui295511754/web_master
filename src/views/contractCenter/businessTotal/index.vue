<template>
  <div class="contract-businessTotal-container">
    <!--查询-->
    <el-form :model="searchForm" :inline="true">
       <el-row >
         <el-form-item>
           <el-select
             v-model="searchForm.receptionUnitId"
             clearable
             placeholder="请选择商旅公司"
           >
             <el-option
               v-for="item in businessCompanyList"
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
           <el-button type="primary" @click="getTotalList">查询</el-button>
         </el-form-item>
         <el-form-item>
           <el-button type="primary">导出</el-button>
         </el-form-item>
       </el-row>
    </el-form>

    <!--table-->
    <mt-data-content>
      <mt-table
        :data="TableData"
        :currentPage="searchForm.pageNum"
        :pageSize="searchForm.pageSize"
        :headerStyle="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :total="total"
        @currentChange="handleCurrentChange"
        @size-change="handleSizeChange"
      >
        <el-table-column prop="code" label="合同编号"></el-table-column>
        <el-table-column prop="receptionUnitName" label="客户名称"></el-table-column>
        <el-table-column prop="name" label="合同名称"></el-table-column>
        <el-table-column prop="validity" label="合同有效期"></el-table-column>
        <el-table-column prop="deposit" label="合同保证金"></el-table-column>
        <el-table-column prop="whetherNaming" label="是否冠名厅合同"> </el-table-column>
        <el-table-column prop="guestservicesinout" label="嘉宾服务(隔离区内外)"></el-table-column>
        <el-table-column prop="guestservicesin" label="嘉宾服务(隔离区内)"></el-table-column>
        <el-table-column prop="guestservicesout" label="嘉宾服务(隔离区外)"></el-table-column>
        <el-table-column prop="receive" label="全流程接机"></el-table-column>
        <el-table-column prop="send" label="全流程送机"></el-table-column>
        <el-table-column prop="celeritysecurity" label="快速安检"></el-table-column>
        <el-table-column prop="fee" label="迎送宾"></el-table-column>
        <el-table-column prop="naming" label="冠名厅"></el-table-column>
        <el-table-column prop="packagehall" label="包厅"></el-table-column>
        <el-table-column prop="settleWay" label="结算方式"></el-table-column>
      </mt-table>
    </mt-data-content>
  </div>
</template>

<script>
  import {businessAfterList, receptionListType} from "@/api/businessAfter";
  import {getBusinessTotalList} from "@/api/businessTotal";

  export default {
    data() {
      return {
        TableData: [],
        beginDateAll:[],
        endDateAll:[],
        businessCompanyList: [],//商旅公司
        total: 100,
        fullscreenLoading: false,
        searchForm:{
          code:null,
          name:null,
          supplierName:null,
          receptionUnitId: null,
          receptionUnitName:null,
          pageNum: 1,
          pageSize: 10
        },
        form: {
          code: null,
          receptionUnitName: null,
          name: null,
          validity: null,
          deposit: null,
          whetherNaming: null,
          guestservicesinout: null,
          guestservicesin: null,
          guestservicesout: null,
          receive: null,
          send: null,
          celeritysecurity: null,
          fee: null,
          naming: null,
          packagehall: null,
          settleWay: null
        }
      }
    },
    created() {
      this.getReceptionType()
      this.getBusinessTotal()
    },
    methods: {
      async getBusinessTotal() {
        this.fullscreenLoading = true;
        const res=await getBusinessTotalList(this.searchForm)
        console.log(res);
        this.tableData = res.data.list
        this.total = res.data.total
      },
      async getReceptionType() {
        const res = await receptionListType({type:0})
        if(res.code == 1) {
          this.businessCompanyList = res.data;
          console.log(this.businessCompanyList);
          this.businessCompanyList.forEach(item => {
            this.form.receptionUnitId = item.id;
          })
          console.log(this.form.receptionUnitId);
          console.log(res);
        } else {
          this.$message.error(res.message);
        }
      },
      //查询
      async getTotalList() {
        this.searchForm.pageSize = 10;
        this.searchForm.pageNum = 1;
        this.getBusinessTotal()

      },

      // 翻页
      handleCurrentChange(val) {
        this.searchForm.pageNum = val;
        this.getBusinessTotal();
      },
      // 每页条数
      handleSizeChange(val) {
        this.searchForm.pageSize = val;
        this.getBusinessTotal();
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
