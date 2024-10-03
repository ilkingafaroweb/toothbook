import React from 'react';
import { RouteProps } from '../../types';
import { ContactForm } from './components';
import { contact } from '../../assets';
import { DefaultLayout } from '../../layouts';

export const Contact: React.FC<RouteProps> = ({ name }) => {
  return (
    <DefaultLayout>
      <div className='flex flex-col items-start lg:space-y-8 space-y-4 lg:my-8 lg:px-16'>
        <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>
        <div className='w-full flex lg:flex-row flex-col-reverse shadow-carousel rounded-xl'>
          <div className='lg:w-1/2 w-full'>
            <img src={contact} alt="contact" />
          </div>
          <ContactForm />
        </div>
      </div>
    </DefaultLayout>
  );
};