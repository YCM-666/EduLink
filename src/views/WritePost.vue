<template>
  <div class="write-post">
    <!-- 动画背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <div class="container">
      <!-- 写作头部 -->
      <div class="write-hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-gradient">分享你的学习</span>
              <span class="title-sparkle">✨</span>
            </h1>
            <p class="hero-subtitle">记录学习心得，分享知识见解，与更多同学共同成长</p>
          </div>
          
          <div class="hero-actions">
            <button @click="saveDraft" class="action-btn secondary">
              <svg width="16" height="16" fill="currentColor">
                <path d="M8 2a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 2z"/>
              </svg>
              保存草稿
            </button>
            <button @click="publishPost" class="action-btn primary">
              <svg width="16" height="16" fill="currentColor">
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                <path d="M1 5h14v8H1V5z"/>
              </svg>
              发布文章
            </button>
          </div>
        </div>
      </div>
      
      <!-- 写作表单 -->
      <div class="write-form">
        <!-- 标题输入 -->
        <div class="form-section">
          <div class="form-label">
            <svg width="20" height="20" fill="currentColor">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
            </svg>
            文章标题
          </div>
          <input v-model="post.title" type="text" placeholder="请输入吸引人的标题..." class="title-input" />
        </div>
        
        <!-- 分类信息 -->
        <div class="form-grid">
          <div class="form-section">
            <div class="form-label">
              <svg width="20" height="20" fill="currentColor">
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
              </svg>
              课程分类
            </div>
            <div class="select-wrapper">
              <select v-model="post.course_id" class="form-select">
                <option value="">选择课程</option>
                <option v-for="course in enrolledCourses" :key="course.id" :value="course.id">
                  {{ course.title }}
                </option>
              </select>
              <div class="select-arrow">▼</div>
            </div>
          </div>
          
          <div class="form-section">
            <div class="form-label">
              <svg width="20" height="20" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              </svg>
              文章类型
            </div>
            <div class="type-grid">
              <label v-for="type in postTypes" :key="type.value" class="type-card">
                <input type="radio" v-model="post.type" :value="type.value" class="radio-input" />
                <div class="type-content">
                  <div class="type-icon">{{ getTypeIcon(type.value) }}</div>
                  <span class="type-label">{{ type.label }}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- 标签管理 -->
        <div class="form-section">
          <div class="form-label">
            <svg width="20" height="20" fill="currentColor">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            文章标签
          </div>
          <div class="tags-container">
            <div v-for="tag in post.tags" :key="tag" class="tag-item">
              <span class="tag-text">{{ tag }}</span>
              <button @click="removeTag(tag)" class="tag-remove">
                <svg width="12" height="12" fill="currentColor">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <input 
              v-model="newTag" 
              @keydown.enter="addTag" 
              placeholder="输入标签后按回车" 
              class="tag-input" 
            />
          </div>
        </div>
        
        <!-- 编辑器 -->
        <div class="editor-section">
          <div class="editor-header">
            <div class="editor-tabs">
              <button :class="['tab-btn', { active: editorMode === 'edit' }]" 
                      @click="editorMode = 'edit'">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M12.146 9.146l-1.5-1.5a.5.5 0 0 0-.707.708l1.5 1.5a.5.5 0 0 0 .707-.708z"/>
                </svg>
                编辑模式
              </button>
              <button :class="['tab-btn', { active: editorMode === 'preview' }]" 
                      @click="editorMode = 'preview'">
                <svg width="16" height="16" fill="currentColor">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                </svg>
                预览模式
              </button>
            </div>
            
            <div class="editor-tools">
              <button @click="insertText('**', '**')" class="tool-btn" title="粗体">
                <svg width="14" height="14" fill="currentColor">
                  <path d="M8.5 2.5v9a.5.5 0 0 1-1 0v-9H5.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1H8.5z"/>
                </svg>
              </button>
              <button @click="insertText('*', '*')" class="tool-btn" title="斜体">
                <svg width="14" height="14" fill="currentColor">
                  <path d="M6.5 2.5v9a.5.5 0 0 1-1 0v-9H3.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1H6.5z"/>
                </svg>
              </button>
              <button @click="insertText('`', '`')" class="tool-btn" title="代码">
                <svg width="14" height="14" fill="currentColor">
                  <path d="M8.5 2.5v9a.5.5 0 0 1-1 0v-9H5.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1H8.5z"/>
                </svg>
              </button>
              <button @click="insertText('```\n', '\n```')" class="tool-btn" title="代码块">
                <svg width="14" height="14" fill="currentColor">
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div v-show="editorMode === 'edit'" class="editor-content">
            <textarea v-model="post.content" placeholder="开始写作...分享你的学习心得和见解..." class="editor-textarea"></textarea>
          </div>
          
          <div v-show="editorMode === 'preview'" class="preview-content">
            <div v-html="compiledContent" class="markdown-preview"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { marked } from 'marked'

const router = useRouter()
const post = ref({
  title: '',
  content: '',
  course_id: '',
  type: 'article',
  tags: []
})
const newTag = ref('')
const editorMode = ref('edit')
const enrolledCourses = ref([])
const user = ref(null)

const postTypes = [
  { value: 'article', label: '学习文章' },
  { value: 'note', label: '学习笔记' },
  { value: 'discussion', label: '问题讨论' }
]

const compiledContent = computed(() => {
  return post.value.content ? marked(post.value.content) : '<p>还没有内容</p>'
})

// 获取文章类型图标
const getTypeIcon = (type) => {
  const icons = {
    article: '📝',
    note: '📓',
    discussion: '💬'
  }
  return icons[type] || '📄'
}

onMounted(async () => {
  await checkUser()
  await loadEnrolledCourses()
})

