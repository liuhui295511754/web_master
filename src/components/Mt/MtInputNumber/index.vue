<template>

  <el-input-number
    v-if="type == 'number'"
    :placeholder="placeholder"
    :controls="false"
    :min="min"
    :max="max"
    :size="size"
  ></el-input-number>
  <el-input-number
    v-else-if="type =='decimal'"
    :precision="precision"
    :placeholder="placeholder"
    :controls="false"
    :min="min"
    :max="max"
    :size="size"
  ></el-input-number>
</template>
<script>
export default {
  name: "MtInputNumber",
  props: {
    size: String,
    label: String,
    placeholder: String,
    // 类型
    type: {
        type:String,
        default:()=>{
            return 'number'
        },
        required:true
    },
    // 小数点保留位数
    precision: Number,
    // 最小值
    min: {
      type: Number,
      default: -Infinity,
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity,
    },
  },
};
</script>
