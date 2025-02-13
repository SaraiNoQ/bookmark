import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// 主题切换组件
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-neu-light dark:shadow-neu-dark hover:shadow-neu-light-hover dark:hover:shadow-neu-dark-hover transition-shadow"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-500" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
} 