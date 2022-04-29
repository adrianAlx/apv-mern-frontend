import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRouter';

import { AuthPublicLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

import { Login } from '../pages/Login';
import { PatientManagement } from '../pages/PatientManagement';
import { Register } from '../pages/Register';
import { PasswordRecovery } from '../pages/PasswordRecovery';

export const AppRouter = () => {
  const { authLoading } = useAuth();
  if (authLoading)
    return (
      <p className="flex justify-center items-center h-screen text-4xl my-auto text-green-900 font-black">
        Loading... AppRouter
      </p>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPublicLayout />
            </PublicRoute>
          }
        >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
        </Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<PatientManagement />} />

          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
