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
          <h2>加入校园课程平台</h2>
          <p>创建您的账户，开始学习之旅</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label>显示名称</label>
            <input v-model="form.displayName" type="text" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label>邮箱地址</label>
            <input v-model="form.email" type="email" required class="form-input" />
          </div>
          
          <div class="form-group">
            <label>密码</label>
            <input v-model="form.password" type="password" required class="form-input" />
            <div class="password-strength">
              <div class="strength-bar" :class="passwordStrength"></div>
              <span class="strength-text">{{ passwordStrengthText }}</span>
            </div>
          </div>
          
          <div class="form-group">
            <label>确认密码</label>
            <input v-model="form.confirmPassword" type="password" required class="form-input" />
            <div v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword" 
                 class="error-text">
              密码不匹配
            </div>
          </div>
          
          <div class="form-group">
            <label>角色选择</label>
            <div class="role-selector">
              <label v-for="role in roles" :key="role.value" class="role-option">
                <input type="radio" v-model="form.role" :value="role.value" />
                <div class="role-content">
                  <i :class="role.icon"></i>
                  <div>
                    <div class="role-title">{{ role.label }}</div>
                    <div class="role-description">{{ role.description }}</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox">
              <input type="checkbox" v-model="form.agreeTerms" required />
              <span>我已阅读并同意 <a href="#" class="link">服务条款</a> 和 <a href="#" class="link">隐私政策</a></span>
            </label>
          </div>
          
          <button type="submit" :disabled="loading || !form.agreeTerms" class="btn btn-primary btn-lg">
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? '注册中...' : '创建账户' }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
        
        <div class="auth-footer">
          <p>已有账户？ <router-link to="/login">立即登录</router-link></p>
        </div>
        
        <div class="auth-divider">
          <span>或</span>
        </div>
        
        <div class="social-login">
          <button @click="handleSocialRegister('github')" class="btn btn-social btn-github">
            <i class="fab fa-github"></i>
            使用 GitHub 注册
          </button>
          <button @click="handleSocialRegister('google')" class="btn btn-social btn-google">
            <i class="fab fa-google"></i>
            使用 Google 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const form = ref({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  agreeTerms: false
})
const loading = ref(false)
const error = ref('')

const roles = [
  {
    value: 'student',
    label: '学生',
    description: '加入课程学习，参与讨论',
    icon: 'fas fa-user-graduate'
  },
  {
    value: 'teacher',
    label: '教师',
    description: '创建和管理课程，发布内容',
    icon: 'fas fa-chalkboard-teacher'
  }
]

const passwordStrength = computed(() => {
  if (!form.value.password) return 'weak'
  
  const score = calculatePasswordStrength(form.value.password)
  if (score >= 80) return 'strong'
  if (score >= 60) return 'medium'
  return 'weak'
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  return {
    weak: '密码强度：弱',
    medium: '密码强度：中等',
    strong: '密码强度：强'
  }[strength]
})

const calculatePasswordStrength = (password) => {
  let score = 0
  
  // 长度加分
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 15
  
  // 字符种类加分
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 10
  if (/[^a-zA-Z0-9]/.test(password)) score += 15
  
  return Math.min(score, 100)
}

const handleRegister = async () => {
  if (!validateForm()) return
  
  loading.value = true
  error.value = ''
  
  try {
    // 1. 创建用户认证
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.value.email,
      password: form.value.password,
      options: {
        data: {
          display_name: form.value.displayName,
          role: form.value.role
        }
      }
    })
    
    if (authError) {
      throw authError
    }
    
    // 2. 在 users 表中创建用户记录
    if (authData.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: form.value.email,
          display_name: form.value.displayName,
          role: form.value.role
        })
      
      if (userError) {
        console.error('User creation error:', userError)
      }
    }
    
    // 注册成功
    alert('注册成功！请检查您的邮箱验证账户。')
    router.push('/login')
  } catch (err) {
    console.error('Register error:', err)
    error.value = err.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!form.value.displayName.trim()) {
    error.value = '请输入显示名称'
    return false
  }
  
  if (!form.value.email.trim()) {
    error.value = '请输入邮箱地址'
    return false
  }
  
  if (!form.value.password) {
    error.value = '请输入密码'
    return false
  }
  
  if (form.value.password.length < 8) {
    error.value = '密码长度至少8位'
    return false
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    error.value = '密码不匹配'
    return false
  }
  
  if (!form.value.agreeTerms) {
    error.value = '请同意服务条款和隐私政策'
    return false
  }
  
  return true
}

const handleSocialRegister = async (provider) => {
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
    console.error('Social register error:', err)
    error.value = '第三方注册失败，请稍后重试'
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
}

.auth-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 100%;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 8px;
}

.auth-header p {
  color: #6c757d;
  font-size: 14px;
}

.auth-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-bar.weak {
  background: #dc3545;
  width: 33%;
}

.strength-bar.medium {
  background: #ffc107;
  width: 66%;
}

.strength-bar.strong {
  background: #28a745;
  width: 100%;
}

.strength-text {
  font-size: 12px;
  color: #6c757d;
  min-width: 80px;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.role-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.role-option {
  display: block;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option:hover {
  border-color: #667eea;
}

.role-option:has(input:checked) {
  border-color: #667eea;
  background: #f8f9ff;
}

.role-option input {
  display: none;
}

.role-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-content i {
  font-size: 24px;
  color: #667eea;
  width: 32px;
}

.role-title {
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
}

.role-description {
  font-size: 12px;
  color: #6c757d;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #495057;
  cursor: pointer;
  line-height: 1.4;
}

.checkbox input {
  margin-top: 2px;
}

.link {
  color: #667eea;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.btn-lg {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
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
  
  .role-content {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .role-content i {
    margin-bottom: 4px;
  }
}
</style>