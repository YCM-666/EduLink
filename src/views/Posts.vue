<template>
  <div class="posts">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="hero-badge">
          <span class="badge-text">知识共享</span>
        </div>
        <h1 class="gradient-text">学习笔记</h1>
        <p class="header-subtitle">分享学习心得，交流解题思路，共同进步成长</p>
        
        <!-- 搜索和筛选区域 -->
        <div class="filter-section">
          <div class="search-box floating-element">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="搜索笔记、标签或关键词..." 
              v-model="searchQuery"
              @input="handleSearch"
              class="search-input"
            >
            <div class="search-suggestions" v-if="searchSuggestions.length > 0 && searchQuery">
              <div v-for="suggestion in searchSuggestions" :key="suggestion" 
                   @click="selectSuggestion(suggestion)" class="suggestion-item">
                {{ suggestion }}
              </div>
            </div>
          </div>
          
          <div class="filter-controls">
            <div class="category-tags">
              <button 
                v-for="category in categories" 
                :key="category.value"
                :class="['category-tag', { active: selectedCategory === category.value }]"
                @click="toggleCategory(category.value)"
              >
                <i :class="category.icon"></i>
                {{ category.label }}
              </button>
            </div>
            
            <div class="sort-control">
              <select v-model="selectedSort" @change="handleSortChange" class="sort-select">
                <option value="newest">最新发布</option>
                <option value="popular">最多点赞</option>
                <option value="views">最多浏览</option>
                <option value="comments">最多评论</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 统计信息 -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ totalPosts }}</div>
              <div class="stat-label">总笔记数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalLikes }}</div>
              <div class="stat-label">总点赞数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ activeAuthors }}</div>
              <div class="stat-label">活跃作者</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalViews }}</div>
              <div class="stat-label">总浏览量</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 笔记列表 -->
      <div class="posts-grid">
        <div v-for="post in filteredPosts" :key="post.id" class="post-card floating-element">
          <div class="card-gradient"></div>
          <div class="post-badge" :class="getTypeClass(post.type)">
            <i :class="getTypeIcon(post.type)"></i>
            {{ post.type }}
          </div>
          
          <div class="post-header">
            <div class="author-info">
              <div class="author-avatar">
                <div class="avatar-gradient">{{ post.author.charAt(0) }}</div>
                <div class="online-indicator" v-if="post.isOnline"></div>
              </div>
              <div class="author-details">
                <span class="author-name">{{ post.author }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
            </div>
            <div class="interaction-stats">
              <div class="stat">
                <i class="fas fa-eye"></i>
                <span>{{ post.views }}</span>
              </div>
              <div class="stat">
                <i class="fas fa-heart"></i>
                <span>{{ post.likes }}</span>
              </div>
            </div>
          </div>
          
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          
          <div class="post-footer">
            <div class="course-info">
              <i class="fas fa-book"></i>
              <span>{{ post.course }}</span>
            </div>
            <div class="post-actions">
              <button @click="handleLike(post.id)" class="btn-like" :class="{ liked: post.isLiked }">
                <i :class="post.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                <span>{{ post.likes }}</span>
              </button>
              <router-link :to="`/post/${post.id}`" class="btn-read">
                <i class="fas fa-book-open"></i>
                阅读全文
              </router-link>
              <button class="btn-bookmark">
                <i class="far fa-bookmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <h3>暂无相关笔记</h3>
        <p>尝试调整搜索条件或查看其他分类</p>
        <router-link to="/write" class="btn btn-primary">
          <i class="fas fa-plus"></i>
          开始写作
        </router-link>
      </div>

      <!-- 分页 -->
      <div v-if="filteredPosts.length > 0" class="pagination">
        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <span class="pagination-info">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </span>
        
        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Posts',
  setup() {
    const route = useRoute()
    const searchQuery = ref(route.query.search || '')
    const selectedCategory = ref('all')
    const selectedSort = ref('newest')
    const currentPage = ref(1)
    const postsPerPage = 6
    
    // 搜索建议
    const searchSuggestions = ref([
      'Vue3', 'React', 'JavaScript', '数据结构', '算法', '高等数学', '英语四级'
    ])
    
    // 分类选项
    const categories = ref([
      { value: 'all', label: '全部', icon: 'fas fa-layer-group' },
      { value: 'programming', label: '编程', icon: 'fas fa-code' },
      { value: 'math', label: '数学', icon: 'fas fa-calculator' },
      { value: 'english', label: '英语', icon: 'fas fa-language' },
      { value: 'physics', label: '物理', icon: 'fas fa-atom' }
    ])

    // 笔记数据
    const posts = ref([
      {
        id: 1,
        title: 'Vue3 Composition API 最佳实践',
        excerpt: '详细介绍Vue3组合式API的使用方法和最佳实践案例，帮助开发者更好地理解和应用Vue3的新特性。',
        author: '张同学',
        date: '2小时前',
        type: '学习笔记',
        category: 'programming',
        course: '前端开发实战',
        courseId: 1,
        tags: ['Vue3', '前端', 'JavaScript'],
        views: 124,
        likes: 23,
        comments: 8,
        isLiked: false,
        isOnline: true
      },
      {
        id: 2,
        title: '高等数学解题技巧总结',
        excerpt: '分享一些高等数学中常见的解题技巧和思路，帮助大家更好地掌握数学分析方法。',
        author: '李同学',
        date: '5小时前',
        type: '经验分享',
        category: 'math',
        course: '高等数学',
        courseId: 4,
        tags: ['数学', '学习技巧'],
        views: 89,
        likes: 15,
        comments: 5,
        isLiked: true,
        isOnline: false
      },
      {
        id: 3,
        title: 'JavaScript异步编程详解',
        excerpt: '深入理解Promise、async/await等异步编程技术，掌握现代JavaScript开发的核心概念。',
        author: '王同学',
        date: '1天前',
        type: '技术文章',
        category: 'programming',
        course: '前端开发实战',
        courseId: 1,
        tags: ['JavaScript', '异步编程', 'Promise'],
        views: 156,
        likes: 32,
        comments: 12,
        isLiked: false,
        isOnline: true
      },
      {
        id: 4,
        title: '数据结构之链表应用',
        excerpt: '通过实际案例讲解链表数据结构在编程中的各种应用场景和使用技巧。',
        author: '赵同学',
        date: '2天前',
        type: '学习笔记',
        category: 'programming',
        course: '数据结构与算法',
        courseId: 2,
        tags: ['数据结构', '链表', '算法'],
        views: 78,
        likes: 18,
        comments: 6,
        isLiked: false,
        isOnline: false
      },
      {
        id: 5,
        title: '英语四级听力训练方法',
        excerpt: '介绍有效的英语四级听力训练方法和技巧，帮助提高英语听力水平。',
        author: '刘同学',
        date: '3天前',
        type: '学习笔记',
        category: 'english',
        course: '大学英语四级',
        courseId: 3,
        tags: ['英语', '四级', '听力'],
        views: 92,
        likes: 25,
        comments: 7,
        isLiked: false,
        isOnline: true
      },
      {
        id: 6,
        title: 'React Hooks 使用心得',
        excerpt: '分享React Hooks在实际项目中的使用经验和最佳实践。',
        author: '陈同学',
        date: '3天前',
        type: '技术文章',
        category: 'programming',
        course: '前端开发实战',
        courseId: 1,
        tags: ['React', 'Hooks', '前端'],
        views: 167,
        likes: 45,
        comments: 15,
        isLiked: true,
        isOnline: false
      }
    ])

    // 统计信息
    const totalPosts = computed(() => posts.value.length)
    const totalLikes = computed(() => posts.value.reduce((sum, post) => sum + post.likes, 0))
    const totalViews = computed(() => posts.value.reduce((sum, post) => sum + post.views, 0))
    const activeAuthors = computed(() => new Set(posts.value.map(post => post.author)).size)

    // 过滤后的笔记
    const filteredPosts = computed(() => {
      let filtered = posts.value
      
      // 搜索过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.course.toLowerCase().includes(query)
        )
      }
      
      // 分类过滤
      if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(post => post.category === selectedCategory.value)
      }
      
      // 排序
      filtered = [...filtered].sort((a, b) => {
        switch (selectedSort.value) {
          case 'popular':
            return b.likes - a.likes
          case 'views':
            return b.views - a.views
          case 'comments':
            return b.comments - a.comments
          default:
            return 0 // 默认按发布时间排序（需要添加时间字段）
        }
      })
      
      return filtered
    })

    // 分页相关
    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / postsPerPage)
    })

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage
      const end = start + postsPerPage
      return filteredPosts.value.slice(start, end)
    })

    // 类型样式
    const getTypeClass = (type) => {
      const typeMap = {
        '学习笔记': 'type-note',
        '技术文章': 'type-article',
        '问题讨论': 'type-discussion',
        '经验分享': 'type-share'
      }
      return typeMap[type] || 'type-default'
    }

    // 类型图标
    const getTypeIcon = (type) => {
      const iconMap = {
        '学习笔记': 'fas fa-book',
        '技术文章': 'fas fa-code',
        '问题讨论': 'fas fa-question-circle',
        '经验分享': 'fas fa-lightbulb'
      }
      return iconMap[type] || 'fas fa-file-alt'
    }

    // 处理搜索
    const handleSearch = () => {
      currentPage.value = 1
    }

    // 切换分类
    const toggleCategory = (category) => {
      selectedCategory.value = category
      currentPage.value = 1
    }

    // 处理排序变化
    const handleSortChange = () => {
      currentPage.value = 1
    }

    // 选择搜索建议
    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion
      currentPage.value = 1
    }

    // 分页导航
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    // 点赞处理
    const handleLike = (postId) => {
      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.isLiked = !post.isLiked
        post.likes += post.isLiked ? 1 : -1
      }
    }

    onMounted(() => {
      // 如果URL中有搜索参数，初始化搜索
      if (route.query.search) {
        searchQuery.value = route.query.search
      }
    })

    return {
      searchQuery,
      selectedCategory,
      selectedSort,
      currentPage,
      categories,
      searchSuggestions,
      posts: paginatedPosts,
      filteredPosts,
      totalPages,
      totalPosts,
      totalLikes,
      totalViews,
      activeAuthors,
      getTypeClass,
      getTypeIcon,
      handleSearch,
      toggleCategory,
      handleSortChange,
      selectSuggestion,
      goToPage,
      handleLike
    }
  }
}
</script>

