<template>
  <div>
    <el-row class="topBar">
      <el-col :xs="0" :sm="16" :md="16" :lg="16" :xl="16">
        <div class="logo">
          <img src="./../../../assets/logo/logo.png" preview height="65px" />
          <strong>贵宾管理系统</strong>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="header-right">
          <div style="margin: 40px">
            <i class="el-icon-lx-peoplefill" style="font-size: 18px"></i>
            超级管理员
          </div>
          <div @click="loginout">退出</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "topBar",
  methods: {
    async loginout() {
      this.$confirm("您将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push("/login");
      });

      //   await this.$store.dispatch("user/logout");
      //   this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  background: #304156;
  display: flex;
  position: fixed;
  z-index: 888;
  width: 100%;
  height: 85px;
  justify-content: space-between;
  align-items: center;
  padding-left: 55px;
  padding-right: 30px;
  color: #f0f8ff;
  .logo {
    float: left;
    display: flex;
    align-items: center;
    line-height: 70px;
  }
  .header-right {
    display: flex;
    float: right;
    /* padding-right: 50px; */
    font-size: 18px;
    height: 70px;
    align-items: center;
  }
}

strong {
  font-weight: 400;
  display: inline-block;
  margin-left: 30px;
  font-size: 40px;
  line-height: 65px;
}
</style>
