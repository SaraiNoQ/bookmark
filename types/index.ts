// 书签类型定义
export interface Bookmark {
  id?: string;
  title: string;
  url: string;
  icon?: string;
  category: string;
}

// 搜索引擎类型定义
export interface SearchEngine {
  id: string;
  name: string;
  icon: string;
  searchUrl: string;
}

// 书签分类类型定义
export interface Category {
  id: string;
  name: string;
  icon?: string;
} 