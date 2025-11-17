<template>
  <div class="profile">
    <!-- 动画背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div class="container">
      <!-- 用户资料头部 -->
      <div class="profile-hero">
        <div class="hero-content">
          <div class="avatar-container">
            <div class="avatar-wrapper">
              <img :src="userProfile.avatar_url || '/default-avatar.png'" 
                   :alt="userProfile.display_name"
                   class="user-avatar" />
              <div class="avatar-status"></div>
            </div>
            <button @click="editAvatar" class="edit-avatar-btn">
              <svg width="16" height="16" fill="currentColor">
                <path d="M12.146 9.146l-1.5-1.5a.5.5 0 0 0-.707.708l1.5 1.5a.5.5 0 0 0 .707-.708z"/>
                <path d="M10.5 9.5l-8-8v-1h1l8 8zM11 2l1-1 2 2-1 1-2-2z"/>
              </svg>
            </button>
          </div>
          
          <div class="user-details">
            <div class="user-badge">
              <span class="badge">学生</span>
            </div>
            <h1 class="user-name">{{ userProfile.display_name || '用户' }}</h1>
            <p class="user-email">{{ user.email }}</p>
            <p class="user-bio" v-if="userProfile.bio">{{ userProfile.bio }}</p>
            
            <div class="user-stats">
              <div class="stat-card">
                <div class="stat-icon">📝</div>
                <div class="stat-info">
                  <span class="stat-number">{{ userStats.posts || 0 }}</span>
                  <span class="stat-label">文章</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-info">
                  <span class="stat-number">{{ userStats.courses || 0 }}</span>
                  <span class="stat-label">课程</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">❤️</div>
                <div class="stat-info">
                  <span class="stat-number">{{ userStats.likes || 0 }}</span>
                  <span class="stat-label">获赞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hero-actions">
          <button @click="editProfile" class="action-btn primary">
            <svg width="16" height="16" fill="currentColor">
              <path d="M12.146 9.146l-1.5-1.5a.5.5 0 0 0-.707.708l1.5 1.5a.5.5 0 0 0 .707-.708z"/>
              <path d="M10.5 9.5l-8-8v-1h1l8 8zM11 2l1-1 2 2-1 1-2-2z"/>
            </svg>
            编辑资料
          </button>
          <button @click="shareProfile" class="action-btn secondary">
            <svg width="16" height="16" fill="currentColor">
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
            分享
          </button>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="profile-content">
        <!-- 标签导航 -->
        <div class="tab-navigation">
          <div class="tab-items">
            <button :class="['tab-item', { active: activeTab === 'posts' }]" 
                    @click="activeTab = 'posts'">
              <svg width="18" height="18" fill="currentColor">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
              </svg>
              我的文章
              <span class="tab-badge">{{ userPosts.length }}</span>
            </button>
            <button :class="['tab-item', { active: activeTab === 'courses' }]" 
                    @click="activeTab = 'courses'">
              <svg width="18" height="18" fill="currentColor">
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                <path d="M1 5h14v8H1V5z"/>
              </svg>
              我的课程
              <span class="tab-badge">{{ enrolledCourses.length }}</span>
            </button>
            <button :class="['tab-item', { active: activeTab === 'settings' }]" 
                    @click="activeTab = 'settings'">
              <svg width="18" height="18" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 14.5 0h-13zM1 1.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-13z"/>
              </svg>
              账户设置
            </button>
          </div>
          <div class="tab-indicator" :style="{ left: tabIndicatorLeft }"></div>
        </div>
        
        <div class="tab-content">
          <!-- 我的文章 -->
          <div v-if="activeTab === 'posts'" class="posts-tab">
            <div v-if="userPosts.length === 0" class="empty-state">
              <div class="empty-icon">📝</div>
              <h3>还没有发布任何文章</h3>
              <p>开始记录你的学习心得和经验分享吧</p>
              <router-link to="/write" class="cta-button">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                开始写作
              </router-link>
            </div>
            
            <div v-else class="posts-grid">
              <div v-for="post in userPosts" :key="post.id" class="post-card">
                <div class="post-header">
                  <div class="post-type-badge">
                    {{ getPostTypeLabel(post.type) }}
                  </div>
                  <div class="post-actions">
                    <button @click="editPost(post)" class="action-btn">
                      <svg width="14" height="14" fill="currentColor">
                        <path d="M12.146 9.146l-1.5-1.5a.5.5 0 0 0-.707.708l1.5 1.5a.5.5 0 0 0 .707-.708z"/>
                        <path d="M10.5 9.5l-8-8v-1h1l8 8zM11 2l1-1 2 2-1 1-2-2z"/>
                      </svg>
                    </button>
                    <button @click="deletePost(post)" class="action-btn danger">
                      <svg width="14" height="14" fill="currentColor">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="post-content">
                  <h3 class="post-title">
                    <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
                  </h3>
                  <p class="post-excerpt">{{ post.excerpt || '暂无内容摘要...' }}</p>
                  
                  <div class="post-footer">
                    <div class="post-stats">
                      <span class="stat">
                        <svg width="14" height="14" fill="currentColor">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        {{ post.view_count || 0 }}
                      </span>
                      <span class="stat">
                        <svg width="14" height="14" fill="currentColor">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        {{ post.like_count || 0 }}
                      </span>
                      <span class="stat">
                        <svg width="14" height="14" fill="currentColor">
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        </svg>
                        {{ post.comment_count || 0 }}
                      </span>
                    </div>
                    <span class="post-date">{{ formatDate(post.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 我的课程 -->
          <div v-if="activeTab === 'courses'" class="courses-tab">
            <div v-if="enrolledCourses.length === 0" class="empty-state">
              <div class="empty-icon">📚</div>
              <h3>还没有加入任何课程</h3>
              <p>探索更多优质课程，开启你的学习之旅</p>
              <router-link to="/courses" class="cta-button">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                  <path d="M1 5h14v8H1V5z"/>
                </svg>
                浏览课程
              </router-link>
            </div>
            
            <div v-else class="courses-grid">
              <div v-for="enrollment in enrolledCourses" :key="enrollment.course_id" class="course-card">
                <div class="course-image">
                  <div class="course-cover">
                    {{ enrollment.courses.title.charAt(0) }}
                  </div>
                  <div class="progress-ring">
                    <svg width="60" height="60">
                      <circle cx="30" cy="30" r="25" stroke="#e9ecef" stroke-width="3" fill="transparent"/>
                      <circle cx="30" cy="30" r="25" stroke="#667eea" stroke-width="3" 
                              fill="transparent" stroke-dasharray="157" 
                              :stroke-dashoffset="157 - (enrollment.progress || 0) * 157 / 100"
                              transform="rotate(-90 30 30)"/>
                    </svg>
                    <span class="progress-text">{{ enrollment.progress || 0 }}%</span>
                  </div>
                </div>
                
                <div class="course-content">
                  <h4 class="course-title">{{ enrollment.courses.title }}</h4>
                  <p class="course-description">{{ enrollment.courses.description || '暂无描述' }}</p>
                  
                  <div class="course-stats">
                    <div class="stat">
                      <svg width="14" height="14" fill="currentColor">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                      </svg>
                      {{ enrollment.courses.post_count || 0 }} 篇文章
                    </div>
                    <div class="stat">
                      <svg width="14" height="14" fill="currentColor">
                        <path d="M7 14s-1.5-2-4.5-2-4.5 2-4.5 2h9z"/>
                        <path d="M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                      </svg>
                      {{ enrollment.courses.student_count || 0 }} 名学员
                    </div>
                  </div>
                </div>
                
                <div class="course-actions">
                  <router-link :to="`/course/${enrollment.course_id}`" class="action-btn primary">
                    继续学习
                  </router-link>
                  <button @click="reviewCourse(enrollment)" class="action-btn secondary">
                    评价
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 账户设置 -->
          <div v-if="activeTab === 'settings'" class="settings-tab">
            <div class="settings-section">
              <h3>个人信息</h3>
              <form @submit.prevent="updateProfile" class="settings-form">
                <div class="form-group">
                  <label>显示名称</label>
                  <input v-model="editForm.display_name" type="text" class="form-input" />
                </div>
                
                <div class="form-group">
                  <label>个人简介</label>
                  <textarea v-model="editForm.bio" rows="3" class="form-textarea"></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">保存更改</button>
              </form>
            </div>
            
            <div class="settings-section">
              <h3>账户安全</h3>
              <div class="security-actions">
                <button @click="changePassword" class="btn btn-secondary">修改密码</button>
                <button @click="logout" class="btn btn-danger">退出登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { format } from 'date-fns'

const router = useRouter()
const user = ref(null)
const userProfile = ref({})
const userStats = ref({ posts: 0, courses: 0, likes: 0 })
const userPosts = ref([])
const enrolledCourses = ref([])
const activeTab = ref('posts')
const editForm = ref({
  display_name: '',
  bio: ''
})

const postTypes = {
  article: '学习文章',
  note: '学习笔记',
  discussion: '问题讨论'
}

// 计算属性：标签指示器位置
const tabIndicatorLeft = computed(() => {
  const tabs = ['posts', 'courses', 'settings']
  const index = tabs.indexOf(activeTab.value)
  return `${(index / tabs.length) * 100}%`
})

onMounted(async () => {
  await checkUser()
  await loadUserProfile()
  await loadUserStats()
  await loadUserPosts()
  await loadEnrolledCourses()
})

const checkUser = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
  
  if (!user.value) {
    router.push('/login')
  }
}

const loadUserProfile = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.value.id)
    .single()
  
  if (error) {
    console.error('Error loading profile:', error)
    return
  }
  
  userProfile.value = data || {}
  editForm.value.display_name = data?.display_name || ''
  editForm.value.bio = data?.bio || ''
}

