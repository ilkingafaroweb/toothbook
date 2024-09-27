import React from 'react';
import { Button } from '../../UI';
import { useLogin } from '../../../contexts';
import { DropdownMenu } from './DropdownMenu';

export const LoginMenu: React.FC = () => {

  const { setShowAuth, isAuthenticated, logout } = useLogin();

    const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu onLogout={handleLogout} />
      ) : (
        <Button color="bg-brandSecondary" text="Login" onClick={()=>setShowAuth(true)}  />
      )}
    </div>
  );
};