<template>
<el-container>
    <!-- 左侧内容 -->
<el-aside style="width:200px;overflow:hidden;background-color:#323745">
    <!-- 左侧导航组件 -->
    <layout-aside></layout-aside>
</el-aside>
<!-- 右侧父容器 -->
<el-container >
    <!-- 头部 -->
    <el-header>
      <layout-header ></layout-header>
    </el-header>
<el-main style="padding:0">
    <!-- 二级路由容器 -->
    <router-view>

    </router-view>
    </el-main>
</el-container>

</el-container>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>

</style>
