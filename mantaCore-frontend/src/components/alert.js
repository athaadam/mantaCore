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
    <div className={`p-4 rounded-md ${alertStyles[type]} shadow-md transition-opacity `}>
      <span className="font-medium">{message}</span>
    </div>
  );

}
