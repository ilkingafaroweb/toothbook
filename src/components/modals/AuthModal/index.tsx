import React, { useEffect, useState } from 'react';
import { LoginForm, RegisterForm } from './components';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen?: boolean
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (location.pathname === '/login') {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  }, [location]);
  

  const handleSignUpClick = () => {
    navigate('/register')
  };

  const handleBackToLoginClick = () => {
    navigate('/login')
  };

  const handleLoginSubmit = (email: string, password: string) => {
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  const handleRegisterSubmit = (name: string, email: string, password: string) => {
    // Handle registration logic here
    console.log('Register:', { name, email, password });
  };

  return (
    <div className={`${isOpen ? 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50' : 'hidden'}`}>
      <div className="bg-white w-full max-w-max mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className={`relative md:flex transition-transform duration-700 ease-in-out`}>
          {/* Left Side (Image) */}
          <div
            className={`z-10 md:w-1/2 bg-center transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}            
          >
            <img className='' src="https://i2.pngimg.me/thumb/f/720/compngwingyijxu.jpg" />
          </div>

          {/* Right Side (Form) */}
          <div className={`w-full bg-white md:w-1/2 p-8 transition-transform duration-700 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{isSignUp ? 'Register' : 'Login'}</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                ✕
              </button>
            </div>
            {isSignUp ? (
              <RegisterForm onSubmit={handleRegisterSubmit} onSwitchToLogin={handleBackToLoginClick} />
            ) : (
              <LoginForm onSubmit={handleLoginSubmit} onSwitchToSignUp={handleSignUpClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;