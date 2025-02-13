import { useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';
import Modal from './Modal';
import AddCategoryForm from './AddCategoryForm';

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const { bookmarks } = useBookmarks();

  const categories = Array.from(new Set(bookmarks.map(b => b.category)));

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      developer: '🛠️',
      social: '👥',
      entertainment: '🎮',
      work: '💼',
      study: '📚',
    };
    return icons[category] || '📌';
  };

  // 处理添加新分类
  const handleAddCategory = (newCategory: string) => {
    // 这里可以添加新分类的处理逻辑
    // 目前我们只需要关闭模态框，因为新分类会在添加书签时自动创建
    setShowAddCategory(false);
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-[72px] 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        flex flex-col items-center py-4 gap-2 z-50
        transition-colors duration-200">
        {categories.map((category) => (
          <div key={category} className="relative group">
            <button
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={`w-12 h-12 rounded-full flex items-center justify-center 
                transition-all duration-200 group-hover:rounded-2xl
                ${activeCategory === category 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                }`}
            >
              <span className="text-xl">{getCategoryIcon(category)}</span>
            </button>

            <div className="absolute left-[80px] top-1/2 -translate-y-1/2 
              px-3 py-2 
              bg-gray-800 dark:bg-gray-900 
              text-white
              rounded-md text-sm whitespace-nowrap 
              opacity-0 group-hover:opacity-100 
              transition-opacity pointer-events-none
              shadow-lg">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>

            <div className={`absolute left-0 top-1/2 -translate-y-1/2 
              w-1 h-8 rounded-r-full
              bg-gradient-to-b from-blue-500 to-purple-500
              transition-all duration-200
              ${activeCategory === category ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ))}

        <div className="w-8 h-[2px] my-2 rounded-full
          bg-gray-200 dark:bg-gray-700
          transition-colors duration-200" />

        {/* 添加新分类按钮 */}
        <button 
          onClick={() => setShowAddCategory(true)}
          className="w-12 h-12 rounded-full 
            bg-gray-100 dark:bg-gray-700
            hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
            hover:rounded-2xl hover:text-white
            flex items-center justify-center 
            transition-all duration-200"
        >
          <span className="text-2xl text-green-500 hover:text-white">+</span>
        </button>
      </div>

      {/* 添加分类模态框 */}
      <Modal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="添加新分类"
      >
        <AddCategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setShowAddCategory(false)}
        />
      </Modal>
    </>
  );
} 