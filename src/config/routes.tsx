import React from 'react';
import { Home, ClinicPartners, About, Faq, Contact, Profile, Referrals } from '../pages';
import AuthModal from '../components/modals/AuthModal';

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
    path: "/",
    name: "Home",
    isHidden: false,
    element: (props) => <Home {...props} />,
  },
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
    element: (props) => <ClinicPartners {...props} />,
  },
  {
    path: "/referrals",
    name: "My Referrals",
    isHidden: false,
    element: (props) => <Referrals {...props} />,
  },
];

export const CLINIC_ROUTES: RouteConfig[] = [
  // {
  //   path: "/clinics",
  //   name: "Clinics",
  //   isHidden: false,
  //   element: (props) => <Clinics {...props} />,
  //   children: [
  //     {
  //       path: ":clinicId",
  //       name: "Clinic Profile",
  //       isHidden: false,
  //       element: (props) => <ClinicProfile {...props} />,
  //       children: [
  //         {
  //           path: "details",
  //           name: "Details",
  //           isHidden: false,
  //           element: (props) => <ClinicDetails {...props} />,
  //         },
  //         {
  //           path: "reviews",
  //           name: "Clinic Reviews",
  //           isHidden: false,
  //           element: (props) => <ClinicReviews {...props} />,
  //           children: [
  //             {
  //               path: "about",
  //               name: "About",
  //               isHidden: false,
  //               element: (props) => <About {...props} />,
  //             },
  //             {
  //               path: "gallery",
  //               name: "Gallery",
  //               isHidden: false,
  //               element: (props) => <Gallery {...props} />,
  //             },
  //             {
  //               path: "reviews",
  //               name: "Reviews",
  //               isHidden: false,
  //               element: (props) => <Reviews {...props} />,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const AUTH_ROUTES = [
  {
    path: "/login",
    element: <AuthModal />,
  },
  {
    path: "/register",
    element: <AuthModal />,
  },
];