<template>
  <div class="box">
    <div class="aa" @click="openLayer(index)" v-for=" (item,index) in images" :key="index">
      <!-- <img :src="item ? item : default" alt="">   -->
      <img :src="item ? item : defaultImg" alt />

    </div>

     <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
           <!-- 监听谁[select-iamge子组件的图片点击]的事件就在谁的标签上写监听 -->
           <select-image @selectOneImg="receive"></select-image>
        </el-dialog>
  </div>
</template>

<script>
export default {
  // props只读不能fail，只能从父组件改
  props: ['images'],
  data () {
    return {

      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectImg: -1
    }
  },
  methods: {
    // 接受子组件穿过来的  image地址
    receive (url) {
      this.$emit('selecImg', url, this.selectImg) // 自定义事件
      this.dialogVisible = false
    },

    openLayer (index) {
      this.dialogVisible = true
      this.selectImg = index
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  display: flex;
  margin: 10px 0;
  margin-left: 100px;

  .aa {
    border: 1px solid #ccc;
    padding: 10px;
    width: 220px;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
