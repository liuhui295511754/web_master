<template>
  <!-- 价格修改 -->
  <div class="business-price-container">
    <el-form
      ref="formLabel"
      :model="formLabel"
      label-width="80px"
      :rules="rules"
    >
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div>合同编号：{{formLabel.contractNumber}}</div></el-col>
        <el-col :span="6"><div>合同名称：{{formLabel.contractNamer}}</div></el-col>
        <el-col :span="6"><div>客户名称：{{formLabel.customerName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-col :span="8">价格生效时间：</el-col>
          <el-radio-group v-model.number="radio">
            <el-radio :label="6">人工平账</el-radio>
            <el-radio :label="8">自动平账</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="生效时间(精确到S)"></el-input>
        </el-col>
      </el-row>
      <div>
        <el-row>价格修改</el-row>
        <div class="pricebox">
          <div class="pricebox-content">
            <el-col :span="12">
              <el-form-item label="套餐名称" prop="contractNumber">
                <el-input
                  v-model="formLabel.contractNumber"
                  placeholder="套餐一"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收费标准" prop="contractNumber">
                <el-input
                  v-model="formLabel.contractNumber"
                  placeholder="(人民币：元/人)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="套餐服务" prop="type">
                <el-checkbox-group v-model="formLabel.type">
                  <el-checkbox label="嘉宾服务" name="type"></el-checkbox>
                  <el-checkbox label="全流程服务" name="type"></el-checkbox>
                  <el-checkbox label="快速安检服务" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </div>
        </div>
      </div>

      <div>
        <el-row>包厅服务</el-row>
        <div class="pricebox">
          <div class="pricebox-content">
            <el-col :span="12">
              <el-form-item label="收费标准">
                <el-input
                  v-model="formLabel.contractNumber"
                  placeholder="折扣率"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <span class="price-prompt"
                  >提示：按照散客包厅标准价格乘以折扣率</span
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="pricemarign">元/人</div>
            </el-col>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      checkList: [],
      rules: {
        contractNumber: [
          {
            required: true,
            message: "必填项不能为空",
            trigger: ["blur", "change"]
          }
        ],
        type: [{ required: true, message: "至少选择一项", trigger: ["blur", "change"] }]
      }
    };
  },
  props: {
    formLabel: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 40px;
  margin-top: 20px;
}
.el-dialog__headerbtn {
  font-size: 20px;
}
.business-price-container {
  width: 900px;
  .pricebox {
    display: flex;
    height: 100%;
    border: 1px solid #000000;
    .pricebox-content {
      width: 100%;
      margin: 20px;
      .price-prompt {
        font-size: 12px;
        color: rgb(50, 177, 134);
      }
    }
  }
  .pricemarign {
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