<style scoped>
.posts {
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  filter: blur(40px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
  width: 180px;
  height: 180px;
  bottom: 20%;
  left: 15%;
  animation: float 7s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  animation: badgePulse 2s ease-in-out infinite alternate;
}

@keyframes badgePulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.badge-text {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.gradient-text {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
  0% { filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3)); }
  100% { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.6)); }
}

.header-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.filter-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid transparent;
  border-radius: 50px;
  font-size: 1rem;
  background: rgba(248, 249, 250, 0.8);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  overflow: hidden;
  z-index: 100;
}

.suggestion-item {
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f8f9fa;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.category-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 50px;
  background: rgba(248, 249, 250, 0.8);
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.category-tag.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.category-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.sort-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
}

.stats-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-weight: 600;
  font-size: 0.9rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.floating-element {
  animation: floatElement 6s ease-in-out infinite;
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.post-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.post-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.post-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

.post-badge.type-note {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.post-badge.type-article {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
}

.post-badge.type-discussion {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
}

.post-badge.type-share {
  background: linear-gradient(135deg, #9f7aea 0%, #805ad5 100%);
  color: white;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  position: relative;
}

.avatar-gradient {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #48bb78;
  border: 2px solid white;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 700;
  color: #2d3748;
  font-size: 1rem;
}

.post-date {
  font-size: 0.85rem;
  color: #a0aec0;
}

.interaction-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.stat i {
  color: #667eea;
}

.post-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
  line-height: 1.4;
}

.post-excerpt {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.course-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.course-info i {
  color: #667eea;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-like, .btn-read, .btn-bookmark {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-like {
  background: rgba(237, 137, 54, 0.1);
  color: #ed8936;
}

.btn-like.liked {
  background: #ed8936;
  color: white;
}

.btn-read {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
}

.btn-bookmark {
  background: rgba(160, 174, 192, 0.1);
  color: #a0aec0;
}

.btn-like:hover, .btn-read:hover, .btn-bookmark:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin: 2rem 0;
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
  margin-bottom: 2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn {
  width: 50px;
  height: 50px;
  border: 2px solid #e2e8f0;
  border-radius: 15px;
  background: white;
  color: #718096;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #718096;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .posts {
    padding: 1rem 0;
  }
  
  .gradient-text {
    font-size: 2rem;
  }
  
  .filter-section {
    padding: 1.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .category-tags {
    justify-content: center;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .post-actions {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>