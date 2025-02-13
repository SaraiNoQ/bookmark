import { useState } from 'react';
import { Bookmark } from '../types';
import { useBookmarks } from '../contexts/BookmarkContext';
import Modal from './Modal';
import { TrashIcon } from '@heroicons/react/24/outline';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { removeBookmark } = useBookmarks();
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 处理删除确认
  const handleDelete = () => {
    removeBookmark(bookmark.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div 
        className="relative p-4 rounded-lg bg-white dark:bg-gray-800 
          shadow-neu-light dark:shadow-neu-dark 
          hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover 
          transition-shadow"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <a 
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <img 
            src={bookmark.icon || `https://www.google.com/s2/favicons?domain=${bookmark.url}`}
            alt={bookmark.title}
            className="w-6 h-6"
          />
          <span className="flex-1 text-gray-800 dark:text-gray-200">
            {bookmark.title}
          </span>
        </a>
        
        {showDelete && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="absolute -top-2 -right-2 p-1.5 rounded-full
              bg-red-100 dark:bg-red-900/30
              hover:bg-red-200 dark:hover:bg-red-900/50
              transition-colors
              opacity-0 group-hover:opacity-100"
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
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
            确定要删除书签 "{bookmark.title}" 吗？
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