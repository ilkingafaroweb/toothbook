import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MENU_ROUTES } from '../../../config';
import { Button } from '../../UI';
import { useLogin } from '../../../contexts';

export const DropdownMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>('');

  const { isAuthenticated } = useLogin()

  useEffect(() => {
    if (isAuthenticated) {
      const message = localStorage.getItem('message');
      const userName = localStorage.getItem('userName');

      if (message && message.trim()) {
        const words = message.split(' ');
  
        const remainingWords = words.slice(1).join(' ');
  
        setUserName(remainingWords);
      }

      if(userName){
        setUserName(userName);
      }
    }
  }, [isAuthenticated]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !toggleButtonRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
        menuRef.current.style.opacity = '1';
      } else {
        menuRef.current.style.height = '0px';
        menuRef.current.style.opacity = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <Button color="bg-brandSecondary" text={userName} onClick={handleToggle} size='min-w-48 relative z-20' />
      <div
        ref={menuRef}
        className={`absolute bg-dropdown border rounded-b-2xl z-10 border-dropdown shadow-xl -mt-6 pt-6 pb-2 h-max right-0 w-48 overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ height: '0px', opacity: '0' }}
      >
        {
          MENU_ROUTES.filter(route => !route.isHidden).map((route, key) => (
            <Link
              to={route.path}
              key={key}
              className="block mx-4 border-b 
              border-accordionColor p-2 
              text-gray-800 hover:bg-dropdownHover"
            >
              {route.name}
            </Link>
          ))
        }
        <button
          className="inline-block w-40 mx-4 p-2 text-left text-gray-800 hover:bg-dropdownHover"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};