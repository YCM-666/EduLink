<template>
  <div class="courses">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="hero-badge floating-element">
          <svg width="20" height="20" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 11.5v-6h2v6H7zm1 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          <span class="badge-text">在线学习平台</span>
        </div>
        <h1 class="gradient-text">发现优质课程</h1>
        <p class="header-subtitle">精选高校课程资源，助力你的学习成长之路</p>
        
        <!-- 高级搜索筛选区域 -->
        <div class="filter-section">
          <div class="search-box floating-element">
            <svg width="20" height="20" fill="currentColor">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input 
              type="text" 
              placeholder="搜索课程、教师或关键词..." 
              v-model="searchQuery"
              @input="handleSearch"
              class="search-input"
            >
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
              <svg width="14" height="14" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            <div class="search-suggestions" v-if="searchSuggestions && searchSuggestions.length > 0 && searchQuery">
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
                :key="category"
                :class="['category-tag', { active: selectedCategory === category }]"
                @click="toggleCategory(category)"
              >
                {{ category }}
              </button>
            </div>
            
            <div class="sort-control">
              <select v-model="sortBy" @change="handleSortChange" class="sort-select">
                <option value="popular">最受欢迎</option>
                <option value="newest">最新发布</option>
                <option value="rating">评分最高</option>
                <option value="enrollment">学习人数</option>
              </select>
            </div>
          </div>
          
          <!-- 搜索结果统计 -->
          <div v-if="searchQuery || selectedCategory" class="filter-results">
            <span class="results-count">找到 {{ filteredCourses.length }} 个课程</span>
            <button @click="clearFilters" class="reset-btn">
              <svg width="14" height="14" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              重置筛选
            </button>
          </div>
        </div>
        
        <!-- 统计信息 -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">{{ totalCourses }}</div>
              <div class="stat-label">总课程数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalEnrollment }}</div>
              <div class="stat-label">学习人数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ averageRating }}</div>
              <div class="stat-label">平均评分</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ activeInstructors }}</div>
              <div class="stat-label">活跃教师</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程列表 -->
      <div class="courses-grid">
        <div v-for="course in filteredCourses" :key="course.id" class="course-card">
          <div class="course-image">
            <i :class="course.icon"></i>
          </div>
        <div class="course-content">
          <div class="course-header">
            <h3>{{ course.title }}</h3>
            <span class="tag tag-primary">{{ course.category }}</span>
          </div>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-instructor">
            <i class="fas fa-user-graduate"></i>
            <span>{{ course.instructor }}</span>
          </div>
          <div class="course-meta">
            <div class="meta-item">
              <i class="fas fa-users"></i>
              <span>{{ course.enrollment }} 人已加入</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ course.duration }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-star"></i>
              <span>{{ course.rating }}</span>
            </div>
          </div>
          <div class="course-actions">
            <router-link :to="`/course/${course.id}`" class="btn btn-primary">
              查看详情
            </router-link>
            <button @click="handleEnroll(course.id)" class="btn btn-success">
              <i class="fas fa-plus"></i>
              加入课程
            </button>
          </div>
        </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredCourses.length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <h3>暂无相关课程</h3>
        <p>尝试调整搜索条件或查看其他分类</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Courses',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('popular')
    const searchSuggestions = ref([])
    
    // 课程数据
    const courses = ref([
      {
        id: 1,
        title: '前端开发实战',
        description: '从HTML、CSS到JavaScript框架的完整前端开发课程，包含Vue、React等现代前端技术',
        category: '计算机科学',
        instructor: '张教授',
        enrollment: 245,
        duration: '12周',
        rating: '4.8',
        icon: 'fas fa-code'
      },
      {
        id: 2,
        title: '数据结构与算法',
        description: '深入理解常用数据结构和算法设计思想，提升编程能力和问题解决能力',
        category: '计算机科学',
        instructor: '李教授',
        enrollment: 189,
        duration: '10周',
        rating: '4.7',
        icon: 'fas fa-sitemap'
      },
      {
        id: 3,
        title: '大学英语四级',
        description: '系统学习英语四级考试技巧和知识点，提高英语综合应用能力',
        category: '语言学习',
        instructor: '王老师',
        enrollment: 156,
        duration: '8周',
        rating: '4.6',
        icon: 'fas fa-language'
      },
      {
        id: 4,
        title: '高等数学',
        description: '微积分、线性代数等高等数学核心内容，打好数学基础',
        category: '数学',
        instructor: '陈教授',
        enrollment: 198,
        duration: '16周',
        rating: '4.9',
        icon: 'fas fa-calculator'
      },
      {
        id: 5,
        title: '大学物理',
        description: '经典物理学和现代物理学的基本原理和应用',
        category: '物理',
        instructor: '刘教授',
        enrollment: 132,
        duration: '14周',
        rating: '4.5',
        icon: 'fas fa-atom'
      },
      {
        id: 6,
        title: 'Java程序设计',
        description: 'Java语言基础、面向对象编程和项目开发实践',
        category: '计算机科学',
        instructor: '赵教授',
        enrollment: 167,
        duration: '12周',
        rating: '4.7',
        icon: 'fab fa-java'
      }
    ])

    // 分类列表
    const categories = computed(() => {
      return [...new Set(courses.value.map(course => course.category))]
    })

    // 过滤后的课程
    const filteredCourses = computed(() => {
      let filtered = courses.value
      
      // 搜索过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(course => 
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
        )
      }
      
      // 分类过滤
      if (selectedCategory.value) {
        filtered = filtered.filter(course => course.category === selectedCategory.value)
      }
      
      // 排序功能
      return sortCourses(filtered, sortBy.value)
    })

    // 处理搜索
    const handleSearch = () => {
      // 搜索逻辑在计算属性中自动处理
    }

    // 排序函数
    const sortCourses = (courses, sortBy) => {
      const sorted = [...courses]
      switch (sortBy) {
        case 'popular':
          return sorted.sort((a, b) => b.enrollment - a.enrollment)
        case 'newest':
          return sorted.sort((a, b) => b.id - a.id)
        case 'rating':
          return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        case 'enrollment':
          return sorted.sort((a, b) => b.enrollment - a.enrollment)
        default:
          return sorted
      }
    }

    // 切换分类
    const toggleCategory = (category) => {
      selectedCategory.value = selectedCategory.value === category ? '' : category
    }

    // 清空搜索
    const clearSearch = () => {
      searchQuery.value = ''
      searchSuggestions.value = []
    }

    // 选择搜索建议
    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion
      searchSuggestions.value = []
    }

    // 重置所有筛选
    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      sortBy.value = 'popular'
    }

    // 处理排序变化
    const handleSortChange = () => {
      // 排序逻辑在计算属性中自动处理
    }

    // 加入课程
    const handleEnroll = (courseId) => {
      alert(`成功加入课程 ${courseId}`)
      // 实际开发中这里会调用API加入课程
    }

    onMounted(() => {
      // 可以在这里加载真实数据
    })

    // 统计信息计算属性
    const totalCourses = computed(() => filteredCourses.value.length)
    const totalEnrollment = computed(() => 
      filteredCourses.value.reduce((sum, course) => sum + course.enrollment, 0)
    )
    const averageRating = computed(() => {
      if (filteredCourses.value.length === 0) return '0.0'
      const totalRating = filteredCourses.value.reduce((sum, course) => 
        sum + parseFloat(course.rating), 0
      )
      return (totalRating / filteredCourses.value.length).toFixed(1)
    })
    const activeInstructors = computed(() => 
      new Set(filteredCourses.value.map(course => course.instructor)).size
    )

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      courses: filteredCourses,
      categories,
      filteredCourses,
      totalCourses,
      totalEnrollment,
      averageRating,
      activeInstructors,
      handleSearch,
      handleSortChange,
      handleEnroll,
      toggleCategory,
      clearSearch,
      clearFilters
    }
  }
}
</script>

