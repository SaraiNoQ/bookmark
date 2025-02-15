import { useState } from 'react';
import { useCategories } from '../contexts/CategoryContext';
import Modal from './Modal';
import AddCategoryForm from './AddCategoryForm';
import { categoryIcons } from '../data/bookmarks';

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const { categories, addCategory } = useCategories();

  const returnRandomEmoji = () => {
    // emoji表情数组
    const emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
      '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
      '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
      '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
      '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
      '💻', '⌨️', '🖥️', '🔨', '⚙️', '🔧', '🗜️', '📱',
      '⚛️', '🐍', '☕', '🦀', '🐘', '🦕', '🟦', '🟨', '🟩',
      '✅', '❌', '⚠️', '🚫', '♻️', '🔄', '⏳', '⌛', '🔍',
      '🚀', '⭐', '💡', '🎯', '🎨', '🔒', '🔑', '🔔', '🔕',
      '🎉', '🎊', '🎈', '🎁', '🎂', '🎃', '🎄', '🎆', '🎇',
      '📝', '📚', '📊', '📈', '📉', '📋', '📁', '📂', '🗂️',
      '🤝', '👥', '🗣️', '💬', '📢', '🔊', '📧', '🌐', '🔗',
      '🐛', '🚨', '🔥', '💥', '🎯', '🔨', '🩹', '🧪', '🧹',
      '🎉', '🎊', '🏆', '🌟', '✨', '💫', '🔥', '💪', '👏'
    ];
    
    // 生成随机索引
    const randomIndex = Math.floor(Math.random() * emojis.length);
    
    // 返回随机emoji
    return emojis[randomIndex];
  };

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || returnRandomEmoji();
  };

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
    
    // 查找对应的分类标题元素
    const element = document.getElementById(`category-${category}`);
    if (element) {
      // 获取元素顶部位置
      const elementTop = element.getBoundingClientRect().top;
      const offsetPosition = elementTop + window.pageYOffset - 15; // 减去头部高度

      // 检查是否有足够的滚动空间
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = Math.min(offsetPosition, maxScroll);

      // 平滑滚动
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // 处理添加新分类
  const handleAddCategory = (newCategory: string) => {
    addCategory(newCategory);
    setShowAddCategory(false);
  };

  return (
    <>
      <div className="fixed left-0 top-0 min-h-[100%] w-[72px] 
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        flex flex-col items-center py-4 gap-2 z-50
        transition-colors duration-200">
        {categories.map((category) => (
          <div key={category} className="relative group">
            <button
              onClick={() => handleCategoryClick(category)}
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
              opacity-0 group-hover:opacity-90 
              transition-opacity pointer-events-none
              shadow-lg">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>

            <div className={`absolute left-[-2px] top-1/2 -translate-y-1/2 
              w-1 h-8 rounded-r-full
              bg-gradient-to-b from-blue-500 to-purple-500
              transition-all duration-200
              ${activeCategory === category ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ))}

        <div className="w-8 h-[2px] my-2 rounded-full
          bg-gray-200 dark:bg-gray-700
          transition-colors duration-200" />

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