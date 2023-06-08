import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { 
    path: "/", 
    redirect: "/home"
  },
  {
    path: "/home", 
    component: () => import("@/views/home/home.vue")
  },
  {
    path: "/favor",
    component: () => import("@/views/favor/favor.vue")
  },
  {
    path: "/order",
    component: () => import("@/views/order/order.vue")
  },
  {
    path: "/message",
    component: () => import("@/views/message/message.vue")
  },
  {
    path: "/city",
    component: () => import("@/views/city/city.vue"),
    meta: {
      hideTabBar: true
    }
  },
  {
    path: "/search",
    component: () => import("@/views/search/search.vue"),
    meta: {
      hideTabBar: true
    }
  }
  
]

// 创建一个路由映射关系
const router = createRouter({
  // 1.映射关系
  routes,
  // 2.采用的模式
  // 你日你妈你不执行函数的蛮傻逼
  history: createWebHistory() 
  
})

export default router