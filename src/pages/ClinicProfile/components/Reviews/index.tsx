import React from 'react'
import { clinicCardIcons, clinicReviewsIcons } from '../../../../assets'
import ProgressBar from './components/ProgressBar'

export const Reviews: React.FC = () => {
    return (
        <div className="min-w-full space-y-4">
            <div className='flex flex-col gap-2'>
                <div className='w-max flex flex-row items-end gap-2'>
                    <img className='h-14' src={clinicCardIcons.clinicStar} alt="star" />
                    <div className='flex items-end gap-2'>
                        <h1 className='text-5xl font-medium opacity-90'>4.5</h1>
                        <p className='text-2xl font-medium opacity-50'>/5</p>
                    </div>
                    <p className='ml-3 font-medium opacity-50'>( 750 reviews )</p>
                </div>
                <p className='font-medium opacity-90'>#6 of 250 in Toronto</p>
            </div>
            <div className='w-full flex py-3'>
                <div className='flex flex-col gap-3 w-1/4'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='opacity-90 font-medium'>Staff</p>
                        <ProgressBar percent={50} />
                    </div>
                    <div className='flex items-center w-full justify-between'>
                        <p className='opacity-90 font-medium'>Quality of treatment</p>
                        <ProgressBar percent={60} />
                    </div>
                    <div className='flex items-center w-full justify-between'>
                        <p className='opacity-90 font-medium'>Equipment</p>
                        <ProgressBar percent={30} />
                    </div>
                </div>
                <div className='flex justify-between w-2/4'>
                    <div className='flex flex-col items-center justify-between lg:px-10'>
                        <h1 className='w-max text-xl opacity-80 font-medium'>Staff</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.9</p>
                        <img src={clinicReviewsIcons.asclepius} alt="staff" />
                    </div>
                    <div className='flex flex-col items-center justify-between lg:px-10 border-x-2 border-black border-opacity-20'>
                        <h1 className='w-max text-xl opacity-80 font-medium'>Quality of treatment</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.8</p>
                        <img src={clinicReviewsIcons.tooth} alt="tooth" />
                    </div>
                    <div className='flex flex-col items-center justify-between lg:px-10'>
                        <h1 className='w-max text-xl opacity-80 font-medium'>Staff</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.9</p>
                        <img src={clinicReviewsIcons.asclepius} alt="staff" />
                    </div>
                </div>
            </div>
            <div className='space-y-8'>
                <div>
                    <h1>Reviews</h1>
                    <p>750 reviews</p>
                </div>
                <div className='flex flex-col border-b'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-semibold opacity-90'>Ulvi Mehdiyev</h1>
                        <div className='flex items-center gap-1'>
                            <img src={clinicReviewsIcons.verified} alt="verified" />
                            <p className='opacity-90 font-semibold'>Verified</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={clinicCardIcons.clinicStar} alt="star" />
                            <p className='opacity-50 font-semibold'>5.0</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 py-3'>
                        <p className='opacity-65'>
                            Lorem ipsum dolor sit amet consectetur. Et commodo egestas facilisis ut aliquam nibh turpis velit neque. Euismod sollicitudin auctor in egestas nunc adipiscing faucibus tristique interdum. Id tortor amet pellentesque enim. Viverra leo ultrices tortor lorem mattis risus sem.
                        </p>
                        <p className='opacity-50'>Posted 1 July,2024</p>
                    </div>
                </div>
                <div className='flex flex-col border-b'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-semibold opacity-90'>Ulvi Mehdiyev</h1>
                        <div className='flex items-center gap-1'>
                            <img src={clinicReviewsIcons.verified} alt="verified" />
                            <p className='opacity-90 font-semibold'>Verified</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={clinicCardIcons.clinicStar} alt="star" />
                            <p className='opacity-50 font-semibold'>5.0</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 py-3'>
                        <p className='opacity-65'>
                            Lorem ipsum dolor sit amet consectetur. Et commodo egestas facilisis ut aliquam nibh turpis velit neque. Euismod sollicitudin auctor in egestas nunc adipiscing faucibus tristique interdum. Id tortor amet pellentesque enim. Viverra leo ultrices tortor lorem mattis risus sem.
                        </p>
                        <p className='opacity-50'>Posted 1 July,2024</p>
                    </div>
                </div>
                <div className='flex flex-col border-b'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-semibold opacity-90'>Ulvi Mehdiyev</h1>
                        <div className='flex items-center gap-1'>
                            <img src={clinicReviewsIcons.verified} alt="verified" />
                            <p className='opacity-90 font-semibold'>Verified</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <img src={clinicCardIcons.clinicStar} alt="star" />
                            <p className='opacity-50 font-semibold'>5.0</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 py-3'>
                        <p className='opacity-65'>
                            Lorem ipsum dolor sit amet consectetur. Et commodo egestas facilisis ut aliquam nibh turpis velit neque. Euismod sollicitudin auctor in egestas nunc adipiscing faucibus tristique interdum. Id tortor amet pellentesque enim. Viverra leo ultrices tortor lorem mattis risus sem.
                        </p>
                        <p className='opacity-50'>Posted 1 July,2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
