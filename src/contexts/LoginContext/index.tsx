import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { useApi } from '../../hooks';
import apiEndpoints from '../../apiEndpoints';

interface User {
  loginPass: string;
  password: string;
}

interface LoginContextType {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  response: object | null;
  isAuthenticated: boolean;
  login: (user: User) => Promise<void>; 
  logout: () => void;
}

const defaultContext: LoginContextType = {
  showAuth: false,
  setShowAuth: () => { },
  user: null,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  response: null,
  isAuthenticated: false,
  login: async () => { }, 
  logout: () => { },
};

const LoginContext = createContext<LoginContextType>(defaultContext);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [user, setUser] = useState<any>(localStorage.getItem('userId'));

  const { callApi, response, loading, error } = useApi();

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    if(response){
      setSuccessMessage(response.message)
    }
  },[response])

  useEffect(() => {
    setErrorMessage(error)
  },[error])

  const login = async (user: User) => {
    try {
      await callApi({
        method: "POST",
        endpoint: apiEndpoints.login.post,
        data: user, 
      });
    } catch (error) {
      console.error("Giriş başarısız:", error);
    }
  };

  useEffect(() => {
    if (response) {
      const { userId, token, message } = response;
      setUser(userId)

      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('token', token.toString());
      localStorage.setItem('message', message.toString());
    }
  },[response])

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('message');
  };

  return (
    <LoginContext.Provider value={{ showAuth, setShowAuth, user, isAuthenticated: !!user, isLoading, response, successMessage, errorMessage, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
