<template>
<div>
      <el-row class='layout-header' type='flex' justify='space-between'>
      <!-- span是给col的宽度  elementUI将页面分为24分 -->
      <el-col class='left' :span="6">
          <i class='el-icon-s-unfold icon' style="ver"></i>
          <span>江苏传智播客教育有限公司</span>
      </el-col>
      <el-col :span="3" class='right'>
          <img style="vertical-aline:middle" class='head-img' :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
     <el-dropdown trigger="click" @command="commonClick">
         <!-- 匿名插槽 -->
       <span class="el-dropdown-link" >
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
       </span>
       <!-- 具名插槽 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="info">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="queit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </el-col>
  </el-row>
</div>
</template>

<script>
import eventBus from '../../../../laoshi heima/83heimatoutiao/src/utils/eventBus'

export default {
  data () {
    return {
      userInfo: '',
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {

    getUserInfo () {
      this.$axios({
        url: '/user/profile'

      }).then(result => {
        this.userInfo = result.data // 接收数据对象
      })
    },
    commonClick (key) {
      if (key === 'info') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = ('https://github.com')
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }

  },
  created () {
    this.getUserInfo()
    eventBus.$on('bbbb', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scopted>
.layout-header{
    height: 50px;
    margin: 10px;
    line-height: 50px;
    .el-icon-s-unfold{
        margin-right: 4px;
    }
    .head-img{
        vertical-align: middle;
         width:40px;
         height:40px;
         border-radius: 50%;
         margin-right: 5px;
    }

}
</style>
