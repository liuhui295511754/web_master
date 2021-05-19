<template>
  <div>
    <el-form :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="服务类型" prop="serviceName">
            <el-select
              clearable
              v-model="form.serviceName"
              placeholder="请选择服务类型"
              @change="selectChange"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="厅房" prop="hallId">
            <el-select
              clearable
              v-model="form.hallId"
              placeholder="请选择厅房"
              value-key="id"
              @change="handChange"
            >
              <el-option
                v-for="item in hallList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="面积" prop="area">
            <el-input v-model="form.area" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="座位数" prop="seating">
            <el-input v-model="form.seating" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="价格" prop="price">
            <el-input
              clearable
              maxlength="10"
              v-model="form.price"
              onkeyup="this.value= this.value.match(/\d+(\.\d{0,4})?/) ? this.value.match(/\d+(\.\d{0,4})?/)[0] : ''"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="排列顺序" prop="sn">
            <el-input
              clearable
              v-model.number="form.sn"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="服务标准" prop="serviceStandard">
        <el-input
          clearable
          type="textarea"
          maxlength="200"
          v-model="form.serviceStandard"
          placeholder="请输入服务标准"
        ></el-input>
      </el-form-item>

      <el-form-item label="差异化服务" prop="differentiatedServices">
        <el-input
          clearable
          type="textarea"
          maxlength="200"
          v-model="form.differentiatedServices"
          placeholder="请输入差异化服务"
        ></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          clearable
          type="textarea"
          maxlength="200"
          v-model="form.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { serviceType } from "@/api/servicePrice";
import { SelectList } from "@/api/hallManage";
export default {
  name: "editForm",
  prop: {
    editForm: Object,
  },
  data() {
    return {
      serviceList: [],
      hallList: [],
      form: {
        serviceId: null,
        serviceName: null,
        hallId: null,
        hallName: "",
        area: null,
        seating: null,
        price: "",
        sn: null,
        serviceStandard: "",
        differentiatedServices: "",
        remark: "",
        areaName: "", //厅房区域
      },
      rules: {
        serviceName: {
          required: true,
          message: "请选择服务类型",
          trigger: "blur",
        },

        hallId: {
          required: true,
          message: "请选择厅房",
          trigger: "blur",
        },
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        sn: [
          {
            required: true,
            message: "请排序",
            trigger: "blur",
          },
          { type: "number", message: "序号必须为数字" },
        ],
        serviceStandard: {
          required: true,
          message: "请输入服务标准",
          trigger: "blur",
        },
        differentiatedServices: {
          required: true,
          message: "请输入差异化服务",
          trigger: "blur",
        },
      },
    };
  },
  created() {
    this.getOptionList();
  },

  methods: {
    //   获取服务类型
    getOptionList() {
      // 服务类型
      serviceType().then((res) => {
        if (res.code == 1) {
          this.serviceList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
      //   厅房类型
      SelectList().then((res) => {
        if (res.code == 1) {
          this.hallList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 选择服务类型
    selectChange(val) {
      this.serviceList.forEach((item) => {
        if (item.name == val) {
          this.form.serviceId = item.id;
        }
      });
    },

    handChange(val) {
      this.hallList.forEach((item) => {
        if (item.id == val) {
          this.form.hallName = item.name;
          this.form.area = item.area;
          this.form.seating = item.number;
          this.form.areaName = item.areaName;
        }
      });
    },
    // 金额输入不超过小数点后两位
    keyupEvent(e, input) {
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
      e.target.value = e.target.value.replace(/\.{2,}/g, ".");
      e.target.value = e.target.value.replace(/^\./g, "0.");
      e.target.value = e.target.value.replace(
        /^\d*\.\d*\./g,
        e.target.value.substring(0, e.target.value.length - 1)
      );
      e.target.value = e.target.value.replace(/^0[^\.]+/g, "0");
      e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
      this.form.price = e.target.value;
    },
  },
};
</script>
<style>
.el-select {
  width: 100%;
}
input {
  width: 100%;
}
</style>