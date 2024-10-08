import React from 'react'
import { clinicAboutIcons, clinicCardIcons } from '../../../../assets'
import { GoogleMap, Marker } from '@react-google-maps/api'


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

interface AboutProps {
    about?: {
        interview: Interview;
        schedule: Schedule[];
        links: Links;
        standoutFeatures: string[];
        doctors: Doctor[];
        services: Services | undefined;
        longitude: number | undefined;
        latitude: number | undefined;
    };
}


export const About: React.FC<AboutProps> = ({ about }) => {

    type FeatureDetails = {
        title: string;
        description: string;
        bgColor: string;
        imgSize: string;
    };

    const featuresMapping: Record<string, FeatureDetails> = {
        state: {
            title: 'State-of-the-Art Technology',
            description: 'Experience the latest advancements in dental care with cutting-edge technology.',
            bgColor: 'red-400',
            imgSize: '12',
        },
        access: {
            title: 'Accessibility',
            description: 'Our facility is fully accessible, ensuring a comfortable visit for individuals with disabilities.',
            bgColor: 'orange-400',
            imgSize: '14',
        },
        language: {
            title: 'Language Support',
            description: 'Multi-lingual staff or translators available',
            bgColor: 'blue-400',
            imgSize: '6',
        },
        anxiety: {
            title: 'Dental anxiety friendly',
            description: 'Our clinic is designed to provide a calming environment, easing dental anxiety for all patients.',
            bgColor: 'pink-400',
            imgSize: '12',
        },
        family: {
            title: 'Family-Friendly',
            description: 'We offer a welcoming atmosphere with specialized care for children and services tailored to the needs of your entire family.',
            bgColor: 'purple-400',
            imgSize: '20',
        },
    };

    const { interview, schedule, links, standoutFeatures, doctors, services } = about || {};


    const midIndex = Math.ceil((services?.services?.length ?? 0) / 2);
    const firstHalf = services?.services.slice(0, midIndex);
    const secondHalf = services?.services.slice(midIndex);

    return (
        <div className="min-w-full">
            <div className='flex flex-col gap-12'>
                <div className="w-full flex lg:flex-row items-center lg:text-left text-center flex-col gap-3 rounded-lg border border-black border-opacity-30 p-3">
                    <img src={clinicAboutIcons.aboutSatisfaction} alt="satisfaction-icon" />
                    <div className='flex flex-col items-start justify-center gap-3'>
                        <h1 className='text-2xl opacity-80 font-semibold'>100% Satisfaction Guaranteed</h1>
                        <p>Your smile is our top priority. We guarantee exceptional dental care and personalized service to ensure you leave our clinic completely satisfied. Experience the difference today!</p>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl opacity-80 font-semibold'>Standout features</h1>
                    <div className='w-full flex lg:flex-row flex-col flex-wrap py-6 gap-5'>
                        {standoutFeatures?.map((feature, index) => {
                            const featureDetails = featuresMapping[feature]; 
                            if (featureDetails) { 
                                return (
                                    <div key={index} className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                                        <div className={`bg-${featureDetails.bgColor} w-max p-3 rounded-full`}>
                                            <img className={`w-${featureDetails.imgSize}`} src={clinicAboutIcons.state} alt={feature} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <h1 className='text-lg font-semibold'>{featureDetails.title}</h1>
                                            <p className='opacity-65'>{featureDetails.description}</p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-6 py-6'>
                <div className='flex lg:flex-row flex-col-reverse justify-between gap-6'>
                    <div className='lg:w-1/2 flex flex-col justify-between lg:gap-0 gap-8'>
                        <p className='opacity-85'>{interview?.introduction}</p>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-semibold'>What makes you different from other clinics?</h1>
                            <p className='opacity-85'>{interview?.firstAnswer}</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-semibold'>List the top 3 criteria of your success</h1>
                            <p className='opacity-85'>{interview?.secondAnswer}</p>
                        </div>
                    </div>
                    <GoogleMap
                        center={{ lat: about?.latitude || 0, lng: about?.longitude || 0 }}
                        zoom={12}
                        mapContainerClassName='rounded-xl lg:h-[320px] lg:w-[45%] w-full h-96'
                    >
                        <Marker
                            position={{ lat: about?.latitude || 0, lng: about?.longitude || 0 }}
                            icon={{
                                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                         <path fill="#FF6F61" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                       </svg>
                                     `),
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                        />
                    </GoogleMap>
                </div>
                <div className='flex lg:flex-row flex-col lg:gap-16 gap-6 my-6'>
                    <div className='lg:w-2/6 flex flex-col gap-2'>
                        <h1 className='opacity-65 text-2xl font-semibold'>Working Hours</h1>
                        <span className='border-b w-full'></span>
                        <div className='flex gap-8 py-4'>
                            <div className='flex flex-col gap-4'>
                                {schedule?.map((sch, index) => (
                                    <p className='opacity-70' key={index}>{sch.day}</p>
                                ))}
                            </div>
                            <div className='flex flex-col gap-4'>
                                {schedule?.map((sch, index) => (
                                    <p key={index} className={sch.isClosed ? 'text-accentColor' : 'text-brandPrimary'}>
                                        {sch.isClosed ? 'CLOSED' : sch.detail}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/6 flex flex-col gap-2'>
                        <h1 className='opacity-65 text-2xl font-semibold'>Link</h1>
                        <span className='border-b w-full'></span>
                        <div className='flex flex-col py-4 gap-4'>
                            <a target='_blank' href={links?.website || undefined} className='flex gap-3 opacity-75'>
                                <img src={clinicAboutIcons.websiteLink} alt="website" />
                                <p>Website</p>
                            </a>
                            <a target='_blank' href={links?.mapURL || undefined} className='flex gap-3 opacity-75'>
                                <img src={clinicAboutIcons.locationLink} alt="location" />
                                <p>Show on map</p>
                            </a>
                            <a target='_blank' href={links?.googleProfile || undefined} className='flex gap-3 opacity-75'>
                                <img src={clinicAboutIcons.googleLink} alt="google" />
                                <p>Google Profile</p>
                            </a>
                        </div>
                    </div>
                    <div className='lg:w-3/6 flex flex-col gap-2'>
                        <h1 className='opacity-65 text-2xl font-semibold'>Good to know</h1>
                        <span className='border-b w-full'></span>
                        <p className='py-4 opacity-70 text-black'>Languages: <span className='opacity-90 font-semibold'>English, French</span></p>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-2xl opacity-80 font-semibold mb-2'>Services</h1>
                        <span className='border-b-2 w-full'></span>
                    </div>
                    <div className="flex flex-wrap lg:flex-row flex-col">
                        <div className="w-1/2">
                            {firstHalf?.map((service, index) => (
                                <p key={index} className="opacity-90 font-medium">
                                    {service}
                                </p>
                            ))}
                        </div>
                        <div className="w-1/2">
                            {secondHalf?.map((service, index) => (
                                <p key={index} className="opacity-90 font-medium">
                                    {service}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col w-full'>
                        <h1 className='text-2xl opacity-80 font-semibold mb-2'>Doctors</h1>
                        <span className='border-b-2 w-full'></span>
                    </div>
                    <div className="flex flex-wrap lg:-mx-2">
                        {doctors?.map((doctor, index) => (
                            <div
                                key={index}
                                className="flex items-center border rounded-lg lg:w-[calc(33.33333%-1rem)] w-full lg:mx-2 mb-4 p-2 gap-2"
                            >
                                <img src={doctor.imageURL} alt={doctor.name} className="w-16 h-16 rounded-full border" />
                                <div className="p-4 flex flex-col gap-1">
                                    <h1 className="text-lg font-semibold">{doctor.name}</h1>
                                    <div className='flex items-center gap-2'>
                                        <img src={clinicCardIcons.clinicStar} alt="" />
                                        <p className="text-sm text-gray-600">{doctor.rating}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}