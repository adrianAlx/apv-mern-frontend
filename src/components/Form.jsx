import { useState, useEffect } from 'react';

import { useForm } from '../hook/useForm';
import { usePatients } from '../hook/usePatients';
import { Alert } from './Alert';

const initState = {
  name: '',
  owner: '',
  email: '',
  date: '',
  symptoms: '',
};

export const Form = () => {
  const [formValues, handleInputChange, reset, setFormValues] =
    useForm(initState);

  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);
  const { msg } = alerta;

  const { addPatient, patient, setPatientCb } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setFormValues(patient);
      setId(patient._id);
    }
  }, [patient]);

  const { name, owner, email, date, symptoms } = formValues;

  const handleSubmit = async e => {
    e.preventDefault();
    if ([name, owner, email, date, symptoms].includes(''))
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

    try {
      await addPatient({ name, owner, email, date, symptoms, id });
      setAlerta({
        msg: 'Guardado Correctamente',
        error: false,
      });
      reset();
      setId(null);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const handleResetForm = () => {
    reset();
    setPatientCb({});
    setId(null);
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alert alerta={alerta} />}

        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            name="name"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            name="owner"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            name="date"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            name="symptoms"
            onChange={handleInputChange}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />

        <input
          type="button"
          value="Reset Form"
          className="bg-red-500 w-full mt-4 p-3 text-white uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors"
          onClick={handleResetForm}
        />
      </form>
    </>
  );
};
