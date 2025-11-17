<template>
  <div class="course-detail">
    <!-- 动画背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div class="container">
      <!-- 课程头部信息 -->
      <div class="course-header">
        <div class="course-banner">
          <div class="banner-gradient">
            <svg width="80" height="80" fill="currentColor">
              <path d="M5.8 12.9l6-4.6c.3-.2.7-.2 1 0l6 4.6c.2.2.3.5.3.8v6c0 .6-.4 1-1 1h-12c-.6 0-1-.4-1-1v-6c0-.3.1-.6.3-.8z"/>
              <path d="M15.5 7.5l-3.8 2.9c-.3.2-.7.2-1 0l-3.8-2.9c-.3-.2-.5-.6-.5-1v-4c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v4c0 .4-.2.8-.5 1z"/>
            </svg>
          </div>
          <div class="banner-badge">
            <span class="badge-text">热门课程</span>
          </div>
        </div>
      </div>
      
      <div class="course-info">
        <div class="course-title-section">
          <div class="title-wrapper">
            <h1 class="course-title">{{ course.title }}</h1>
            <span class="course-tag">{{ course.category }}</span>
          </div>
          <div class="title-actions">
            <button @click="handleShare" class="share-btn">
              <svg width="20" height="20" fill="currentColor">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <p class="course-description">{{ course.description }}</p>
        
        <div class="course-instructor">
          <div class="instructor-avatar">
            {{ course.instructor.charAt(0) }}
          </div>
          <div class="instructor-info">
            <span class="instructor-label">授课教师</span>
            <span class="instructor-name">{{ course.instructor }}</span>
          </div>
        </div>
        
        <div class="course-meta-grid">
          <div class="meta-card">
            <div class="meta-icon">
              <svg width="24" height="24" fill="currentColor">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
            <div class="meta-content">
              <span class="meta-value">{{ course.enrollment }}</span>
              <span class="meta-label">人已加入</span>
            </div>
          </div>
          
          <div class="meta-card">
            <div class="meta-icon">
              <svg width="24" height="24" fill="currentColor">
                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 16 3zM3 5.5A.5.5 0 0 1 3.5 5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM3 10h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 3 10zm0 5h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
            <div class="meta-content">
              <span class="meta-value">{{ course.duration }}</span>
              <span class="meta-label">课程时长</span>
            </div>
          </div>
          
          <div class="meta-card">
            <div class="meta-icon">
              <svg width="24" height="24" fill="currentColor">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </div>
            <div class="meta-content">
              <span class="meta-value">{{ course.rating }}</span>
              <span class="meta-label">课程评分</span>
            </div>
          </div>
          
          <div class="meta-card">
            <div class="meta-icon">
              <svg width="24" height="24" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              </svg>
            </div>
            <div class="meta-content">
              <span class="meta-value">{{ course.discussions }}</span>
              <span class="meta-label">课程讨论</span>
            </div>
          </div>
        </div>
        
        <div class="course-actions">
          <button @click="handleEnroll" class="enroll-btn">
            <svg width="20" height="20" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            加入课程
          </button>
          <router-link :to="`/forum/course/${course.id}`" class="action-btn primary">
            <svg width="20" height="20" fill="currentColor">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>
            课程论坛
          </router-link>
          <router-link :to="`/posts?course=${course.id}`" class="action-btn outline">
            <svg width="20" height="20" fill="currentColor">
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
            </svg>
            学习笔记
          </router-link>
          <button @click="handleLike" class="action-btn outline like-btn" :class="{ liked: isLiked }">
            <svg width="20" height="20" fill="currentColor">
              <path d="M8 1.314C12.438-3.248 23.534 2.735 8 15-7.534 2.736 3.562-3.248 8 1.314z"/>
            </svg>
            关注课程
          </button>
        </div>
      </div>

      <!-- 课程内容导航 -->
      <div class="course-nav">
        <nav class="nav-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['nav-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <div class="tab-icon">
              <svg width="20" height="20" fill="currentColor">
                <path v-if="tab.id === 'notes'" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                <path v-if="tab.id === 'materials'" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.757 1.498 8.742A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8a.5.5 0 0 0-.49-.592H.5z"/>
                <path v-if="tab.id === 'discussion'" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                <path v-if="tab.id === 'assignments'" d="M6.5 1a.5.5 0 0 0 0 1H7v4a.5.5 0 0 0 1 0V2h2v4a.5.5 0 0 0 1 0V2h2v4a.5.5 0 0 0 1 0V2h1a.5.5 0 0 0 0-1h-13z"/>
              </svg>
            </div>
            <span class="tab-label">{{ tab.label }}</span>
            <div class="tab-indicator"></div>
          </button>
        </nav>
      </div>

      <!-- 课程内容区域 -->
      <div class="course-content">
        <!-- 学习笔记 -->
        <div v-if="activeTab === 'notes'" class="tab-content">
          <div class="content-header">
            <h2>学习笔记</h2>
            <div class="action-buttons">
              <button @click="showCreateNote = true" class="btn btn-success">
                <i class="fas fa-plus"></i>
                写笔记
              </button>
              <router-link :to="`/posts?course=${course.id}`" class="btn btn-outline">
                <i class="fas fa-search"></i>
                查看全部笔记
              </router-link>
            </div>
          </div>
          <div class="notes-grid">
            <div v-for="note in notes" :key="note.id" class="note-card">
              <div class="note-header">
                <div class="author-info">
                  <div class="author-avatar">{{ note.author.charAt(0) }}</div>
                  <div class="author-details">
                    <span class="author-name">{{ note.author }}</span>
                    <span class="note-date">{{ note.date }}</span>
                  </div>
                </div>
                <span class="tag tag-success">{{ note.type }}</span>
              </div>
              <h3 class="note-title">{{ note.title }}</h3>
              <p class="note-excerpt">{{ note.excerpt }}</p>
              <div class="note-footer">
                <div class="note-stats">
                  <span><i class="fas fa-eye"></i> {{ note.views }}</span>
                  <span><i class="fas fa-heart"></i> {{ note.likes }}</span>
                  <span><i class="fas fa-comment"></i> {{ note.comments }}</span>
                </div>
                <router-link :to="`/post/${note.id}`" class="btn btn-outline btn-small">
                  阅读全文
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 课程资料 -->
        <div v-if="activeTab === 'materials'" class="tab-content">
          <h2>课程资料</h2>
          <div class="materials-list">
            <div v-for="material in materials" :key="material.id" class="material-item">
              <div class="material-icon">
                <i :class="material.icon"></i>
              </div>
              <div class="material-info">
                <h3>{{ material.title }}</h3>
                <p>{{ material.description }}</p>
                <span class="material-size">{{ material.size }}</span>
              </div>
              <button class="btn btn-outline">
                <i class="fas fa-download"></i>
                下载
              </button>
            </div>
          </div>
        </div>

        <!-- 课程讨论 -->
        <div v-if="activeTab === 'discussion'" class="tab-content">
          <h2>课程讨论</h2>
          <div class="discussion-form">
            <textarea 
              v-model="newDiscussion" 
              placeholder="有什么问题想要讨论？"
              rows="3"
            ></textarea>
            <button @click="postDiscussion" class="btn btn-primary">发布讨论</button>
          </div>
          <div class="discussions-list">
            <div v-for="discussion in discussions" :key="discussion.id" class="discussion-item">
              <div class="discussion-header">
                <div class="author-info">
                  <div class="author-avatar">{{ discussion.author.charAt(0) }}</div>
                  <div class="author-details">
                    <span class="author-name">{{ discussion.author }}</span>
                    <span class="discussion-date">{{ discussion.date }}</span>
                  </div>
                </div>
              </div>
              <p class="discussion-content">{{ discussion.content }}</p>
              <div class="discussion-actions">
                <button @click="handleLikeDiscussion(discussion.id)">
                  <i :class="discussion.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
                  {{ discussion.likes }}
                </button>
                <button @click="handleReply(discussion.id)">
                  <i class="fas fa-reply"></i>
                  回复
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 作业任务 -->
        <div v-if="activeTab === 'assignments'" class="tab-content">
          <h2>作业任务</h2>
          <div class="assignments-list">
            <div v-for="assignment in assignments" :key="assignment.id" class="assignment-item">
              <div class="assignment-header">
                <h3>{{ assignment.title }}</h3>
                <span class="due-date">截止：{{ assignment.dueDate }}</span>
              </div>
              <p class="assignment-description">{{ assignment.description }}</p>
              <div class="assignment-footer">
                <span class="assignment-status">{{ assignment.status }}</span>
                <button class="btn btn-primary">
                  <i class="fas fa-upload"></i>
                  提交作业
                </button>
              </div>
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

