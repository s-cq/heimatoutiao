import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/'
import Login from './views/login'

import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',

      component: Login
    },
    {
      path: '/home',

      component: Home,
      children: [
        {
          path: '',

          component: Main
        },
        {
          path: 'comment',

          component: () => import('./views/comment')
        },
        {
          path: 'material',

          component: () => import('./views/material')
        },
        {
          path: 'articles',

          component: () => import('./views/articles')
        },
        {
          // 修改文章
          path: 'publish/:articleId', // 定义参数
          component: () => import('./views/publish')
        },

        // 新建组件
        {
          path: 'publish',

          component: () => import('./views/publish')
        },
        {
          path: 'account',

          component: () => import('./views/account')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
