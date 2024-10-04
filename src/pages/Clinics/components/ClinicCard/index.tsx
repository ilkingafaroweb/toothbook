import React from 'react';
import { clinicCardIcons } from '../../../../assets';
import { Button } from '../../../../components';

interface ClinicCardProps {
    name: string;
    rating: number;
    reviews: number;
    address: string;
    distance: number;
    phone: string;
    insurance?: boolean;
    bookingCount: number;
    mapLink: string;
    imageURL: string;
    excellence?: boolean;
    topRated?: boolean;
    recommended?: boolean;
    best?: boolean
}

export const ClinicCard: React.FC<ClinicCardProps> = ({
    name,
    rating,
    reviews,
    address,
    distance,
    phone,
    insurance = false,
    bookingCount,
    mapLink,
    imageURL,
    excellence = false,
    topRated = false,
    recommended = false,
    best = false
}) => {
    return (
        <div className="lg:w-[32%] flex flex-col justify-between clinic-card border border-opacity-20 p-3 space-y-3 rounded-xl ">

            {
                topRated && <div className='py-2 px-3 flex items-center justify-start gap-3'>
                    <span className='w-8 h-8 bg-accentColor bg-opacity-20 p-2 rounded-full'>
                        <img src={clinicCardIcons.topRated} alt="top-rated-icon" />
                    </span>
                    <p className="top-rated text-accentColor font-semibold">TOP RATED</p>
                </div>
            }


            <div className='space-y-2 pb-6'>
                <div className='py-2 flex items-center justify-start gap-3'>
                    <span className='w-16 h-16 border rounded-full'>
                        <img src={imageURL} alt={name} className="w-16 object-cover rounded-full" />
                    </span>
                    <p className="text-xl font-semibold">{name.toLocaleUpperCase()}</p>
                </div>
                <div className='flex gap-2'>
                    <img src={clinicCardIcons.clinicStar} alt="clinic-star" />
                    <p>{rating}</p>
                    <p className='text-black opacity-40'> ({reviews} reviews)</p>
                </div>
                {excellence && <div className="flex gap-2 bg-accentColor bg-opacity-20 w-max px-2 py-1 rounded-xl">
                    <img src={clinicCardIcons.excellence} alt="excellence-icon" />
                    <p className='text-accentColor font-semibold'>Excellence in Patience Care</p>
                </div>}
                {recommended && <div className="flex gap-2 bg-accentColor bg-opacity-20 w-max px-2 py-1 rounded-xl">
                    <img src={clinicCardIcons.recommended} alt="recommended-icon" />
                    <p className='text-accentColor font-semibold'>Highly recommended</p>
                </div>}
                {best && <div className="flex gap-2 bg-accentColor bg-opacity-20 w-max px-2 py-1 rounded-xl">
                    <img src={clinicCardIcons.best} alt="best-icon" />
                    <p className='text-accentColor font-semibold'>Best Choice of the Month</p>
                </div>}
                <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                    <img src={clinicCardIcons.locationClinic} alt="location" />
                    <p className='opacity-65'>{address}</p>
                </div>
                <div className="flex items-center justify-start">
                    <div className='flex gap-2 bg-opacity-20 w-1/2 rounded-xl'>
                        <img src={clinicCardIcons.distance} alt="distance" />
                        <p className='opacity-65 font-semibold'>{distance} km away</p>
                    </div>
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline ml-2 hover:text-blue-700 transition duration-200"
                    >
                        Show on map
                    </a>
                </div>
                <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                    <img src={clinicCardIcons.phone} alt="phone" />
                    <p className='opacity-65'>{phone}</p>
                </div>
                {
                    insurance && <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                        <img src={clinicCardIcons.accept} alt="accept" />
                        <p className='text-clinicSuccess'>Accepts your insurance</p>
                    </div>
                }
            </div>
            <div className='space-y-3'>
                <div className="flex gap-2 px-3 bg-opacity-20 w-full rounded-xl">
                    <img src={clinicCardIcons.stonks} alt="stonks" />
                    <p className='text-accentColor font-semibold text-sm'>Booked by {bookingCount} people in the past 30 days</p>
                </div>
                <Button
                    text='Book now'
                    color='bg-brandPrimary'
                    size='w-full'
                />
            </div>
        </div>
    );
};
