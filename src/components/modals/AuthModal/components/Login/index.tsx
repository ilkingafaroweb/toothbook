import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../../UI';
import { useLogin } from '../../../../../contexts';
import { ForgotPassword } from '../ForgotPassword';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {

  const handleError = () => {
    console.log('Login Failed');
  };

  const { showAuth, login, isLoading, loginGoogle } = useLogin()
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [formData, setFormData] = React.useState({
    loginPass: '',
    password: ''
  });

  const handleSuccess = (googleResponse: any) => {
    loginGoogle(googleResponse.credential, 0)
  };

  useEffect(() => {
    setIsForgotPassword(false)
    setFormData({
      loginPass: '',
      password: ''
    })
  }, [showAuth])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    setIsForgotPassword(false)
  }

  return (
    isForgotPassword ? (<ForgotPassword onBack={handleBack} />) : (<>
      <div>
        <h2 className="lg:text-3xl text-2xl font-bold text-brandSecondary">Welcome !</h2>
        <p className='lg:text-lg text-sm font-medium text-accordionTitle'>
          Please enter your details
        </p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          name='loginPass'
          placeholder='Type email or phone number'
          isValid={true}
          value={formData.loginPass}
          onChange={handleChange}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          isValid={true}
          value={formData.password}
          onChange={handleChange}
        />

        <div className="text-right">
          <button type='button' onClick={() => setIsForgotPassword(true)} className="text-brandPrimary hover:underline">
            Forgot Password ?
          </button>
        </div>

        <Button
          text='Login'
          color='bg-brandPrimary'
          size='w-full'
          hover={true}
          isLoading={isLoading}
        />

        <div className="text-center">
          <button
            type='button'
            onClick={onSwitchToSignUp}
            className="text-black opacity-80"
          >
            Don’t have an account? <span className="text-brandPrimary underline">Sign up for free!</span>
          </button>
        </div>
      </form>
      <GoogleOAuthProvider clientId="258658743445-5v4k5dpalev01lmdt6vhd05des46mvom.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </GoogleOAuthProvider>
    </>)
  );
};