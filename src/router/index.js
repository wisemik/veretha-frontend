import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ScoresView from '@/views/ScoresView.vue'
import AuthView from '@/views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    props: route => ({
      linkedinData: route.query.linkedinData 
    })
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    props: route => ({
      email: route.query.email,
      full_name: route.query.full_name,
      occupation: route.query.occupation,
      company: route.query.company,
      skills: route.query.skills,
      country: route.query.country,
      city: route.query.city,
      linkedin_url: route.query.linkedin_url
    })
  },
  {
    path: '/scores',
    name: 'scores',
    component: ScoresView,
    props: route => ({
      score: route.query.score,
      description: route.query.description,
      improvements: route.query.improvements,
      linkedinData: route.query.linkedinData 
    })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
