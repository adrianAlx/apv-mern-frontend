import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { usePatients } from '../hook/usePatients';
import { fetchWithToken } from '../helpers/fetch';
import { getJwtFromLS } from '../helpers/validateJwt';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DashboardLayout = () => {
  const { setPatientsCb } = usePatients();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const tokenJWT = getJwtFromLS();
        if (!tokenJWT) return;

        const { data } = await fetchWithToken('/patients', 'GET', tokenJWT);
        setPatientsCb(data.patients);
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
