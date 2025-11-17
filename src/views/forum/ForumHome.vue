<template>
  <div class="forum-home">
    <!-- 动画背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <!-- 论坛头部 -->
    <div class="forum-header">
      <div class="container">
        <div class="header-content">
          <div class="header-text">
            <h1 class="forum-title">
              <span class="title-gradient">校园论坛</span>
              <span class="title-sparkle">✨</span>
            </h1>
            <p class="forum-description">分享学习经验，交流课程心得，共同进步成长</p>
          </div>
          
          <!-- 创建话题按钮 -->
          <div class="forum-actions">
            <router-link to="/forum/create" class="create-btn">
              <svg width="20" height="20" fill="currentColor">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              发布话题
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="forum-content">
        <!-- 侧边栏 - 论坛分区 -->
        <aside class="forum-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-header">
              <svg width="24" height="24" fill="currentColor">
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828z"/>
                <path d="M15 5.388c1.623 0 3.027.569 4.127 1.549 1.099.98 1.716 2.279 1.716 3.587 0 1.308-.617 2.607-1.716 3.586-1.1.98-2.504 1.55-4.127 1.55-1.623 0-3.027-.57-4.127-1.55-1.099-.98-1.716-2.278-1.716-3.586 0-1.308.617-2.607 1.716-3.587C11.973 5.957 13.377 5.388 15 5.388z"/>
              </svg>
              <h3>论坛分区</h3>
            </div>
            <div class="forum-categories">
              <div class="category-group">
                <h4>公共话题</h4>
                <ul class="category-list">
                  <li 
                    v-for="category in publicCategories" 
                    :key="category.id"
                    :class="{ active: selectedCategory === category.id }"
                    @click="selectCategory(category.id)"
                  >
                    <div class="category-icon">
                      <svg width="16" height="16" fill="currentColor">
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                      </svg>
                    </div>
                    <span class="category-name">{{ category.name }}</span>
                    <span class="topic-count">{{ category.count }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="category-group">
                <h4>课程论坛</h4>
                <ul class="category-list">
                  <li 
                    v-for="course in courseCategories" 
                    :key="course.id"
                    :class="{ active: selectedCategory === course.id }"
                    @click="selectCategory(course.id)"
                  >
                    <div class="category-icon">
                      <svg width="16" height="16" fill="currentColor">
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                      </svg>
                    </div>
                    <span class="category-name">{{ course.name }}</span>
                    <span class="topic-count">{{ course.count }}</span>
                  </li>
                </ul>
              </div>
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
                class="search-input"
              >
            </div>
            
            <div class="sort-controls">
              <div class="select-wrapper">
                <select v-model="sortBy" @change="loadTopics" class="sort-select">
                  <option value="created_at">最新发布</option>
                  <option value="reply_count">热门回复</option>
                  <option value="like_count">最多点赞</option>
                </select>
                <div class="select-arrow">▼</div>
              </div>
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
              <p>{{ searchQuery ? '没有找到相关话题' : '成为第一个发布话题的人吧！' }}</p>
              <router-link to="/forum/create" class="create-topic-btn">
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
import { useRouter } from 'vue-router'
import TopicCard from '../../components/forum/TopicCard.vue'
import { forumApi } from '../../services/forumApi.js'

export default {
  name: 'ForumHome',
  components: {
    TopicCard
  },
  setup() {
    const router = useRouter()
    
    // 数据状态
    const selectedCategory = ref('all')
    const searchQuery = ref('')
    const sortBy = ref('created_at')
    const topics = ref([])
    const isLoading = ref(false)
    const searchTimeout = ref(null)
    const forumStats = ref({
      publicTopics: 0,
      courseTopics: 0,
      totalTopics: 0
    })
    
    // 论坛分区数据
    const publicCategories = ref([
      { id: 'all', name: '全部话题', icon: 'fas fa-comments', count: 0 },
      { id: 'strategy', name: '选课攻略', icon: 'fas fa-graduation-cap', count: 0 },
      { id: 'help', name: '期末互助', icon: 'fas fa-hands-helping', count: 0 },
      { id: 'tools', name: '学习工具', icon: 'fas fa-tools', count: 0 },
      { id: 'campus', name: '校园生活', icon: 'fas fa-university', count: 0 }
    ])
    
    const courseCategories = ref([
      { id: 'course-1', name: '前端开发实战', icon: 'fas fa-code', count: 0 },
      { id: 'course-2', name: '数据结构与算法', icon: 'fas fa-sitemap', count: 0 },
      { id: 'course-3', name: '大学英语四级', icon: 'fas fa-language', count: 0 },
      { id: 'course-4', name: '高等数学', icon: 'fas fa-calculator', count: 0 }
    ])
    
    // 话题数据 - 使用模拟数据
    const loadTopics = async () => {
      try {
        isLoading.value = true
        
        // 使用模拟话题数据
        topics.value = [
          {
            id: '1',
            title: 'Vue3 项目开发经验分享',
            content: '最近在开发一个校园学习平台，使用Vue3 + Vite，有很多实践经验想和大家分享...',
            author: { id: '1', name: '张同学', avatar: '张' },
            course: '前端开发实战',
            category: 'course-1',
            type: '经验分享',
            tags: ['Vue3', '前端开发', '项目经验'],
            isAnonymous: false,
            viewCount: 156,
            likeCount: 28,
            replyCount: 12,
            isSticky: true,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeAgo: '2小时前'
          },
          {
            id: '2',
            title: '数据结构期末考试重点总结',
            content: '整理了数据结构期末考试的各个章节重点内容，希望对大家有所帮助...',
            author: { id: '2', name: '李同学', avatar: '李' },
            course: '数据结构与算法',
            category: 'course-2',
            type: '学习资料',
            tags: ['数据结构', '期末考试', '重点总结'],
            isAnonymous: false,
            viewCount: 89,
            likeCount: 15,
            replyCount: 6,
            isSticky: false,
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeAgo: '5小时前'
          },
          {
            id: '3',
            title: '英语四级听力训练方法交流',
            content: '大家都在用什么方法练习英语四级听力？有什么好的app推荐吗？',
            author: { id: '3', name: '王同学', avatar: '王' },
            course: '大学英语四级',
            category: 'course-3',
            type: '问题讨论',
            tags: ['英语四级', '听力训练', '学习工具'],
            isAnonymous: false,
            viewCount: 67,
            likeCount: 9,
            replyCount: 8,
            isSticky: false,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeAgo: '1天前'
          },
          {
            id: '4',
            title: '高等数学课后习题讲解',
            content: '第三章课后习题第5题有同学会做吗？可以一起讨论一下解题思路...',
            author: { id: '4', name: '陈同学', avatar: '陈' },
            course: '高等数学',
            category: 'course-4',
            type: '答疑解惑',
            tags: ['高等数学', '课后习题', '解题思路'],
            isAnonymous: false,
            viewCount: 45,
            likeCount: 6,
            replyCount: 5,
            isSticky: false,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            timeAgo: '2天前'
          }
        ]
        
        // 获取论坛统计信息
        await loadForumStats()
        
      } catch (error) {
        console.error('加载话题失败:', error)
      } finally {
        isLoading.value = false
      }
    }
    
    // 加载论坛统计信息
    const loadForumStats = async () => {
      try {
        // 使用模拟统计信息
        forumStats.value = {
          publicTopics: 45,
          courseTopics: 120,
          totalTopics: 165,
          activeUsers: 89,
          todayTopics: 8
        }
        
        // 更新分类计数
        publicCategories.value.forEach(category => {
          if (category.id === 'all') {
            category.count = forumStats.value.totalTopics
          } else {
            category.count = Math.floor(forumStats.value.publicTopics / 4) // 模拟分配
          }
        })
        
        courseCategories.value.forEach(course => {
          course.count = Math.floor(forumStats.value.courseTopics / 4) // 模拟分配
        })
        
      } catch (error) {
        console.error('加载论坛统计信息失败:', error)
      }
    }
    
    // 计算属性
    const filteredTopics = computed(() => {
      // 后端API已经处理了筛选和排序，这里直接返回
      return topics.value
    })
    
    // 方法
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId
      loadTopics()
    }
    
    const handleSearch = () => {
      // 清除之前的定时器
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
      }
      
      // 设置新的防抖定时器
      searchTimeout.value = setTimeout(() => {
        loadTopics()
      }, 500) // 500ms 防抖延迟
    }
    
    const viewTopic = (topicId) => {
      router.push(`/forum/topic/${topicId}`)
    }
    
    // 刷新话题列表
    const refreshTopics = () => {
      loadTopics()
    }
    
    // 生命周期
    onMounted(() => {
      loadTopics()
    })
    
    return {
      selectedCategory,
      searchQuery,
      sortBy,
      topics,
      publicCategories,
      courseCategories,
      filteredTopics,
      forumStats,
      selectCategory,
      handleSearch,
      viewTopic,
      refreshTopics,
      loadTopics,
      isLoading
    }
  }
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

