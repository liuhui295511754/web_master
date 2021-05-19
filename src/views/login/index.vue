<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">贵宾管理系统</div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form
            :model="param"
            :rules="rules"
            ref="login"
            label-width="0px"
            class="ms-content"
            size="medium"
          >
            <el-form-item prop="username">
              <el-input v-model="param.username" placeholder="账号"> </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="param.password"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                placeholder="验证码"
                v-model="param.code"
                @keyup.enter.native="submitForm()"
              >
                <template slot="append">
                  <validate-code
                    ref="validate-code"
                    @change="_setCheckCode"
                  ></validate-code>
                </template>
              </el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button
                v-loading.fullscreen.lock="loading"
                type="primary"
                @click="submitForm()"
                >登录</el-button
              >
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import validateCode from "@/components/other/ValidateCode";
export default {
  components: {
    validateCode,
  },
  data: function () {
    var checkYanzhengma = (rule, value, callback) => {
      value = value.toUpperCase();
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.checkCode) {
        callback(new Error("验证码错误"));
        this.$refs["validate-code"].draw();
      } else {
        callback();
      }
    };
    return {
      loading: false,
      param: {
        username: "admin",
        password: "123123",
        code: "",
      },
      checkCode: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入图片验证码", trigger: "blur" },
          { validator: checkYanzhengma, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    _setCheckCode(value) {
      this.checkCode = value;
    },
    submitForm() {
      this.$router.push("/system/hallManager");
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
          this.loading = true;
          console.log(this);

          //   this.$store
          //     .dispatch("user/login", this.param)
          //     .then(() => {
          //       this.$router.push({ path: this.redirect || "/" });
          //       this.loading = false;
          //     })
          //     .catch(() => {
          //       this.loading = false;
          //     });
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.el-input-group__append {
  border-left: 0;
  padding: 0 !important;
}
</style>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("./../../assets/login-bgimage/login-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.ms-title {
  width: 100%;
  font-size: 26px;
  font-weight: 400;
  color: #1a99ff;
  text-align: center;
  font-weight: 700;
  margin-top: 30px;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  /* width: 420px; */
  align-items: center;
  transform: translate(-50%, -50%);
  max-width: 100%;
  /* margin: -190px 0 0 -175px; */
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  padding: 0 40px;
  box-sizing: border-box;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.validate-code-wrapper {
  width: 150px;
  height: 34px;
}
</style>