import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/home'),
    meta: {
      title: '首页'
    } 
  },
  {
    path: '/fixedTopTable',
    component: () => import('@/pages/fixedTopTable'),
    meta: {
      title: '表格吸顶'
    }
  },
  {
    path: '/cssFixedTopTable',
    component: () => import('@/pages/cssFixedTopTable'),
    meta: {
      title: '纯CSS表格吸顶'
    }
  },
  {
    path: '/keywordHighlight',
    component: () => import('@/pages/keywordHighlight'),
    meta: {
      title: '关键字高亮'
    }
  }
]
const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

export default router