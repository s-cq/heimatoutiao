<template>
<el-tabs class="tabs">
    <el-tab-pane label="素材库">
        <div class="box">
            <el-card  class="card" v-for="item in list" :key="item.id">
                <!-- 注意el-card没有点击事件  点击事件放在图片上 -->
                <img @click="clickImg(item)" :src="item.url" alt="">
            </el-card>
        </div>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

    </el-tab-pane>
     <el-row type='flex' justify="center">
            <el-pagination
                background
               layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               >
             </el-pagination>
            </el-row>
</el-tabs>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }

    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then((result) => {
        this.$emit('selectOneImg', result.data.url) // 向父组件传，用同一个自定义事件名，参数改变
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 点击图片事件
    clickImg (item) {
      this.$emit('selectOneImg', item.url)
    },

    // 获取所有图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.pageSize }
      }).then((result) => {
        this.list = result.data.results
        this.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.box{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // align-items:center;
    .card{
        margin: 10px;
        width: 120px;
        height: 120px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