const loadUserStats = async () => {
  // 加载文章数量
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', user.value.id)
    .eq('status', 'published')
  
  // 加载课程数量
  const { count: coursesCount } = await supabase
    .from('course_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.value.id)
  
  // 加载获赞数量
  const { data: likesData } = await supabase
    .from('posts')
    .select('like_count')
    .eq('author_id', user.value.id)
    .eq('status', 'published')
  
  const totalLikes = likesData?.reduce((sum, post) => sum + (post.like_count || 0), 0) || 0
  
  userStats.value = {
    posts: postsCount || 0,
    courses: coursesCount || 0,
    likes: totalLikes
  }
}

const loadUserPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', user.value.id)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error loading posts:', error)
    return
  }
  
  userPosts.value = data || []
}

const loadEnrolledCourses = async () => {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      course_id,
      courses!inner(*)
    `)
    .eq('user_id', user.value.id)
  
  if (error) {
    console.error('Error loading courses:', error)
    return
  }
  
  enrolledCourses.value = data || []
}

const editAvatar = () => {
  // 实现头像上传功能
  alert('头像上传功能开发中...')
}

const editProfile = () => {
  activeTab.value = 'settings'
}

const updateProfile = async () => {
  const { error } = await supabase
    .from('users')
    .update({
      display_name: editForm.value.display_name,
      bio: editForm.value.bio
    })
    .eq('id', user.value.id)
  
  if (error) {
    console.error('Error updating profile:', error)
    alert('更新失败')
    return
  }
  
  await loadUserProfile()
  alert('资料更新成功')
}

const changePassword = () => {
  // 实现密码修改功能
  alert('密码修改功能开发中...')
}

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

const editPost = (post) => {
  // 跳转到编辑页面
  router.push(`/edit/${post.id}`)
}

const deletePost = async (post) => {
  if (!confirm('确定要删除这篇文章吗？')) return
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', post.id)
  
  if (error) {
    console.error('Error deleting post:', error)
    alert('删除失败')
    return
  }
  
  await loadUserPosts()
  await loadUserStats()
  alert('删除成功')
}

const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'yyyy年MM月dd日')
}

const getPostTypeLabel = (type) => {
  return postTypes[type] || type
}

const shareProfile = () => {
  if (navigator.share) {
    navigator.share({
      title: `${userProfile.value.display_name || '用户'}的个人主页`,
      text: `查看${userProfile.value.display_name || '用户'}的学习笔记和课程`,
      url: window.location.href
    }).catch(err => {
      console.log('分享失败:', err)
    })
  } else {
    // 备用分享方式
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('链接已复制到剪贴板')
    }).catch(err => {
      console.log('复制失败:', err)
    })
  }
}

const reviewCourse = (enrollment) => {
  alert(`评价课程: ${enrollment.courses.title}`)
}
</script>

<style scoped>
/* 动画背景装饰 */
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 25%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.profile {
  padding: 40px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

/* 用户资料头部 */
.profile-hero {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.profile-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 32px;
}

.avatar-container {
  position: relative;
}

.avatar-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
}

.user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  background: #4ade80;
  border: 2px solid white;
  border-radius: 50%;
}

.edit-avatar-btn {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.edit-avatar-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(102, 126, 234, 0.5);
}

.user-details {
  flex: 1;
}

.user-badge {
  margin-bottom: 16px;
}

.badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}

.user-name {
  font-size: 36px;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-email {
  color: #718096;
  font-size: 16px;
  margin-bottom: 12px;
}

.user-bio {
  color: #4a5568;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 500px;
}

.user-stats {
  display: flex;
  gap: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
}

.stat-info {
  text-align: left;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #718096;
  margin-top: 4px;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 14px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.action-btn.secondary {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

/* 标签导航 */
.tab-navigation {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 8px;
  margin-bottom: 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.tab-items {
  display: flex;
  position: relative;
}

.tab-item {
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #718096;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  position: relative;
  z-index: 2;
}

.tab-item.active {
  color: #667eea;
}

.tab-badge {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  top: 8px;
  height: calc(100% - 16px);
  width: calc(33.333% - 16px);
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  transition: left 0.3s ease;
  z-index: 1;
}

/* 内容区域 */
.profile-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tab-content {
  padding: 0;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  color: #718096;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #2d3748;
}

.empty-state p {
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.cta-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* 文章网格 */
.posts-grid {
  padding: 32px;
  display: grid;
  gap: 24px;
}

.post-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.post-type-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.post-actions {
  display: flex;
  gap: 8px;
}

.post-content {
  margin-bottom: 20px;
}

.post-title a {
  color: #2d3748;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: #667eea;
}

.post-excerpt {
  color: #718096;
  font-size: 15px;
  line-height: 1.6;
  margin-top: 8px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
}

.post-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #718096;
  font-size: 14px;
}

.post-date {
  color: #a0aec0;
  font-size: 14px;
}

/* 课程网格 */
.courses-grid {
  padding: 32px;
  display: grid;
  gap: 24px;
}

.course-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.course-image {
  position: relative;
}

.course-cover {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
}

.progress-ring {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 60px;
  height: 60px;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
}

.course-content {
  flex: 1;
}

.course-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.course-description {
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.course-stats {
  display: flex;
  gap: 20px;
}

.course-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 设置标签 */
.settings-tab {
  padding: 32px;
}

.settings-section {
  margin-bottom: 40px;
}

.settings-section h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
}

.settings-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.security-actions {
  display: flex;
  gap: 16px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .profile-hero {
    flex-direction: column;
    gap: 32px;
    text-align: center;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .course-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .course-actions {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .profile {
    padding: 20px 0;
  }
  
  .profile-hero {
    padding: 32px 24px;
  }
  
  .user-name {
    font-size: 28px;
  }
  
  .user-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .posts-grid,
  .courses-grid {
    padding: 24px 16px;
    gap: 16px;
  }
  
  .post-card {
    padding: 20px;
  }
  
  .post-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .security-actions {
    flex-direction: column;
  }
  
  .tab-item {
    padding: 12px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .profile-hero {
    padding: 24px 16px;
  }
  
  .avatar-wrapper {
    width: 100px;
    height: 100px;
  }
  
  .user-name {
    font-size: 24px;
  }
  
  .tab-items {
    flex-direction: column;
  }
}
</style>
</style>