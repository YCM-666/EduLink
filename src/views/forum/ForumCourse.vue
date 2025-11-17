<template>
  <div class="forum-course">
    <!-- 课程头部 -->
    <div class="course-header">
      <div class="container">
        <div class="course-info">
          <div class="course-icon">
            <svg width="32" height="32" fill="currentColor">
              <path v-if="course.id === 1" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
              <path v-if="course.id === 2" d="M5.5 2A2.5 2.5 0 0 0 3 4.5v9a2.5 2.5 0 0 0 2.5 2.5h6a2.5 2.5 0 0 0 2.5-2.5V4.5A2.5 2.5 0 0 0 11.5 2h-6ZM5 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-9Z"/>
              <path v-if="course.id === 3" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
              <path v-if="course.id === 4" d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78-.004c.614-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
            </svg>
          </div>
          <div class="course-details">
            <h1 class="course-title">{{ course.name }}</h1>
            <p class="course-description">{{ course.description }}</p>
            <div class="course-stats">
              <span class="stat">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                {{ course.enrollment }} 人学习
              </span>
              <span class="stat">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
                {{ course.topicCount }} 个话题
              </span>
            </div>
          </div>
        </div>
        
          <div class="course-actions">
            <router-link to="/forum/create" class="btn btn-primary">
              <svg width="16" height="16" fill="currentColor">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              发布话题
            </router-link>
          </div>
      </div>
    </div>

    <div class="container">
      <div class="forum-content">
        <!-- 侧边栏 - 课程信息 -->
        <aside class="course-sidebar">
          <div class="sidebar-section">
            <h3>课程信息</h3>
            <div class="course-meta">
              <div class="meta-item">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
                </svg>
                <span>课程类别: {{ course.category }}</span>
              </div>
              <div class="meta-item">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                <span>开课学期: {{ course.semester }}</span>
              </div>
              <div class="meta-item">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <span>授课教师: {{ course.teacher }}</span>
              </div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3>相关资源</h3>
            <div class="resource-links">
              <router-link :to="`/course/${course.id}`" class="resource-link">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                课程详情
              </router-link>
              <router-link :to="`/posts?course=${course.id}`" class="resource-link">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                </svg>
                学习笔记
              </router-link>
              <a href="#" class="resource-link" @click.prevent="downloadMaterials">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                课程资料
              </a>
            </div>
          </div>
        </aside>

        <!-- 主内容区 -->
        <main class="forum-main">
          <!-- 筛选和排序 -->
          <div class="forum-controls">
            <div class="search-box">
              <svg width="20" height="20" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索话题..."
                @input="handleSearch"
              >
            </div>
            
            <div class="sort-controls">
              <select v-model="sortBy" @change="loadTopics">
                <option value="created_at">最新发布</option>
                <option value="reply_count">热门回复</option>
                <option value="like_count">最多点赞</option>
              </select>
            </div>
          </div>

          <!-- 话题列表 -->
          <div class="topics-list">
            <!-- 加载状态 -->
            <div v-if="isLoading" class="loading-state">
              <div class="loading-spinner">
                <div class="spinner"></div>
              </div>
              <p>正在加载话题...</p>
            </div>
            
            <!-- 话题列表 -->
            <div 
              v-else-if="filteredTopics.length > 0"
              v-for="topic in filteredTopics" 
              :key="topic.id" 
              class="topic-item"
            >
              <TopicCard 
                :topic="topic" 
                @click="viewTopic(topic.id)"
              />
            </div>
            
            <!-- 空状态 -->
            <div v-else class="empty-state">
              <div class="empty-icon">💬</div>
              <h3>暂无话题</h3>
              <p>{{ searchQuery ? '没有找到相关话题' : '还没有人发布话题，快来创建第一个话题吧！' }}</p>
              <router-link to="/forum/create" class="btn btn-primary">
                发布话题
              </router-link>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopicCard from '../../components/forum/TopicCard.vue'
import { forumApi } from '../../services/forumApi.js'

