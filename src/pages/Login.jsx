import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';
import { useForm } from '../hook/useForm';
import { fetchWithoutToken } from '../helpers/fetch';
import { Alert } from '../components/Alert';

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formLoginValues, handleLoginInputChange] = useForm({
    email: '',
    password: '',
  });
  const [alerta, setAlerta] = useState({});

  const { email, password } = formLoginValues;
  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password)
      return setAlerta({
        msg: 'Todos los campos son obligatorios!',
        error: true,
      });

    if (password.length < 6)
      return setAlerta({
        msg: 'El password debe tener almenos 6 caracteres!',
        error: true,
      });

    try {
      const { data } = await fetchWithoutToken(
        '/veterinarians/login',
        { email, password },
        'POST'
      );
      localStorage.setItem('token', data.token);
      setAuth(data.user);

      const lastPath = localStorage.getItem('lastPath') || '/admin';
      navigate(`${lastPath}`, { replace: true });
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
          Inicia Sesión y Administra tus {''}
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              autoFocus={true}
              name="email"
              value={email}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="password"
              value={password}
              onChange={handleLoginInputChange}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/register">
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/password-recovery"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};
