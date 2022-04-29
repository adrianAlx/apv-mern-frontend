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
import { ConfirmAccount } from '../pages/ConfirmAccount';
import { NewPassword } from '../pages/NewPassword';

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
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
          <Route path="reset-password/:token" element={<NewPassword />} />
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
