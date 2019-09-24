<template>
  <el-card>
    <bread-crumb slot="header">
    <template slot="title">
      内容列表
    </template>
    </bread-crumb>
    {{formDate}}
    <el-form style="margin-left: 100px">
      <!-- 文章状态 ==============================-->
      <el-form-item label="文章状态:">
        <!-- el-radio-group中 v-model绑定的值如果是空label值则不会默认绑定显示
         change事件 选中的 Radio label 值 -->
       <el-radio-group  @change="changeCondition" v-model="formDate.status">
    <el-radio :label="5">全部</el-radio>
    <el-radio :label="0">草稿</el-radio>
    <el-radio :label="1">待审核</el-radio>
    <el-radio :label="2">审核通过</el-radio>
    <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>
      </el-form-item>
      <!-- 频道列表 ===============================-->
      <el-form-item label="频道列表:">

     <el-select @change="changeCondition" v-model="formDate.channel_id" placeholder="请选择">
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <!-- </el-select> -->
      </el-form-item>
      <!-- 时间选择 =================================-->
      <el-form-item label="时间选择:">

<!-- 组件绑定值。格式与绑定值一致，可受 value-format 控制
2019-01-02   要求传入的格式 -->
    <el-date-picker @change="changeCondition"
    v-model="formDate.date"
      type="daterange"
      value-format="yyyy-MM-dd"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>

      </el-form-item>
    </el-form>
    <!-- 主体部分===================================== -->
        <div class='total'>共找到{{page.total}}条符合条件的内容</div>
    <div class='article-item' v-for="(item,index) in list" :key="index">
        <!-- 布局 -->
        <!-- 左侧 -->
       <div class='left'>
           <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
           <div class='info'>
               <span class='title'>{{item.title}}</span>
               <el-tag class='status' :type="item.status | filtColor">{{item.status | filtStatus}}</el-tag>
               <span class='date'>{{item.pubdate}}</span>
           </div>
       </div>
       <!-- 右侧 -->
       <div class='right'>
           <span @click="goEdit(item.id)" ><i class="el-icon-edit"></i>修改</span>
           <span  @click="del(item.id)"><i class="el-icon-delete"></i>删除</span>
       </div>
    </div>
    <el-row type="flex" justify="center">
         <el-pagination @current-change="changePage"
  background
  layout="prev, pager, next"
  :total='page.total'
  :page-size='page.pageSize'
  :current-page="page.currenPage">
</el-pagination>
    </el-row>

  </el-card>
</template>

<script>
export default {

  data () {
    return {
      formDate: {
        status: 5, // 文章状态 默认状态为5，全部，在上传参数时改为空（null）
        channel_id: null, // 频道id
        date: [] // 事件参数 有两个
      },
      channels: [], // 频道数组   接口为返回值为 id 和 name的数组
      // 默认图片地址 base64位  用require包裹地址
      defaultImg: require('../../assets/img/404.png'),
      // 文章列表
      list: [],
      page: {
        total: 0,
        currenPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    goEdit (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    del (id) {
      this.$confirm('确定？').then(() => {
        // id超过了安全数字限制 被jsonbigint转成了bigNUmber类型 要想变成字符串
        // id.toString()

        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.queryArticles()
        })
      })
    },
    // 在第某页搜索时，回到第一页
    changeCondition () {
      this.currenPage = 1
      this.queryArticles()
    },
    // 改变页码时
    changePage (newPage) {
      this.page.currenPage = newPage
      this.queryArticles()
    },

    // 可用一个筛选方法：一，参数不是必须传的。二：elemment组件带有的方法传入对应的绑定的参数
    queryArticles () {
      let params = {
        status: this.formDate.status === 5 ? null : this.formDate.status,
        channel_id: this.formDate.channel_id,
        begin_pubdate: this.formDate.date.length ? this.formDate.date[0] : null,
        end_pubdate: this.formDate.date.length > 1 ? this.formDate.date[1] : null,
        per_page: this.page.pageSize,
        page: this.page.currenPage
      }

      this.getArticles(params)
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params

      }).then((result) => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }

  },
  filters: {
    // 过滤状态码  ==》》   变成文字
    filtStatus (value) {
      switch (value) {
        case 0:

          return '草稿'
        case 1:

          return '待审核'
        case 2:

          return '已发表'
        case 3:

          return '审核失败'
        case 4:

          return '已删除'
      }
    },
    // 过滤状态码  ==》》   改变颜色
    filtColor (value) {
      switch (value) {
        case 0:

          return 'warning'
        case 1:

          return 'info'
        case 2:

          return 'success'
        case 3:

          return 'danger'
        case 4:

          return 'danger'
      }
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.total {
    border-bottom: 1px dashed #ccc;
    height:50px;
    line-height: 50px;
}
.article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left {
        display: flex;
        img {
            width: 180px;
            height:100px;
            border-radius: 4px;
        }
        .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            margin-left:10px;
            justify-content: space-around;
            .date {
                color:#999;
                font-size:12px;
            }
            .title {
                font-size:14px;
            }
            .status {
                width: 60px;
                text-align: center
            }
        }
    }
    .right {
        font-size: 12px;
        span {
            margin-right:8px;
            cursor: pointer;
        }
    }
}
</style>
