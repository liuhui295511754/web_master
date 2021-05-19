<template>
  <div class="dashboard-container">
    <div class="dashboard-text">您好,欢迎使用</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    font-weight: bolder;
    color: #999;
  }
}
</style>
