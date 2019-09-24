<template>
<el-card v-loading="loading">
  <!-- 自定义面包插件   引用卡片命名插槽header-->
<bread-crumb slot="header">
<!-- // 引用自定义命名插槽header -->
<template slot="title">
  评论列表
</template>
</bread-crumb>
    <el-table :data="list">
      <!-- colum 列     label  表头-->
        <el-table-column width="600px"  label="标题" prop="title"></el-table-column>
        <el-table-column :formatter="formatter" align="center" label="评论状态" prop="comment_status"></el-table-column>
        <el-table-column align="center" label="总评论数" prop="total_comment_count" ></el-table-column>
        <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count" ></el-table-column>
        <el-table-column align="center" label="操作"  >
          <!--element提供的 作用域插槽   -->
          <template slot-scope="obj">
            <el-button size="small" type="text">修改</el-button>
            <el-button size="small" type="text"
             @click="closeOrOpen(obj.row)">
             {{ obj.row.comment_status ? "关闭评论" : '打开评论'}}
             </el-button>
            </template>
        </el-table-column>

    </el-table  >
    <el-row type="flex" justify="center" style='margin:20px 0'>
          <el-pagination @current-change="changePage"
          :pageSize = "page.pageSize"
          :total = "page.total"
          :current-page = "page.currenPage"
  background
  layout="prev, pager, next"
  >
</el-pagination>
</el-row>
</el-card>
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
      },
      loading: false
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // return 返回当前单元格
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        // 请求参数对象形式  query 的是params
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.loading = false
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    closeOrOpen (row) {
      let mes = row.comment_status ? '关闭评论' : '打开评论'
      this.$confirm(`确定${mes}`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
