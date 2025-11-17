# 校园课程平台

一个基于Vue.js的现代化校园课程平台，提供课程管理、学习笔记、论坛交流等功能。

## 项目特色

- 🎨 **现代化UI设计** - 使用渐变色彩和动画效果
- 📱 **完全响应式** - 适配桌面端和移动端
- ⚡ **高性能** - 基于Vite构建，开发体验流畅
- 💬 **完整论坛系统** - 支持话题发布、回复、分类等
- 📚 **课程管理** - 课程浏览、搜索、详情查看
- 🎯 **用户中心** - 个人资料管理、学习记录

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **路由**: Vue Router
- **样式**: CSS3 (渐变、动画、响应式)
- **部署**: Netlify

## 功能模块

### 1. 首页 (Home)
- 平台功能介绍
- 热门课程预览
- 最新学习笔记
- 动画背景效果

### 2. 课程模块 (Courses)
- 课程列表展示
- 高级搜索和筛选
- 分类标签系统
- 课程详情页面

### 3. 论坛模块 (Forum)
- 论坛首页话题列表
- 话题详情和回复
- 课程关联子论坛
- 话题发布和编辑

### 4. 用户模块
- 用户登录/注册
- 个人资料管理
- 学习记录跟踪

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Navbar.vue       # 导航栏
│   └── forum/           # 论坛组件
├── views/               # 页面视图
│   ├── Home.vue         # 首页
│   ├── Courses.vue      # 课程列表
│   ├── CourseDetail.vue # 课程详情
│   ├── forum/           # 论坛页面
│   └── ...              # 其他页面
├── router/              # 路由配置
├── services/            # API服务
└── mockData.js          # 模拟数据
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 部署说明

项目已配置Netlify部署，可以通过以下方式部署：

1. 将代码推送到GitHub
2. 在Netlify中连接GitHub仓库
3. 设置构建命令: `npm run build`
4. 设置发布目录: `dist`

## 环境配置

复制 `.env.example` 为 `.env` 并配置相应环境变量：

```bash
cp .env.example .env
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 贡献指南

欢迎提交Issue和Pull Request来改进项目！

## 许可证

MIT License

---

**开发者**: GitHub User  
**项目类型**: 前端课程项目  
**最后更新**: 2025-11-17