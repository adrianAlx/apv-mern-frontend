import { useState, useEffect, createContext, useCallback } from 'react';
import { fetchWithToken } from '../helpers/fetch';
import { getJwtFromLS } from '../helpers/validateJwt';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    (async () => {
      const tokenJWT = getJwtFromLS();
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
        // setAuth({});
        logOut();
      }

      // Private Routes
      setAuthLoading(false);
    })();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({});

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const updateProfile = async data => {
    const tokenJWT = getJwtFromLS();
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
    const tokenJWT = getJwtFromLS();
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

  const setAuthCb = useCallback(
    user => {
      const tokenJWT = getJwtFromLS();
      if (!tokenJWT) return;

      setAuth(user);
    },
    [setAuth]
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        authLoading,

        setAuthCb,
        logOut,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
