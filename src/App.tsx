import { BrowserRouter as Router, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { OfferProvider, LoginProvider } from './contexts';
// import AuthModal from './components/modals/AuthModal';
import { ErrorBoundary } from './components/error';
import { NAVBAR_ROUTES, MENU_ROUTES, CLINIC_ROUTES, AUTH_ROUTES } from './config';
import { createRoutes } from './utils';
import { useEffect, useState } from 'react';


const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (location.pathname === '/login' || '/register') {
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  }, [location])

  const allRoutes = [
    ...AUTH_ROUTES,

    ...createRoutes(NAVBAR_ROUTES),
    ...createRoutes(MENU_ROUTES),
    ...createRoutes(CLINIC_ROUTES),
  ];

  const routes = useRoutes(allRoutes);

  const closeModal = () => {
    navigate('/');
  };

  return (
    <>
      {routes}
      {/* <AuthModal isOpen={isOpen} onClose={closeModal} /> */}
    </>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <OfferProvider>
        <LoginProvider>
          <Router>
            <DefaultLayout>
              <AppRoutes />
            </DefaultLayout>
          </Router>
        </LoginProvider>
      </OfferProvider>
    </ErrorBoundary>
  );
};
