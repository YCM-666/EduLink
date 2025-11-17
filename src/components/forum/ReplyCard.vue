<template>
  <div class="reply-card">
    <!-- 回复头部 -->
    <div class="reply-header">
      <div class="author-info">
        <div class="author-avatar">
          <span>{{ reply.author.avatar }}</span>
        </div>
        <div class="author-details">
          <span class="author-name">
            {{ reply.isAnonymous ? '匿名用户' : reply.author.name }}
          </span>
          <span class="reply-time">{{ formatTime(reply.createdAt) }}</span>
        </div>
      </div>
      
      <div class="reply-actions">
        <button 
          :class="['btn', 'btn-sm', isLiked ? 'btn-primary' : 'btn-outline']"
          @click="handleLike"
        >
          <i class="fas fa-heart"></i>
          {{ reply.likeCount }}
        </button>
        <button class="btn btn-sm btn-outline" @click="$emit('reply', reply)">
          <i class="fas fa-reply"></i>
          回复
        </button>
      </div>
    </div>

    <!-- 回复内容 -->
    <div class="reply-content">
      <p>{{ reply.content }}</p>
    </div>

    <!-- 子回复列表 -->
    <div v-if="reply.replies && reply.replies.length > 0" class="nested-replies">
      <div 
        v-for="nestedReply in reply.replies" 
        :key="nestedReply.id" 
        class="nested-reply-item"
      >
        <ReplyCard :reply="nestedReply" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default {
  name: 'ReplyCard',
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  emits: ['reply'],
  setup(props) {
    const isLiked = ref(false)
    
    const formatTime = (dateString) => {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { 
        addSuffix: true, 
        locale: zhCN 
      })
    }

    const handleLike = () => {
      isLiked.value = !isLiked.value
      if (isLiked.value) {
        props.reply.likeCount++
      } else {
        props.reply.likeCount--
      }
    }

    return {
      isLiked,
      formatTime,
      handleLike
    }
  }
}
</script>

<style scoped>
.reply-card {
  background: #f7fafc;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.reply-header {
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
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

.reply-time {
  font-size: 0.8rem;
  color: #a0aec0;
}

.reply-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
}

.reply-content {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.reply-content p {
  margin: 0;
}

.nested-replies {
  margin-left: 2rem;
  margin-top: 1rem;
  border-left: 2px solid #e2e8f0;
  padding-left: 1rem;
}

.nested-reply-item {
  margin-bottom: 1rem;
}

.nested-reply-item:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .reply-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .reply-actions {
    align-self: stretch;
    justify-content: flex-end;
  }
  
  .nested-replies {
    margin-left: 1rem;
  }
}
</style>