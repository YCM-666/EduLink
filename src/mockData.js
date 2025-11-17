// 模拟数据服务 - 替代Supabase API调用

// 模拟用户数据
export const mockUsers = {
  currentUser: {
    id: 'user-1',
    email: 'student@example.com',
    display_name: '学生用户',
    avatar_url: null
  }
}

// 模拟课程数据
export const mockCourses = [
  {
    id: 'course-1',
    title: '前端开发基础',
    description: '学习HTML、CSS、JavaScript等前端开发基础知识',
    instructor: '张老师',
    semester: '2024秋季',
    credit: 3,
    enrolled: true
  },
  {
    id: 'course-2',
    title: '数据结构与算法',
    description: '学习数据结构、算法设计与分析',
    instructor: '李老师',
    semester: '2024秋季',
    credit: 4,
    enrolled: true
  },
  {
    id: 'course-3',
    title: '数据库原理',
    description: '学习数据库系统的基本概念和设计方法',
    instructor: '王老师',
    semester: '2024秋季',
    credit: 3,
    enrolled: false
  }
]

// 模拟论坛话题数据
export const mockTopics = [
  {
    id: 'topic-1',
    title: '前端开发学习路线建议',
    content: '想学习前端开发，有没有好的学习路线推荐？',
    author: {
      id: 'user-2',
      name: '前端爱好者',
      avatar: '👨‍💻'
    },
    course: {
      id: 'course-1',
      name: '前端开发基础'
    },
    type: '提问',
    tags: ['前端', '学习路线'],
    isAnonymous: false,
    viewCount: 125,
    likeCount: 8,
    replyCount: 12,
    isSticky: false,
    createdAt: '2024-01-15T10:30:00Z',
    timeAgo: '2天前'
  },
  {
    id: 'topic-2',
    title: '数据结构期末考试重点',
    content: '马上要考数据结构了，大家觉得哪些是重点章节？',
    author: {
      id: 'user-3',
      name: '匿名用户',
      avatar: '👤'
    },
    course: {
      id: 'course-2',
      name: '数据结构与算法'
    },
    type: '讨论',
    tags: ['数据结构', '期末', '复习'],
    isAnonymous: true,
    viewCount: 89,
    likeCount: 5,
    replyCount: 7,
    isSticky: true,
    createdAt: '2024-01-14T15:20:00Z',
    timeAgo: '3天前'
  }
]

// 模拟笔记数据
export const mockPosts = [
  {
    id: 'post-1',
    title: 'Vue 3 Composition API 使用心得',
    content: '最近在学习Vue 3的Composition API，发现比Options API更加灵活...',
    author: {
      id: 'user-1',
      name: '学生用户',
      avatar: '👨‍🎓'
    },
    course: {
      id: 'course-1',
      name: '前端开发基础'
    },
    type: 'article',
    tags: ['Vue', '前端框架', 'Composition API'],
    viewCount: 156,
    likeCount: 15,
    commentCount: 8,
    createdAt: '2024-01-13T09:15:00Z',
    timeAgo: '4天前'
  },
  {
    id: 'post-2',
    title: '数据结构之二叉树遍历算法',
    content: '二叉树的前序、中序、后序遍历算法实现及性能分析...',
    author: {
      id: 'user-4',
      name: '算法达人',
      avatar: '🧠'
    },
    course: {
      id: 'course-2',
      name: '数据结构与算法'
    },
    type: 'note',
    tags: ['数据结构', '二叉树', '遍历算法'],
    viewCount: 203,
    likeCount: 22,
    commentCount: 15,
    createdAt: '2024-01-10T14:45:00Z',
    timeAgo: '1周前'
  }
]

// 模拟API调用函数
export const mockApi = {
  // 用户认证相关
  auth: {
    getUser: () => Promise.resolve({ data: { user: mockUsers.currentUser }, error: null }),
    signInWithPassword: () => Promise.resolve({ error: null }),
    signUp: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null })
  },

  // 课程相关
  courses: {
    getCourses: () => Promise.resolve({ data: mockCourses, error: null }),
    getCourseDetail: (id) => {
      const course = mockCourses.find(c => c.id === id)
      return Promise.resolve({ data: course, error: course ? null : '课程不存在' })
    }
  },

  // 论坛相关
  forum: {
    getTopics: () => Promise.resolve({
      data: mockTopics,
      total: mockTopics.length,
      page: 1,
      totalPages: 1
    }),
    getTopicDetail: (id) => {
      const topic = mockTopics.find(t => t.id === id)
      return Promise.resolve({ data: topic, error: topic ? null : '话题不存在' })
    },
    createTopic: (topicData) => {
      const newTopic = {
        id: 'topic-' + Date.now(),
        ...topicData,
        author: mockUsers.currentUser,
        viewCount: 0,
        likeCount: 0,
        replyCount: 0,
        createdAt: new Date().toISOString(),
        timeAgo: '刚刚'
      }
      mockTopics.unshift(newTopic)
      return Promise.resolve({ data: newTopic, error: null })
    }
  },

  // 笔记相关
  posts: {
    getPosts: () => Promise.resolve({
      data: mockPosts,
      total: mockPosts.length,
      page: 1,
      totalPages: 1
    }),
    getPostDetail: (id) => {
      const post = mockPosts.find(p => p.id === id)
      return Promise.resolve({ data: post, error: post ? null : '笔记不存在' })
    },
    createPost: (postData) => {
      const newPost = {
        id: 'post-' + Date.now(),
        ...postData,
        author: mockUsers.currentUser,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
        timeAgo: '刚刚'
      }
      mockPosts.unshift(newPost)
      return Promise.resolve({ data: newPost, error: null })
    }
  }
}

// 模拟Supabase兼容接口
export const mockSupabase = {
  auth: mockApi.auth,
  from: (tableName) => ({
    select: () => {
      const data = {
        'users': [mockUsers.currentUser],
        'courses': mockCourses,
        'topics': mockTopics,
        'posts': mockPosts
      }[tableName] || []
      return Promise.resolve({ data, error: null })
    },
    insert: (data) => {
      if (tableName === 'topics') {
        return mockApi.forum.createTopic(data[0])
      }
      if (tableName === 'posts') {
        return mockApi.posts.createPost(data[0])
      }
      return Promise.resolve({ data: null, error: '操作失败' })
    },
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
}