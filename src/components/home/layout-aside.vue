<template>
  <div class="layout-aside">
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="" >
    </div>
    <el-menu
    style="width:201px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#adafb5"
      router
      >

       <el-menu-item index="/home" >
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">

        <template slot="title" index="1">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-document"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanpic">粉丝列表</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝画像</el-menu-item>
      </el-submenu>
      <el-menu-item >
        <i class="el-icon-s-tools"></i>
        <span slot="title"  >账户信息</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scopted>
.layout-aside{
  background-color: #323745;
  height:100vh;
  width: 200px;
  .title{
    text-align: center;
    background-color: #2e2f32;
    padding: 10px;
    img{
      height: 30px;
    }
  }
}
</style>
