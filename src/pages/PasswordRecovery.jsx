import { useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchWithoutToken } from '../helpers/fetch';
import { Alert } from '../components/Alert';

export const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6)
      return setAlerta({ msg: 'El Email es obligatorio', error: true });

    try {
      const { data } = await fetchWithoutToken(
        '/veterinarians/password-recovery',
        { email },
        'POST'
      );

      setAlerta({ msg: data.msg });
      setEmail('');
      setEmailSent(true);
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
          Recupera tu Acceso y no Pierdas
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        {!emailSent && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="email"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
              />
            </div>

            <input
              type="submit"
              value="Enviar Instrucciones"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
          </form>
        )}

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};
