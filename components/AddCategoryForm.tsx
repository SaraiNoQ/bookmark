import { useState } from 'react';

interface AddCategoryFormProps {
  onSubmit: (category: string) => void;
  onClose: () => void;
}

export default function AddCategoryForm({ onSubmit, onClose }: AddCategoryFormProps) {
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          分类名称
        </label>
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-700
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            outline-none transition-all"
          required
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