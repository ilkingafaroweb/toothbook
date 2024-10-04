import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandLogo, burger_icon, x_icon_dark, referrals_icon } from '../../../assets';
import { Button } from '../../UI';
import { NAVBAR_ROUTES } from '../../../config';
import { LoginMenu } from '../LoginMenu';
import { useLogin } from '../../../contexts';

export const Navbar = () => {
  const { setShowAuth } = useLogin();
  const token = localStorage.getItem('token')
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialPath, setInitialPath] = useState('/')

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu: any = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if(location.pathname === '/findyourdentist' || !!sessionStorage.getItem('offer')){
      setInitialPath('findyourdentist')
    }
  }, [])

  return (
    <>
      <nav className="bg-white shadow-bottom">
        <div className="container mx-auto px-5 2xl:px-21 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex justify-center items-center space-x-16">
            <Link to={initialPath}>
              <img src={brandLogo} alt="brandLogo" className="h-16" />
            </Link>

            {/* Menu Links (Desktop) */}
            <ul className="hidden md:flex space-x-10">
              <li>
                <Link to={initialPath} className="py-2 px-4 rounded opacity-65 font-semi-bold">
                  Home
                </Link>
              </li>
              {NAVBAR_ROUTES.filter(route => !route.isHidden).map(route => (
                <li key={route.path}>
                  <Link to={route.path} className="py-2 px-4 rounded opacity-65 font-semi-bold">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {token ? (
              <Link to="/referrals">
                <Button color="bg-brandPrimary" text="Referrals" icon={referrals_icon} />
              </Link>
            ) : (
              <Button
                color="bg-brandPrimary"
                text="Referrals"
                icon={referrals_icon}
                onClick={() => setShowAuth(true)}
              />
            )}

            <LoginMenu />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <img src={burger_icon} alt="burger_icon" />
            </button>
          </div>
        </div>

        {/* Mobile Menu (Responsive) */}
        <div
          className={`fixed inset-0 bg-white z-50 p-5 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="relative h-full flex flex-col space-y-6">
            <div className="flex justify-between">
              <Link to={initialPath}>
                <img src={brandLogo} alt="brandLogo" className="h-8" />
              </Link>

              <button onClick={toggleMobileMenu}>
                <img src={x_icon_dark} alt="x_icon_dark" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center justify-start flex-grow space-y-4">
              <Link key={initialPath} to={initialPath} onClick={toggleMobileMenu} className="w-full text-start rounded opacity-65 font-semi-bold">
                Home
              </Link>
              {NAVBAR_ROUTES.filter(route => !route.isHidden).map(route => (
                <Link key={route.path} to={route.path} onClick={toggleMobileMenu} className="w-full text-start rounded opacity-65 font-semi-bold">
                  {route.name}
                </Link>
              ))}
            </div>

            {/* Buttons at the Bottom */}
            <div className="flex flex-col items-center space-y-5">
              {token ? (
                <Link className='w-full' to='referrals'>
                  <Button
                    color="bg-brandPrimary"
                    text="Referrals"
                    icon={referrals_icon}
                    size="w-full"
                  />
                </Link>
              ) : (
                <Button
                  color="bg-brandPrimary"
                  text="Referrals"
                  icon={referrals_icon}
                  size="w-full"
                  onClick={() => setShowAuth(true)}
                />
              )}
              <Button
                color="bg-brandSecondary"
                text="Login"
                size="w-full"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};