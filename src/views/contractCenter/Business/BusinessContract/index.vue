<template>
  <!-- 套餐服务 -->
  <div class="business-contract-container">
    <div>
      
        <!-- <span>套餐服务</span> -->
        
      

      <div v-for="(item, index) in task_arr" :key="index">
        <div>
          <el-form ref="form" :model="formLabel" label-width="100px">
            <el-row :gutter="40">
              <!-- <el-col :span="24">
                <el-form-item label="服务内容">
                  <el-input
                    type="textarea"
                    v-model="formLabel.customerName"
                    class="resizeNone"
                    :rows="3"
                    resize="none"
                    placeholder="请输入内容 "
                  ></el-input>
                </el-form-item>
              </el-col> -->

              <el-col :span="12">
                <el-form-item label="套餐名称">
                  <el-select
                    v-model="formLabel.packageName"
                    placeholder="套餐一"
                    style="width:100%"
                  >
                    <el-option label="套餐一" value="wuhan"></el-option>
                    <el-option label="套餐二" value="wuhan"></el-option>
                    <el-option label="套餐一" value="wuhan"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收费标准">
                  <el-input v-model="formLabel.fee"></el-input>
                </el-form-item>
              </el-col>
          <!-- <el-col :span="21">
              <el-form-item label="套餐服务" v-model="checkList">
                  <el-checkbox label="嘉宾服务" v-model="formLabel.settlementOne"></el-checkbox>
                  <el-checkbox label="全流程服务"></el-checkbox>
                  <el-checkbox label="快速安检服务"></el-checkbox>
          </el-form-item>
        </el-col> -->
              <el-col :span="12" :offset="10">
                <el-button
                  type="danger"
                  style="width:120px"
                  @click="delet(index)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "BusinessContract",
  data() {
    return {
      // 自定义服务新增
      package: [1, 2, 3],
      task_arr: [
        {
          package: null,
          task_num: 1
        }
      ],

      checkList: ["a", "b"],
      radio: "1",
      imageUrl: "",
      
    };
  },
  props: {
    formLabel: {
      type: Object,
      required: true
    },
  },
  methods: {

    add() {
      let obj = {
        package: null,
        task_num: 1
      };
      this.task_arr.push(obj);
    },
    delet(index) {
      if (this.task_arr.length !== 1) {
        this.task_arr.splice(index, 1);
      } else {
        return this.$message.error("最少有一项");
      }
    }

  }
};
</script>

<style lang="scss" scoped>
.business-contract-container {
  .el-card {
    margin-bottom: 15px;
  }
  .el-col {
    margin-bottom: 20px;
  }
  .avatar-uploader {
    width: 178px;
    border: 1px solid #838383;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 78px;
    line-height: 78px;
    margin-left: 34px;
  }

    // display: flex;
    // align-items: center;
    // justify-content: space-between;

  // .pricemarign {
  //   margin-left: 10px;
  //   height: 40px;
  //   line-height: 40px;
  // }
}
</style>
