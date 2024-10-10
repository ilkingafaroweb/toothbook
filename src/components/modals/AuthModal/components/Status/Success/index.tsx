import React from 'react';

interface SuccessMessageProps {
  successMessage: string | null; 
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ successMessage }) => {
  if (!successMessage) return null;

  return (
    <div className='relative w-full max-w-96 flex justify-start items-center mt-3 bg-gray-300 bg-opacity-60'>
      <div className='absolute h-full w-1 text-center bg-green-500'>
        
        </div>
      <p className='ml-3 p-1'>{successMessage}</p>
    </div>
  );
};