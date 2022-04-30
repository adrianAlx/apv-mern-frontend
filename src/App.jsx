import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';
import { AppRouter } from './routes/AppRouter';

export const App = () => {
  return (
    <AuthProvider>
      <PatientsProvider>
        <AppRouter />
      </PatientsProvider>
    </AuthProvider>
  );
};
