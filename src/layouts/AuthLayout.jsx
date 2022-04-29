import { Outlet } from 'react-router-dom';

export const AuthPublicLayout = () => {
  return (
    <main className="container mx-auto md:grid  md:grid-cols-2 mt-12 gap-12 p-5 items-center">
      <Outlet />
    </main>
  );
};
