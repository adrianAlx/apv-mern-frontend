import { useState, useEffect, createContext } from 'react';
import { fetchWithToken } from '../helpers/fetch';

export const AuthContext = createContext();
let tokenJWT;

const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authenticateUser = async () => {
      validateTokenFromLS();
      if (!tokenJWT) return setAuthLoading(false);

      try {
        // Check token
        const { data } = await fetchWithToken(
          '/veterinarians/profile',
          'GET',
          tokenJWT
        );

        setAuth(data.user);
      } catch (error) {
        console.log(error.response.data);
        setAuth({});
      }

      // Private Routes
      setAuthLoading(false);
    };

    authenticateUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({});

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const updateProfile = async data => {
    validateTokenFromLS();
    if (!tokenJWT) return setAuthLoading(false);

    try {
      const url = `/veterinarians/profile/${data.uid}`;
      const { data: apiData } = await fetchWithToken(
        url,
        'PUT',
        tokenJWT,
        data
      );
      return apiData;
    } catch (error) {
      if (error) throw error;
    }
  };

  const updatePassword = async datos => {
    validateTokenFromLS();
    if (!tokenJWT) return setAuthLoading(false);

    try {
      const url = '/veterinarians/update-password';
      const { data } = await fetchWithToken(url, 'PUT', tokenJWT, datos);

      return {
        msg: data.msg,
      };
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        authLoading,

        setAuth,
        logOut,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
