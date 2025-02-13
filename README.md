# 书签导航网站

一个基于 Next.js 开发的现代化书签导航网站，支持快捷导航、搜索引擎集成和书签管理。

## 技术栈

- **框架**: Next.js 14
- **样式**: TailwindCSS + Neumorphism 设计
- **状态管理**: React Context
- **主题切换**: next-themes
- **图标**: Heroicons
- **UI组件**: Headless UI

## 功能特性

- 📑 书签管理（增删改查）
- 🔍 多搜索引擎集成
- 🌓 明暗主题切换
- 📱 响应式设计
- ✨ 新拟态风格UI
- 🎯 F型视觉布局

## 开始使用

1. 克隆项目
bash
git clone https://github.com/yourusername/bookmark-nav.git

2. 安装依赖
bash
cd bookmark-nav
npm install

3. 运行开发服务器
bash
npm run dev

4. 构建生产版本
```bash
npm run build
```

## 项目结构
bookmark-nav/
├── components/ # UI组件
├── contexts/ # React Context
├── hooks/ # 自定义Hooks
├── pages/ # 页面文件
├── public/ # 静态资源
├── styles/ # 样式文件
└── types/ # TypeScript类型定义


## 测试数据

项目包含预设的书签数据，位于 `data/bookmarks.ts`。您可以修改此文件来自定义默认书签。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License