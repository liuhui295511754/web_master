<template>
  <el-button
    ref="btn"
    class="mt-button"
    :type="type"
    :icon="icon"
    :round="round"
    :circle="circle"
    @click="_click"
    >{{ txt }}</el-button
  >
</template>
  
<script>
export default {
  name: "MtButton",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    icon: String,
    size: String,
    txt: String,
    round: String,
    circle: String,
  },
  methods: {
    _click: function () {
      this.$emit("click", function () {});
    },
  },
};
</script>
