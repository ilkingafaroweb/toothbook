import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { RouteProps } from '../../types';
import { welcome_img, welcome_img_desktop, benefitIcons, stepsIcons, location_icon } from '../../assets';
import { Button, ResponsiveImage, Metrics, Loading } from '../../components';
import { Benefits, InsurancePartners } from './components';
import { FeedbackCarousel } from './components/FeedbackCarousel';
import Steps from './components/Steps';
import { DefaultLayout } from '../../layouts';
import { useStepsContext } from '../../contexts';

export const Home: React.FC<RouteProps> = () => {

    const { resetData } = useStepsContext() 

    useEffect(() => {
        resetData()
    }, [])

    const insurances = [
        'https://images.toothbook.ca/src/assets/insurances/canadalife.png',
        'https://images.toothbook.ca/src/assets/insurances/manulife.png',
        'https://images.toothbook.ca/src/assets/insurances/sunlife.png',
        'https://images.toothbook.ca/src/assets/insurances/desjardins.png',
        'https://images.toothbook.ca/src/assets/insurances/bluecross.png',
        'https://images.toothbook.ca/src/assets/insurances/greenshield.png',
    ]

    const navigate = useNavigate();
    const { setStepsData } = useStepsContext()

    const [address, setAddress] = useState<string>('');
    const [coordinates, setCoordinates] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });

    useEffect(() => {
        {
            address && setStepsData((prev) => ({
                ...prev,
                address: address
            }))
            localStorage.setItem('your_address', address)
        }
    }, [address])

    useEffect(() => {
        if (coordinates.lat !== null && coordinates.lng !== null) {
            setStepsData((prev) => ({
                ...prev,
                longitude: coordinates.lng,
                latitude: coordinates.lat,
            }));
        }
    }, [coordinates]);


    const handleSelect = async (selectedAddress: string) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setAddress(selectedAddress);
            setCoordinates(latLng);

        } catch (error) {
            console.error('Error fetching geocode data: ', error);
        }
    };

    const handleNavigateServices = () => {
        if(!!coordinates.lat && !!coordinates.lng){
            navigate('/steps/giftcard')
            sessionStorage.setItem('loading', 'yes')
            sessionStorage.setItem('scrollClinics', 'yes')
        }
    }

    return (
        <DefaultLayout>
            <React.Fragment>
                {/* Welcome */}
                <div className='w-full centered'>
                    <div className='centered-between cover flex-col md:flex-row'>
                        <div className='lg:w-1/2 w-full centered flex-col space-y-6 lg:mb-36 mb-8'>
                            <div className='space-y-3 lg:max-w-[600px]'>
                                <p className='lg:text-5xl text-3xl text-black opacity-80 leading-129 font-bold'>
                                    Find and Book Your Perfect Dentist Near You
                                </p>
                                <p className='lg:text-xl text-lg text-black opacity-65'>
                                    Seamless booking for dental appointments with trusted professionals across Canada.
                                </p>
                            </div>
                            <div className='lg:centered lg:space-x-6 lg:space-y-0 lg:w-[600px] w-full lg:flex-row flex-col space-y-3'>
                                {/* Google Autocomplete Input */}
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                    searchOptions={{
                                        componentRestrictions: { country: 'CA' }
                                    }}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className='relative w-full'>
                                            <div className='flex items-center border border-gray-300 rounded-xl'>
                                                <img className='ml-2' src={location_icon} alt="location-icon" />
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Enter your location',
                                                        className: 'input-location rounded-xl p-2 w-full outline-none',
                                                    })}
                                                />
                                            </div>

                                            {/* Autocomplete Suggestions Dropdown */}
                                            <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                                                {loading && <div className="p-2 text-gray-500">
                                                    <Loading />
                                                </div>}

                                                {suggestions?.map((suggestion) => {
                                                    const className = suggestion.active
                                                        ? 'bg-gray-200 cursor-pointer p-2'
                                                        : 'bg-white cursor-pointer p-2 hover:bg-gray-100';

                                                    const style = {
                                                        backgroundColor: suggestion.active ? '#fafafa' : '#ffffff',
                                                        cursor: 'pointer',
                                                    };

                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <Button
                                    text='Find a dentist'
                                    color='bg-brandPrimary'
                                    size='w-full lg:w-max'
                                    disabled={!coordinates.lat && !coordinates.lng}
                                    onClick={handleNavigateServices}
                                />
                            </div>
                        </div>
                        <div className='lg:w-1/2 centered w-full'>
                            <ResponsiveImage
                                desktopSrc={welcome_img_desktop}
                                mobileSrc={welcome_img}
                                altText="welcome-image"
                            />
                        </div>
                    </div>
                </div>
                {/* Insurance Partners */}
                <InsurancePartners
                    topText='We accept all your dental plans '
                    icons={insurances}
                    bottomText='+30 more insurance plans'
                />
                {/* Metrics */}
                <Metrics
                    heading='Your Trusted Dental Partner: By the Numbers'
                    metrics={[{
                        metric: "65k+", text: 'Appointments Booked'
                    }, {
                        metric: "98%", text: 'Customer Satisfaction'
                    }, {
                        metric: "50k+", text: 'Happy Clients'
                    },
                    ]}
                />
                {/* Benefits */}
                <Benefits benefits={[{
                    icon: benefitIcons.time,
                    heading: 'Easy Booking',
                    paragraph: "Quickly and effortlessly book dental appointments online."
                }, {
                    icon: benefitIcons.rating,
                    heading: 'Top-Rated Clinics',
                    paragraph: "The platform highlights clinics with the best ratings, helping users choose high-quality care"
                }, {
                    icon: benefitIcons.location,
                    heading: 'Find Nearby',
                    paragraph: "Easily locate clinics close to your current location."
                }, {
                    icon: benefitIcons.preference,
                    heading: 'Match with Your Preferences',
                    paragraph: "Find clinics that align with your specific needs and preferences."
                }
                ]} />
                {/* Steps */}
                <Steps steps={[{
                    title: 'Sign up and create a profile',
                    paragraph: 'Add the minimum information about you, the service you want, and let us find the best match for you',
                    icon: stepsIcons.one
                }, {
                    title: 'Choose the Dentist',
                    paragraph: 'Select the best match based on your location and book instantly',
                    icon: stepsIcons.two
                }, {
                    title: 'Attend the Clinic',
                    paragraph: 'Use the services of the best dentist we matched you with',
                    icon: stepsIcons.three
                }, {
                    title: 'Get your award',
                    paragraph: 'If it is your first visit for particular clinic, you will be rewarded with a digital gift card',
                    icon: stepsIcons.four
                }, {
                    title: 'Smile',
                    paragraph: 'Enjoy your visit and get your reward.',
                    icon: stepsIcons.five
                },]} />
                <FeedbackCarousel />
            </React.Fragment>
        </DefaultLayout>
    );
};