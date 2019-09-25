import layoutSide from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './com/breadcrumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-images'
import selectImage from './publish/select-image'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutSide)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb) // 全局注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectImage)
  }
}
