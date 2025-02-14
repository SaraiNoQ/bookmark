import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
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
      <div className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800">
        {/* 搜索引擎选择器 */}
        {/* 自定义搜索引擎选择器 */}
        <Listbox value={selectedEngine} onChange={setSelectedEngine}>
          <div className="relative">
            <Listbox.Button className="relative w-[160px] py-2 pl-3 pr-8 
              text-left rounded-lg cursor-pointer
              bg-gray-50 dark:bg-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-600
              shadow-neu-light dark:shadow-neu-dark
              hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover
              transition-all duration-200">
              <span className="block truncate">
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedEngine.icon || `https://www.google.com/s2/favicons?domain=${selectedEngine.searchUrl}`} 
                    alt={selectedEngine.name}
                    className="w-4 h-4"
                  />
                  <span>{selectedEngine.name}</span>
                </div>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            
            <Listbox.Options className="absolute z-50 w-full mt-2 
              bg-white dark:bg-gray-800 
              shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)]
              dark:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5),0_10px_20px_-5px_rgba(0,0,0,0.4)]
              rounded-lg py-1 overflow-hidden
              transform opacity-0 scale-95 
              transition-all duration-200 ease-out
              origin-top
              focus:opacity-100 focus:scale-100">
              {searchEngines.map((engine) => (
                <Listbox.Option
                  key={engine.id}
                  value={engine}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4
                    ${active 
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-gray-100'}`
                  }
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center gap-2">
                        <img 
                          src={engine.icon || `https://www.google.com/s2/favicons?domain=${engine.searchUrl}`} 
                          alt={engine.name}
                          className="w-4 h-4"
                        />
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {engine.name}
                        </span>
                      </div>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        
        {/* 搜索输入框 */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入关键词搜索..."
          className="flex-1 bg-transparent border-none outline-none px-2
            text-gray-800 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500"
        />
        
        {/* 搜索按钮 */}
        <button 
          type="submit"
          className="px-4 py-2 rounded-lg
            bg-gradient-to-r from-blue-500 to-purple-500 
            text-white
            hover:shadow-lg hover:scale-102
            shadow-neu-light dark:shadow-neu-dark
            active:scale-98
            transition-all duration-200"
        >
          搜索
        </button>
      </div>
    </form>
  );
} 