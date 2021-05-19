
<template>
  <el-dialog
    :title="title"
    :visible="value"
    :close-on-click-dialog="false"
    @close="close"
    :width="width"
    class="ele-dialog"
  >
    <slot name="dialog-body"></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="dialog-footer">
        <el-button type="primary" v-if="showConfirm" @click="confirmBtn"
          >确 定</el-button
        >
        <el-button @click="closeBtn">取 消</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "MtDialog",
  props: {
    //是否隐藏确认按钮
    showConfirm: {
      type: Boolean,
      default: true,
    },
    // 显示与隐藏，绑定到v-model上的值
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
    // 宽度
    width: {
      type: String,
      default: "60%",
    },
    // 标题
    title: {
      type: String,
      default: "新增",
      required: false,
    },
    // 关闭的事件回调
    closeFunc: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {};
  },
  created() {
    this.setDialogWidth();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth();
      })();
    };
  },
  methods: {
    // 关闭窗口的事件
    close() {
      this.$emit("input", false);
    },
    // 关闭按钮事件
    closeBtn() {
      if (this.closeFunc) {
        this.closeFunc();
      } else {
        this.close();
      }
    },
    // 确认按钮事件
    confirmBtn() {
      this.$emit("confirmBtn");
      //   if (this.confirmBtn) {
      //     this.confirmBtn();
      //   } else {
      //     this.close();
      //   }
    },
    setDialogWidth() {
      var val = document.body.clientWidth;
      const def = 1024; // 默认宽度
      if (val <= def) {
        this.width = "80%";
      }
    },
  },
};
</script>
<style scoped>
.dialog-footer {
  text-align: center;
}
</style>