import { useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useCategories } from '../contexts/CategoryContext';
import SearchBar from '../components/SearchBar';
import BookmarkCard from '../components/BookmarkCard';
import ThemeToggle from '../components/ThemeToggle';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import AddBookmarkForm from '../components/AddBookmarkForm';
import FileUploader from '../components/FileUploader';
import BackToTop from '../components/BackToTop';
import { PlusIcon, TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Bookmark } from '../types';

export default function Home() {
  const { bookmarks } = useBookmarks();
  const { categories } = useCategories();
  const [activeCategory] = useState<string | null>(null);
  const [addingCategory, setAddingCategory] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importContent, setImportContent] = useState<string | null>(null);

  // 为文件生成哈希值
  const generateHash = async(blob: Blob) => {
    // 将Blob转换为ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();

    // 使用crypto.subtle.digest生成哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);

    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex.slice(0, 16);
  }

  // 导出书签
  const handleExport = async () => {
    const data = {
      // 移除每个书签对象中的id字段
      bookmarks: bookmarks.map(({ id: _id, ...rest }) => rest),
      categories,
    };
    
    const blob = new Blob(
      [JSON.stringify(data, null, 2)], 
      { type: 'application/json' }
    );

    //为文件生成哈希值
    const hash = await generateHash(blob);
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookmarks-export_${hash}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 文件验证
  const validateImportFile = (content: string): boolean => {
    try {
      const data = JSON.parse(content);
      
      // 验证数据结构
      const isValidStructure = 
        Array.isArray(data.bookmarks) &&
        Array.isArray(data.categories) &&
        data.bookmarks.every((bookmark: Bookmark) => (
          typeof bookmark.title === 'string' &&
          typeof bookmark.url === 'string' &&
          typeof bookmark.category === 'string' &&
          (bookmark.icon === undefined || typeof bookmark.icon === 'string')
        ));

      // 验证数据大小
      // const isValidSize = 
      //   data.bookmarks.length <= 1000 && // 限制书签数量
      //   data.categories.length <= 100;    // 限制分类数量

      return isValidStructure;
    } catch {
      return false;
    }
  };

  // 导入书签
  const handleImport = () => {
    if (!importContent || !validateImportFile(importContent)) {
      alert('导入失败：无效的文件格式');
      return;
    }
    
    try {
      const data = JSON.parse(importContent);
      
      // 为data.bookmarks中的每个书签生成id
      const bookmarksWithIds = data.bookmarks.map((bookmark: Bookmark) => ({
        ...bookmark,
        // 生成一个随机字符串
        id: crypto.randomUUID()
      }));
      
      localStorage.setItem('bookmarks', JSON.stringify(bookmarksWithIds));
      localStorage.setItem('categories', JSON.stringify(data.categories));
      window.location.reload();
    } catch (error) {
      console.error('导入失败：', error);
      alert('导入失败：无效的文件格式');
    }
  };

  // 根据选中的分类过滤书签
  const filteredCategories = activeCategory ? [activeCategory] : categories;

  // 清除所有数据
  const handleClearAll = () => {
    localStorage.clear();
    window.location.reload(); // 刷新页面以重新加载默认数据
  };

  return (
    <div className="min-h-screen min-w-screen font-blackFont bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主要内容区域 */}
      <div className="ml-[72px]">
        <header className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="font-kai text-[1.75rem] font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              书签导航
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImport(true)}
                className="p-2 rounded-lg 
                  bg-white dark:bg-gray-800 
                  shadow-neu-light dark:shadow-neu-dark 
                  hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover 
                  transition-shadow"
                title="导入数据"
              >
                <ArrowUpTrayIcon className="w-6 h-6 text-blue-500" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 rounded-lg 
                  bg-white dark:bg-gray-800 
                  shadow-neu-light dark:shadow-neu-dark 
                  hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover 
                  transition-shadow"
                title="导出数据"
              >
                <ArrowDownTrayIcon className="w-6 h-6 text-green-500" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-2 rounded-lg 
                  bg-white dark:bg-gray-800 
                  shadow-neu-light dark:shadow-neu-dark 
                  hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover 
                  transition-shadow"
                title="清除所有数据"
              >
                <TrashIcon className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        </header>

        {/* 现有的主要内容... */}
        <main className="container mx-auto px-4 py-8">
          <SearchBar />

          {/* 分类书签展示 */}
          <div className="mt-8 space-y-12">
            {filteredCategories.map(category => (
              <div key={category} id={`category-${category}`}>
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 px-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 px-2">
                  {bookmarks
                    .filter(b => b.category === category)
                    .map(bookmark => (
                      <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                    ))}
                  
                  {/* 添加书签按钮 */}
                  <button
                    onClick={() => setAddingCategory(category)}
                    className="p-3 rounded-lg 
                      bg-white dark:bg-gray-800
                      shadow-neu-light dark:shadow-neu-dark
                      hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover
                      hover:scale-102 hover:-translate-y-1
                      transition-all duration-300
                      w-full max-w-[200px] h-[80px]
                      flex items-center justify-center"
                  >
                    <PlusIcon className="w-6 h-6 text-blue-500" />
                  </button>
                </div>
              </div>
            ))}
          </div> 
        </main>
      </div>

      {/* 添加书签模态框 */}
      <Modal
        isOpen={!!addingCategory}
        onClose={() => setAddingCategory(null)}
        title="添加书签"
      >
        {addingCategory && (
          <AddBookmarkForm
            category={addingCategory}
            onClose={() => setAddingCategory(null)}
          />
        )}
      </Modal>

      {/* 清除确认模态框 */}
      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="确认清除"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            确定要清除所有数据吗？此操作不可恢复。
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 rounded-lg
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-lg
                bg-red-500 text-white
                hover:bg-red-600
                transition-colors"
            >
              确认清除
            </button>
          </div>
        </div>
      </Modal>

      {/* 导入数据模态框 */}
      <Modal
        isOpen={showImport}
        onClose={() => {
          setShowImport(false);
          setImportContent(null);
        }}
        title="导入数据"
      >
        <div className="space-y-4">
          <FileUploader onFileSelect={setImportContent} />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowImport(false);
                setImportContent(null);
              }}
              className="px-4 py-2 rounded-lg
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleImport}
              disabled={!importContent}
              className={`px-4 py-2 rounded-lg
                ${importContent
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'}
                transition-colors`}
            >
              确认导入
            </button>
          </div>
        </div>
      </Modal>

      <BackToTop />
    </div>
  );
} 