import React, { useState } from 'react'
import { RouteProps } from '../../types'
import { DefaultLayout } from '../../layouts'
import { useClinicContext } from '../../contexts'
import { clinicCardIcons } from '../../assets'
import { Button } from '../../components'
import { About, Gallery } from './components'
import { ErrorBoundary } from '../../components/error'

export const ClinicProfile: React.FC<RouteProps> = ({ name }) => {

    const { inlineTag, onTopTag } = useClinicContext()

    const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'reviews'>('about')

    const handleTabChange = (tab: 'about' | 'gallery' | 'reviews') => {
        if (tab !== activeTab) {
            setActiveTab(tab)
        }
    }

    const images: string[] = [
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ];


    return (
        <DefaultLayout>
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
                            <span className='lg:w-16 lg:h-16 w-12 h-12 border rounded-full'>
                                <img src={clinicCardIcons.clinicStar} alt={name} className="w-full object-cover rounded-full" />
                            </span>
                            <p className="lg:text-3xl text-xl opacity-85 font-semibold">CITY SOUTH DENTAL clinic</p>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <div className='flex gap-2 items-center lg:w-max w-auto'>
                                <img src={clinicCardIcons.locationClinic} alt="location" />
                                <p className='opacity-65 lg:text-lg text-sm'>374 Kerr St, Oakville, ON L6K 3B8, Canada</p>
                            </div>
                            <a
                                href=''
                                target="_blank"
                                rel="noopener noreferrer"
                                className="lg:w-max w-1/2 lg:text-lg text-sm text-blue-500 font-semibold underline lg:ml-2 hover:text-blue-700 transition duration-200"
                            >
                                Show on map
                            </a>
                        </div>
                        <div className="flex gap-2 bg-opacity-20 w-full rounded-xl">
                            <img src={clinicCardIcons.phone} alt="phone" />
                            <p className='opacity-65 lg:text-lg text-sm'>905-844-0006</p>
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
                            <div className='flex items-center gap-2'>
                                <span className='w-8 h-8 bg-green-50 p-2 rounded-full'>
                                    <img src={clinicCardIcons.accept} alt="top-rated-icon" />
                                </span>
                                <p className="text-green-500 font-medium lg:text-lg w-max text-sm">Accept your insurance</p>
                            </div>
                        </div>
                        <div className='w-full lg:max-w-[800px] flex lg:flex-row flex-col items-center lg:gap-10 gap-4 p-3 border rounded-xl'>
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
                            <div className='lg:w-2/5 w-full lg:px-0 px-5'>
                                <h1 className='lg:text-lg text-center text-xl opacity-90 font-semibold'>{
                                    inlineTag === 'excellence'
                                        ? 'Excellence in Patience Care'
                                        : inlineTag === 'best'
                                            ? 'Best Choice of the Month'
                                            : inlineTag === 'high'
                                                ? 'Highly recommended' : ''
                                }</h1>
                                <p className='font-medium opacity-90 lg:text-lg text-center text-sm'>One of the best on Toothbook, according to our patients</p>
                            </div>
                            <div className='mx-auto flex justify-center items-center gap-12'>
                                <div className='w-max flex lg:flex-col flex-row lg:gap-0 gap-3 items-center justify-center'>
                                    <h1 className='lg:text-2xl font-medium text-sm'>4.5</h1>
                                    <div>
                                        <img src={clinicCardIcons.clinicStar} alt="star" />
                                    </div>
                                </div>
                                <div className='lg:pl-8 pl-4 h-20 w-max flex items-center justify-center border-l-2'>
                                    <p className='opacity-65 font-medium'>( 750 reviews )</p>
                                </div>
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
                            transform: `translateX(${activeTab === 'about' ? '0%' : activeTab === 'gallery' ? '-100%' : '-200%'})`
                        }}
                    >
                        {/* About Section */}
                        <About />

                        {/* Gallery Section */}
                        <ErrorBoundary>
                            <Gallery images={images} />
                        </ErrorBoundary>

                        {/* Reviews Section */}
                        <div className="min-w-full">
                            <div className="px-6">
                                <h2>Reviews Content</h2>
                                <p>This is the Reviews tab content.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </DefaultLayout>
    )
}