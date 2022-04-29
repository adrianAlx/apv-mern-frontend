import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// import usePacientes from '../hooks/usePacientes';
// import { fetchWithToken } from '../helpers/fetch';

let tokenJWT;
const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

export const DashboardLayout = () => {
  // const { setPatients } = usePacientes();

  // useEffect(() => {
  //   const obtenerPacientes = async () => {
  //     try {
  //       validateTokenFromLS();
  //       if (!tokenJWT) return;

  //       const { data } = await fetchWithToken('/pacientes', 'GET', tokenJWT);
  //       setPatients(data);

  //       console.log('PRIVATE - Dashboard');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   obtenerPacientes();
  // }, []);

  return (
    <>
      {/* <Header /> */}

      <main className="container mx-auto mt-10">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};
