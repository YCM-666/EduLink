<template>
  <div class="auth-page">
    <!-- 背景装饰元素 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div class="container">
      <div class="auth-card">
        <!-- 品牌标识 -->
        <div class="brand-section">
          <div class="brand-logo">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <h1 class="brand-title">智慧校园</h1>
        </div>
        
        <div class="auth-header">
          <h2>欢迎回来</h2>
          <p>请登录您的账户继续学习之旅</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>邮箱地址</label>
            <input v-model="form.email" type="email" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label>密码</label>
            <input v-model="form.password" type="password" required class="form-input" />
          </div>
          
          <div class="form-options">
            <label class="checkbox">
              <input type="checkbox" v-model="form.rememberMe" />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>
          
          <button type="submit" :disabled="loading" class="btn btn-primary btn-lg">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? '登录中...' : '登录' }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
        
        <div class="auth-footer">
          <p>还没有账户？ <router-link to="/register">立即注册</router-link></p>
        </div>
        
        <div class="auth-divider">
          <span>或</span>
        </div>
        
        <div class="social-login">
          <button @click="handleSocialLogin('github')" class="btn btn-social btn-github">
            <i class="fab fa-github"></i>
            使用 GitHub 登录
          </button>
          <button @click="handleSocialLogin('google')" class="btn btn-social btn-google">
            <i class="fab fa-google"></i>
            使用 Google 登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  rememberMe: false
})
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = '请输入邮箱和密码'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password
    })
    
    if (authError) {
      throw authError
    }
    
    // 登录成功，跳转到首页
    router.push('/')
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.message || '登录失败，请检查邮箱和密码'
  } finally {
    loading.value = false
  }
}

const handleSocialLogin = async (provider) => {
  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: provider === 'github' ? 'github' : 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    
    if (authError) {
      throw authError
    }
  } catch (err) {
    console.error('Social login error:', err)
    error.value = '第三方登录失败，请稍后重试'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  bottom: 10%;
  right: 10%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  max-width: 420px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* 品牌标识 */
.brand-section {
  text-align: center;
  margin-bottom: 32px;
}

.brand-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.brand-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 8px;
}

.auth-header p {
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
}

.auth-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #2d3748;
  font-size: 15px;
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
  color: #1a202c;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
}

.form-input::placeholder {
  color: #a0aec0;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #495057;
  cursor: pointer;
}

.checkbox input {
  margin: 0;
}

.forgot-password {
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn-lg {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 600;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  color: #721c24;
  font-size: 14px;
}

.auth-footer {
  text-align: center;
  margin-bottom: 24px;
  padding-top: 16px;
  border-top: 1px solid #e9ecef;
}

.auth-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.auth-divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
  color: #6c757d;
  font-size: 14px;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e9ecef;
}

.auth-divider span {
  background: white;
  padding: 0 16px;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-social:hover {
  background: #f8f9fa;
}

.btn-github {
  border-color: #6c757d;
}

.btn-github:hover {
  background: #6c757d;
  color: white;
}

.btn-google {
  border-color: #db4437;
}

.btn-google:hover {
  background: #db4437;
  color: white;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 32px 24px;
  }
  
  .auth-header h1 {
    font-size: 24px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>