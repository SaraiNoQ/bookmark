// 默认分类
export const defaultCategories = ['Tools', 'Developer', 'AI', 'Entertainment', 'Academic', 'Literature', 'Social'];

// 分类图标映射
export const categoryIcons: Record<string, string> = {
  Tools: '🔧',
  Developer: '🛠️',
  AI: '💻',
  Entertainment: '🎮',
  Academic: '📚',
  Literature: '✒️',
  Social: '👥',
};

// 预设搜索引擎配置
export const searchEngines = [
  {
    id: 'google',
    name: 'Google',
    icon: '/icons/google.svg',
    searchUrl: 'https://www.google.com/search?q='
  },
  {
    id: 'baidu',
    name: 'Baidu',
    icon: '/icons/baidu.svg',
    searchUrl: 'https://www.baidu.com/s?wd='
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    icon: '/icons/bilibili.svg',
    searchUrl: 'https://search.bilibili.com/all?keyword='
  },
  {
    id: 'scholar',
    name: '谷歌学术',
    icon: '/icons/google-scholar.svg',
    searchUrl: 'https://scholar.google.com/scholar?q='
  },
  {
    id: 'google-translate',
    name: '谷歌翻译',
    icon: '/icons/google-translate.svg',
    searchUrl: 'https://translate.google.com/?sl=auto&tl=en&text='
  },
  {
    id: 'zhihu',
    name: '知乎',
    icon: '/icons/zhihu.svg',
    searchUrl: 'https://www.zhihu.com/search?type=content&q='
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '/icons/xiaohongshu.svg',
    searchUrl: 'https://www.xiaohongshu.com/search_result?keyword='
  }
];

// 预设书签数据
export const defaultBookmarks = [
  {
    id: '1',
    title: 'GitHub',
    url: 'https://github.com',
    icon: '/icons/github.svg',
    category: 'Developer'
  },
  {
    id: '2',
    title: 'Google',
    url: 'https://www.google.com',
    icon: '/icons/google.svg',
    category: 'Tools'
  },
  {
    id: '3',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '4',
    title: 'DouYin',
    url: 'https://www.douyin.com',
    icon: '/icons/douyin.svg',
    category: 'Entertainment'
  },
  {
    id: '5',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'social'
  },
  {
    id: '6',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '7',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '8',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '9',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '10',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
  {
    id: '11',
    title: 'QQ',
    url: 'https://www.google.com',
    icon: '',
    category: 'Social'
  },
]; 