<style scoped>
.courses {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

/* 背景装饰元素 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  filter: blur(40px);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 180px;
  height: 180px;
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.floating-element {
  animation: floatElement 6s ease-in-out infinite;
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* 页面头部样式 */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  animation: badgePulse 2s ease-in-out infinite alternate;
}

@keyframes badgePulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.badge-text {
  font-weight: 600;
}

.gradient-text {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
  0% { filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.3)); }
  100% { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.6)); }
}

.header-subtitle {
  font-size: 1.25rem;
  color: #718096;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* 搜索筛选区域 */
.filter-section {
  max-width: 900px;
  margin: 0 auto 3rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  padding: 8px;
  border: 2px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.search-box:focus-within {
  border-color: rgba(102, 126, 234, 0.3);
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input {
  width: 100%;
  padding: 16px 52px 16px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: transparent;
  outline: none;
  color: #2d3748;
}

.search-input::placeholder {
  color: #a0aec0;
}

.search-box svg {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
}

.clear-btn {
  position: absolute;
  right: 52px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 10;
  overflow: hidden;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #4a5568;
}

.suggestion-item:hover {
  background: #f8fafc;
}

/* 筛选控制 */
.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
}

.category-tag {
  padding: 12px 24px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.category-tag:hover {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.category-tag.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.sort-control {
  flex-shrink: 0;
}

.sort-select {
  padding: 12px 16px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  color: #667eea;
  font-weight: 600;
}

.sort-select:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 筛选结果 */
.filter-results {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
  margin-top: 1.5rem;
}

.results-count {
  font-weight: 700;
  color: #2d3748;
  font-size: 1.1rem;
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 101, 101, 0.3);
}

/* 统计信息 */
.stats-section {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
  font-weight: 600;
}

/* 课程网格 */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.course-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.course-image {
  height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.course-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
}

.course-image svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.course-content {
  padding: 2rem;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.course-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
  line-height: 1.4;
}

.tag {
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.tag-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.course-description {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-instructor {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.course-instructor svg {
  color: #667eea;
  flex-shrink: 0;
}

.course-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #718096;
  font-size: 0.9rem;
  font-weight: 600;
}

.meta-item svg {
  color: #667eea;
  flex-shrink: 0;
}

.course-actions {
  display: flex;
  gap: 12px;
}

.course-actions .btn {
  flex: 1;
  text-align: center;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.course-actions .btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.course-actions .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.course-actions .btn-success {
  background: rgba(72, 187, 120, 0.1);
  color: #38a169;
  border: 1px solid rgba(72, 187, 120, 0.2);
}

.course-actions .btn-success:hover {
  background: rgba(72, 187, 120, 0.2);
  transform: translateY(-2px);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 2rem 0;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.empty-state svg {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  color: #667eea;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.empty-state p {
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .courses {
    padding: 1rem 0;
  }
  
  .gradient-text {
    font-size: 2.5rem;
  }
  
  .filter-section {
    padding: 1.5rem;
    margin: 0 auto 2rem;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .category-tags {
    justify-content: center;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .course-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .course-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .course-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .gradient-text {
    font-size: 2rem;
  }
  
  .filter-section {
    padding: 1rem;
  }
  
  .search-box {
    margin-bottom: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .course-content {
    padding: 1.5rem;
  }
}
</style>