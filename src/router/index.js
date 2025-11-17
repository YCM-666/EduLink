import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: () => import('../views/CourseDetail.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue')
  },
  {
    path: '/write',
    name: 'WritePost',
    component: () => import('../views/WritePost.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  // 论坛模块路由
  {
    path: '/forum',
    name: 'ForumHome',
    component: () => import('../views/forum/ForumHome.vue')
  },
  {
    path: '/forum/course/:id',
    name: 'ForumCourse',
    component: () => import('../views/forum/ForumCourse.vue')
  },
  {
    path: '/forum/topic/:id',
    name: 'ForumTopic',
    component: () => import('../views/forum/ForumTopic.vue')
  },
  {
    path: '/forum/create',
    name: 'CreateTopic',
    component: () => import('../views/forum/CreateTopic.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router