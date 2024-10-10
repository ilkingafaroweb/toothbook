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
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  response: object | null;
  isAuthenticated: boolean;
  loginGoogle: (token: string, referralCode: number) => Promise<void>
  login: (user: User) => Promise<void>;
  logout: () => void;
}

const defaultContext: LoginContextType = {
  showAuth: false,
  setShowAuth: () => { },
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  response: null,
  isAuthenticated: false,
  loginGoogle: async () => { },
  login: async () => { },
  logout: () => { },
};

const LoginContext = createContext<LoginContextType>(defaultContext);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { callApi, response, loading, error } = useApi();
  const { callApi: callGoogle, response: responseGoogle } = useApi();
  const token = localStorage.getItem('token')

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    setIsLoading(false)
    setSuccessMessage(null)
    setErrorMessage(null)
  }, [showAuth])

  useEffect(() => {
    {response && setSuccessMessage(response.message) }
  }, [response])

  useEffect(() => {
    setErrorMessage(error)
  }, [error])

  useEffect(() => {
    if (!!successMessage) {
      const timer = setTimeout(() => {
        setShowAuth(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [successMessage])

  useEffect(() => {
    if (!!responseGoogle) {
      const timer = setTimeout(() => {
        setShowAuth(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [responseGoogle])

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

  const loginGoogle = async (token: string, referralCode: number) => {
    await callGoogle({
      method: "POST",
      endpoint: apiEndpoints.login.google,
      data: {
        token: token,
        referralCode: referralCode
      },
    });
  }

  useEffect(() => {
    if (responseGoogle) {
      const { token, email, userName } = responseGoogle;

      localStorage.setItem('token', token.toString());
      localStorage.setItem('email', email.toString());
      localStorage.setItem('userName', userName.toString());
    }
  }, [responseGoogle])


  useEffect(() => {
    if (response) {
      const { userId, token, message } = response;

      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('token', token.toString());
      localStorage.setItem('message', message.toString());
    }
  }, [response])

  const logout = () => {
    localStorage.clear(); 
    setIsAuthenticated(false); 
};

  return (
    <LoginContext.Provider value={
      {
        showAuth, setShowAuth, isAuthenticated,
        isLoading, loginGoogle, response,
        successMessage, errorMessage,
        login, logout
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
