import { supabase } from '../supabase.js'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

// 网络请求重试配置
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1秒
  timeout: 10000    // 10秒超时
}

// 通用网络请求包装器
async function fetchWithRetry(fetchFn, maxRetries = RETRY_CONFIG.maxRetries) {
  let lastError
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        fetchFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('请求超时')), RETRY_CONFIG.timeout)
        )
      ])
      return result
    } catch (error) {
      lastError = error
      console.warn(`API请求失败，尝试 ${attempt}/${maxRetries}:`, error)
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, RETRY_CONFIG.retryDelay))
      }
    }
  }
  
  throw lastError
}

// 话题API服务
export const forumApi = {
  
  // 获取所有话题
  async getTopics({ category = 'all', sortBy = 'created_at', search = '', page = 1, limit = 20 } = {}) {
    try {
      const queryFn = () => {
        let query = supabase
          .from('topics')
          .select(`
            *,
            author:users(display_name, avatar_url),
            course:courses(title)
          `, { count: 'exact' })
          .eq('status', 'published')

        // 分类筛选
        if (category !== 'all') {
          if (category.startsWith('course-')) {
            const courseId = category.replace('course-', '')
            query = query.eq('course_id', courseId)
          } else {
            // 公共话题分类
            query = query.is('course_id', null)
          }
        }

        // 搜索功能
        if (search.trim()) {
          query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,tags.cs.{${search}}`)
        }

        // 排序
        if (sortBy === 'created_at') {
          query = query.order('created_at', { ascending: false })
        } else {
          query = query.order(sortBy, { ascending: false })
        }

        // 分页
        const from = (page - 1) * limit
        const to = from + limit - 1
        query = query.range(from, to)

        return query
      }

      const { data, error, count } = await fetchWithRetry(queryFn)

      if (error) throw error

      if (error) {
        if (error.code === 'PGRST116') {
          // 没有找到数据，返回空数组
          return {
            topics: [],
            total: 0,
            page,
            totalPages: 0
          }
        }
        throw error
      }

      // 格式化数据
      const formattedTopics = data.map(topic => ({
        id: topic.id,
        title: topic.title,
        content: topic.content,
        author: {
          id: topic.author_id,
          name: topic.author?.display_name || '匿名用户',
          avatar: topic.author?.avatar_url || topic.author?.display_name?.charAt(0) || 'U'
        },
        course: topic.course ? {
          id: topic.course_id,
          name: topic.course.title
        } : null,
        category: topic.course_id ? `course-${topic.course_id}` : 'public',
        type: topic.type,
        tags: topic.tags || [],
        isAnonymous: topic.is_anonymous,
        viewCount: topic.view_count || 0,
        likeCount: topic.like_count || 0,
        replyCount: topic.reply_count || 0,
        isSticky: topic.is_sticky,
        createdAt: topic.created_at,
        updatedAt: topic.updated_at,
        timeAgo: formatDistanceToNow(new Date(topic.created_at), { 
          addSuffix: true, 
          locale: zhCN 
        })
      }))

      return {
        topics: formattedTopics,
        total: count,
        page,
        totalPages: Math.ceil(count / limit)
      }

    } catch (error) {
      console.error('获取话题列表失败:', error)
      
      // 提供友好的错误信息
      const enhancedError = new Error('获取话题列表失败，请检查网络连接')
      enhancedError.originalError = error
      enhancedError.isNetworkError = !error.code
      
      throw enhancedError
    }
  },

  // 获取单个话题详情
  async getTopic(id) {
    try {
      const queryFn = () => supabase
        .from('topics')
        .select(`
          *,
          author:users(display_name, avatar_url),
          course:courses(title)
        `)
        .eq('id', id)
        .single()

      const { data, error } = await fetchWithRetry(queryFn)

      if (error) {
        if (error.code === 'PGRST116') {
          // 话题不存在
          const notFoundError = new Error('话题不存在或已被删除')
          notFoundError.code = 'TOPIC_NOT_FOUND'
          throw notFoundError
        }
        throw error
      }

      // 增加浏览量（不阻塞主流程）
      this.incrementViewCount(id).catch(err => 
        console.warn('增加浏览量失败:', err)
      )

      const topic = {
        id: data.id,
        title: data.title,
        content: data.content,
        contentHtml: data.content_html,
        author: {
          id: data.author_id,
          name: data.author?.display_name || '匿名用户',
          avatar: data.author?.avatar_url || data.author?.display_name?.charAt(0) || 'U'
        },
        course: data.course ? {
          id: data.course_id,
          name: data.course.title
        } : null,
        type: data.type,
        tags: data.tags || [],
        isAnonymous: data.is_anonymous,
        viewCount: (data.view_count || 0) + 1, // 增加后的浏览量
        likeCount: data.like_count || 0,
        replyCount: data.reply_count || 0,
        isSticky: data.is_sticky,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        timeAgo: formatDistanceToNow(new Date(data.created_at), { 
          addSuffix: true, 
          locale: zhCN 
        })
      }

      return topic

    } catch (error) {
      console.error('获取话题详情失败:', error)
      
      // 提供友好的错误信息
      const enhancedError = new Error(
        error.code === 'TOPIC_NOT_FOUND' 
          ? '话题不存在或已被删除' 
          : '获取话题详情失败，请检查网络连接'
      )
      enhancedError.originalError = error
      enhancedError.isNetworkError = !error.code
      
      throw enhancedError
    }
  },

  // 创建话题
  async createTopic(topicData) {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user) {
        const authError = new Error('用户未登录，请先登录')
        authError.code = 'UNAUTHORIZED'
        throw authError
      }

      // 验证必填字段
      if (!topicData.title?.trim()) {
        const validationError = new Error('话题标题不能为空')
        validationError.code = 'VALIDATION_ERROR'
        throw validationError
      }

      if (!topicData.content?.trim()) {
        const validationError = new Error('话题内容不能为空')
        validationError.code = 'VALIDATION_ERROR'
        throw validationError
      }

      const queryFn = () => supabase
        .from('topics')
        .insert([{
          title: topicData.title.trim(),
          content: topicData.content.trim(),
          content_html: topicData.contentHtml || topicData.content.trim(),
          author_id: user.id,
          course_id: topicData.category || null,
          type: topicData.type || '讨论',
          tags: topicData.tags || [],
          is_anonymous: topicData.isAnonymous || false,
          status: 'published'
        }])
        .select()
        .single()

      const { data, error } = await fetchWithRetry(queryFn)

      if (error) {
        if (error.code === '23505') {
          // 唯一约束冲突
          const uniqueError = new Error('话题标题已存在，请使用其他标题')
          uniqueError.code = 'DUPLICATE_TITLE'
          throw uniqueError
        }
        throw error
      }

      return data

    } catch (error) {
      console.error('创建话题失败:', error)
      
      // 提供友好的错误信息
      let userMessage = '创建话题失败，请稍后重试'
      
      if (error.code === 'UNAUTHORIZED') {
        userMessage = '用户未登录，请先登录'
      } else if (error.code === 'VALIDATION_ERROR') {
        userMessage = error.message
      } else if (error.code === 'DUPLICATE_TITLE') {
        userMessage = error.message
      }
      
      const enhancedError = new Error(userMessage)
      enhancedError.originalError = error
      enhancedError.isNetworkError = !error.code
      
      throw enhancedError
    }
  },

  // 更新话题
  async updateTopic(id, updates) {
    try {
      const user = supabase.auth.getUser()
      if (!user) throw new Error('用户未登录')

      // 检查用户是否有权限编辑
      const { data: existingTopic } = await supabase
        .from('topics')
        .select('author_id')
        .eq('id', id)
        .single()

      if (existingTopic.author_id !== user.id) {
        throw new Error('没有权限编辑此话题')
      }

      const { data, error } = await supabase
        .from('topics')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return data

    } catch (error) {
      console.error('更新话题失败:', error)
      throw error
    }
  },

  // 删除话题
  async deleteTopic(id) {
    try {
      const user = supabase.auth.getUser()
      if (!user) throw new Error('用户未登录')

      // 检查用户是否有权限删除
      const { data: existingTopic } = await supabase
        .from('topics')
        .select('author_id')
        .eq('id', id)
        .single()

      if (existingTopic.author_id !== user.id) {
        throw new Error('没有权限删除此话题')
      }

      const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { success: true }

    } catch (error) {
      console.error('删除话题失败:', error)
      throw error
    }
  },

  // 增加浏览量
  async incrementViewCount(id) {
    try {
      const { error } = await supabase.rpc('increment_view_count', {
        topic_id: id
      })

      if (error) throw error

    } catch (error) {
      console.error('增加浏览量失败:', error)
    }
  },

  // 点赞/取消点赞
  async toggleLike(topicId) {
    try {
      const user = supabase.auth.getUser()
      if (!user) throw new Error('用户未登录')

      const { data, error } = await supabase.rpc('toggle_topic_like', {
        topic_id: topicId,
        user_id: user.id
      })

      if (error) throw error

      return data

    } catch (error) {
      console.error('点赞操作失败:', error)
      throw error
    }
  },

  // 获取回复列表
  async getReplies(topicId) {
    try {
      const queryFn = () => supabase
        .from('replies')
        .select(`
          *,
          author:users(display_name, avatar_url)
        `)
        .eq('topic_id', topicId)
        .order('created_at', { ascending: false }) // 改为最新回复在前

      const { data, error } = await fetchWithRetry(queryFn)

      if (error) {
        if (error.code === 'PGRST116') {
          // 没有回复数据，返回空数组
          return []
        }
        throw error
      }

      const formattedReplies = data.map(reply => ({
        id: reply.id,
        content: reply.content,
        author: {
          id: reply.author_id,
          name: reply.author?.display_name || '匿名用户',
          avatar: reply.author?.avatar_url || reply.author?.display_name?.charAt(0) || 'U'
        },
        isAnonymous: reply.is_anonymous,
        likeCount: reply.like_count || 0,
        createdAt: reply.created_at,
        timeAgo: formatDistanceToNow(new Date(reply.created_at), { 
          addSuffix: true, 
          locale: zhCN 
        })
      }))

      return formattedReplies

    } catch (error) {
      console.error('获取回复列表失败:', error)
      
      // 提供友好的错误信息
      const enhancedError = new Error('获取回复列表失败，请检查网络连接')
      enhancedError.originalError = error
      enhancedError.isNetworkError = !error.code
      
      throw enhancedError
    }
  },

  // 创建回复
  async createReply(topicId, replyData) {
    try {
      const user = supabase.auth.getUser()
      if (!user) throw new Error('用户未登录')

      const { data, error } = await supabase
        .from('replies')
        .insert([{
          topic_id: topicId,
          content: replyData.content,
          author_id: user.id,
          is_anonymous: replyData.isAnonymous || false,
          parent_id: replyData.parentId || null
        }])
        .select()
        .single()

      if (error) throw error

      // 增加话题回复数
      await this.incrementReplyCount(topicId)

      return data

    } catch (error) {
      console.error('创建回复失败:', error)
      throw error
    }
  },

  // 增加回复数
  async incrementReplyCount(topicId) {
    try {
      const { error } = await supabase.rpc('increment_reply_count', {
        topic_id: topicId
      })

      if (error) throw error

    } catch (error) {
      console.error('增加回复数失败:', error)
    }
  },

  // 获取论坛统计信息
  async getForumStats() {
    try {
      // 获取公共话题统计
      const { count: publicCount } = await supabase
        .from('topics')
        .select('*', { count: 'exact', head: true })
        .is('course_id', null)
        .eq('status', 'published')

      // 获取课程相关话题统计
      const { count: courseCount } = await supabase
        .from('topics')
        .select('*', { count: 'exact', head: true })
        .not('course_id', 'is', null)
        .eq('status', 'published')

      return {
        publicTopics: publicCount || 0,
        courseTopics: courseCount || 0,
        totalTopics: (publicCount || 0) + (courseCount || 0)
      }

    } catch (error) {
      console.error('获取论坛统计信息失败:', error)
      return { publicTopics: 0, courseTopics: 0, totalTopics: 0 }
    }
  }
}

export default forumApi