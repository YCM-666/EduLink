<template>
  <div class="home">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge floating-element">
            <svg width="20" height="20" fill="currentColor">
              <path d="M12.708 6.708a.5.5 0 0 0-.708-.708L8 9.586 5.354 6.94a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l5-5z"/>
            </svg>
            <span class="badge-text">大学生专属学习平台</span>
          </div>
          <h1 class="hero-title">
            <span class="title-gradient">知识共享</span>
            <span class="title-sparkle">✨</span>
            <span class="title-gradient">智慧成长</span>
          </h1>
          <p class="hero-description">
            专为大学生设计的现代化学习平台，连接优质课程与交流社区，
            让学习变得更高效、更有趣。
          </p>
          <div class="hero-actions">
            <router-link to="/courses" class="action-btn primary">
              <svg width="16" height="16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              探索课程
            </router-link>
            <router-link to="/posts" class="action-btn secondary">
              <svg width="16" height="16" fill="currentColor">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
              </svg>
              学习笔记
            </router-link>
            <router-link to="/register" class="action-btn outline">
              <svg width="16" height="16" fill="currentColor">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              立即加入
            </router-link>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">优质课程</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">活跃学员</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5,000+</div>
              <div class="stat-label">学习笔记</div>
            </div>
          </div>
        </div>
        <div class="hero-graphics">
          <div class="floating-graphic graphic-1">
            <svg width="60" height="60" fill="currentColor">
              <path d="M8 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H8zm0 1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
              <path d="M13.5 6a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </div>
          <div class="floating-graphic graphic-2">
            <svg width="60" height="60" fill="currentColor">
              <path d="M8 1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H8zm0 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
              <path d="M10.5 5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </div>
          <div class="floating-graphic graphic-3">
            <svg width="60" height="60" fill="currentColor">
              <path d="M8 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H8zm0 1h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
              <path d="M10.5 5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色功能 -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">平台特色功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-book"></i>
            </div>
            <h3>课程探索</h3>
            <p>浏览各类大学课程，查看课程详情和教师信息，选择感兴趣的课程加入学习</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-sticky-note"></i>
            </div>
            <h3>学习笔记</h3>
            <p>记录学习心得，整理知识点，支持Markdown格式编辑</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>互动交流</h3>
            <p>与同学讨论问题，分享解题思路，共同进步成长</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>智能搜索</h3>
            <p>快速找到需要的课程资料和笔记内容，提高学习效率</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门课程 -->
    <section class="popular-courses">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门课程</h2>
          <router-link to="/courses" class="view-all">查看全部 →</router-link>
        </div>
        <div class="courses-grid">
          <div v-for="course in popularCourses" :key="course.id" class="course-card">
            <div class="course-image">
              <i :class="course.icon"></i>
            </div>
            <div class="course-content">
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <div class="course-meta">
                <span class="tag tag-primary">{{ course.category }}</span>
                <span class="enrollment">{{ course.enrollment }} 人已加入</span>
              </div>
              <router-link :to="`/course/${course.id}`" class="btn btn-outline">
                查看详情
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="recent-posts">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新学习笔记</h2>
          <router-link to="/posts" class="view-all">查看全部 →</router-link>
        </div>
        <div class="posts-grid">
          <div v-for="post in recentPosts" :key="post.id" class="post-card">
            <div class="post-header">
              <div class="author-info">
                <div class="author-avatar">
                  {{ post.author.charAt(0) }}
                </div>
                <div class="author-details">
                  <span class="author-name">{{ post.author }}</span>
                  <span class="post-date">{{ post.date }}</span>
                </div>
              </div>
              <span class="post-type">{{ post.type }}</span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="post-footer">
              <div class="post-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag tag-outline">{{ tag }}</span>
              </div>
              <div class="post-stats">
                <span><i class="fas fa-eye"></i> {{ post.views }}</span>
                <span><i class="fas fa-heart"></i> {{ post.likes }}</span>
                <span><i class="fas fa-comment"></i> {{ post.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    // 热门课程数据
    const popularCourses = ref([
      {
        id: 1,
        title: '前端开发实战',
        description: '从HTML、CSS到JavaScript框架的完整前端开发课程',
        category: '计算机科学',
        enrollment: 245,
        icon: 'fas fa-code'
      },
      {
        id: 2,
        title: '数据结构与算法',
        description: '深入理解常用数据结构和算法设计思想',
        category: '计算机科学',
        enrollment: 189,
        icon: 'fas fa-sitemap'
      },
      {
        id: 3,
        title: '大学英语四级',
        description: '系统学习英语四级考试技巧和知识点',
        category: '语言学习',
        enrollment: 156,
        icon: 'fas fa-language'
      },
      {
        id: 4,
        title: '高等数学',
        description: '微积分、线性代数等高等数学核心内容',
        category: '数学',
        enrollment: 198,
        icon: 'fas fa-calculator'
      }
    ])

    // 最新文章数据
    const recentPosts = ref([
      {
        id: 1,
        title: 'Vue3 Composition API 最佳实践',
        excerpt: '详细介绍Vue3组合式API的使用方法和最佳实践案例',
        author: '张同学',
        date: '2小时前',
        type: '学习笔记',
        tags: ['Vue3', '前端', 'JavaScript'],
        views: 124,
        likes: 23,
        comments: 8
      },
      {
        id: 2,
        title: '高等数学解题技巧总结',
        excerpt: '分享一些高等数学中常见的解题技巧和思路',
        author: '李同学',
        date: '5小时前',
        type: '经验分享',
        tags: ['数学', '学习技巧'],
        views: 89,
        likes: 15,
        comments: 5
      },
      {
        id: 3,
        title: '英语四级听力训练方法',
        excerpt: '介绍有效的英语四级听力训练方法和技巧',
        author: '王同学',
        date: '1天前',
        type: '学习笔记',
        tags: ['英语', '四级', '听力'],
        views: 156,
        likes: 32,
        comments: 12
      }
    ])

    return {
      popularCourses,
      recentPosts
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
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

.shape-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 25%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* 英雄区域 */
.hero {
  padding: 8rem 0 4rem;
  position: relative;
  z-index: 1;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
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

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.title-gradient {
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

.title-sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

.hero-description {
  font-size: 1.25rem;
  color: #718096;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 3rem;
}

.action-btn {
  padding: 16px 28px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-size: 16px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
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

.action-btn.outline {
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}

.action-btn.outline:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #718096;
  font-weight: 600;
}

/* 英雄图形区域 */
.hero-graphics {
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-graphic {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  color: #667eea;
  animation: floatElement 6s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.floating-element {
  animation: floatElement 6s ease-in-out infinite;
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.graphic-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.graphic-2 {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.graphic-3 {
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 4s;
}

/* 特色功能 */
.features {
  padding: 4rem 0;
  background: #f8fafc;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #2d3748;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.feature-card p {
  color: #718096;
  line-height: 1.6;
}

/* 热门课程 */
.popular-courses {
  padding: 4rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #764ba2;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.course-content {
  padding: 1.5rem;
}

.course-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.course-content p {
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.enrollment {
  color: #718096;
  font-size: 0.875rem;
}

/* 最新文章 */
.recent-posts {
  padding: 4rem 0;
  background: #f8fafc;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #2d3748;
}

.post-date {
  font-size: 0.875rem;
  color: #718096;
}

.post-type {
  background: #f0fff4;
  color: #38a169;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
  line-height: 1.4;
}

.post-excerpt {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-outline {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.75rem;
}

.post-stats {
  display: flex;
  gap: 1rem;
  color: #a0aec0;
  font-size: 0.875rem;
}

.post-stats span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .features-grid,
  .courses-grid,
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .post-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>