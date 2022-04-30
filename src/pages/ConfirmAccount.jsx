import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { fetchWithoutToken } from '../helpers/fetch';

export const ConfirmAccount = () => {
  const { token } = useParams();

  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchWithoutToken(
          `/veterinarians/confirm/${token}`
        );

        setConfirmedAccount(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }

      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Comienza a Administrar
          <span className="text-black block"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-7 py-10 rounded-xl bg-white">
        {loading && (
          <p className="block text-center my-5 font-bold text-2xl text-gray-900">
            Loading...
          </p>
        )}

        {!loading && <Alert alerta={alerta} />}

        {confirmedAccount && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Log In
          </Link>
        )}
      </div>
    </>
  );
};
