<template>
    <div class="login-container">
      <div class="background">
      <img src="../assets/login_back.png" width="100%" height="100%" alt="" />
      </div> 
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h2 class="title">注册</h2>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    auto-complete="off" 
                    placeholder="用户名"></el-input>
            </el-form-item>
            
            <el-form-item prop="mailbox">
                <el-input type="text" 
                    v-model="ruleForm2.mailbox" 
                    auto-complete="off" 
                    placeholder="邮箱"></el-input>
            </el-form-item>
            
            
            <el-form-item prop="password">
                <el-input type="password" 
                    v-model="ruleForm2.password" 
                    auto-complete="off" 
                    placeholder="密码"></el-input>
            </el-form-item>

           <el-form-item prop="repassword">
                <el-input type="password" 
                    v-model="ruleForm2.repassword" 
                    auto-complete="off"
                    placeholder="再次输入密码"></el-input>
            </el-form-item>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleRegister" :loading="registering">注册</el-button>
            </el-form-item>
            <el-form-item >
                <!-- <el-checkbox 
                    v-model="checked"
                    class="rememberme">记住密码</el-checkbox> -->
                        
                <el-button type="text" @click="toLogin">返回登陆</el-button>
            </el-form-item>
            
        </el-form>
    </div>

</template>

<script>
  import { requestLogin } from '../api/api';
  import { requestRegister } from '../api/api';
  export default {
    data() {

//验证密码是否一致
      var validatorPass = (rules2, value, callback) => {
        if(value!==this.ruleForm2.password){
          callback(new Error("请输入一致的密码"));
        }else{
          callback();
        }
      }

      return {
        logining: false,
        ruleForm2: {
        },
        rules2: {

          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],


          mailbox:[
             { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

          ],

          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],

          repassword:[
            {validator: validatorPass, message: "密码不一致", trigger: 'blur'},

          ]


        },
        checked: true
      };
    },

    methods: {

      handleRegister() {
        this.$refs.ruleForm2.resetFields();
      },


      handleRegister(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.registering = true;
            var registerParams = { username: this.ruleForm2.username, password: this.ruleForm2.password, mailbox: this.ruleForm2.mailbox };
            requestRegister(registerParams).then(data => {
              this.registering = false;
              //返回的接口是信息，状态码
              let {code} = data;
              if (code !== 200) {
                this.$message({
                  message:"注册失败，请检查您的邮箱是否可用",
                  type: 'error'
                });
              } else {
               
                 this.$message({
                  message:"注册成功，请前往邮箱激活",
                  type: 'success'
                });
                  
              }
            });
          } else {

            console.log('error submit!!');
            return false;
          }
        });
      },

      toLogin(){
          this.$router.push({ path: '/login' });
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