export default {
  name: 'CourseDetail',
  setup() {
    const route = useRoute()
    const courseId = route.params.id
    
    // 课程数据
    const course = ref({
      id: courseId,
      title: '前端开发实战',
      description: '从HTML、CSS到JavaScript框架的完整前端开发课程，包含Vue、React等现代前端技术',
      category: '计算机科学',
      instructor: '张教授',
      enrollment: 245,
      duration: '12周',
      rating: '4.8',
      discussions: 45,
      likes: 156,
      icon: 'fas fa-code'
    })

    // 标签页
    const tabs = ref([
      { id: 'notes', label: '学习笔记', icon: 'fas fa-sticky-note' },
      { id: 'materials', label: '课程资料', icon: 'fas fa-file-alt' },
      { id: 'discussion', label: '课程讨论', icon: 'fas fa-comments' },
      { id: 'assignments', label: '作业任务', icon: 'fas fa-tasks' }
    ])
    const activeTab = ref('notes')

    // 笔记数据
    const notes = ref([
      {
        id: 1,
        title: 'Vue3 Composition API 最佳实践',
        excerpt: '详细介绍Vue3组合式API的使用方法和最佳实践案例',
        author: '张同学',
        date: '2小时前',
        type: '学习笔记',
        views: 124,
        likes: 23,
        comments: 8
      },
      {
        id: 2,
        title: 'JavaScript异步编程详解',
        excerpt: '深入理解Promise、async/await等异步编程技术',
        author: '李同学',
        date: '1天前',
        type: '学习笔记',
        views: 89,
        likes: 15,
        comments: 5
      }
    ])

    // 课程资料
    const materials = ref([
      {
        id: 1,
        title: '课程大纲',
        description: '完整的课程学习计划和目标',
        size: '1.2MB',
        icon: 'fas fa-file-pdf'
      },
      {
        id: 2,
        title: '第一周课件',
        description: 'HTML和CSS基础讲解',
        size: '3.5MB',
        icon: 'fas fa-file-powerpoint'
      }
    ])

    // 讨论数据
    const discussions = ref([
      {
        id: 1,
        author: '王同学',
        date: '3小时前',
        content: '关于Vue组件通信的最佳实践有什么建议吗？',
        likes: 8,
        isLiked: false
      }
    ])

    // 作业数据
    const assignments = ref([
      {
        id: 1,
        title: '第一个作业：个人简历页面',
        description: '使用HTML和CSS创建一个响应式的个人简历页面',
        dueDate: '2024-12-15',
        status: '进行中'
      }
    ])

    const isLiked = ref(false)
    const showCreateNote = ref(false)
    const newDiscussion = ref('')

    // 加入课程
    const handleEnroll = () => {
      alert('成功加入课程！')
    }

    // 点赞课程
    const handleLike = () => {
      isLiked.value = !isLiked.value
      course.value.likes += isLiked.value ? 1 : -1
    }

    // 分享课程
    const handleShare = () => {
      alert('分享功能开发中...')
    }

    // 发布讨论
    const postDiscussion = () => {
      if (newDiscussion.value.trim()) {
        discussions.value.unshift({
          id: Date.now(),
          author: '当前用户',
          date: '刚刚',
          content: newDiscussion.value,
          likes: 0,
          isLiked: false
        })
        newDiscussion.value = ''
      }
    }

    onMounted(() => {
      // 加载课程详情数据
    })

    return {
      course,
      tabs,
      activeTab,
      notes,
      materials,
      discussions,
      assignments,
      isLiked,
      showCreateNote,
      newDiscussion,
      handleEnroll,
      handleLike,
      handleShare,
      postDiscussion
    }
  }
}
</script>

