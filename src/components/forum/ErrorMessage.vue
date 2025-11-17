<template>
  <div class="error-message-container">
    <div class="error-message" :class="type">
      <i class="fas fa-exclamation-circle"></i>
      <div class="error-content">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
        <div v-if="showRetry" class="error-actions">
          <button class="btn btn-outline" @click="$emit('retry')">
            重试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    type: {
      type: String,
      default: 'error', // error, warning, info
      validator: (value) => ['error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: '错误'
    },
    message: {
      type: String,
      required: true
    },
    showRetry: {
      type: Boolean,
      default: true
    }
  },
  emits: ['retry']
}
</script>

<style scoped>
.error-message-container {
  margin: 1rem 0;
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid;
}

.error-message.error {
  background: #fed7d7;
  border-color: #f56565;
  color: #c53030;
}

.error-message.warning {
  background: #fef5e7;
  border-color: #ed8936;
  color: #dd6b20;
}

.error-message.info {
  background: #e6fffa;
  border-color: #38b2ac;
  color: #234e52;
}

.error-message i {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.error-content h4 {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  font-size: 1.1rem;
}

.error-content p {
  margin: 0;
  line-height: 1.5;
}

.error-actions {
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-outline {
  border-color: currentColor;
  color: currentColor;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
}

.error-message.error .btn-outline {
  border-color: #c53030;
  color: #c53030;
}

.error-message.warning .btn-outline {
  border-color: #dd6b20;
  color: #dd6b20;
}

.error-message.info .btn-outline {
  border-color: #234e52;
  color: #234e52;
}
</style>