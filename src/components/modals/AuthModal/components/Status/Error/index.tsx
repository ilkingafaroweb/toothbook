import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface ErrorMessageProps {
  errorMessage: string | null; 
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  if (!errorMessage) return null; 

  return (
    <div className='w-full flex justify-start items-center mt-3 bg-accentColor bg-opacity-60'>
      <div className='h-full w-max text-center px-2 py-1 bg-accentColor'>
        <FontAwesomeIcon icon={faTriangleExclamation} size='lg' className='text-white' />
      </div>
      <p className='px-2'>{errorMessage}</p>
    </div>
  );
};