<template>
<div class="login">
 <el-card class="login-card">

    <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
    </div>

    <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
            <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input  v-model="loginForm.code" placeholder="请输入验证码" style="width:65%" ></el-input>
            <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
                 <!-- 同意选项 -->
            <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
                  <!-- 登录按钮 -->
                  <!-- 注册点击事件 -->
            <el-button style="width:100%" type="primary" @click="login">登录</el-button>
       </el-form-item>

    </el-form>
   </el-card>
</div>
</template>

<script>
export default {

  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: ''
      },
      loginRules: {
        mobile: [{ required: true, message: '输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '不正确' }],
        code: [{ required: true, message: '输入验证码' }, { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator: function (rule, value, callBack) {
          value ? callBack() : callBack(new Error('同意'))
        } }]
      }
    }
  },
  methods: {
    login () {
      // 获取myform的dom节点上的validate的方法
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            //   存储令牌健名自定义
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: ('手机号或验证码错误')
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login{
        background-image: url('../../assets/img/login_bg.jpg');
        height: 100vh;
        background-size: cover;
        display: flex;
    justify-content: center;
    align-items: center;
    .login-card{

        width: 400px;
        height: 340px;
        .title{
            text-align: center;
            margin: 10px;
            img {
                height: 45px;
            }
        }
    }
    }

</style>