<style scoped>
/* 样式部分保持不变，我已经为你修复了HTML结构 */

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

.course-detail {
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  padding: 3rem 0;
}

.course-header {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.course-banner {
  height: 240px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.banner-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-gradient svg {
  color: rgba(255, 255, 255, 0.9);
}

.banner-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge-text {
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.course-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.title-wrapper {
  flex: 1;
}

.course-title {
  font-size: 3rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.course-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.title-actions {
  margin-left: 1rem;
}

.share-btn {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #667eea;
}

.share-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.course-description {
  font-size: 1.25rem;
  color: #718096;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.course-instructor {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.instructor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.instructor-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.instructor-label {
  font-size: 0.875rem;
  color: #718096;
}

.instructor-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
}

.course-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.meta-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.meta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.15);
}

.meta-icon {
  margin-bottom: 0.75rem;
  color: #667eea;
}

.meta-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.meta-label {
  font-size: 0.875rem;
  color: #718096;
}

.course-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.enroll-btn {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
}

.enroll-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(72, 187, 120, 0.4);
}

.action-btn {
  padding: 1rem 1.5rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.action-btn.primary {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.action-btn.outline {
  background: transparent;
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.like-btn.liked {
  background: rgba(236, 72, 153, 0.1);
  border-color: rgba(236, 72, 153, 0.3);
  color: #ec4899;
}

.course-nav {
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.nav-tabs {
  display: flex;
  gap: 0;
}

.nav-tab {
  position: relative;
  padding: 1.5rem 2rem;
  border: none;
  background: transparent;
  color: #718096;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
}

.nav-tab:hover {
  color: #667eea;
}

.nav-tab.active {
  color: #667eea;
}

.nav-tab.active .tab-indicator {
  opacity: 1;
  transform: scaleX(1);
}

.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-label {
  font-size: 1rem;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.tab-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.notes-grid {
  display: grid;
  gap: 1.5rem;
}

.note-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.3s ease;
}

.note-card:hover {
  border-color: #667eea;
}

.note-header {
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

.note-date {
  font-size: 0.875rem;
  color: #718096;
}

.note-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.note-excerpt {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-stats {
  display: flex;
  gap: 1rem;
  color: #a0aec0;
  font-size: 0.875rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .course-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .course-banner {
    height: 150px;
    font-size: 3rem;
  }
  
  .course-title-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .course-meta {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .course-actions {
    flex-direction: column;
  }
  
  .nav-tabs {
    flex-wrap: wrap;
  }
  
  .tab {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .course-meta {
    grid-template-columns: 1fr;
  }
}
</style>