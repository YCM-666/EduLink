<template>
  <div class="forum-topic">
    <div class="container">
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <router-link to="/forum">论坛</router-link>
        <span class="separator">/</span>
        <span v-if="topic.course">
          <router-link :to="`/forum/course/${topic.course.id}`">{{ topic.course.name }}</router-link>
          <span class="separator">/</span>
        </span>
        <span class="current">话题详情</span>
      </nav>

      <!-- 话题内容 -->
      <div class="topic-container">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>正在加载话题...</p>
        </div>
        
        <!-- 主话题 -->
        <div v-else class="topic-main">
          <div class="topic-header">
            <div class="topic-title-section">
              <h1 class="topic-title">{{ topic.title }}</h1>
              <div class="topic-meta">
                <span :class="['topic-type', `type-${topic.type}`]">
                  {{ getTypeText(topic.type) }}
                </span>
                <span class="topic-tags">
                  <span v-for="tag in topic.tags" :key="tag" class="tag">
                    #{{ tag }}
                  </span>
                </span>
              </div>
            </div>
            
            <div class="topic-actions">
              <button class="btn btn-outline" @click="handleLike">
                <svg width="16" height="16" fill="currentColor">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                {{ topic.likeCount }}
              </button>
              <button class="btn btn-outline" @click="handleCollect">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                收藏
              </button>
              <button class="btn btn-primary" @click="showReplyForm = !showReplyForm">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M6.5 5h-3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 2 5.5v2A1.5 1.5 0 0 0 3.5 9h3A1.5 1.5 0 0 0 8 7.5v-2A1.5 1.5 0 0 0 6.5 4h-3zm4.5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-6z"/>
                  <path d="M5 5.5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 10 5.5v6a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 5 11.5v-6z"/>
                </svg>
                回复
              </button>
            </div>
          </div>

          <!-- 作者信息 -->
          <div class="author-card">
            <div class="author-avatar">
              <span>{{ topic.author.avatar }}</span>
            </div>
            <div class="author-info">
              <div class="author-name">
                {{ topic.isAnonymous ? '匿名用户' : topic.author.name }}
              </div>
              <div class="post-time">{{ formatTime(topic.createdAt) }}</div>
            </div>
            <div class="view-count">
              <svg width="16" height="16" fill="currentColor">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
              </svg>
              {{ topic.viewCount }} 次浏览
            </div>
          </div>

          <!-- 话题内容 -->
          <div class="topic-content">
            <div class="content-html" v-html="topic.contentHtml || topic.content"></div>
          </div>

          <!-- 互动操作 -->
          <div class="topic-interactions">
            <div class="interaction-stats">
              <span>{{ topic.replyCount }} 条回复</span>
              <span>·</span>
              <span>{{ topic.likeCount }} 人点赞</span>
            </div>
            <div class="interaction-buttons">
              <button 
                :class="['btn', 'btn-sm', isLiked ? 'btn-primary' : 'btn-outline']"
                @click="handleLike"
              >
                <i class="fas fa-heart"></i>
                {{ isLiked ? '已点赞' : '点赞' }}
              </button>
              <button 
                :class="['btn', 'btn-sm', isCollected ? 'btn-primary' : 'btn-outline']"
                @click="handleCollect"
              >
                <i class="fas fa-star"></i>
                {{ isCollected ? '已收藏' : '收藏' }}
              </button>
              <button class="btn btn-sm btn-outline" @click="showReplyForm = !showReplyForm">
                <i class="fas fa-reply"></i>
                回复
              </button>
            </div>
          </div>
        </div>

        <!-- 回复表单 -->
        <div v-if="showReplyForm" class="reply-form-container">
          <div class="reply-form">
            <h3>发表回复</h3>
            <div class="form-group">
              <textarea 
                v-model="replyContent" 
                placeholder="写下你的回复..."
                rows="4"
                class="form-control"
              ></textarea>
            </div>
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="replyAnonymous">
                匿名回复
              </label>
              <div class="form-actions">
                <button class="btn btn-outline" @click="showReplyForm = false">取消</button>
                <button class="btn btn-primary" @click="submitReply" :disabled="!replyContent.trim() || replyLoading">
                  {{ replyLoading ? '发布中...' : '发布回复' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 回复列表 -->
        <div class="replies-section">
          <h3>全部回复 ({{ replies.length }})</h3>
          <div class="replies-list">
            <div 
              v-for="reply in replies" 
              :key="reply.id" 
              class="reply-item"
            >
              <ReplyCard :reply="reply" />
            </div>
            
            <!-- 空状态 -->
            <div v-if="replies.length === 0" class="empty-replies">
              <i class="fas fa-comments"></i>
              <p>还没有回复，快来抢沙发吧！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ReplyCard from '../../components/forum/ReplyCard.vue'
import { forumApi } from '../../services/forumApi.js'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default {
  name: 'ForumTopic',
  components: {
    ReplyCard
  },
  setup() {
    const route = useRoute()
    
    // 数据状态
    const topic = ref({})
    const replies = ref([])
    const showReplyForm = ref(false)
    const replyContent = ref('')
    const replyAnonymous = ref(false)
    const isLiked = ref(false)
    const isCollected = ref(false)
    const isLoading = ref(false)
    const replyLoading = ref(false)
    
    // 工具函数
    const formatTime = (dateString) => {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { 
        addSuffix: true, 
        locale: zhCN 
      })
    }

    const getTypeText = (type) => {
      const typeMap = {
        '提问': '提问',
        '讨论': '讨论',
        '经验': '经验分享'
      }
      return typeMap[type] || type
    }

    // 方法
    const loadTopic = async () => {
      try {
        isLoading.value = true
        const topicId = route.params.id
        
        // 使用真实API获取话题详情
        topic.value = await forumApi.getTopic(topicId)
        
        // 同时加载回复列表
        await loadReplies()
        
      } catch (error) {
        console.error('加载话题失败:', error)
        
        // 如果API调用失败，使用默认数据确保页面正常显示
        topic.value = {
          id: parseInt(route.params.id),
          title: '话题加载失败',
          content: '抱歉，无法加载话题内容。请检查网络连接或稍后重试。',
          contentHtml: '<p>抱歉，无法加载话题内容。请检查网络连接或稍后重试。</p>',
          author: { id: 1, name: '系统', avatar: 'S' },
          course: null,
          type: '讨论',
          tags: ['加载失败'],
          isAnonymous: false,
          viewCount: 0,
          likeCount: 0,
          replyCount: 0,
          isSticky: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      } finally {
        isLoading.value = false
      }
    }

    const loadReplies = async () => {
      try {
        const topicId = route.params.id
        
        // 使用真实API获取回复列表
        replies.value = await forumApi.getReplies(topicId)
        
      } catch (error) {
        console.error('加载回复列表失败:', error)
        
        // 如果API调用失败，使用默认回复数据
        replies.value = [
          {
            id: 1,
            content: '暂时无法加载回复，请稍后刷新页面查看。',
            author: { id: 1, name: '系统', avatar: 'S' },
            isAnonymous: false,
            likeCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      }
    }

    const handleLike = async () => {
      try {
        const topicId = route.params.id
        await forumApi.toggleLike(topicId)
        
        // 重新加载话题数据以更新点赞数
        await loadTopic()
        
      } catch (error) {
        console.error('点赞操作失败:', error)
        
        // 如果API调用失败，使用本地状态切换
        isLiked.value = !isLiked.value
        if (isLiked.value) {
          topic.value.likeCount++
        } else {
          topic.value.likeCount--
        }
      }
    }

    const handleCollect = () => {
      // 收藏功能暂用本地状态
      isCollected.value = !isCollected.value
    }

    const submitReply = async () => {
      if (!replyContent.value.trim()) return
      
      try {
        replyLoading.value = true
        const topicId = route.params.id
        
        // 使用真实API创建回复
        await forumApi.createReply(topicId, {
          content: replyContent.value,
          isAnonymous: replyAnonymous.value
        })
        
        // 重新加载回复列表
        await loadReplies()
        
        // 重置表单
        replyContent.value = ''
        replyAnonymous.value = false
        showReplyForm.value = false
        
      } catch (error) {
        console.error('发布回复失败:', error)
        
        // 如果API调用失败，使用本地数据
        const newReply = {
          id: replies.value.length + 1,
          content: replyContent.value,
          author: { id: 1, name: '当前用户', avatar: '我' },
          isAnonymous: replyAnonymous.value,
          likeCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        replies.value.unshift(newReply)
        topic.value.replyCount++
        
        // 重置表单
        replyContent.value = ''
        replyAnonymous.value = false
        showReplyForm.value = false
      } finally {
        replyLoading.value = false
      }
    }

    // 生命周期
    onMounted(() => {
      loadTopic()
    })

    return {
      topic,
      replies,
      showReplyForm,
      replyContent,
      replyAnonymous,
      isLiked,
      isCollected,
      formatTime,
      getTypeText,
      handleLike,
      handleCollect,
      submitReply
    }
  }
}
</script>

<style scoped>
.forum-topic {
  min-height: calc(100vh - 200px);
  background: #f8fafc;
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #718096;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 0.5rem;
}

.current {
  color: #2d3748;
  font-weight: 500;
}

.topic-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.topic-main {
  margin-bottom: 2rem;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.topic-title-section {
  flex: 1;
}

.topic-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.topic-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.topic-type {
  padding: 0.375rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.type-提问 {
  background: #fed7d7;
  color: #c53030;
}

.type-讨论 {
  background: #bee3f8;
  color: #2b6cb0;
}

.type-经验 {
  background: #c6f6d5;
  color: #276749;
}

.topic-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
}

.topic-actions {
  display: flex;
  gap: 0.75rem;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.post-time {
  font-size: 0.875rem;
  color: #718096;
}

.view-count {
  font-size: 0.875rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.topic-content {
  margin-bottom: 2rem;
}

.content-html {
  line-height: 1.7;
  color: #2d3748;
}

.content-html :deep(p) {
  margin-bottom: 1rem;
}

.content-html :deep(h1),
.content-html :deep(h2),
.content-html :deep(h3) {
  margin: 1.5rem 0 1rem 0;
  color: #2d3748;
}

.content-html :deep(ul),
.content-html :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-html :deep(li) {
  margin-bottom: 0.5rem;
}

.topic-interactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
}

.interaction-stats {
  display: flex;
  gap: 1rem;
  color: #718096;
  font-size: 0.875rem;
}

.interaction-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.reply-form-container {
  background: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.reply-form h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

.replies-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 2rem;
}

.replies-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.replies-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-replies {
  text-align: center;
  padding: 3rem 2rem;
  color: #a0aec0;
}

.empty-replies i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
  
  .topic-header {
    align-items: flex-start;
  }
  
  .topic-title {
    font-size: 1.5rem;
  }
  
  .reply-actions {
    flex-direction: row;
    gap: 0.75rem;
  }
  
  .reply-form {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .topic-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .topic-title-section {
    text-align: center;
  }
  
  .topic-title {
    font-size: 1.4rem;
    line-height: 1.3;
  }
  
  .topic-meta {
    justify-content: center;
    gap: 0.75rem;
  }
  
  .topic-actions {
    align-self: stretch;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .author-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .author-avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .topic-interactions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .interaction-btn {
    justify-content: center;
    padding: 0.875rem;
  }
  
  .reply-item {
    padding: 1rem;
  }
  
  .reply-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .reply-actions {
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .reply-actions button {
    flex: 1;
    justify-content: center;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
  }
  
  .reply-form {
    padding: 1rem;
  }
  
  .editor-toolbar {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .toolbar-btn {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .submit-btn, .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .topic-title {
    font-size: 1.25rem;
  }
  
  .topic-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .topic-tags {
    justify-content: center;
  }
  
  .tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
  
  .topic-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .action-btn {
    justify-content: center;
  }
  
  .reply-item {
    padding: 0.75rem;
  }
  
  .reply-content {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .interaction-stats {
    font-size: 0.8rem;
  }
  
  .interaction-btn {
    font-size: 0.8rem;
    padding: 0.75rem;
  }
}
</style>