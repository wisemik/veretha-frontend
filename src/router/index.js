import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginVue from '@/views/LoginView.vue'
import ScoresView from '@/views/ScoresView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginVue
  },
  {
    path: '/scores',
    name: 'scores',
    component: ScoresView,
    props: route => ({
      score: route.query.score,
      description: route.query.description,
      improvements: route.query.improvements
    })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
