import React from 'react';
import { Button } from '../../UI';
import { useLogin } from '../../../contexts';
import { DropdownMenu } from './DropdownMenu';

export const LoginMenu: React.FC = () => {

  const { isAuthenticated, login, logout } = useLogin();

  const handleLogin = () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }; 
    login(user);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu onLogout={handleLogout} />
      ) : (
        // <Link to='./login'>
          <Button color="bg-brandSecondary" text="Login" onClick={handleLogin} />
        // </Link>
      )}
    </div>
  );
};