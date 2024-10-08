import React, { useEffect, useState } from 'react'
import { RouteProps } from '../../types'
import { DefaultLayout } from '../../layouts'
import { useBooking, useClinicContext } from '../../contexts'
import { clinicCardIcons } from '../../assets'
import { Button } from '../../components'
import { About, Gallery } from './components'
import { Reviews } from './components/Reviews'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks'
import apiEndpoints from '../../apiEndpoints'

interface ClinicProfile {
    id: number;
    name: string;
    imageURL: string;
    address: string;
    phoneNumber: string
    mapURL: string;
    ratingStart: number;
    reviewsCount: number;
    insurance: boolean;
    reviews: Review[];
    about: About;
    gallery: string[];
    inlineTag: string;
    onTopTag: string;
}

interface Review {
    id: number;
    person: string;
    rate: number;
    date: string;
    comment: string;
}

interface About {
    interview: Interview;
    schedule: Schedule[];
    links: Links;
    standoutFeatures: string[];
    doctors: Doctor[];
    services: Services;
    longitude: number;
    latitude: number;
}

interface Interview {
    introduction: string;
    firstAnswer: string;
    secondAnswer: string;
}

interface Schedule {
    day: string;
    detail: string;
    isClosed: boolean;
}

interface Links {
    website: string | null;
    mapURL: string;
    googleProfile: string | null;
}

interface Doctor {
    name: string;
    rating: number;
    imageURL: string;
}

interface Services {
    services: string[];
    matchMessage: string;
}

