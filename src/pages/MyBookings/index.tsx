import React from 'react';
import { RouteProps } from '../../types';
import { BookingsTable } from './components';
import { DefaultLayout } from '../../layouts';

export const MyBookings: React.FC<RouteProps> = ({ name }) => {

    return (
        <DefaultLayout>
            <div className='flex flex-col items-start lg:space-y-8 space-y-4 lg:my-8 lg:px-8'>
                <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>
                <BookingsTable />
            </div>
        </DefaultLayout>
    );
};