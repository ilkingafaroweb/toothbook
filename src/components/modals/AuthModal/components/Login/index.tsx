import React from 'react';
import { Button, Input } from '../../../../UI';

import { useLogin } from '../../../../../contexts';

interface LoginFormProps {
  onSubmit: (formData: object) => void;
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToSignUp }) => {

  const { login, isLoading } = useLogin()

  const [formData, setFormData] = React.useState({
    loginPass: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData)
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        name='loginPass'
        placeholder='Type email or phone number'
        isValid={true}
        value={formData.loginPass}
        onChange={handleChange}
      />

      <Input
        type='password'
        name='password'
        placeholder='Password'
        isValid={true}
        value={formData.password}
        onChange={handleChange}
      />

      <div className="text-right">
        <button type='button' className="text-brandPrimary hover:underline">
          Forgot Password ?
        </button>
      </div>

      <Button
        text='Login'
        color='bg-brandPrimary'
        size='w-full'
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
  );
};
