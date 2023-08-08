import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/page1.vue'

const routes = [
  {
    path: '/',
    name: 'page1',
    component: HomeView
  },
  {
    path: '/page2.vue',
    name: 'page2.vue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "page2" */ '../views/page2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
