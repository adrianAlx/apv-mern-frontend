import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { usePatients } from '../hook/usePatients';
import { fetchWithToken } from '../helpers/fetch';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

let tokenJWT;
const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

export const DashboardLayout = () => {
  const { setPatientsCb } = usePatients();

  useEffect(() => {
    const getPatients = async () => {
      try {
        validateTokenFromLS();
        if (!tokenJWT) return;

        const { data } = await fetchWithToken('/patients', 'GET', tokenJWT);
        setPatientsCb(data.patients);

        console.log('PRIVATE - Dashboard');
      } catch (error) {
        console.log(error);
      }
    };

    getPatients();
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto mt-10">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
