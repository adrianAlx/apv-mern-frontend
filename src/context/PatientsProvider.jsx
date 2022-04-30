import { createContext, useState, useCallback } from 'react';

import { fetchWithToken } from '../helpers/fetch';

export const PatientsContext = createContext();

let tokenJWT;

const validateTokenFromLS = () =>
  (tokenJWT = localStorage.getItem('token') || false);

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  const addPatient = async patient => {
    validateTokenFromLS();
    if (!tokenJWT) return;

    if (patient.id) {
      try {
        const { data } = await fetchWithToken(
          `/patients/${patient.id}`,
          'PUT',
          tokenJWT,
          patient
        );

        const updatedPatients = patients.map(patientState => {
          return patientState._id === data.patient._id
            ? data.patient
            : patientState;
        });

        setPatients(updatedPatients);
        setPatient({});
      } catch (error) {
        if (error) throw error;
      }
    } else {
      validateTokenFromLS();
      if (!tokenJWT) return;

      try {
        const { data } = await fetchWithToken(
          '/patients',
          'POST',
          tokenJWT,
          patient
        );

        console.log(data);

        setPatients([data.patient, ...patients]);
      } catch (error) {
        console.log(error.response.data.msg);
        if (error) throw error;
      }
    }
  };

  // TODO: Limpiar pacientes al hacer logout - Redux

  const setEdicion = paciente => {
    validateTokenFromLS();
    if (!tokenJWT) return;
    setPatient(paciente);
  };

  const deletePatient = async id => {
    validateTokenFromLS();
    if (!tokenJWT) return;

    const confirmar = confirm('¿Confirmas que deseas eliminar ?');

    if (confirmar) {
      try {
        validateTokenFromLS();
        if (!tokenJWT) return;

        await fetchWithToken(`/patients/${id}`, 'DELETE', tokenJWT);

        const pacientesActualizado = patients.filter(
          pacientesState => pacientesState._id !== id
        );
        setPatients(pacientesActualizado);
      } catch (error) {
        console.log(error);
        if (error) throw error;
      }
    }
  };

  const setPatientsCb = useCallback(
    apiData => {
      validateTokenFromLS();
      if (!tokenJWT) return;

      setPatients(apiData);
    },
    [setPatients]
  );
  const setPatientCb = useCallback(
    apiData => {
      validateTokenFromLS();
      if (!tokenJWT) return;

      setPatient(apiData);
    },
    [setPatient]
  );

  return (
    <PatientsContext.Provider
      value={{
        patients,
        patient,
        addPatient,
        setEdicion,
        deletePatient,

        setPatientsCb,
        setPatientCb,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
