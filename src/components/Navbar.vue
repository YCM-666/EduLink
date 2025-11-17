<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="logo">
          <i class="fas fa-graduation-cap"></i>
          <span>校园课程平台</span>
        </router-link>
      </div>
      
      <div class="navbar-menu">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/courses" class="nav-link">课程中心</router-link>
        <router-link to="/posts" class="nav-link">学习社区</router-link>
        <router-link to="/forum" class="nav-link">论坛交流</router-link>
      </div>
      
      <div class="navbar-actions">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="搜索课程、文章..." 
            v-model="searchQuery"
            @input="handleSearch"
          />
          <i class="fas fa-search"></i>
        </div>
        
        <div v-if="user" class="user-menu">
          <router-link to="/write" class="btn btn-primary">
            <i class="fas fa-plus"></i>
            写文章
          </router-link>
          <div class="user-dropdown">
            <img :src="user.user_metadata?.avatar_url || '/default-avatar.png'" 
                 :alt="user.user_metadata?.display_name || '用户'"
                 class="user-avatar" />
            <div class="dropdown-content">
              <router-link to="/profile" class="dropdown-item">
                <i class="fas fa-user"></i>
                个人资料
              </router-link>
              <button @click="handleLogout" class="dropdown-item">
                <i class="fas fa-sign-out-alt"></i>
                退出登录
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="auth-buttons">
          <router-link to="/login" class="btn btn-secondary">登录</router-link>
          <router-link to="/register" class="btn btn-primary">注册</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null) // 暂时设置为未登录状态
const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/posts?search=${encodeURIComponent(searchQuery.value)}`)
  }
}

const handleLogout = () => {
  // 前端模拟登出，直接跳转到首页
  user.value = null
  router.push('/')
}

// 模拟登录功能（仅前端演示）
const handleLogin = () => {
  user.value = { 
    user_metadata: { 
      avatar_url: '/default-avatar.png',
      display_name: '演示用户'
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e9ecef;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.navbar-brand .logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #667eea;
  font-size: 24px;
  font-weight: 700;
}

.navbar-brand .logo i {
  margin-right: 8px;
  font-size: 28px;
}

.navbar-menu {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #667eea;
  color: white;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  position: relative;
}

.search-bar input {
  padding: 10px 40px 10px 16px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 200px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #667eea;
}

.search-bar i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.user-dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: #495057;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.dropdown-item i {
  margin-right: 8px;
  width: 16px;
}

.auth-buttons {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .navbar .container {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .navbar-menu {
    order: 3;
    width: 100%;
    justify-content: center;
  }
  
  .search-bar input {
    width: 150px;
  }
}
</style>