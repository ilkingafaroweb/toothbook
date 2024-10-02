import React, { useEffect, useState } from 'react';
import { LoginForm, RegisterForm } from './components';
import { login_image, auth_x, register_image } from '../../../assets';
import { useLogin } from '../../../contexts';
import { ErrorMessage, SuccessMessage } from './components/Status';

const AuthModal: React.FC = () => {

  const [isSignUp, setIsSignUp] = useState(false);

  const { showAuth, setShowAuth, successMessage, errorMessage } = useLogin()

  useEffect(() => {
    setIsSignUp(false)
  }, [showAuth])

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSignUpClick = () => {
    setIsSignUp(true)
  };

  const handleBackToLoginClick = () => {
    setIsSignUp(false)
  };

  return (
    <div onClick={() => setShowAuth(false)} className={`${showAuth ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50' : 'hidden'}`}>
      <div className="bg-white w-full max-w-max mx-auto rounded-lg shadow-lg overflow-hidden">
        <div onClick={(e) => handleModalClick(e)} className={`relative md:flex transition-transform duration-500 ease-in-out`}>
          {/* X button */}
          <button className="absolute top-3 right-3 z-50" onClick={() => setShowAuth(false)}>
            <img src={auth_x} alt="auth-x" />
          </button>
          {/* Left Side (Image) */}
          <div
            className={`hidden lg:block z-10 lg:w-1/2 bg-center transition-transform duration-300 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}
          >
            <img src={!isSignUp ? login_image : register_image} alt="login-img" />
          </div>

          {/* Right Side (Form) */}
          <div className={`lg:w-1/2 w-full h-[100%] flex flex-col space-y-5 bg-white md:w-1/2 lg:p-12 px-4 py-8 transition-all transform duration-300 ease-in-out 
            ${isSignUp ? 'lg:-translate-x-full' : 'lg:translate-x-0'}`
          }>
            <div className="flex flex-col justify-between items-start">
              <SuccessMessage successMessage={successMessage} />
              <ErrorMessage errorMessage={errorMessage} />
            </div>
            {!isSignUp ? (
              <LoginForm onSwitchToSignUp={handleSignUpClick} />
            ) : (
              <RegisterForm onSwitchToLogin={handleBackToLoginClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;