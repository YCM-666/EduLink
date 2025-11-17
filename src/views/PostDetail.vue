<template>
  <div class="post-detail">
    <!-- 动画背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div class="container">
      <!-- 阅读进度条 -->
      <div class="reading-progress">
        <div class="progress-bar" :style="{ width: readingProgress + '%' }"></div>
      </div>
      
      <div class="post-header">
        <div class="breadcrumb">
          <router-link to="/posts" class="breadcrumb-link">
            <svg width="16" height="16" fill="currentColor">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7.5 7.5V4h1v3.5H12v1H8.5V12h-1V8.5H4v-1h3.5z"/>
            </svg>
            学习社区
          </router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">文章详情</span>
        </div>
        
        <div class="post-meta">
          <div class="author-info">
            <div class="author-avatar">
              <img :src="post.author?.avatar_url || '/default-avatar.png'" 
                   :alt="post.author?.display_name"
                   class="avatar-img" />
              <div class="avatar-badge"></div>
            </div>
            <div class="author-details">
              <div class="author-name">{{ post.author?.display_name || '匿名用户' }}</div>
              <div class="post-date">{{ formatDate(post.created_at) }}</div>
            </div>
          </div>
          
          <div class="post-stats">
            <div class="stat-item">
              <div class="stat-icon">👁️</div>
              <div class="stat-content">
                <span class="stat-value">{{ post.view_count || 0 }}</span>
                <span class="stat-label">阅读</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">❤️</div>
              <div class="stat-content">
                <span class="stat-value">{{ post.like_count || 0 }}</span>
                <span class="stat-label">点赞</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">💬</div>
              <div class="stat-content">
                <span class="stat-value">{{ post.comment_count || 0 }}</span>
                <span class="stat-label">评论</span>
              </div>
            </div>
          </div>
        </div>
        
        <h1 class="post-title">{{ post.title }}</h1>
        
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            <svg width="12" height="12" fill="currentColor">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2z"/>
            </svg>
            {{ tag }}
          </span>
        </div>
      </div>
      
      <div class="post-content-wrapper">
        <div class="post-content">
          <div v-html="compiledContent" class="markdown-content"></div>
        </div>
        
        <!-- 文章侧边栏 -->
        <div class="post-sidebar">
          <div class="sidebar-sticky">
            <div class="action-panel">
              <button @click="handleLike" :class="['action-btn', 'like-btn', { liked: isLiked }]">
                <div class="action-icon">
                  <svg width="20" height="20" fill="currentColor">
                    <path d="M8 1.314C12.438-3.248 23.534 2.735 8 15-7.534 2.736 3.562-3.248 8 1.314z"/>
                  </svg>
                </div>
                <span class="action-text">{{ post.like_count || 0 }}</span>
              </button>
              
              <button class="action-btn">
                <div class="action-icon">
                  <svg width="20" height="20" fill="currentColor">
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                  </svg>
                </div>
                <span class="action-text">分享</span>
              </button>
              
              <button v-if="isAuthor" class="action-btn">
                <div class="action-icon">
                  <svg width="20" height="20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </div>
                <span class="action-text">编辑</span>
              </button>
            </div>
            
            <!-- 目录导航 -->
            <div class="toc-panel" v-if="tocItems.length > 0">
              <h4 class="toc-title">目录</h4>
              <div class="toc-items">
                <a v-for="item in tocItems" :key="item.id" 
                   :href="`#${item.id}`" 
                   :class="['toc-item', { active: item.active }]">
                  {{ item.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="comments-section">
        <div class="section-header">
          <h3 class="section-title">
            <svg width="24" height="24" fill="currentColor">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>
            评论 ({{ comments.length }})
          </h3>
        </div>
        
        <div v-if="user" class="comment-form">
          <div class="form-header">
            <div class="user-avatar">
              <img :src="user.user_metadata?.avatar_url || '/default-avatar.png'" 
                   :alt="user.user_metadata?.name || '用户'"
                   class="avatar-img" />
            </div>
            <textarea v-model="newComment" placeholder="写下你的评论..." rows="3" class="comment-input"></textarea>
          </div>
          <button @click="addComment" class="submit-btn">发表评论</button>
        </div>
        
        <div v-else class="comment-login">
          <div class="login-prompt">
            <p>请 <router-link to="/login" class="login-link">登录</router-link> 后发表评论</p>
          </div>
        </div>
        
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <div class="comment-avatar">
                <img :src="comment.author?.avatar_url || '/default-avatar.png'" 
                     :alt="comment.author?.display_name"
                     class="avatar-img" />
              </div>
              <div class="comment-info">
                <div class="comment-author">{{ comment.author?.display_name || '匿名用户' }}</div>
                <div class="comment-meta">
                  <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
                  <span class="comment-reply">回复</span>
                </div>
              </div>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-actions">
              <button class="action-btn small">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M8 1.314C12.438-3.248 23.534 2.735 8 15-7.534 2.736 3.562-3.248 8 1.314z"/>
                </svg>
                赞
              </button>
              <button class="action-btn small">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import { format } from 'date-fns'
import { marked } from 'marked'

const route = useRoute()
const postId = route.params.id
const post = ref({})
const comments = ref([])
const newComment = ref('')
const user = ref(null)
const isLiked = ref(false)
const readingProgress = ref(0)
const tocItems = ref([])

const compiledContent = computed(() => {
  return post.value.content ? marked(post.value.content) : ''
})

const isAuthor = computed(() => {
  return user.value && post.value.author_id === user.value.id
})

// 计算阅读进度
const calculateReadingProgress = () => {
  const contentElement = document.querySelector('.post-content')
  if (!contentElement) return
  
  const contentRect = contentElement.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const contentHeight = contentRect.height
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const contentTop = contentRect.top + scrollTop
  
  const progress = Math.max(0, Math.min(100, ((scrollTop + windowHeight - contentTop) / contentHeight) * 100))
  readingProgress.value = progress
}

// 生成目录
const generateTOC = () => {
  const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3')
  const items = []
  
  headings.forEach((heading, index) => {
    const id = `heading-${index}`
    heading.id = id
    
    items.push({
      id: id,
      text: heading.textContent,
      level: heading.tagName.toLowerCase(),
      active: false
    })
  })
  
  tocItems.value = items
}

// 高亮当前目录项
const highlightTOC = () => {
  const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3')
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  let activeHeading = null
  
  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 100) {
      activeHeading = heading.id
    }
  })
  
  tocItems.value = tocItems.value.map(item => ({
    ...item,
    active: item.id === activeHeading
  }))
}

