import React from 'react'
import { RouteProps } from '../../types'
import { BookingChat, BookingView } from './components'
import { DefaultLayout } from '../../layouts'

export const BookingDetails: React.FC<RouteProps> = ({ name }) => {

    return (
        <DefaultLayout>
            <div className='flex flex-col items-start lg:space-y-8 space-y-4 lg:my-8 lg:px-20'>
                <h1 className='lg:text-5xl text-3xl text-textBlack font-semi-bold leading-129'>{name}</h1>
                <div className='w-full h-full flex items-center justify-between'>
                    <BookingView />
                    <BookingChat />
                </div>
            </div>
        </DefaultLayout>
    )
}
