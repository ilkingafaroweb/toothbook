import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { OfferProvider, LoginProvider, useLogin, useOffer, StepsProvider } from './contexts';
import { NAVBAR_ROUTES, MENU_ROUTES, CLINIC_ROUTES, NESTED_ROUTES, STEPS_ROUTES } from './config';
import { createRoutes } from './utils';
import AuthModal from './components/modals/AuthModal';
import { useEffect, useState } from 'react';
import { Home } from './pages';

const AppRoutes = () => {
  const { showAuth } = useLogin();
  const [initialPath, setInitialPath] = useState('/')
  const { setIsOfferVisible } = useOffer()
  const location = useLocation()

  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showAuth]);

  useEffect(() => {
    if (location.pathname === '/findyourdentist' || !!sessionStorage.getItem('offer')) {
      sessionStorage.setItem('offer', 'true')
      setInitialPath('findyourdentist')
      setIsOfferVisible(true)
    }
  }, [])

  const allRoutes = [
    ...createRoutes([
      ...NAVBAR_ROUTES,
      {
        path: initialPath,
        name: "Home",
        isHidden: false,
        element: (props) => <Home {...props} />,
      },
    ]),
    ...createRoutes(MENU_ROUTES),
    ...createRoutes(CLINIC_ROUTES),
    ...createRoutes(NESTED_ROUTES),
    ...createRoutes(STEPS_ROUTES)
  ];

  return (
    <>
      <Routes>
        {allRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {
        <AuthModal />
      }
    </>
  );
};

export const App = () => {

  return (
    <StepsProvider>
      <OfferProvider>
        <LoginProvider>
          <Router>
            <AppRoutes />
          </Router>
        </LoginProvider>
      </OfferProvider>
    </StepsProvider>
  );
};