import { useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';

interface AddBookmarkFormProps {
  category: string;
  onClose: () => void;
}

export default function AddBookmarkForm({ category, onClose }: AddBookmarkFormProps) {
  const { addBookmark } = useBookmarks();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookmark({
      ...formData,
      category
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          标题
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          图标URL（可选）
        </label>
        <input
          type="url"
          value={formData.icon}
          onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            outline-none transition-all"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600
            transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white
            hover:opacity-90
            transition-opacity"
        >
          添加
        </button>
      </div>
    </form>
  );
} 