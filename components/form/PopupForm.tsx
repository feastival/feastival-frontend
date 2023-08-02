import React, { useRef, useEffect } from 'react';
import Modal from 'react-modal';
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
    <Modal
      isOpen={true}
      className="fixed inset-0 flex items-center justify-center bg-transparent bg:opacity-0 backdrop-blur-lg"
    >
      <div
        ref={popupRef}
        className="max-w-[600px] min-h-[300px] rounded-lg flex flex-col items-center justify-center"
      >
        <button
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
          onBlur={onClose}
        ></button>
        {children}
      </div>
    </Modal>
  );
};

export default PopupForm;
