import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsList from '../views/ProductsList.vue'
import ProductsEdit from '../views/ProductsEdit.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/list',
      name: 'products',
      component: ProductsList
    },
    {
      path: '/products/edit/:id',
      name: 'productsEdit',
      component: ProductsEdit
    },
  ]
})

export default router
