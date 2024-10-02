import React from 'react';
import { RouteProps } from 'react-router-dom';
import { Metrics, ResponsiveImage } from '../../components';
import { partners_desktop } from '../../assets/images/pages/partners';
import { FeedbackCarousel, HowToPartner, MoreFutures, PartnerForm } from './components';

export const ClinicPartners: React.FC<RouteProps> = () => {
  return (
    <React.Fragment>
      {/* Welcome */}
      <div className='w-full centered lg:px-16'>
        <div className='centered-between cover flex-col md:flex-row mb-16 gap-8'>
          <div className='lg:w-1/2 centered w-full'>
            <ResponsiveImage
              desktopSrc={partners_desktop}
              mobileSrc={partners_desktop}
              altText="welcome-image"
            />
          </div>
          <div className='lg:w-1/2 w-full centered flex-col space-y-6 mb-8'>
            <PartnerForm />
          </div>
        </div>
      </div>
      <Metrics
        metrics={[{
          metric: "10+", text: 'Successful Patient Matches By Our Top Clinics'
        }, {
          metric: "30%", text: 'Increased Patient Reach'
        }, {
          metric: "100+", text: 'Reviews after 1 year'
        },
        ]}
      />
      <HowToPartner
        steps={[
          {
            title: 'Register Your Clinic',
            content: 'Sign up with your clinic details and create your profile.'
          },
          {
            title: 'Get Verified',
            content: 'We verify your credentials to maintain quality and trust.'
          },
          {
            title: 'Tailor Your Profile',
            content: 'Customize your services and availability to attract clients who are the perfect match for your practice.'
          },
          {
            title: 'Manage Bookings Easily',
            content: 'Receive and manage appointments through our intuitive dashboard.'
          },
          {
            title: 'Grow with the Right Clients',
            content: 'ToothBook helps connect you with clients seeking the specific dental services you offer, ensuring a great match for both parties.'
          },
        ]}
      />
      <MoreFutures
        features={[
          {
            title: "Streamlined Patient Matching",
            description: "We match your clinic with patients looking for the specific services you offer, ensuring you see the right clients."
          },
          {
            title: "Automated Patient Reviews",
            description: "After each appointment, we automatically request reviews, building trust and improving your clinic’s visibility."
          },
          {
            title: "Increase Appointment Efficiency",
            description: "Our platform optimizes your schedule by filling open slots with high-intent patients."
          },
          {
            title: "Integrated Calendar Management",
            description: "Easily manage your calendar and control availability for different services."
          },
          {
            title: "Performance Insights",
            description: "Track your clinic’s performance with helpful analytics to enhance patient care and streamline operations."
          },
          {
            title: "Direct Communication",
            description: "Message patients through our platform to confirm appointments and follow up after visits."
          }
        ]}
      />
      <FeedbackCarousel />
    </React.Fragment>
  );
};