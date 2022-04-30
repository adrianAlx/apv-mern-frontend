import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  const lastPath = localStorage.getItem('lastPath') || '/admin';

  return !auth?.uid ? children : <Navigate to={`${lastPath}`} replace />;
};
