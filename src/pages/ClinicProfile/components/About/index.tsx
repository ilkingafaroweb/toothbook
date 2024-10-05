import React from 'react'
import { clinicAboutIcons, clinicCardIcons } from '../../../../assets'
import { GoogleMap, Marker } from '@react-google-maps/api'

export const About: React.FC = () => {

    const long = 49.8402033
    const lat = 40.4047907

    const services = [
        "Bonding",
        "Bridges / Dentures",
        "Checkup & Cleaning",
        "Crown / Cap",
        "Filling",
        "Gum Surgery",
        "Implants",
        "Nitrous Sedation",
        "Root Canal",
        "Sleep Apnea",
        "TMJ",
        "Tooth Extraction",
        "Urgent Issue",
        "Veneers",
        "Whitening",
        "Wisdom Teeth Removal"
    ];

    const doctors = [
        {
          name: "Dr. Leyla Aliyeva",
          rate: "4.8",
          imageURL: "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp"
        },
        {
          name: "Dr. Murad Həsənov",
          rate: "4.7",
          imageURL: "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp"
        },
        {
          name: "Dr. Nigar Məhəmmədova",
          rate: "4.9",
          imageURL: "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp"
        },
        {
          name: "Dr. Elvin İsmayılov",
          rate: "4.6",
          imageURL: "https://www.asirox.com/wp-content/uploads/2022/07/depositphotos_90647730-stock-illustration-female-doctor-avatar-icon.webp"
        }
      ];
      

    const midIndex = Math.ceil(services.length / 2);
    const firstHalf = services.slice(0, midIndex);
    const secondHalf = services.slice(midIndex);

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
                        <div className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                            <div className='bg-red-400 w-max p-3 rounded-full'>
                                <img className='w-12' src={clinicAboutIcons.state} alt="state" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>State-of-the-Art Technology</h1>
                                <p className='opacity-65'>Experience the latest advancements in dental care with cutting-edge technology.</p>
                            </div>
                        </div>
                        <div className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                            <div className='bg-blue-400 w-max p-3 rounded-full'>
                                <img className='w-6' src={clinicAboutIcons.lang} alt="lang" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Language Support</h1>
                                <p className='opacity-65'>Multi-lingual staff or translators available</p>
                            </div>
                        </div>
                        <div className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                            <div className='bg-purple-400 w-max p-3 rounded-full'>
                                <img className='w-20' src={clinicAboutIcons.family} alt="family" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Family-Friendly</h1>
                                <p className='opacity-65'>We offer a welcoming atmosphere with specialized care for children and services tailored to the needs of your entire family.</p>
                            </div>
                        </div>
                        <div className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                            <div className='bg-orange-400 w-max p-3 rounded-full'>
                                <img className='w-14' src={clinicAboutIcons.accessibility} alt="accessibility" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Accessibility</h1>
                                <p className='opacity-65'>Our facility is fully accessible, ensuring a comfortable visit for individuals with disabilities.</p>
                            </div>
                        </div>
                        <div className='lg:w-[calc(30%)] w-full flex flex-row items-start gap-3'>
                            <div className='bg-pink-400 w-max p-3 rounded-full'>
                                <img className='w-12' src={clinicAboutIcons.anxiety} alt="anxiety" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Dental anxiety friendly</h1>
                                <p className='opacity-65'>Our clinic is designed to provide a calming environment, easing dental anxiety for all patients.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-6 py-6'>
                <div className='flex lg:flex-row flex-col-reverse justify-between gap-6'>
                    <div className='lg:w-1/2 flex flex-col justify-between lg:gap-0 gap-8'>
                        <p className='opacity-85'>We offer family and cosmetic dentistry, braces, wisdom teeth extractions and in office whitening. Our Services are Offered In English, Punjabi, Hindi & Farsi. Walk-Ins & Emergencies Are Always Welcome. Weekend & Late Night Appointments are Available</p>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-semibold'>What makes you different from other clinics?</h1>
                            <p className='opacity-85'>We offer special discounts for students and clients with no dental coverage. Payment Plans Available</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-semibold'>List the top 3 criteria of your success</h1>
                            <p className='opacity-85'>Patient care Friendly staff Special discounts</p>
                        </div>
                    </div>
                    <GoogleMap
                        center={{ lat: lat, lng: long }}
                        zoom={12}
                        mapContainerClassName='rounded-xl lg:h-[320px] lg:w-[45%] w-full h-96'
                    >
                        <Marker
                            position={{ lat: lat, lng: long }}
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
                                <p>Monday</p>
                                <p>Tuesday</p>
                                <p>Wednesday</p>
                                <p>Thursday</p>
                                <p>Friday</p>
                                <p>Saturday</p>
                                <p>Sunday</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                                <p className='text-accentColor'>CLOSED</p>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                                <p className='text-brandPrimary'>10:00 am  /  06:00 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/6 flex flex-col gap-2'>
                        <h1 className='opacity-65 text-2xl font-semibold'>Link</h1>
                        <span className='border-b w-full'></span>
                        <div className='flex flex-col py-4 gap-4'>
                            <a href='' className='flex gap-3 opacity-75'>
                                <img src={clinicAboutIcons.websiteLink} alt="website" />
                                <p>Website</p>
                            </a>
                            <a href='' className='flex gap-3 opacity-75'>
                                <img src={clinicAboutIcons.locationLink} alt="location" />
                                <p>Show on map</p>
                            </a>
                            <a href='' className='flex gap-3 opacity-75'>
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
                            {firstHalf.map((service, index) => (
                                <p key={index} className="opacity-90 font-medium">
                                    {service}
                                </p>
                            ))}
                        </div>
                        <div className="w-1/2">
                            {secondHalf.map((service, index) => (
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
                        {doctors.map((doctor, index) => (
                            <div
                                key={index}
                                className="flex items-center border rounded-lg lg:w-[calc(33.33333%-1rem)] w-full lg:mx-2 mb-4 p-2 gap-2"
                            >
                                <img src={doctor.imageURL} alt={doctor.name} className="w-16 h-16 rounded-full border" />
                                <div className="p-4 flex flex-col gap-1">
                                    <h1 className="text-lg font-semibold">{doctor.name}</h1>
                                    <div className='flex items-center gap-2'>
                                        <img src={clinicCardIcons.clinicStar} alt="" />
                                        <p className="text-sm text-gray-600">{doctor.rate}</p>
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