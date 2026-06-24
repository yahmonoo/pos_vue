import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeDetailView from '../views/HomeDetailView.vue'
import productView from '../views/ProductView.vue'
import productDetail from '../views/ProductDetail.vue'
import cart from '../views/CartView.vue'
import checkOut from '../views/CheckoutView.vue'
import LoginView from '../views/LoginView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutUs.vue'),
    },
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/product',
      name: 'productView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/product-detail',
      name: 'productDetail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductDetail.vue'),
    },
    {
      path: '/home-detail',
      name: '้homeDetailview',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeDetailView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/LoginView',
      name: 'LoginView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
    },

    {
      path: '/checkOut',
      name: 'checkOut',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CheckoutView.vue'),
    },
    {
      path: '/reg',
      name: 'reg',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Registration.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/AdminDashboard.vue'),
    },
    {
      path: '/admin/product',
      name: 'adminproduct',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Product.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginForm.vue'),
    },
    
  ],
})

export default router
