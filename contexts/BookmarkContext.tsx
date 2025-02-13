import { createContext, useContext, useState, useEffect } from 'react';
import { Bookmark } from '../types';
import { defaultBookmarks } from '../data/bookmarks';

// 定义Context接口
interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, bookmark: Partial<Bookmark>) => void;
}

// 创建Context
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

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

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      updateBookmark,
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