import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface SuccessMessageProps {
  successMessage: string | null; 
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ successMessage }) => {
  if (!successMessage) return null;

  return (
    <div className='w-full max-w-96 flex justify-start items-center mt-3 bg-green-500 bg-opacity-60'>
      <div className='h-full w-max text-center px-2 py-1 bg-green-500'>
        <FontAwesomeIcon icon={faCheckCircle} size='lg' className='text-white' />
      </div>
      <p className='px-2'>{successMessage}</p>
    </div>
  );
};