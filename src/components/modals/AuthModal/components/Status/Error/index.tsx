import React from 'react';

interface ErrorMessageProps {
  errorMessage: string | null; 
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  if (!errorMessage) return null; 

  return (
    <div className='relative w-full max-w-96 flex justify-start items-center mt-3 bg-gray-300 bg-opacity-60'>
      <div className='absolute h-full w-1 text-center bg-accentColor'>
        
      </div>
      <p className='ml-3 p-1'>{errorMessage}</p>
    </div>
  );
};