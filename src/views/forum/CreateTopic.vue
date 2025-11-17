<template>
  <div class="create-topic">
    <div class="container">
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <router-link to="/forum">论坛</router-link>
        <span class="separator">/</span>
        <span class="current">发布话题</span>
      </nav>

      <!-- 发布话题表单 -->
      <div class="create-topic-form">
        <h1 class="form-title">发布新话题</h1>
        
        <!-- 基本信息 -->
        <div class="form-section">
          <h3>基本信息</h3>
          
          <div class="form-group">
            <label class="form-label">话题标题 *</label>
            <input 
              v-model="topicForm.title" 
              type="text" 
              placeholder="请输入话题标题"
              class="form-control"
              maxlength="100"
            >
            <div class="char-count">{{ topicForm.title.length }}/100</div>
          </div>

          <div class="form-group">
            <label class="form-label">话题类型 *</label>
            <div class="type-selector">
              <label 
                v-for="type in topicTypes" 
                :key="type.value"
                :class="['type-option', { active: topicForm.type === type.value }]"
              >
                <input 
                  type="radio" 
                  :value="type.value" 
                  v-model="topicForm.type"
                  class="sr-only"
                >
                <i :class="type.icon"></i>
                {{ type.label }}
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">所属板块 *</label>
            <div class="category-selector">
              <select v-model="topicForm.category" class="form-control">
                <option value="">请选择板块</option>
                <optgroup label="公共话题">
                  <option value="strategy">选课攻略</option>
                  <option value="help">期末互助</option>
                  <option value="tools">学习工具</option>
                  <option value="campus">校园生活</option>
                </optgroup>
                <optgroup label="课程论坛">
                  <option value="course-1">前端开发实战</option>
                  <option value="course-2">数据结构与算法</option>
                  <option value="course-3">大学英语四级</option>
                  <option value="course-4">高等数学</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <!-- 内容编辑 -->
        <div class="form-section">
          <h3>内容编辑</h3>
          
          <div class="form-group">
            <label class="form-label">话题内容 *</label>
            <div class="editor-container">
              <!-- Markdown编辑器工具栏 -->
              <div class="editor-toolbar">
                <button type="button" @click="insertText('**文本**')" title="加粗">
                  <i class="fas fa-bold"></i>
                </button>
                <button type="button" @click="insertText('*文本*')" title="斜体">
                  <i class="fas fa-italic"></i>
                </button>
                <button type="button" @click="insertText('`代码`')" title="行内代码">
                  <i class="fas fa-code"></i>
                </button>
                <button type="button" @click="insertText('\n```\n代码块\n```')" title="代码块">
                  <i class="fas fa-code"></i>
                </button>
                <button type="button" @click="insertText('\n- 列表项')" title="无序列表">
                  <i class="fas fa-list-ul"></i>
                </button>
                <button type="button" @click="insertText('\n1. 列表项')" title="有序列表">
                  <i class="fas fa-list-ol"></i>
                </button>
                <button type="button" @click="insertText('\n> 引用文本')" title="引用">
                  <i class="fas fa-quote-left"></i>
                </button>
                <button type="button" @click="insertText('\n---\n')" title="分割线">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              
              <textarea 
                v-model="topicForm.content" 
                placeholder="请输入话题内容...支持Markdown格式"
                rows="12"
                class="editor-textarea"
                ref="editorTextarea"
              ></textarea>
              
              <div class="editor-preview" v-if="topicForm.content">
                <h4>预览效果：</h4>
                <div class="preview-content" v-html="previewContent"></div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">话题标签</label>
            <div class="tags-input">
              <div class="selected-tags">
                <span 
                  v-for="tag in topicForm.tags" 
                  :key="tag" 
                  class="tag"
                  @click="removeTag(tag)"
                >
                  #{{ tag }}
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <input 
                v-model="tagInput" 
                type="text" 
                placeholder="输入标签后按回车添加 (最多5个)"
                class="tag-input"
                @keydown.enter="addTag"
                :disabled="topicForm.tags.length >= 5"
              >
              <div class="tag-suggestions" v-if="tagSuggestions.length > 0">
                <span 
                  v-for="suggestion in tagSuggestions" 
                  :key="suggestion"
                  class="tag-suggestion"
                  @click="addTagFromSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 错误消息 -->
        <div v-if="errorMessage" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessage }}
        </div>

        <!-- 发布选项 -->
        <div class="form-section">
          <h3>发布选项</h3>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="topicForm.isAnonymous">
              匿名发布 (发布后显示为"匿名用户")
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="topicForm.saveDraft">
              自动保存草稿 (每30秒自动保存)
            </label>
          </div>
        </div>

        <!-- 表单操作 -->
        <div class="form-actions">
          <button class="btn btn-outline" @click="saveDraft" :disabled="!canSaveDraft">
            保存草稿
          </button>
          <div class="action-buttons">
            <button class="btn btn-outline" @click="$router.back()">
              取消
            </button>
            <button 
              class="btn btn-primary" 
              @click="submitTopic" 
              :disabled="!canSubmit || isLoading"
            >
              {{ isLoading ? '发布中...' : '发布话题' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { forumApi } from '../../services/forumApi.js'

export default {
  name: 'CreateTopic',
  setup() {
    const router = useRouter()
    
    // 表单数据
    const topicForm = ref({
      title: '',
      type: '讨论',
      category: '',
      content: '',
      tags: [],
      isAnonymous: false,
      saveDraft: true
    })
    
    const tagInput = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    
    // 话题类型选项
    const topicTypes = ref([
      { value: '提问', label: '提问', icon: 'fas fa-question-circle' },
      { value: '讨论', label: '讨论', icon: 'fas fa-comments' },
      { value: '经验', label: '经验分享', icon: 'fas fa-lightbulb' }
    ])
    
    // 标签建议
    const commonTags = ref([
      '学习', '课程', '笔记', '考试', '作业', '复习', '技巧',
      'Vue', 'React', 'JavaScript', 'Python', 'Java',
      '数学', '英语', '编程', '算法', '前端', '后端'
    ])
    
    // 计算属性
    const tagSuggestions = computed(() => {
      if (!tagInput.value) return []
      return commonTags.value.filter(tag => 
        tag.toLowerCase().includes(tagInput.value.toLowerCase()) &&
        !topicForm.value.tags.includes(tag)
      ).slice(0, 5)
    })
    
    const previewContent = computed(() => {
      if (!topicForm.value.content) return ''
      return marked(topicForm.value.content)
    })
    
    const canSubmit = computed(() => {
      return topicForm.value.title.trim() && 
             topicForm.value.content.trim() && 
             topicForm.value.category
    })
    
    const canSaveDraft = computed(() => {
      return topicForm.value.title.trim() || topicForm.value.content.trim()
    })
    
    // 方法
    const insertText = (text) => {
      const textarea = document.querySelector('.editor-textarea')
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const content = topicForm.value.content
      
      topicForm.value.content = 
        content.substring(0, start) + 
        text + 
        content.substring(end)
      
      // 重新聚焦并设置光标位置
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }
    
    const addTag = (event) => {
      event.preventDefault()
      const tag = tagInput.value.trim()
      if (tag && topicForm.value.tags.length < 5 && !topicForm.value.tags.includes(tag)) {
        topicForm.value.tags.push(tag)
        tagInput.value = ''
      }
    }
    
    const addTagFromSuggestion = (tag) => {
      if (topicForm.value.tags.length < 5 && !topicForm.value.tags.includes(tag)) {
        topicForm.value.tags.push(tag)
        tagInput.value = ''
      }
    }
    
    const removeTag = (tag) => {
      topicForm.value.tags = topicForm.value.tags.filter(t => t !== tag)
    }
    
    const saveDraft = () => {
      if (!canSaveDraft.value) return
      
      // 保存草稿
      const draft = {
        ...topicForm.value,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('topicDraft', JSON.stringify(draft))
      
      // 显示成功提示
      alert('草稿保存成功！')
    }
    
    const submitTopic = async () => {
      if (!canSubmit.value) return
      
      errorMessage.value = ''
      isLoading.value = true
      
      try {
        // 使用真实API创建话题
        const newTopic = await forumApi.createTopic({
          title: topicForm.value.title.trim(),
          content: topicForm.value.content.trim(),
          category: topicForm.value.category,
          type: topicForm.value.type,
          tags: topicForm.value.tags,
          isAnonymous: topicForm.value.isAnonymous
        })
        
        console.log('创建新话题成功:', newTopic)
        
        // 清除草稿
        localStorage.removeItem('topicDraft')
        
        // 跳转到新创建的话题页面
        router.push(`/forum/topic/${newTopic.id}`)
        
      } catch (error) {
        console.error('创建话题失败:', error)
        errorMessage.value = '创建话题失败，请检查网络连接或稍后重试'
        
        // 如果API调用失败，模拟创建并跳转
        const simulatedTopic = {
          id: Date.now(),
          title: topicForm.value.title,
          content: topicForm.value.content,
          author: { id: 1, name: '当前用户', avatar: '我' },
          course: { id: topicForm.value.category, name: topicForm.value.category },
          type: topicForm.value.type,
          tags: topicForm.value.tags,
          isAnonymous: topicForm.value.isAnonymous,
          viewCount: 0,
          likeCount: 0,
          replyCount: 0,
          isSticky: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        console.log('模拟创建话题:', simulatedTopic)
        
        // 清除草稿
        localStorage.removeItem('topicDraft')
        
        // 跳转到论坛首页
        router.push('/forum')
        
      } finally {
        isLoading.value = false
      }
    }
    
    // 自动保存草稿
    watch(
      () => [topicForm.value.title, topicForm.value.content],
      () => {
        if (topicForm.value.saveDraft && canSaveDraft.value) {
          clearTimeout(topicForm.value.saveTimer)
          topicForm.value.saveTimer = setTimeout(saveDraft, 30000) // 30秒后自动保存
        }
      }
    )
    
    // 加载草稿
    const loadDraft = () => {
      const draft = localStorage.getItem('topicDraft')
      if (draft) {
        const confirmLoad = confirm('检测到未保存的草稿，是否加载？')
        if (confirmLoad) {
          const draftData = JSON.parse(draft)
          topicForm.value = { ...topicForm.value, ...draftData }
        }
      }
    }
    
    // 组件挂载
    loadDraft()
    
    return {
      topicForm,
      tagInput,
      topicTypes,
      tagSuggestions,
      previewContent,
      canSubmit,
      canSaveDraft,
      isLoading,
      errorMessage,
      insertText,
      addTag,
      addTagFromSuggestion,
      removeTag,
      saveDraft,
      submitTopic
    }
  }
}
</script>

<style scoped>
.create-topic {
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

.create-topic-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
}

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: 0.25rem;
}

.type-selector {
  display: flex;
  gap: 1rem;
}

.type-option {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-option:hover {
  border-color: #cbd5e0;
}

.type-option.active {
  border-color: #667eea;
  background: #f7fafc;
}

.type-option i {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #718096;
}

.type-option.active i {
  color: #667eea;
}

.editor-container {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  background: #f7fafc;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.editor-toolbar button {
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #718096;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.editor-toolbar button:hover {
  background: #edf2f7;
  color: #4a5568;
}

.editor-textarea {
  width: 100%;
  padding: 1rem;
  border: none;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.editor-textarea:focus {
  outline: none;
}

.editor-preview {
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  background: #fafafa;
}

.editor-preview h4 {
  margin-bottom: 0.5rem;
  color: #718096;
}

.preview-content {
  line-height: 1.6;
  color: #4a5568;
}

.tags-input {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
  background: white;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: #667eea;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tag:hover {
  background: #5a67d8;
}

.tag-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 0.9rem;
}

.tag-input:disabled {
  background: #f7fafc;
  color: #a0aec0;
}

.tag-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag-suggestion {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tag-suggestion:hover {
  background: #e2e8f0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #4a5568;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
  
  .create-topic-container {
    max-width: 100%;
    margin: 0;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .type-selector {
    gap: 0.75rem;
  }
  
  .type-option {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 1.5rem 0;
  }
  
  .page-title {
    font-size: 1.75rem;
    text-align: center;
  }
  
  .page-description {
    font-size: 1rem;
    text-align: center;
  }
  
  .create-topic-container {
    padding: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .form-input {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .type-selector {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .type-option {
    padding: 0.875rem;
    text-align: center;
  }
  
  .type-icon {
    font-size: 1.25rem;
  }
  
  .editor-container {
    border-radius: 4px;
  }
  
  .editor-toolbar {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .editor-toolbar button {
    font-size: 0.8rem;
    padding: 0.375rem 0.5rem;
  }
  
  .editor-textarea {
    padding: 0.875rem;
    font-size: 0.875rem;
  }
  
  .editor-preview {
    padding: 0.875rem;
  }
  
  .tags-input {
    padding: 0.875rem;
  }
  
  .selected-tags {
    gap: 0.375rem;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
  }
  
  .tag-suggestions {
    gap: 0.375rem;
  }
  
  .tag-suggestion {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
    padding-top: 1.5rem;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: space-between;
    gap: 0.75rem;
  }
  
  .draft-btn, .submit-btn {
    flex: 1;
    justify-content: center;
    padding: 0.875rem;
    font-size: 0.9rem;
  }
  
  .checkbox-label {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .page-header {
    padding: 1rem 0;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .create-topic-container {
    padding: 1rem;
  }
  
  .form-input {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
  
  .type-option {
    padding: 0.75rem;
  }
  
  .type-text {
    font-size: 0.8rem;
  }
  
  .editor-toolbar {
    padding: 0.375rem;
  }
  
  .editor-toolbar button {
    font-size: 0.75rem;
    padding: 0.25rem 0.375rem;
  }
  
  .editor-textarea {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
  
  .editor-preview {
    padding: 0.75rem;
  }
  
  .preview-content {
    font-size: 0.875rem;
  }
  
  .tag {
    font-size: 0.7rem;
    padding: 0.15rem 0.3rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .draft-btn, .submit-btn {
    width: 100%;
  }
}
</style>