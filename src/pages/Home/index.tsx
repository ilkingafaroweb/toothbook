import React from 'react';
import { RouteProps } from '../../types';
import { location_icon, welcome_img, welcome_img_desktop, InsurancePartnersIcons, benefitIcons, stepsIcons } from '../../assets';
import { Button, Input, ResponsiveImage, Metrics } from '../../components';
import { Benefits, InsurancePartners } from './components';
import { FeedbackCarousel } from './components/FeedbackCarousel';
import Steps from './components/Steps';

export const Home: React.FC<RouteProps> = () => {
    return (
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
                            <Input
                                icon={location_icon}
                                placeholder='Enter your location'
                                isValid={true}
                            />
                            <Button
                                text='Find a dentist'
                                color='bg-brandPrimary'
                                size='w-full lg:w-max'
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
                icons={InsurancePartnersIcons}
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
    );
};