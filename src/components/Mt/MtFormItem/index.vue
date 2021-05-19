<template>
  <el-col :span="span">
    <el-form-item :label="label" :prop="prop" class="mt-form-item">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: 'MtFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    spans: {
      type: Number
    }
  },
  inject: {
    col: { default: 1 }
  },
  data() {
    return {
      span: null
    }
  },
  mounted() {
    this.initspan()
  },
  methods: {
    initspan() {
      if (this.spans) {
        this.span = this.spans
      } else {
        this.span = 24 / this.col
      }
    }
  }
}
</script>