onMounted(async () => {
  await loadPost()
  await loadComments()
  await checkUser()
  await checkLikeStatus()
  
  // 增加阅读量
  await supabase
    .from('posts')
    .update({ view_count: (post.value.view_count || 0) + 1 })
    .eq('id', postId)
  
  // 等待内容渲染完成后生成目录
  setTimeout(() => {
    generateTOC()
    calculateReadingProgress()
  }, 100)
  
  // 监听滚动事件
  window.addEventListener('scroll', calculateReadingProgress)
  window.addEventListener('scroll', highlightTOC)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateReadingProgress)
  window.removeEventListener('scroll', highlightTOC)
})

const loadPost = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:users(display_name, avatar_url)
    `)
    .eq('id', postId)
    .single()
  
  if (error) {
    console.error('Error loading post:', error)
    return
  }
  
  post.value = data
}

const loadComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:users(display_name, avatar_url)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error loading comments:', error)
    return
  }
  
  comments.value = data || []
}

const checkUser = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
}

const checkLikeStatus = async () => {
  if (!user.value) return
  
  const { data } = await supabase
    .from('post_likes')
    .select()
    .eq('post_id', postId)
    .eq('user_id', user.value.id)
    .single()
  
  isLiked.value = !!data
}

const handleLike = async () => {
  if (!user.value) {
    alert('请先登录')
    return
  }
  
  if (isLiked.value) {
    // 取消点赞
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.value.id)
    
    post.value.like_count = Math.max(0, (post.value.like_count || 0) - 1)
  } else {
    // 点赞
    await supabase
      .from('post_likes')
      .insert({
        post_id: postId,
        user_id: user.value.id
      })
    
    post.value.like_count = (post.value.like_count || 0) + 1
  }
  
  isLiked.value = !isLiked.value
}

const addComment = async () => {
  if (!newComment.value.trim()) {
    alert('请输入评论内容')
    return
  }
  
  if (!user.value) {
    alert('请先登录')
    return
  }
  
  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      content: newComment.value.trim(),
      author_id: user.value.id
    })
  
  if (error) {
    console.error('Error adding comment:', error)
    alert('评论失败')
    return
  }
  
  newComment.value = ''
  await loadComments()
  
  // 更新评论数
  post.value.comment_count = (post.value.comment_count || 0) + 1
}

const handleEdit = () => {
  // 跳转到编辑页面
}

const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'yyyy年MM月dd日 HH:mm')
}
</script>

<style scoped>
.post-detail {
  padding: 40px 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.post-header {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #6c757d;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #495057;
}

.post-date {
  font-size: 14px;
  color: #6c757d;
}

.post-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6c757d;
  font-size: 14px;
}

.post-title {
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 16px;
  line-height: 1.3;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.post-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.markdown-content {
  line-height: 1.8;
  font-size: 16px;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin-top: 24px;
  margin-bottom: 16px;
}

.markdown-content p {
  margin-bottom: 16px;
}

.post-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}

.like-btn {
  background: #f8f9fa;
  color: #6c757d;
}

.like-btn.liked {
  background: #dc3545;
  color: white;
}

.comments-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.comment-form textarea {
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  resize: vertical;
  font-family: inherit;
}

.comment-login {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.comment-login a {
  color: #667eea;
  text-decoration: none;
}

.comments-list {
  margin-top: 32px;
}

.comment-item {
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-author {
  font-weight: 600;
  color: #495057;
}

.comment-date {
  font-size: 12px;
  color: #6c757d;
}

.comment-content {
  color: #495057;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 20px 0;
  }
  
  .post-header,
  .post-content,
  .comments-section {
    padding: 24px;
  }
  
  .post-title {
    font-size: 24px;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>