export const ClinicProfile: React.FC<RouteProps> = ({ name }) => {

    const { clinicId } = useParams()
    const { openBooking } = useBooking();
    const logId = sessionStorage.getItem('clinicsLog')
    const { inlineTag, onTopTag } = useClinicContext()

    const [clinicProfile, setClinicProfile] = useState<ClinicProfile | null>(null);

    const { callApi, response } = useApi()

    useEffect(() => {
        callApi({
            endpoint: apiEndpoints.clinics.profile,
            params: {
                clinicId: clinicId,
                logId: logId,
                onTopTag: onTopTag,
                inlineTag: inlineTag
            }
        })
    }, [])

    useEffect(() => {
        {
            response && setClinicProfile(response)
            console.log("Clinic data: ", clinicProfile);
        }
    }, [response])

    const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'reviews'>('about')
    const handleTabChange = (tab: 'about' | 'gallery' | 'reviews') => {
        if (tab !== activeTab) {
            setActiveTab(tab)
        }
    }

    return (
        <DefaultLayout>
            <div className='flex flex-col space-y-8 my-6 lg:px-[5%]'>
                {clinicProfile?.onTopTag && (
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
                            <span className='lg:w-16 lg:h-16 w-12 h-12 border rounded-full'>
                                <img src={clinicProfile?.imageURL} alt={name} className="w-full object-cover rounded-full" />
                            </span>
                            <p className="lg:text-3xl text-xl opacity-85 font-semibold">{clinicProfile?.name}</p>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <div className='flex gap-2 items-center lg:w-max w-auto'>
                                <img src={clinicCardIcons.locationClinic} alt="location" />
                                <p className='opacity-65 lg:text-lg text-sm'>{clinicProfile?.address}</p>
                            </div>
                            <a
                                href={clinicProfile?.mapURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="lg:w-max w-1/2 lg:text-lg text-sm text-blue-500 font-semibold underline lg:ml-2 hover:text-blue-700 transition duration-200"
                            >
                                Show on map
                            </a>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <img src={clinicCardIcons.phone} alt="phone" />
                            <p className='opacity-65 lg:text-lg text-sm'>{clinicProfile?.phoneNumber}</p>
                        </div>
                        <div className='flex lg:flex-row flex-col gap-5 py-6'>
                            <div className='flex items-center gap-2'>
                                <span className='w-8 h-8 bg-blue-100 p-2 rounded-full'>
                                    <img src={clinicCardIcons.satisfaction} alt="top-rated-icon" />
                                </span>
                                <p className="text-blue-500 font-semibold lg:text-lg w-max text-sm">100% patient satisfaction</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='w-8 h-8 bg-blue-100 p-2 rounded-full'>
                                    <img src={clinicCardIcons.like} alt="top-rated-icon" />
                                </span>
                                <p className="text-blue-500 font-semibold lg:text-lg w-max text-sm">Best patient review</p>
                            </div>
                            {
                                clinicProfile?.insurance && <div className='flex items-center gap-2'>
                                    <span className='w-8 h-8 bg-green-50 p-2 rounded-full'>
                                        <img src={clinicCardIcons.accept} alt="top-rated-icon" />
                                    </span>
                                    <p className="text-green-500 font-medium lg:text-lg w-max text-sm">Accept your insurance</p>
                                </div>
                            }

                        </div>
                        {inlineTag &&  <div className='w-full lg:max-w-[800px] flex lg:flex-row flex-col items-center lg:gap-10 gap-4 p-3 border rounded-xl'>
                            <img
                                src={
                                    clinicProfile?.inlineTag === 'excellence'
                                        ? clinicCardIcons.profileExcellence
                                        : clinicProfile?.inlineTag === 'best'
                                            ? clinicCardIcons.profileBest
                                            : clinicProfile?.inlineTag === 'high'
                                                ? clinicCardIcons.profileRecommended : ''
                                }
                                alt="icon"
                            />
                            <div className='lg:w-2/5 w-full lg:px-0 px-5'>
                                <h1 className='lg:text-lg text-center text-xl opacity-90 font-semibold'>{
                                    clinicProfile?.inlineTag === 'excellence'
                                        ? 'Excellence in Patience Care'
                                        : clinicProfile?.inlineTag === 'best'
                                            ? 'Best Choice of the Month'
                                            : clinicProfile?.inlineTag === 'high'
                                                ? 'Highly recommended' : ''
                                }</h1>
                                <p className='font-medium opacity-90 lg:text-lg text-center text-sm'>One of the best on Toothbook, according to our patients</p>
                            </div>
                            <div className='mx-auto flex justify-center items-center gap-12'>
                                <div className='w-max flex lg:flex-col flex-row lg:gap-0 gap-3 items-center justify-center'>
                                    <h1 className='lg:text-2xl font-medium text-sm'>{clinicProfile?.ratingStart}</h1>
                                    <div>
                                        <img src={clinicCardIcons.clinicStar} alt="star" />
                                    </div>
                                </div>
                                <div className='lg:pl-8 pl-4 h-20 w-max flex items-center justify-center border-l-2'>
                                    <p className='opacity-65 font-medium'>( {clinicProfile?.reviewsCount} reviews )</p>
                                </div>
                            </div>

                        </div>}
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
                            onClick={() => {
                                openBooking(Number(clinicId));
                            }}
                        />
                    </div>
                </div>


                {/* Tabs Section with Sliding Black Border */}
                <div className="relative flex justify-start gap-4 border-b pt-8">
                    <span className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out 
                                        ${activeTab === 'about' ? 'left-0 lg:left-0' : ''}
                                        ${activeTab === 'gallery' ? 'left-1/3 lg:left-[144px]' : ''}
                                        ${activeTab === 'reviews' ? 'left-2/3 lg:left-[288px]' : ''} lg:w-32 w-1/3`}
                    />

                    <button
                        onClick={() => handleTabChange('about')}
                        className={`lg:w-32 w-1/3 pb-2 transition-opacity duration-300 relative lg:text-2xl ${activeTab === 'about' ? 'opacity-85' : 'opacity-40'} font-semibold`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleTabChange('gallery')}
                        className={`lg:w-32 w-1/3 pb-2 transition-opacity duration-300 relative lg:text-2xl ${activeTab === 'gallery' ? 'opacity-85' : 'opacity-40'} font-semibold`}
                    >
                        Gallery
                    </button>
                    <button
                        onClick={() => handleTabChange('reviews')}
                        className={`lg:w-32 w-1/3 pb-2 transition-opacity duration-300 relative lg:text-2xl ${activeTab === 'reviews' ? 'opacity-85' : 'opacity-40'} font-semibold`}
                    >
                        Reviews
                    </button>
                </div>

                {/* Content Section with Slide Transition */}
                <div className="overflow-hidden relative">
                    <div className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            // transform: `translateX(${activeTab === 'about' ? '0%' : activeTab === 'gallery' ? '-100%' : '-200%'})`
                        }}
                    >
                        {
                            activeTab === 'about' && <About about={clinicProfile?.about} />
                        }
                        {
                            activeTab === 'gallery' && <Gallery images={clinicProfile?.gallery} />

                        }
                        {
                            activeTab === 'reviews' && <Reviews reviews={clinicProfile?.reviews} ratingStart={clinicProfile?.ratingStart} />
                        }
                    </div>
                </div>

            </div>

        </DefaultLayout>
    )
}