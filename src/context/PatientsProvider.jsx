import { createContext, useState, useCallback } from 'react';

import { fetchWithToken } from '../helpers/fetch';
import { getJwtFromLS } from '../helpers/validateJwt';

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  const addPatient = async patient => {
    const tokenJWT = getJwtFromLS();
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
      const tokenJWT = getJwtFromLS();
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

  const deletePatient = async id => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    const confirmar = confirm('¿Confirmas que deseas eliminar ?');

    if (confirmar) {
      try {
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
      const tokenJWT = getJwtFromLS();
      if (!tokenJWT) return;

      setPatients(apiData);
    },
    [setPatients]
  );
  const setPatientCb = useCallback(
    apiData => {
      const tokenJWT = getJwtFromLS();
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
        deletePatient,

        setPatientsCb,
        setPatientCb,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
