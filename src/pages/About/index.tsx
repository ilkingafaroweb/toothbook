import React from 'react';
import { RouteProps } from 'react-router-dom';
import { OurTeam, WhyToohbook } from './components';
import { aboutImages } from '../../assets/images/pages/about';
import { DefaultLayout } from '../../layouts';

export const About: React.FC<RouteProps> = () => {
  return (
    <DefaultLayout>
      <React.Fragment>
        <div className='w-full flex flex-col lg:px-20 py-16 lg:space-y-0 space-y-12'>
          <div className='flex flex-col lg:space-y-0 space-y-14 lg:flex-row'>
            <div className='lg:w-3/5 w-full flex justify-start items-start'>
              <h1 className='text-black opacity-80 text-5xl font-semibold'>We Work for Your Smile</h1>
            </div>
            <div className='lg:w-2/5 w-full flex justify-start items-start'>
              <p className='text-xl text-black opacity-65'>At ToothBook, we’re revolutionizing the way you manage your dental care. Our platform is dedicated to making the process simple, convenient, and personalized for every patient. Whether it’s your routine check-up or an emergency, ToothBook is here to connect you with top-rated dental professionals.</p>
            </div>
          </div>
          <div className='flex flex-col lg:py-16 gap-6'>
            <h1 className='text-black opacity-80 text-4xl font-semibold'>Our Mission</h1>
            <p className='text-xl text-black opacity-65'>ToothBook.ca is committed to enhancing your dental experience through accessibility, transparency, and top-quality care. We're here to streamline your oral health journey.</p>
          </div>
        </div>
        <WhyToohbook benefits={[{
          icon: aboutImages.one,
          heading: 'Convenient Online Booking',
          paragraph: "Skip the hassle of phone calls. Our intuitive platform lets you book your dental appointments effortlessly from anywhere."
        }, {
          icon: aboutImages.two,
          heading: 'Nationwide Network of Trusted Dentists',
          paragraph: "We partner with certified dental professionals across the country, ensuring you receive high-quality care, no matter where you are."
        }, {
          icon: aboutImages.three,
          heading: 'Transparency & Trust',
          paragraph: "We provide detailed clinic profiles, patient reviews, and service listings, allowing you to make informed choices about your dental provider."
        }, {
          icon: aboutImages.four,
          heading: 'Appointment Reminders',
          paragraph: "Stay on track with automated email reminders so you never miss a visit."
        }
        ]} />
        <OurTeam />
      </React.Fragment>
    </DefaultLayout>

  );
};