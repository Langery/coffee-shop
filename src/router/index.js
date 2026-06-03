import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import MenuItemDetail from '../views/MenuItemDetail.vue'
import Story from '../views/Story.vue'
import Baristas from '../views/Baristas.vue'
import Blog from '../views/Blog.vue'

const router = createRouter({
  history: createWebHashHistory('/coffee-shop/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetail
    },
    {
      path: '/menu/:id',
      name: 'menu-item',
      component: MenuItemDetail
    },
    {
      path: '/story',
      name: 'story',
      component: Story
    },
    {
      path: '/baristas',
      name: 'baristas',
      component: Baristas
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: Blog
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
