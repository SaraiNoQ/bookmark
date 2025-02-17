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
  const [isImageLoading, setIsImageLoading] = useState(true);

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

  // 添加内容净化函数
  const sanitizeContent = (content: string): string => {
    return content
      .replace(/[<>]/g, '') // 移除 HTML 标签
      .trim()
      .slice(0, 100);  // 限制长度
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
          <div className="relative w-6 h-6 flex-shrink-0">
            {/* Loading 图标 */}
            {isImageLoading && (
              <Image
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzM5Nzc3MzI3NzQ5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNDkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik00NjkuMzMzMzMzIDg1LjMzMzMzM200Mi42NjY2NjcgMGwwIDBxNDIuNjY2NjY3IDAgNDIuNjY2NjY3IDQyLjY2NjY2N2wwIDEyOHEwIDQyLjY2NjY2Ny00Mi42NjY2NjcgNDIuNjY2NjY3bDAgMHEtNDIuNjY2NjY3IDAtNDIuNjY2NjY3LTQyLjY2NjY2N2wwLTEyOHEwLTQyLjY2NjY2NyA0Mi42NjY2NjctNDIuNjY2NjY3WiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iLjgiIHAtaWQ9IjIzNTAiPjwvcGF0aD48cGF0aCBkPSJNNDY5LjMzMzMzMyA3MjUuMzMzMzMzbTQyLjY2NjY2NyAwbDAgMHE0Mi42NjY2NjcgMCA0Mi42NjY2NjcgNDIuNjY2NjY3bDAgMTI4cTAgNDIuNjY2NjY3LTQyLjY2NjY2NyA0Mi42NjY2NjdsMCAwcS00Mi42NjY2NjcgMC00Mi42NjY2NjctNDIuNjY2NjY3bDAtMTI4cTAtNDIuNjY2NjY3IDQyLjY2NjY2Ny00Mi42NjY2NjdaIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIuNCIgcC1pZD0iMjM1MSI+PC9wYXRoPjxwYXRoIGQ9Ik05MzguNjY2NjY3IDQ2OS4zMzMzMzNtMCA0Mi42NjY2NjdsMCAwcTAgNDIuNjY2NjY3LTQyLjY2NjY2NyA0Mi42NjY2NjdsLTEyOCAwcS00Mi42NjY2NjcgMC00Mi42NjY2NjctNDIuNjY2NjY3bDAgMHEwLTQyLjY2NjY2NyA0Mi42NjY2NjctNDIuNjY2NjY3bDEyOCAwcTQyLjY2NjY2NyAwIDQyLjY2NjY2NyA0Mi42NjY2NjdaIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIuMiIgcC1pZD0iMjM1MiI+PC9wYXRoPjxwYXRoIGQ9Ik0yOTguNjY2NjY3IDQ2OS4zMzMzMzNtMCA0Mi42NjY2NjdsMCAwcTAgNDIuNjY2NjY3LTQyLjY2NjY2NyA0Mi42NjY2NjdsLTEyOCAwcS00Mi42NjY2NjcgMC00Mi42NjY2NjctNDIuNjY2NjY3bDAgMHEwLTQyLjY2NjY2NyA0Mi42NjY2NjctNDIuNjY2NjY3bDEyOCAwcTQyLjY2NjY2NyAwIDQyLjY2NjY2NyA0Mi42NjY2NjdaIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIuNiIgcC1pZD0iMjM1MyI+PC9wYXRoPjxwYXRoIGQ9Ik03ODMuNTMwNjY3IDE4MC4xMzg2NjdtMzAuMTY5ODg5IDMwLjE2OTg4OWwwIDBxMzAuMTY5ODg5IDMwLjE2OTg4OSAwIDYwLjMzOTc3OWwtOTAuNTA5NjY4IDkwLjUwOTY2OHEtMzAuMTY5ODg5IDMwLjE2OTg4OS02MC4zMzk3NzkgMGwwIDBxLTMwLjE2OTg4OS0zMC4xNjk4ODkgMC02MC4zMzk3NzlsOTAuNTA5NjY4LTkwLjUwOTY2OHEzMC4xNjk4ODktMzAuMTY5ODg5IDYwLjMzOTc3OSAwWiIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iLjEiIHAtaWQ9IjIzNTQiPjwvcGF0aD48cGF0aCBkPSJNMzMwLjk2NTMzMyA2MzIuNjYxMzMzbTMwLjE2OTg5IDMwLjE2OTg5bDAgMHEzMC4xNjk4ODkgMzAuMTY5ODg5IDAgNjAuMzM5Nzc4bC05MC41MDk2NjggOTAuNTA5NjY4cS0zMC4xNjk4ODkgMzAuMTY5ODg5LTYwLjMzOTc3OSAwbDAgMHEtMzAuMTY5ODg5LTMwLjE2OTg4OSAwLTYwLjMzOTc3OGw5MC41MDk2NjgtOTAuNTA5NjY4cTMwLjE2OTg4OS0zMC4xNjk4ODkgNjAuMzM5Nzc5IDBaIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIuNSIgcC1pZD0iMjM1NSI+PC9wYXRoPjxwYXRoIGQ9Ik04NDMuODYxMzMzIDc4My41MzA2NjdtLTMwLjE2OTg4OSAzMC4xNjk4ODlsMCAwcS0zMC4xNjk4ODkgMzAuMTY5ODg5LTYwLjMzOTc3OSAwbC05MC41MDk2NjgtOTAuNTA5NjY4cS0zMC4xNjk4ODktMzAuMTY5ODg5IDAtNjAuMzM5Nzc5bDAgMHEzMC4xNjk4ODktMzAuMTY5ODg5IDYwLjMzOTc3OSAwbDkwLjUwOTY2OCA5MC41MDk2NjhxMzAuMTY5ODg5IDMwLjE2OTg4OSAwIDYwLjMzOTc3OVoiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9Ii4zIiBwLWlkPSIyMzU2Ij48L3BhdGg+PHBhdGggZD0iTTM5MS4zMzg2NjcgMzMwLjk2NTMzM20tMzAuMTY5ODkgMzAuMTY5ODlsMCAwcS0zMC4xNjk4ODkgMzAuMTY5ODg5LTYwLjMzOTc3OCAwbC05MC41MDk2NjgtOTAuNTA5NjY4cS0zMC4xNjk4ODktMzAuMTY5ODg5IDAtNjAuMzM5Nzc5bDAgMHEzMC4xNjk4ODktMzAuMTY5ODg5IDYwLjMzOTc3OCAwbDkwLjUwOTY2OCA5MC41MDk2NjhxMzAuMTY5ODg5IDMwLjE2OTg4OSAwIDYwLjMzOTc3OVoiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9Ii43IiBwLWlkPSIyMzU3Ij48L3BhdGg+PC9zdmc+"
                alt={''}
                fill
                sizes="24px"
                className="object-contain"
              />
            )}
            {/* 实际图标 */}
            <Image 
              src={getIconUrl()} 
              alt={''}
              fill
              sizes="24px"
              loading="lazy"
              className={`object-contain transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                const img = document.createElement('img');
                img.src = '/default.svg';
              }}
            />
          </div>
          <span className="flex-1 text-gray-800 dark:text-gray-200 text-l ml-1 truncate font-bold opacity-80">
            {sanitizeContent(bookmark.title)}
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