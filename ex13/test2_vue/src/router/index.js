import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Loginview.vue'
import FoodsView from '../views/Foodsview.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/foods', component: FoodsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