.forum-home {
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  backdrop-filter: blur(10px);
}

.forum-header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  color: #2d3748;
  padding: 4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  flex: 1;
}

.forum-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

.forum-description {
  font-size: 1.25rem;
  color: #718096;
  line-height: 1.6;
  max-width: 600px;
}

.forum-actions {
  margin-top: 0;
}

.create-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.forum-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 3rem 0;
}

/* 侧边栏样式 */
.forum-sidebar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
  position: sticky;
  top: 3rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.sidebar-header svg {
  color: #667eea;
}

.sidebar-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.category-group {
  margin-bottom: 2rem;
}

.category-group h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.category-list li:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(4px);
}

.category-list li.active {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-weight: 600;
  border-left: 4px solid #667eea;
}

.category-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: currentColor;
}

.category-name {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.topic-count {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.4rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 主内容区样式 */
.forum-main {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.forum-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.sort-controls {
  display: flex;
  align-items: center;
}

.select-wrapper {
  position: relative;
}

.sort-select {
  padding: 1rem 3rem 1rem 1rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  pointer-events: none;
}

.topics-list {
  min-height: 500px;
  position: relative;
}

.topic-item {
  margin-bottom: 1.5rem;
}

.topic-item:last-child {
  margin-bottom: 0;
}

/* 加载状态样式 */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
}

.loading-spinner {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.empty-state h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
}

.empty-state p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.create-topic-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.create-topic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 1024px) {
  .forum-content {
    grid-template-columns: 280px 1fr;
    gap: 1.5rem;
  }
  
  .forum-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .forum-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .forum-sidebar {
    position: static;
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  .forum-header {
    padding: 2rem 0;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .forum-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .forum-description {
    font-size: 1rem;
    max-width: 100%;
  }
  
  .forum-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .sort-controls {
    width: 100%;
  }
  
  .sort-select {
    width: 100%;
  }
  
  .category-list li {
    padding: 0.75rem 1rem;
  }
  
  .create-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .forum-main {
    padding: 1.5rem;
  }
  
  .forum-sidebar {
    padding: 1rem;
  }
  
  .forum-title {
    font-size: 1.75rem;
  }
  
  .category-list li {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .category-icon {
    margin-right: 0;
  }
  
  .topic-count {
    margin-top: 0.25rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-btn {
    justify-content: center;
  }
}
</style>