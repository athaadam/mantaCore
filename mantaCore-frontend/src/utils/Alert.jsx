import { useEffect } from 'react';

export default function Alert({ message, type = 'info', onClose }) {
  const alertStyles = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  const timeOut = 5000; // 5 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, timeOut);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`relative p-4 rounded-md ${alertStyles[type]} shadow-md transition-opacity`}>
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-sm text-gray-700 hover:text-black cursor-pointer"
        aria-label="Close"
      >
        ✕
      </button>
      <span className="font-medium">{message}</span>
    </div>
  );
}
