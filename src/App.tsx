import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { OfferProvider, LoginProvider, useLogin, useOffer } from './contexts';
import { NAVBAR_ROUTES, MENU_ROUTES, CLINIC_ROUTES } from './config';
import { createRoutes } from './utils';
import AuthModal from './components/modals/AuthModal';
import { useEffect, useState } from 'react';
import { Home } from './pages';

const AppRoutes = () => {
  const { showAuth } = useLogin();
  const [initialPath, setInitialPath] = useState('/')
  const {setIsOfferVisible} = useOffer()
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
    if(location.pathname === '/findyourdentist' || !!sessionStorage.getItem('offer')){
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
      <OfferProvider>
        <LoginProvider>
          <Router>
            <DefaultLayout>
              <AppRoutes />
            </DefaultLayout>
          </Router>
        </LoginProvider>
      </OfferProvider>
  );
};