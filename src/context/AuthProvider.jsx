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

  const actualizarPerfil = async datos => {
    validateTokenFromLS();
    if (!tokenJWT) return setAuthLoading(false);

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await fetchWithToken(url, 'PUT', tokenJWT, datos);

      return {
        msg: 'Almacenado Correctamente',
        error: false,
      };
    } catch (error) {
      if (error) throw error;
    }
  };

  const guardarPassword = async datos => {
    validateTokenFromLS();
    if (!tokenJWT) return setAuthLoading(false);

    try {
      const url = '/veterinarios/actualizar-password';
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
        setAuth,
        authLoading,
        logOut,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
