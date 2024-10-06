import React from 'react'
import { clinicCardIcons, clinicReviewsIcons } from '../../../../assets'
import ProgressBar from './components/ProgressBar'

interface Review {
    id: number;
    person: string;
    rate: number;
    date: string;
    comment: string;
}

interface ReviewsProps {
    reviews?: Review[];
    ratingStart?: number
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, ratingStart }) => {
    return (
        <div className="min-w-full space-y-4">
            <div className='flex flex-col gap-2'>
                <div className='w-max flex flex-row items-end gap-2'>
                    <img className='h-14' src={clinicCardIcons.clinicStar} alt="star" />
                    <div className='flex items-end gap-2'>
                        <h1 className='text-5xl font-medium opacity-90'>{ratingStart}</h1>
                        <p className='text-2xl font-medium opacity-50'>/5</p>
                    </div>
                    <p className='ml-3 font-medium opacity-50'>( {reviews?.length} reviews )</p>
                </div>
                <p className='font-medium opacity-90'>#6 of 250 in Toronto</p>
            </div>
            <div className='w-full flex lg:flex-row flex-col py-3'>
                <div className='flex flex-col gap-3 lg:w-1/4'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='opacity-90 font-medium'>Staff</p>
                        <ProgressBar percent={98} />
                    </div>
                    <div className='flex items-center w-full justify-between'>
                        <p className='opacity-90 font-medium'>Quality of treatment</p>
                        <ProgressBar percent={90} />
                    </div>
                    <div className='flex items-center w-full justify-between'>
                        <p className='opacity-90 font-medium'>Equipment</p>
                        <ProgressBar percent={86} />
                    </div>
                </div>
                <div className='w-full flex justify-between lg:w-2/4 lg:py-0 py-6'>
                    <div className='w-1/5 flex flex-col items-center justify-between lg:px-10'>
                        <h1 className='lg:w-max text-center lg:text-xl opacity-80 font-medium'>Staff</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.9</p>
                        <img src={clinicReviewsIcons.asclepius} alt="staff" />
                    </div>
                    <div className='w-2/5 flex flex-col items-center justify-between lg:px-10 border-x-2 border-black border-opacity-20'>
                        <h1 className='lg:w-max text-center lg:text-xl opacity-80 font-medium'>Quality of treatment</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.8</p>
                        <img src={clinicReviewsIcons.tooth} alt="tooth" />
                    </div>
                    <div className='w-2/5 flex flex-col items-center justify-between lg:px-10'>
                        <h1 className='lg:w-max text-center lg:text-xl opacity-80 font-medium'>Equipment</h1>
                        <p className='text-xl opacity-80 font-semibold'>4.6</p>
                        <img src={clinicReviewsIcons.starFour} alt="staff" />
                    </div>
                </div>
            </div>
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-semibold opacity-90'>Reviews</h1>
                    <p className='font-medium opacity-65'>{reviews?.length} reviews</p>
                </div>
                {
                    reviews?.map((review, index) => (
                        <div className='flex flex-col border-b' key={index}>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-semibold opacity-90'>{review.person}</h1>
                                <div className='flex items-center gap-1'>
                                    <img src={clinicReviewsIcons.verified} alt="verified" />
                                    <p className='opacity-90 font-semibold'>Verified</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={clinicCardIcons.clinicStar} alt="star" />
                                    <p className='opacity-50 font-semibold'>{review.rate}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 py-3'>
                                <p className='opacity-65'>
                                   {review.comment}
                                </p>
                                <p className='opacity-50'>{review.date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
