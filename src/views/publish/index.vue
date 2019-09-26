<template>
  <el-card >
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <!-- 需要校验 model绑定数据  Rules校验规则  Prop字段名 ref获取dom节点-->
      <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:100px" label-width="100px">
          <!-- 标题 -->
          <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" style="width:800px"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item label="内容" prop="content">
            <!-- 富文本组件 -->
              <quill-editor v-model="formData.content" style='height:300px'></quill-editor>
              </el-form-item>
           <!-- 封面 -->
          <el-form-item label="封面" style="margin-top:100px" prop="cover">
            <!-- 按钮elmment带有的change事件可获得续重的label值  v-model绑定label值-->
               <el-radio-group @change="changeRadio" v-model="formData.cover.type">
                  <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
                    <el-radio :label="1">单选</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
          </el-form-item>
    <!-- =============      <====================!-- 图片插件 -->
          <cover-image @selecImg='changeImg' :images="formData.cover.images"></cover-image>
          <!-- 频道 -->
          <el-form-item label="频道" prop="channel_id">
               <el-select v-model="formData.channel_id">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
          </el-form-item>

          <el-form-item>
                <el-button @click="publish(false)" type='primary'>发布文章</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {

      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 字符串数组
        }
      },
      // 校验规则
      publishRules: {
        title: [{ required: true, message: '不能为空' },
          // 最小长度 min  最大长度max
          { min: 5, max: 30, message: '5-30的字符串长度' }
        ],
        content: [{ required: true, message: '不能为空' }],
        channel_id: [{ required: true, message: '不能为空' }]
      }
    }
  },
  methods: {
    // 子组件传过来的
    changeImg (url, index) {
      // 一、只能用于数字或字符串

      this.formData.cover.images.splice(index, 1, url)
      // 二、
      // this.formData.cover.images.map((item, i) => i === index ? url : item)
      // this.formData.cover.images = url   错误的 vue中  【this.list[index] = 什么值】不能这样写
    },
    // 改变按钮获取最新的type值
    changeRadio () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },

    // 过得频道id
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },
    // 根据id获得需要修改的指定文章
    getarticlesByid (articleId) {
      this.$axios({
        url: `/articles/${articleId}`

      }).then((result) => {
        this.formData = result.data
      })
    },

    // 发布文章
    publish (draft) {
      // 先判断有没有带id 过来||有就是修改文章，没有就是发布新增
      // 修改和发布文章使用一个按钮、接口只有method和url不同
      // 可以用三元表达式判断
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          let{ articleId } = this.$route.params

          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
    // 页面初始化时调用根据【获取指定数据】的接口把需要修改的内容渲染到页面
    let{ articleId } = this.$route.params
    // 如果有id就调用方法
    articleId && this.getarticlesByid(articleId)
  }
}
</script>

<style>

</style>
