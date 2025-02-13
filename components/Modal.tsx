interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl 
        shadow-neu-light dark:shadow-neu-dark
        w-full max-w-md p-6 m-4
        transform transition-all">
        {/* 标题 */}
        <h3 className="text-xl font-semibold mb-4 
          bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h3>
        
        {children}
      </div>
    </div>
  );
} 