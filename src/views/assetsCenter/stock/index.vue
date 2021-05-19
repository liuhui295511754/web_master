<template>
  <div>
    <el-menu :default-active="this.$router.path" router mode="horizontal">
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        { name: "../../system/settleType", navItem: "类型" },
        { name: "../../system/terminal", navItem: "是" },
        { name: "../../system/vipManager", navItem: "会员" }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