const checkUser = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
  
  if (!user.value) {
    alert('请先登录')
    router.push('/login')
    return
  }
}

const loadEnrolledCourses = async () => {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      course_id,
      courses!inner(title)
    `)
    .eq('user_id', user.value.id)
  
  if (error) {
    console.error('Error loading courses:', error)
    return
  }
  
  enrolledCourses.value = data.map(item => ({
    id: item.course_id,
    title: item.courses.title
  }))
}

const addTag = () => {
  if (newTag.value.trim() && !post.value.tags.includes(newTag.value.trim())) {
    post.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  post.value.tags = post.value.tags.filter(t => t !== tag)
}

const insertText = (before, after) => {
  const textarea = document.querySelector('.editor-textarea')
  if (!textarea) return
  
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = post.value.content.substring(start, end)
  
  const newText = post.value.content.substring(0, start) + 
                  before + selectedText + after + 
                  post.value.content.substring(end)
  
  post.value.content = newText
  
  // 设置光标位置
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
  }, 0)
}

const saveDraft = async () => {
  if (!validatePost()) return
  
  const { error } = await supabase
    .from('posts')
    .insert({
      ...post.value,
      author_id: user.value.id,
      status: 'draft'
    })
  
  if (error) {
    console.error('Error saving draft:', error)
    alert('保存草稿失败')
    return
  }
  
  alert('草稿保存成功')
  router.push('/posts')
}

const publishPost = async () => {
  if (!validatePost()) return
  
  const { error } = await supabase
    .from('posts')
    .insert({
      ...post.value,
      author_id: user.value.id,
      status: 'published'
    })
  
  if (error) {
    console.error('Error publishing post:', error)
    alert('发布失败')
    return
  }
  
  alert('文章发布成功')
  router.push('/posts')
}

const validatePost = () => {
  if (!post.value.title.trim()) {
    alert('请输入文章标题')
    return false
  }
  
  if (!post.value.content.trim()) {
    alert('请输入文章内容')
    return false
  }
  
  if (!post.value.course_id) {
    alert('请选择课程分类')
    return false
  }
  
  return true
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

.write-post {
  padding: 40px 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

/* 写作头部 */
.write-hero {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.write-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
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

.hero-subtitle {
  color: #718096;
  font-size: 18px;
  line-height: 1.6;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 16px;
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

/* 写作表单 */
.write-form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-section {
  margin-bottom: 40px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-weight: 700;
  color: #2d3748;
  font-size: 18px;
}

.title-input {
  width: 100%;
  font-size: 32px;
  font-weight: 800;
  border: none;
  outline: none;
  padding: 20px 0;
  background: transparent;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.title-input:focus {
  border-bottom-color: #667eea;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.1);
}

.title-input::placeholder {
  color: #a0aec0;
  font-weight: 600;
}

/* 表单网格 */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 16px 48px 16px 16px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  pointer-events: none;
}

/* 类型网格 */
.type-grid {
  display: grid;
  gap: 16px;
}

.type-card {
  cursor: pointer;
  border: 2px solid rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.type-card:hover {
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
}

.radio-input {
  display: none;
}

.radio-input:checked + .type-content {
  color: #667eea;
}

.radio-input:checked + .type-content .type-icon {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.type-content {
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.type-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.1);
  font-size: 20px;
  transition: all 0.3s ease;
}

.type-label {
  font-weight: 600;
  font-size: 16px;
}

/* 标签容器 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.tags-container:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.tag-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tag-text {
  white-space: nowrap;
}

.tag-remove {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  background: transparent;
  font-size: 16px;
}

.tag-input::placeholder {
  color: #a0aec0;
}

/* 编辑器区域 */
.editor-section {
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(102, 126, 234, 0.05);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  padding: 0 24px;
}

.editor-tabs {
  display: flex;
}

.tab-btn {
  padding: 16px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 3px solid transparent;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.editor-tools {
  display: flex;
  gap: 8px;
}

.tool-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.editor-content,
.preview-content {
  min-height: 500px;
}

.editor-textarea {
  width: 100%;
  height: 100%;
  min-height: 500px;
  border: none;
  outline: none;
  padding: 32px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.8;
  resize: none;
  background: transparent;
}

.editor-textarea::placeholder {
  color: #a0aec0;
  font-style: italic;
}

.preview-content {
  padding: 32px;
}

.markdown-preview {
  line-height: 1.8;
  color: #2d3748;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3 {
  margin-top: 32px;
  margin-bottom: 20px;
  font-weight: 700;
}

.markdown-preview h1 {
  font-size: 28px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  padding-bottom: 12px;
}

.markdown-preview h2 {
  font-size: 24px;
}

.markdown-preview h3 {
  font-size: 20px;
}

.markdown-preview p {
  margin-bottom: 20px;
  font-size: 16px;
}

.markdown-preview pre {
  background: rgba(102, 126, 234, 0.05);
  padding: 24px;
  border-radius: 12px;
  overflow-x: auto;
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin: 20px 0;
}

.markdown-preview code {
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.markdown-preview pre code {
  background: transparent;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .write-post {
    padding: 20px 0;
  }
  
  .write-hero {
    padding: 32px 24px;
  }
  
  .write-form {
    padding: 32px 24px;
  }
  
  .hero-title {
    font-size: 32px;
    flex-direction: column;
    gap: 8px;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .editor-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  .editor-tabs {
    width: 100%;
  }
  
  .tab-btn {
    flex: 1;
    justify-content: center;
  }
  
  .editor-textarea {
    padding: 24px;
    font-size: 14px;
  }
  
  .preview-content {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .write-hero {
    padding: 24px 16px;
  }
  
  .write-form {
    padding: 24px 16px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .title-input {
    font-size: 24px;
    padding: 16px 0;
  }
  
  .form-label {
    font-size: 16px;
  }
}
</style>