import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useGallery();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      default:
        return <Info className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="toast-container">
      <div className="toast">
        {getIcon()}
        <span className="font-semibold text-sm">{toast.message}</span>
      </div>
    </div>
  );
};
