import { useState } from 'react';

import { useForm } from '../hook/useForm';
import { useAuth } from '../hook/useAuth';

import { Alert } from '../components/Alert';
import { AdminNav } from '../components/AdminNav';

export const EditProfile = () => {
  const { auth, updateProfile, setAuthCb } = useAuth();

  const [formValues, handleInputChange] = useForm(auth);
  const { name, email, phone, web } = formValues;

  const [alerta, setAlerta] = useState({});
  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email)
      return setAlerta({
        msg: 'Nombre y correo son obligatorios!',
        error: true,
      });
    setAlerta({});

    try {
      const data = await updateProfile(formValues);
      setAuthCb(data.user);

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
  };

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {''}
        <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="name"
                className="uppercase font-bold text-gray-600"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-600"
              >
                Sitio Web
              </label>
              <input
                id="web"
                type="text"
                placeholder="Sitio Web"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={web || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="phone"
                className="uppercase font-bold text-gray-600"
              >
                Telefono
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Telefono"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
                value={phone || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-7"
            />
          </form>
        </div>
      </div>
    </>
  );
};
