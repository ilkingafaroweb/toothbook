import React, { useState, useEffect } from 'react';
import { LoginForm, RegisterForm } from './components';
import { login_image, auth_x, register_image } from '../../../assets';
import { useLogin } from '../../../contexts';
import { ErrorMessage, SuccessMessage } from './components/Status';

interface AuthModalProps {
  isOpen?: boolean;
  isLogin?: boolean;
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, isLogin, onClose }) => {

  const [isSignUp, setIsSignUp] = useState(!isLogin);

  const { successMessage, errorMessage } = useLogin()

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSignUpClick = () => {
    setIsSignUp(true)
  };

  const handleBackToLoginClick = () => {
    setIsSignUp(false)
  };

  const handleLoginSubmit = (formData: object) => {
    console.log('Login:', formData);
  };

  const handleRegisterSubmit = (formData: object) => {
    console.log('Register:', formData);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // 50ms bekle, form yüklendiğinde hemen animasyonu tetikle
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <div onClick={onClose} className={`${isOpen ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50' : 'hidden'}`}>
      <div className="bg-white w-full max-w-max mx-auto rounded-lg shadow-lg overflow-hidden">
        <div onClick={(e) => handleModalClick(e)} className={`relative md:flex transition-transform duration-500 ease-in-out`}>
          {/* X button */}
          <button className="absolute top-3 right-3 z-50" onClick={onClose}>
            <img src={auth_x} alt="auth-x" />
          </button>
          {/* Left Side (Image) */}
          <div
            className={`z-10 md:w-1/2 bg-center transition-transform duration-300 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}
          >
            <img src={!isSignUp ? login_image : register_image} alt="login-img" />
          </div>

          {/* Right Side (Form) */}
          <div className={`w-full flex flex-col justify-center space-y-7 bg-white md:w-1/2 p-16 transition-all transform duration-300 ease-in-out 
            ${isSignUp ? '-translate-x-full' : 'translate-x-0'}
            ${isVisible ? 'opacity-100' : 'opacity-0'}`
          }>
            <div className="flex flex-col justify-between items-start">
              <SuccessMessage successMessage={successMessage} />
              <ErrorMessage errorMessage={errorMessage} />
              <h2 className="text-3xl font-bold text-brandSecondary">{!isSignUp ? 'Welcome back!' : 'Create an account'}</h2>
              <p className='font-medium text-accordionTitle'>{!isSignUp ? "Please enter your details" : "Let’s get started"}</p>
            </div>
            {!isSignUp ? (
              <LoginForm onSubmit={handleLoginSubmit} onSwitchToSignUp={handleSignUpClick} />
            ) : (
              <RegisterForm onSubmit={handleRegisterSubmit} onSwitchToLogin={handleBackToLoginClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;