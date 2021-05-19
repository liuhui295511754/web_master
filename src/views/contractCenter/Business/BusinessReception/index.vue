<template>
  <div>
    <!-- <p>迎送宾服务</p> -->
    <div>
      <mt-form ref="form" :model="formLabel" label-width="100px">
        <el-row :gutter="40">
          <!-- <mt-form-item label="服务内容" :spans="24">
            <el-input
              type="textarea"
              v-model="formLabel.customerName"
              :rows="3"
              resize="none"
              placeholder="请输入内容 "
            ></el-input>
          </mt-form-item> -->

          <mt-form-item label="收费标准" :spans="12">
            <el-input v-model="formLabel.customerName"></el-input>
          </mt-form-item>
          <el-col :span="12">
            <div class="pricemarign">元/人</div>
          </el-col>
        </el-row>
      </mt-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formLabel: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
 .pricemarign {
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
  }</style>
