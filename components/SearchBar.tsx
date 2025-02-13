import { useState } from 'react';
import { searchEngines } from '../data/bookmarks';

// 搜索栏组件
export default function SearchBar() {
  // 当前选中的搜索引擎和搜索关键词
  const [selectedEngine, setSelectedEngine] = useState(searchEngines[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // 打开新标签页进行搜索
    window.open(`${selectedEngine.searchUrl}${encodeURIComponent(searchTerm)}`, '_blank');
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto p-4">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-neu-light dark:shadow-neu-dark">
        {/* 搜索引擎选择器 */}
        <select 
          value={selectedEngine.id}
          onChange={(e) => setSelectedEngine(searchEngines.find(engine => engine.id === e.target.value) || searchEngines[0])}
          className="bg-transparent border-none outline-none"
        >
          {searchEngines.map(engine => (
            <option key={engine.id} value={engine.id}>
              {engine.name}
            </option>
          ))}
        </select>
        
        {/* 搜索输入框 */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入关键词搜索..."
          className="flex-1 bg-transparent border-none outline-none px-2"
        />
        
        {/* 搜索按钮 */}
        <button 
          type="submit"
          className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
        >
          搜索
        </button>
      </div>
    </form>
  );
} 