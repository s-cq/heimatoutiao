<template>

<el-card  >

    <bread-crumb slot="header">
        <template slot="title">
            素材管理
        </template>
    </bread-crumb>
    <!-- content-type  要求formdata  传表单数据 -->
      <!-- http-request 覆盖默认action的上传行为，可以自定义上传的实现 表达式为函数方法，传回带有file的参数 -->
    <el-upload :show-file-list='false' class="btn" :http-request="uploadImg" action="">
        <el-button type="primary" size="medium ">点击上传</el-button>
    </el-upload>
    <!-- 标签页插件  el-tabs=>>el-tab-pane -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部" name="all">
        <div class="img-list">
           <el-card class="img_item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="">
              <div class="operate">
                  <!-- 根据返回的is_collected判断是否收藏了，改变颜色 -->
               <i @click='aaa(item)' :style="{color:item.is_collected?'red':'#000'}" class="el-icon-star-on"></i>
               <i @click='del(item.id)' class="el-icon-delete-solid"></i>
           </div>
           </el-card>

        </div>

    </el-tab-pane>
    <el-tab-pane label="收藏" name="collect">
         <div class="img-list">
             <!-- 与all通用一个list，切换后，通过params请求的collect的改变，返回的list不同 -->
           <el-card class="img_item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="">
           </el-card>
        </div>
    </el-tab-pane>

  </el-tabs>

  <el-row class="row">
      <!-- 饿了吗带有的属性total、current-page、page-size -->
<el-pagination
@current-change="changePage"
  background
  layout="prev, pager, next"
  :total="page.total"
  :current-page="page.currentPage"
  :page-size="page.pageSize">
</el-pagination>

  </el-row>

</el-card>

</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      page: {
        total: 0,
        currenpage: 1,
        pageSize: 10
      },
      list: []

    }
  },
  methods: {
    aaa (item) {
      this.$confirm(`确定${item.is_collected ? '取消' : ''}收藏`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    del (id) {
      this.$confirm(`确定删除？`).then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },

    //   点击页码换页 elemment带有的changPage方法传回newPage
    changePage (newpage) {
      this.page.currenpage = newpage
      this.getMaterial()
    },
    // 切换页签方法 页面回到第一页
    changeTab () {
      this.page.currenpage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // this.activeName 判断是收藏/全部，collect/all
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currenpage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.btn{
    position: absolute;
    right: 20px;
    margin-top:-10px;
     z-index: 1;
}
.row{
    display: flex;
    justify-content: center;
}
.img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img_item{

        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        margin: 20px;
        img{
            width: 100%;
            height: 100%;
        };
        .operate{
            position: absolute;
            background-color: #f4f5f6;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            i{
                font-size: 18px;
          //       &mouseover {
          //   cursor: 'hand'
          //  }

            }

        }
    }
}
</style>