export default {
  name: 'ForumCourse',
  components: {
    TopicCard
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    // 数据状态
    const course = ref({})
    const searchQuery = ref('')
    const sortBy = ref('created_at')
    const topics = ref([])
    const isLoading = ref(false)
    const searchTimeout = ref(null)
    
    // 课程数据映射
    const courseData = {
      'course-1': {
        id: 1,
        name: '前端开发实战',
        description: '从HTML、CSS到JavaScript框架的完整前端开发课程',
        category: '计算机科学',
        semester: '2024春季学期',
        teacher: '张教授',
        enrollment: 245,
        topicCount: 15,
        icon: 'fas fa-code'
      },
      'course-2': {
        id: 2,
        name: '数据结构与算法',
        description: '深入理解常用数据结构和算法设计思想',
        category: '计算机科学',
        semester: '2024春季学期',
        teacher: '李教授',
        enrollment: 189,
        topicCount: 23,
        icon: 'fas fa-sitemap'
      },
      'course-3': {
        id: 3,
        name: '大学英语四级',
        description: '系统学习英语四级考试技巧和知识点',
        category: '语言学习',
        semester: '2024春季学期',
        teacher: '王教授',
        enrollment: 156,
        topicCount: 18,
        icon: 'fas fa-language'
      },
      'course-4': {
        id: 4,
        name: '高等数学',
        description: '微积分、线性代数等高等数学核心内容',
        category: '数学',
        semester: '2024春季学期',
        teacher: '刘教授',
        enrollment: 198,
        topicCount: 12,
        icon: 'fas fa-calculator'
      }
    }
    
    // 加载课程信息
    const loadCourse = () => {
      const courseId = route.params.id
      
      // 使用课程数据映射
      course.value = courseData[courseId] || courseData['course-1']
    }
    
    // 加载话题 - 使用真实API
    const loadTopics = async () => {
      try {
        isLoading.value = true
        const courseId = route.params.id
        
        // 使用真实API获取课程相关话题
        const result = await forumApi.getTopics({
          category: courseId,
          sortBy: sortBy.value,
          search: searchQuery.value
        })
        
        topics.value = result.topics
        
        // 更新课程的话题计数
        course.value.topicCount = result.total || 0
        
      } catch (error) {
        console.error('加载话题失败:', error)
        
        // 如果API调用失败，使用默认数据确保页面正常显示
        topics.value = [
          {
            id: 1,
            title: '话题数据加载中',
            content: '当前课程话题数据正在加载中，请稍后刷新页面查看最新话题...',
            author: { id: 1, name: '系统', avatar: 'S' },
            course: { id: course.value.id, name: course.value.name },
            category: courseId,
            type: '讨论',
            tags: ['加载中'],
            isAnonymous: false,
            viewCount: 0,
            likeCount: 0,
            replyCount: 0,
            isSticky: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      } finally {
        isLoading.value = false
      }
    }
    
    // 计算属性
    const filteredTopics = computed(() => {
      let filtered = topics.value
      
      // 搜索筛选
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(topic => 
          topic.title.toLowerCase().includes(query) ||
          topic.content.toLowerCase().includes(query) ||
          topic.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      // 排序
      filtered.sort((a, b) => {
        if (sortBy.value === 'created_at') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else {
          return b[sortBy.value] - a[sortBy.value]
        }
      })
      
      return filtered
    })
    
    // 方法
    const handleSearch = () => {
      // 清除之前的定时器
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
      }
      
      // 设置新的防抖定时器
      searchTimeout.value = setTimeout(() => {
        if (searchQuery.value.trim() === '') {
          // 搜索内容为空时，重新加载所有话题
          loadTopics()
        } else {
          // 有搜索内容时，执行搜索
          performSearch()
        }
      }, 500) // 500ms 防抖延迟
    }
    
    // 搜索功能实现
    const performSearch = async () => {
      isLoading.value = true
      
      // 模拟搜索API调用延迟
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // 这里实际应该调用搜索API，现在是前端模拟搜索
      const query = searchQuery.value.toLowerCase().trim()
      
      if (query) {
        // 过滤出包含搜索关键词的话题
        const filtered = topics.value.filter(topic => 
          topic.title.toLowerCase().includes(query) ||
          topic.content.toLowerCase().includes(query) ||
          topic.tags.some(tag => tag.toLowerCase().includes(query))
        )
        
        // 更新显示的话题列表
        topics.value = filtered
      }
      
      isLoading.value = false
    }
    
    const viewTopic = (topicId) => {
      router.push(`/forum/topic/${topicId}`)
    }
    
    const downloadMaterials = () => {
      alert('课程资料下载功能开发中...')
    }
    
    // 生命周期
    onMounted(() => {
      loadCourse()
      loadTopics()
    })
    
    return {
      course,
      searchQuery,
      sortBy,
      topics,
      filteredTopics,
      handleSearch,
      viewTopic,
      downloadMaterials,
      loadTopics
    }
  }
}
</script>

<style scoped>
.forum-course {
  min-height: calc(100vh - 200px);
  background: #f8fafc;
}

.course-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
}

.course-info {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

.course-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.course-details {
  flex: 1;
}

.course-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.course-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.course-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.course-actions {
  display: flex;
  gap: 1rem;
}

.forum-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

/* 侧边栏样式 */
.course-sidebar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-section:last-child {
  margin-bottom: 0;
}

.sidebar-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.course-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.meta-item i {
  width: 16px;
  text-align: center;
  color: #667eea;
}

.resource-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.resource-link:hover {
  background: #f7fafc;
  color: #667eea;
}

.resource-link i {
  width: 16px;
  text-align: center;
}

/* 主内容区样式 */
.forum-main {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.forum-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.sort-controls select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
}

.topics-list {
  min-height: 400px;
}

.topic-item {
  margin-bottom: 1rem;
}

.topic-item:last-child {
  margin-bottom: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #a0aec0;
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.empty-state p {
  margin-bottom: 1.5rem;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 1024px) {
  .forum-content {
    grid-template-columns: 250px 1fr;
    gap: 1.5rem;
  }
  
  .course-title {
    font-size: 2rem;
  }
  
  .course-stats {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .course-info {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
  
  .course-stats {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  
  .forum-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .course-sidebar {
    position: static;
    padding: 1.5rem;
  }
  
  .course-header {
    padding: 2rem 0;
  }
  
  .course-title {
    font-size: 1.75rem;
  }
  
  .course-description {
    font-size: 1rem;
  }
  
  .forum-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .sort-controls select {
    width: 100%;
  }
  
  .resource-links {
    flex-direction: column;
  }
  
  .resource-link {
    justify-content: center;
  }
  
  .course-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .forum-main {
    padding: 1rem;
  }
  
  .course-sidebar {
    padding: 1rem;
  }
  
  .course-title {
    font-size: 1.5rem;
  }
  
  .course-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .meta-item {
    flex-direction: column;
    text-align: center;
    gap: 0.25rem;
  }
  
  .topic-item {
    margin-bottom: 0.75rem;
  }
  
  .empty-state {
    padding: 2rem 1rem;
  }
}
</style>