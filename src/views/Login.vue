<template>

  <div class="login-container">

  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
      <!-- <div class="background">
      <img src="../assets/login_back.png" width="100%" height="100%" alt="" />
      </div>  -->
        
        <el-form :model="ruleForm" :rules="rules"
         status-icon
         ref="ruleForm" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
              
        <h2 class="title">WCSN物联网平台</h2>
        
        <!-- <div class="login-title">
				<span></span>      
        <a class="float-right a-link" @click="register">没有账户，立即注册</a>
        </div> -->
        <el-button type="text" @click="register">没有账户，立即注册</el-button>

        <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm.username" 
                    auto-complete="off" 
                    placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" 
                    v-model="ruleForm.password" 
                    auto-complete="off" 
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
            <el-form-item >
                <!-- <el-checkbox 
                    v-model="checked"
                    class="rememberme">记住密码</el-checkbox> -->
                
              <!-- <el-button type="primary" @click="register">注册</el-button>                 -->
                <el-button type="text" @click="forgetpassword">忘记密码</el-button>
            </el-form-item>
            
        </el-form>
    </div>

</template>

<script>
  import { requestLogin } from '../api/api';
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true,

        imgSrc:require('../assets/login_back.png'),


      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm.username, password: this.ruleForm.password};
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //返回的接口是信息，状态码，和用户
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                if (user.type === 1){
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.$router.push({ path: '/homepage' });
                } else if (user.type === "advert") {
                    sessionStorage.setItem('user', JSON.stringify(user));
                    this.$router.push({ path: '/table' });
                }
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      forgetpassword(){
          this.$alert('请联系管理员找回密码，管理员电话：wcsn', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      },

      register(){
          console.log("路由去register")
          this.$router.push({ path: '/register' });
      }

    }
  }
</script>

<style scoped>
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
    label.el-button.forget {
        margin: 0;
        padding: 0;
        border: 1px solid transparent;
        outline: none;
    }
</style>