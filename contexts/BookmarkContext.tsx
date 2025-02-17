import { createContext, useContext, useState, useEffect } from 'react';
import { Bookmark } from '../types';
import { defaultBookmarks } from '../data/bookmarks';

// 定义Context接口
interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, bookmark: Partial<Bookmark>) => void;
  updateBookmarksOrder: (bookmarkId: string, category: string) => void;
}

// 创建Context
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// 添加 URL 验证函数
const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Context Provider组件
export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  // 状态管理：书签列表
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // 初始化：从localStorage加载数据
  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    setBookmarks(stored ? JSON.parse(stored) : defaultBookmarks);
  }, []);

  // 保存更改到localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // 添加书签
  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    if (!isValidUrl(bookmark.url)) {
      throw new Error('无效的 URL');
    }

    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  // 删除书签
  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  // 更新书签
  const updateBookmark = (id: string, bookmark: Partial<Bookmark>) => {
    setBookmarks(bookmarks.map(b => 
      b.id === id ? { ...b, ...bookmark } : b
    ));
  };

  // 更新书签顺序
  const updateBookmarksOrder = (bookmarkId: string, category: string) => {
    setBookmarks(prevBookmarks => {
      // 找到要置顶的书签
      const bookmarkToPin = prevBookmarks.find(b => b.id === bookmarkId);
      if (!bookmarkToPin) return prevBookmarks;

      // 过滤出其他书签
      const otherBookmarks = prevBookmarks.filter(b => b.id !== bookmarkId);
      
      // 找到同类别的书签
      const categoryBookmarks = otherBookmarks.filter(b => b.category === category);
      const nonCategoryBookmarks = otherBookmarks.filter(b => b.category !== category);

      // 将要置顶的书签放在同类别书签的最前面
      return [...nonCategoryBookmarks, bookmarkToPin, ...categoryBookmarks];
    });
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      updateBookmark,
      updateBookmarksOrder,
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

// 自定义Hook
export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
} 