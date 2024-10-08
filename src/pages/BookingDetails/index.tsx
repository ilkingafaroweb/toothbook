import React, { useState } from 'react';
import { RouteProps } from '../../types';
import { BookingChat, BookingView } from './components';
import { DefaultLayout } from '../../layouts';

export const BookingDetails: React.FC<RouteProps> = ({ name }) => {
    const [activeComponent, setActiveComponent] = useState<'view' | 'chat'>('view'); // Default olarak 'view' seçili

    return (
        <DefaultLayout>
            <div className='flex flex-col items-start lg:space-y-8 space-y-4 lg:my-8 lg:px-20'>
                <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>

                {/* Toggle Button (sadece mobil görünümde) */}
                <div className='flex justify-between w-full mb-4 rounded-lg lg:hidden'>
                    <button
                        className={`p-2 w-1/2 text-center rounded-l-lg ${activeComponent === 'view' ? 'bg-brandPrimary text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveComponent('view')}
                    >
                        Booking
                    </button>
                    <button
                        className={`p-2 w-1/2 text-center rounded-r-lg ${activeComponent === 'chat' ? 'bg-brandPrimary text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveComponent('chat')}
                    >
                        Chat
                    </button>
                </div>

                {/* Desktop Görünüm: Hem BookingView hem de BookingChat */}
                
                <div className='hidden lg:w-full h-full lg:flex items-center justify-between'>
                    <BookingView />
                    <BookingChat />
                </div>

                {/* Mobil Görünüm: Sadece aktif bileşen */}
                <div className='lg:hidden w-full h-full'>
                    {activeComponent === 'view' ? <BookingView /> : <BookingChat />}
                </div>
            </div>
        </DefaultLayout>
    );
}

