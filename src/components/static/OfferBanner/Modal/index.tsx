import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-inter">
      <div className="absolute inset-0 bg-black opacity-75" onClick={onClose} />
      <div className="bg-white rounded-xl space-y-6 p-6 z-10 mx-auto w-full lg:max-w-[1109px] max-w-[353px]">
        {children}
      </div>
    </div>
  );
};
