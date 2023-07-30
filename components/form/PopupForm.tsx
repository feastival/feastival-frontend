import React, { useRef, useEffect } from 'react';

interface PopupFormProps {
  onClose: () => void;
  children: React.ReactNode;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
      <div
        ref={popupRef}
        className="max-w-[600px] min-h-[300px] bg-white rounded-lg flex flex-col items-center justify-center"
      >
        <button
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default PopupForm;
