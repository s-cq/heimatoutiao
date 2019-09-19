<template>
<el-container>
    <!-- 左侧内容 -->
<el-aside>
    <!-- 左侧导航组件 -->
    <layout-aside></layout-aside>
</el-aside>
<!-- 右侧父容器 -->
<el-container>
    <!-- 头部 -->
    <el-header></el-header>

    <!-- 二级路由容器 -->
    <router-view>

    </router-view>
</el-container>

</el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside.vue'

export default {
  components: {
    'layout-aside': layoutAside

  }
}
</script>

<style>

</style>
