<template>
  <!-- 合同修改记录 -->
  <div class="business-modify-container">
    <div class="container">1、2020-06-23 10:29:01, 由 Nic 创建。</div>
    <div class="container">
      <span>
        2、2020-06-23 10:39:01, 由 Nic 编辑。
      </span>
      <el-button size="mini">-</el-button>
      <div v-for="(item, index) in his" :key="index" class="container-space">
          <span>修改了  "{{item.name}}" 原值 "{{item.old}}"，新值“{{item.new}}”；</span>
      </div>
    </div>
    <div class="container">
        <span>3、2020-06-23 10:29:01, 由 Nic 创建。</span>
        <el-button size='mini'>+</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      his: [
        {
          name: "zz",
          old: "123",
          new: "456"
        },
        {
          name: "zz",
          old: "456",
          new: "www"
        },
        {
          name: "zz",
          old: "www",
          new: "xxxz"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.business-modify-container {
    .container{
        margin: 15px;
        .container-space{
            margin-left: 20px;
            
        }
    }
}
</style>
