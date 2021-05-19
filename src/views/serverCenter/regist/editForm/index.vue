<template>
  <div></div>
</template>
<script>
export default {
  name: "editForm",
  components: {
    customerInfoForm,
    customerTypeForm,
    entourageInfoForm,
    serviceInfoForm,
    orderInfoForm,
  },
  data() {
    return {
      options: [], //客户属性

      personList: [], //随行人员数组
      tableData: [],
    };
  },
  created() {
    this.options = [
      {
        value: "选项1",
        label: "黄金糕",
      },
      {
        value: "选项2",
        label: "黄金2222糕",
      },
    ];
  },
  methods: {},
};
</script>
