<template>
  <div class="topic-card" @click="$emit('click')">
    <!-- 置顶标识 -->
    <div v-if="topic.isSticky" class="sticky-badge">
      <i class="fas fa-thumbtack"></i>
      置顶
    </div>

    <!-- 话题头部 -->
    <div class="topic-header">
      <!-- 作者信息 -->
      <div class="author-info">
        <div class="author-avatar">
          <span>{{ topic.author.avatar }}</span>
        </div>
        <div class="author-details">
          <span class="author-name">
            {{ topic.isAnonymous ? '匿名用户' : topic.author.name }}
          </span>
          <span class="post-time">{{ formatTime(topic.createdAt) }}</span>
        </div>
      </div>

      <!-- 话题类型和标签 -->
      <div class="topic-meta">
        <span :class="['topic-type', `type-${topic.type}`]">
          {{ getTypeText(topic.type) }}
        </span>
        <span class="course-tag" v-if="topic.course">
          <i class="fas fa-book"></i>
          {{ topic.course.name }}
        </span>
      </div>
    </div>

    <!-- 话题内容 -->
    <div class="topic-content">
      <h3 class="topic-title">{{ topic.title }}</h3>
      <p class="topic-excerpt">{{ topic.content }}</p>
      
      <!-- 标签 -->
      <div class="topic-tags">
        <span 
          v-for="tag in topic.tags" 
          :key="tag" 
          class="tag"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- 话题统计 -->
    <div class="topic-stats">
      <div class="stat-item">
        <i class="fas fa-eye"></i>
        <span>{{ topic.viewCount }}</span>
      </div>
      <div class="stat-item">
        <i class="fas fa-heart"></i>
        <span>{{ topic.likeCount }}</span>
      </div>
      <div class="stat-item">
        <i class="fas fa-comment"></i>
        <span>{{ topic.replyCount }}</span>
      </div>
      <div class="last-reply">
        <i class="fas fa-clock"></i>
        {{ formatTime(topic.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default {
  name: 'TopicCard',
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup() {
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

    return {
      formatTime,
      getTypeText
    }
  }
}
</script>

<style scoped>
.topic-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.topic-card:hover {
  border-color: #cbd5e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.sticky-badge {
  position: absolute;
  top: -8px;
  right: 1rem;
  background: #f56565;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.post-time {
  font-size: 0.8rem;
  color: #a0aec0;
}

.topic-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.topic-type {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
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

.course-tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.topic-content {
  margin-bottom: 1rem;
}

.topic-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.topic-excerpt {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
}

.topic-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #a0aec0;
  font-size: 0.8rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.last-reply {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .topic-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .topic-meta {
    align-self: flex-start;
  }
  
  .topic-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .last-reply {
    margin-left: 0;
  }
}
</style>