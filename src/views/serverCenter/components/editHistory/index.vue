<template>
  <div>
    <el-dialog
      :title="title"
      :visible="value"
      :close-on-click-dialog="false"
      @close="close"
      :width="width"
      center
      class="ele-dialog"
    >
      <slot name="dialog-body"></slot>
      <div slot="footer" class="dialog-footer">
        <slot name="dialog-footer">
          <el-button type="primary" @click="confirmBtn">关 闭</el-button>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "editHistory",
  props: {
    // 显示与隐藏，绑定到v-model上的值
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 关闭窗口的事件
    close() {
      this.$emit("input", false);
    },
  },
};
</script>