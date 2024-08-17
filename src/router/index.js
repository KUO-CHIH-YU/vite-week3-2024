import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/week1',
      name: 'week1',
      component: () => import('../views/week1.vue')
    },
    {
      path: '/week2',
      name: 'week2',
      component: () => import('../views/week2.vue')
    },
    {
      path: '/week3',
      name: 'week3',
      component: () => import('../views/week3.vue')
    }
  ]
})

export default router
