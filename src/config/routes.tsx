import React from 'react';
import { ClinicPartners, About, Faq, Contact, Profile, Referrals, MyBookings, BookingDetails, Steps, Clinics, ClinicProfile } from '../pages';

interface RouteProps {
  path: string;
  name: string;
  isHidden: boolean;
}

export interface RouteConfig {
  path: string;
  name: string;
  isHidden: boolean;
  element: React.ComponentType<RouteProps>;
  children?: RouteConfig[];
}

export const NAVBAR_ROUTES: RouteConfig[] = [
  {
    path: "/clinic-partners",
    name: "Clinic Partners",
    isHidden: false,
    element: (props) => <ClinicPartners {...props} />,
  },
  {
    path: "/about-us",
    name: "About Us",
    isHidden: false,
    element: (props) => <About {...props} />,
  },
  {
    path: "/faq",
    name: "FAQ",
    isHidden: false,
    element: (props) => <Faq {...props} />,
  },
  {
    path: "/contact",
    name: "Contact",
    isHidden: false,
    element: (props) => <Contact {...props} />,
  }
];

export const MENU_ROUTES: RouteConfig[] = [
  {
    path: "/profile",
    name: "Profile",
    isHidden: false,
    element: (props) => <Profile {...props} />,
  },
  {
    path: "/bookings",
    name: "My Bookings",
    isHidden: false,
    element: (props) => <MyBookings {...props} />,
  },
  {
    path: "/referrals",
    name: "My Referrals",
    isHidden: false,
    element: (props) => <Referrals {...props} />,
  },
];

export const NESTED_ROUTES: RouteConfig[] = [
  {
    path: "/bookings/:bookingId",
    name: "Booking Details",
    isHidden: false,
    element: (props) => <BookingDetails {...props} />,
  },
  {
    path: "/clinics/:clinicId",
    name: "Clinic Profile",
    isHidden: false,
    element: (props) => <ClinicProfile {...props} />,
  },
]

export const STEPS_ROUTES: RouteConfig[] = [
  {
    path: "/steps/giftcard",
    name: "Gift Card",
    isHidden: false,
    element: (props) => <Steps {...props} />,
  },
  {
    path: "/steps/services",
    name: "Services",
    isHidden: false,
    element: (props) => <Steps {...props} />,
  },
  {
    path: "/steps/insuranceQuestion",
    name: "Do you have an insurance?",
    isHidden: false,
    element: (props) => <Steps {...props} />,
  },
  {
    path: "/steps/insuranceSelect",
    name: "Do you have an insurance?",
    isHidden: false,
    element: (props) => <Steps {...props} />,
  },
  {
    path: "/steps/dentistQuestion",
    name: "How do you feel about going to dentist?",
    isHidden: false,
    element: (props) => <Steps {...props} />,
  },
]

export const CLINIC_ROUTES: RouteConfig[] = [
  {
    path: "/clinics",
    name: "Select your clinic",
    isHidden: false,
    element: (props) => <Clinics {...props} />,
  },
];