import { useState } from 'react';
import { Bookmark } from '../types';
import { useBookmarks } from '../contexts/BookmarkContext';
import Modal from './Modal';
import { TrashIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { removeBookmark, updateBookmarksOrder } = useBookmarks();
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [imageError] = useState(false);
  
  // 获取图标URL的函数
  const getIconUrl = () => {
    if (imageError || (!bookmark.icon && !bookmark.url)) {
      // 当发生错误或没有图标和URL时，使用默认图标
      return '/default.svg';  // 确保在 public 目录下有这个默认图标
    }
    if (bookmark.icon) {
      return bookmark.icon;
    }
    return '/default.svg'
  };

  // 处理删除确认
  const handleDelete = () => {
    removeBookmark(bookmark.id as string);
    setShowDeleteModal(false);
  };

  // 处理置顶
  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    updateBookmarksOrder(bookmark.id as string, bookmark.category);
  };

  return (
    <>
       <div 
        className="relative p-3 rounded-lg bg-white dark:bg-gray-800
          shadow-neu-light dark:shadow-neu-dark 
          group hover:scale-102 hover:-translate-y-1
          hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)]
          dark:hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5),0_10px_20px_-5px_rgba(0,0,0,0.4)]
          transition-all duration-300 ease-out
          w-full max-w-[200px] h-[80px]
          cursor-pointer"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <a 
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 h-full"
        >
          <Image 
            src={getIconUrl()} 
            alt={''}
            width={24}
            height={24}
            className="w-6 h-6 flex-shrink-0 ml-1"
          />
          <span className="flex-1 text-gray-800 dark:text-gray-200 text-l ml-1 truncate font-bold opacity-80">
            {bookmark.title}
          </span>
        </a>
        
        {showDelete && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            {/* 置顶按钮 */}
            <button
              onClick={handlePin}
              className="p-1.5 rounded-full
                bg-blue-100 dark:bg-blue-900/30
                hover:bg-blue-200 dark:hover:bg-blue-900/50
                transition-all duration-200
                opacity-0 group-hover:opacity-100
                transform scale-90 group-hover:scale-100
                shadow-lg"
            >
              <ArrowUpIcon className="w-4 h-4 text-blue-500" />
            </button>
            
            {/* 删除按钮 */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(true);
              }}
              className="p-1.5 rounded-full
                bg-red-100 dark:bg-red-900/30
                hover:bg-red-200 dark:hover:bg-red-900/50
                transition-all duration-200
                opacity-0 group-hover:opacity-100
                transform scale-90 group-hover:scale-100
                shadow-lg"
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
      </div>

      {/* 删除确认模态框 */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="确认删除"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            确定要删除书签 &quot;{bookmark.title}&quot; 吗？
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg
                bg-red-500 text-white
                hover:bg-red-600
                transition-colors"
            >
              确认删除
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
} 