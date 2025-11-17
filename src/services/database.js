import { supabase } from '../supabase.js'

// 数据库初始化脚本
export const databaseService = {
  
  // 检查并创建必要的表结构
  async initializeDatabase() {
    try {
      console.log('开始初始化数据库...')
      
      // 检查 topics 表是否存在
      const { data: topicsTable, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .limit(1)

      if (topicsError && topicsError.code === 'PGRST116') {
        console.log('topics 表不存在，需要创建...')
        await this.createTopicsTable()
      }

      // 检查 replies 表是否存在
      const { data: repliesTable, error: repliesError } = await supabase
        .from('replies')
        .select('*')
        .limit(1)

      if (repliesError && repliesError.code === 'PGRST116') {
        console.log('replies 表不存在，需要创建...')
        await this.createRepliesTable()
      }

      console.log('数据库初始化完成')

    } catch (error) {
      console.error('数据库初始化失败:', error)
    }
  },

  // 创建 topics 表的 SQL 语句
  async createTopicsTable() {
    // 这里实际上是通过 Supabase Dashboard 手动创建表
    // 这个函数主要用于文档说明
    console.log('请通过 Supabase Dashboard 手动创建以下表结构：')
    
    const topicsTableSQL = `
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_html TEXT,
  author_id UUID REFERENCES users(id) NOT NULL,
  course_id UUID REFERENCES courses(id),
  type TEXT NOT NULL DEFAULT '讨论' CHECK (type IN ('提问', '讨论', '经验')),
  tags TEXT[] DEFAULT '{}',
  is_anonymous BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  is_sticky BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_topics_author_id ON topics(author_id);
CREATE INDEX idx_topics_course_id ON topics(course_id);
CREATE INDEX idx_topics_created_at ON topics(created_at);
CREATE INDEX idx_topics_status ON topics(status);

-- 创建 RLS 策略
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- 策略：所有人都可以查看已发布的话题
CREATE POLICY "任何人都可以查看已发布的话题" ON topics
  FOR SELECT USING (status = 'published');

-- 策略：用户只能编辑自己的话题
CREATE POLICY "用户可以编辑自己的话题" ON topics
  FOR UPDATE USING (auth.uid() = author_id);

-- 策略：用户只能删除自己的话题
CREATE POLICY "用户可以删除自己的话题" ON topics
  FOR DELETE USING (auth.uid() = author_id);

-- 策略：认证用户可以创建话题
CREATE POLICY "认证用户可以创建话题" ON topics
  FOR INSERT WITH CHECK (auth.uid() = author_id);
    `

    console.log('topics 表 SQL:', topicsTableSQL)
  },

  // 创建 replies 表的 SQL 语句
  async createRepliesTable() {
    console.log('请通过 Supabase Dashboard 手动创建以下表结构：')
    
    const repliesTableSQL = `
CREATE TABLE replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) NOT NULL,
  topic_id UUID REFERENCES topics(id) NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  parent_id UUID REFERENCES replies(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_replies_topic_id ON replies(topic_id);
CREATE INDEX idx_replies_author_id ON replies(author_id);
CREATE INDEX idx_replies_created_at ON replies(created_at);

-- 创建 RLS 策略
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- 策略：所有人都可以查看回复
CREATE POLICY "任何人都可以查看回复" ON replies
  FOR SELECT USING (true);

-- 策略：用户只能编辑自己的回复
CREATE POLICY "用户可以编辑自己的回复" ON replies
  FOR UPDATE USING (auth.uid() = author_id);

-- 策略：用户只能删除自己的回复
CREATE POLICY "用户可以删除自己的回复" ON replies
  FOR DELETE USING (auth.uid() = author_id);

-- 策略：认证用户可以创建回复
CREATE POLICY "认证用户可以创建回复" ON replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);
    `

    console.log('replies 表 SQL:', repliesTableSQL)
  },

  // 创建存储过程
  async createStoredProcedures() {
    console.log('请通过 Supabase Dashboard 创建以下存储过程：')
    
    const proceduresSQL = `
-- 增加话题浏览量的存储过程
CREATE OR REPLACE FUNCTION increment_view_count(topic_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE topics 
  SET view_count = view_count + 1 
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql;

-- 增加话题回复数的存储过程
CREATE OR REPLACE FUNCTION increment_reply_count(topic_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE topics 
  SET reply_count = reply_count + 1 
  WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql;

-- 点赞/取消点赞的存储过程
CREATE OR REPLACE FUNCTION toggle_topic_like(topic_id UUID, user_id UUID)
RETURNS JSON AS $$
DECLARE
  existing_like RECORD;
  result JSON;
BEGIN
  -- 检查是否已经点赞
  SELECT * INTO existing_like FROM topic_likes 
  WHERE topic_id = toggle_topic_like.topic_id AND user_id = toggle_topic_like.user_id;

  IF FOUND THEN
    -- 取消点赞
    DELETE FROM topic_likes 
    WHERE topic_id = toggle_topic_like.topic_id AND user_id = toggle_topic_like.user_id;
    
    UPDATE topics 
    SET like_count = GREATEST(0, like_count - 1) 
    WHERE id = topic_id;
    
    result := json_build_object('action', 'unlike', 'liked', false);
  ELSE
    -- 点赞
    INSERT INTO topic_likes (topic_id, user_id) 
    VALUES (topic_id, user_id);
    
    UPDATE topics 
    SET like_count = like_count + 1 
    WHERE id = topic_id;
    
    result := json_build_object('action', 'like', 'liked', true);
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;
    `

    console.log('存储过程 SQL:', proceduresSQL)
  },

  // 插入示例数据
  async insertSampleData() {
    try {
      console.log('插入示例数据...')
      
      // 获取当前用户ID
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        console.log('用户未登录，跳过示例数据插入')
        return
      }

      // 检查是否已有数据
      const { data: existingTopics, error } = await supabase
        .from('topics')
        .select('id')
        .limit(1)

      if (error) throw error

      if (existingTopics && existingTopics.length > 0) {
        console.log('数据库已有数据，跳过示例数据插入')
        return
      }

      // 插入示例话题
      const sampleTopics = [
        {
          title: 'Vue3组合式API学习心得分享',
          content: '最近在学习Vue3的组合式API，感觉比Options API更灵活，有同学一起来讨论吗？',
          author_id: user.id,
          type: '经验',
          tags: ['Vue3', '前端', '学习心得'],
          view_count: 124,
          like_count: 23,
          reply_count: 8
        },
        {
          title: '高等数学期末复习要点总结',
          content: '整理了高等数学的期末复习重点，包括常见题型和解题技巧，欢迎大家补充！',
          author_id: user.id,
          type: '经验',
          tags: ['数学', '期末复习', '解题技巧'],
          view_count: 89,
          like_count: 15,
          reply_count: 5,
          is_sticky: true
        },
        {
          title: '英语四级听力有什么好的训练方法？',
          content: '英语四级听力总是听不太懂，有什么有效的训练方法推荐吗？求大神指导！',
          author_id: user.id,
          type: '提问',
          tags: ['英语', '四级', '听力训练'],
          view_count: 156,
          like_count: 32,
          reply_count: 12
        }
      ]

      const { data: insertedTopics, error: insertError } = await supabase
        .from('topics')
        .insert(sampleTopics)
        .select()

      if (insertError) throw insertError

      console.log('示例数据插入成功')

    } catch (error) {
      console.error('插入示例数据失败:', error)
    }
  }
}

export default databaseService