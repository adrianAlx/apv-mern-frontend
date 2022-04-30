import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { fetchWithoutToken } from '../helpers/fetch';

export const NewPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [isValidToken, setIsValidToken] = useState(false);
  const { msg } = alerta;

  const [updatedPassword, setUpdatedPassword] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchWithoutToken(`/veterinarians/password-recovery/${token}`);
        setAlerta({
          msg: 'Coloca tu Nuevo Password',
        });
        setIsValidToken(true);
      } catch (error) {
        setAlerta({
          msg: 'Token invalido!',
          error: true,
        });
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 6) {
      return setAlerta({
        msg: 'El Password debe ser mínimo de 6 caracteres',
        error: true,
      });
    }

    try {
      const url = `/veterinarians/password-recovery/${token}`;
      const { data } = await fetchWithoutToken(url, { password }, 'POST');

      setAlerta({
        msg: data.msg,
      });
      setUpdatedPassword(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas Acceso a
          <span className="text-black block"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-7 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        {isValidToken && !updatedPassword && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Nuevo password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar nuevo password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>
        )}

        {updatedPassword && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Log In
          </Link>
        )}
      </div>
    </>
  );
};
