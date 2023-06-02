import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsList from '../views/ProductsList.vue'
import ProductsEdit from '../views/ProductsEdit.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/list',
      name: 'products',
      component: ProductsList,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/edit/:id',
      name: 'productsEdit',
      component: ProductsEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log("🚀 ~ file: index.js:47 ~ router.beforeEach ~ to:", to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let u = localStorage.getItem('user')
    const user = u ? JSON.parse(u) : null
    if (user?.token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})



export default router
