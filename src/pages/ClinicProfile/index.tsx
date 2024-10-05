import React from 'react'
import { RouteProps } from '../../types'
import { DefaultLayout } from '../../layouts'
import { useClinicContext } from '../../contexts'
import { clinicCardIcons } from '../../assets'
import { Button } from '../../components'

export const ClinicProfile: React.FC<RouteProps> = ({ name }) => {

    const { inlineTag, onTopTag } = useClinicContext()

    return (
        <DefaultLayout>
            {/* <h1>{name}</h1>
            <p>{inlineTag}</p>
            <p>{onTopTag}</p> */}
            <div className='flex flex-col space-y-8 my-6 lg:px-[5%]'>
                {!!onTopTag && (
                    <div className='flex items-center gap-2'>
                        <span className='w-8 h-8 bg-accentColor bg-opacity-20 p-2 rounded-full'>
                            <img src={clinicCardIcons.topRated} alt="top-rated-icon" />
                        </span>
                        <p className="top-rated text-accentColor font-semibold">TOP RATED</p>
                    </div>
                )}
                <div className='flex justify-between'>
                    <div className='flex flex-col space-y-4'>
                        <div className='py-2 flex items-center justify-start gap-3'>
                            <span className='w-16 h-16 border rounded-full'>
                                <img src={clinicCardIcons.clinicStar} alt={name} className="w-16 object-cover rounded-full" />
                            </span>
                            <p className="text-3xl opacity-85 font-semibold">CITY SOUTH DENTAL clinic</p>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <img src={clinicCardIcons.locationClinic} alt="location" />
                            <p className='opacity-65'>374 Kerr St, Oakville, ON L6K 3B8, Canada</p>
                            <a
                                href=''
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 font-semibold underline ml-2 hover:text-blue-700 transition duration-200"
                            >
                                Show on map
                            </a>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <img src={clinicCardIcons.phone} alt="phone" />
                            <p className='opacity-65'>905-844-0006</p>
                        </div>
                        <div className='flex gap-5 py-6'>
                            <div className='flex lg:flex-row flex-col items-center gap-2'>
                                <span className='w-8 h-8 bg-blue-100 p-2 rounded-full'>
                                    <img src={clinicCardIcons.satisfaction} alt="top-rated-icon" />
                                </span>
                                <p className="text-blue-500 font-semibold">100% patient satisfaction</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='w-8 h-8 bg-blue-100 p-2 rounded-full'>
                                    <img src={clinicCardIcons.like} alt="top-rated-icon" />
                                </span>
                                <p className="text-blue-500 font-semibold">Best patient review</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='w-8 h-8 bg-green-50 p-2 rounded-full'>
                                    <img src={clinicCardIcons.accept} alt="top-rated-icon" />
                                </span>
                                <p className="text-green-500 font-medium">Accept your insurance</p>
                            </div>
                        </div>
                        <div className='w-full lg:max-w-[800px] flex items-center gap-10 p-3 border rounded-xl'>
                            <img
                                src={
                                    inlineTag === 'excellence'
                                        ? clinicCardIcons.profileExcellence
                                        : inlineTag === 'best'
                                            ? clinicCardIcons.profileBest
                                            : inlineTag === 'high'
                                                ? clinicCardIcons.profileRecommended : ''
                                }
                                alt="icon"
                            />
                            <div className='w-2/5'>
                                <h1 className='text-lg opacity-90 font-semibold'>{
                                    inlineTag === 'excellence' 
                                        ? 'Excellence in Patience Care' 
                                        : inlineTag === 'best' 
                                            ? 'Best Choice of the Month' 
                                            : inlineTag === 'high'
                                                ? 'Highly recommended' : ''
                                }</h1>
                                <p className='font-medium opacity-90'>One of the best on Toothbook, according to our patients</p>
                            </div>
                            <div className='w-max flex flex-col items-center justify-center'>
                                <h1 className='text-2xl font-medium'>4.5</h1>
                                <div>
                                    <img src={clinicCardIcons.clinicStar} alt="star" />
                                </div>
                            </div>
                            <div className='w-1/5 h-full flex items-center justify-center border-l-2'>
                                <p>( 750 reviews )</p>
                            </div>
                        </div>
                    </div>
                    <div className='hidden lg:flex flex-col w-max gap-2'>
                        <div className='w-max flex px-3 py-2 rounded-xl bg-accentColor text-accentColor bg-opacity-20 gap-3'>
                            <img src={clinicCardIcons.gift} alt="gift-icon" />
                            <p className="w-max top-rated text-accentColor font-medium">Get a $50 Gift Card through Toothbook</p>
                        </div>
                        <Button
                            text='Book now'
                            color='bg-brandPrimary'
                            size='w-full'
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}