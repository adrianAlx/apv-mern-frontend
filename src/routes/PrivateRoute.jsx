import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';

export const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  // localStorage.getItem('token') && localStorage.setItem('lastPath', pathname);
  // Almacenar el path x si tiene la url en fav. pero se caduco el token <- hacen login y van a donde querian ir, no al path principal
  localStorage.setItem('lastPath', pathname);

  return !auth?.uid ? <Navigate to="/" /> : children;
};
