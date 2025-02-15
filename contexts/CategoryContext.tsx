import { createContext, useContext, useState, useEffect } from 'react';
import { defaultCategories } from '../data/bookmarks';

// 定义Context接口
interface CategoryContextType {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

// 创建Context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Context Provider组件
export function CategoryProvider({ children }: { children: React.ReactNode }) {
  // 状态管理：分类列表
  const [categories, setCategories] = useState<string[]>([]);

  // 初始化：从localStorage加载数据
  useEffect(() => {
    const stored = localStorage.getItem('categories');
    setCategories(stored ? JSON.parse(stored) : defaultCategories);
  }, []);

  // 保存更改到localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // 添加分类
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // 删除分类
  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      removeCategory,
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

// 自定义Hook
export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
} 