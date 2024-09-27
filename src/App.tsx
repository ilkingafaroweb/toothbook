import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { OfferProvider, LoginProvider, useLogin } from './contexts';
import { ErrorBoundary } from './components/error';
import { NAVBAR_ROUTES, MENU_ROUTES, CLINIC_ROUTES } from './config';
import { createRoutes } from './utils';
import AuthModal from './components/modals/AuthModal';
import { useEffect } from 'react';

const AppRoutes = () => {
  const { showAuth, setShowAuth } = useLogin();

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

  const allRoutes = [
    ...createRoutes(NAVBAR_ROUTES),
    ...createRoutes(MENU_ROUTES),
    ...createRoutes(CLINIC_ROUTES),
  ];

  return (
    <>
      <Routes>
        {allRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {
        <AuthModal isOpen={showAuth} isLogin={true} onClose={() => setShowAuth(false)} />
      }
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