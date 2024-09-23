import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandLogo, burger_icon, x_icon_dark, referrals_icon } from '../../../assets';
import { Button } from '../../UI';
import { NAVBAR_ROUTES } from '../../../config';
import { LoginMenu } from '../LoginMenu';

export const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Disable scroll on body when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup: Re-enable scroll on body when the component is unmounted
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-bottom">
        <div className="container mx-auto px-5 lg:px-21 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <div className="flex justify-center items-center space-x-16">
            <Link to='/'>
              <img src={brandLogo} alt="brandLogo" className="h-16" />
            </Link>

            {/* Menu Links (Desktop) */}
            <ul className="hidden md:flex space-x-10">
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
            <Link to='referrals'>
              <Button color="bg-brandPrimary" text="Referrals" icon={referrals_icon} />
            </Link>
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
          className={`fixed inset-0 bg-white z-50 p-5 transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="relative h-full flex flex-col space-y-6">
            <div className="flex justify-between">
              <Link to='/'>
                <img src={brandLogo} alt="brandLogo" className="h-8" />
              </Link>

              <button onClick={toggleMobileMenu}>
                <img src={x_icon_dark} alt="x_icon_dark" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col items-center justify-start flex-grow space-y-4">
              {NAVBAR_ROUTES.filter(route => !route.isHidden).map(route => (
                <Link key={route.path} to={route.path} onClick={toggleMobileMenu} className="w-full text-start rounded opacity-65 font-semi-bold">
                  {route.name}
                </Link>
              ))}
            </div>

            {/* Buttons at the Bottom */}
            <div className="flex flex-col items-center space-y-5">
              <Button 
                color="bg-brandPrimary" 
                text="Referrals" 
                icon={referrals_icon} 
                size="w-full" 
              />
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