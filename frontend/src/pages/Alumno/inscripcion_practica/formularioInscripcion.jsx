import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Card, Grid } from '@mui/material';
import DatosPractica from './components/DatosPractica';
import DatosEstudiante from './components/DatosEstudiante';
import DatosEmpresa from './components/DatosEmpresa';
import DatosSupervisor from './components/DatosSupervisor';
import Descripcion from './components/Descripcion';
import Objetivos from './components/Objetivos';
import Actividades from './components/Actividades';
import HorarioPractica from './components/HorarioPractica';
import clienteAxios from '../../../helpers/clienteaxios';

const steps = [
  { label: 'Datos de la práctica', component: DatosPractica },
  { label: 'Datos del estudiante', component: DatosEstudiante },
  { label: 'Datos de la empresa', component: DatosEmpresa },
  { label: 'Datos del supervisor', component: DatosSupervisor },
  { label: 'Breve descripción del área de desarrollo', component: Descripcion },
  { label: 'Objetivo(s) de la práctica', component: Objetivos },
  { label: 'Actividades a desarrollar', component: Actividades },
  { label: 'Horario de la práctica', component: HorarioPractica },
];

const FormularioInscripcion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(Array(steps.length).fill(false));
  const methods = useForm();
  const { handleSubmit, setValue } = methods;
  const [practica, setPractica] = useState('');
  const [fechaRecepcion, setFechaRecepcion] = useState(new Date().toISOString().split("T")[0]); // Fecha actual en formato YYYY-MM-DD
  const [modalidad, setModalidad] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [run, setRun] = useState('');
  const [emailEstudiante, setEmailEstudiante] = useState('');
  const [celular, setCelular] = useState('');
  const [direccionEstudiante, setDireccionEstudiante] = useState('');
  const [fonoEmergencia, setFonoEmergencia] = useState('');

  useEffect(() => {
    // Función para obtener los datos del estudiante
    const obtenerDatosEstudiante = async () => {
      try {
        // Obtener id_alumno del localStorage
        const id_alumno = localStorage.getItem("id_alumno");

        // Verificar si hay un id_alumno almacenado
        if (!id_alumno) {
          console.error("No se encontró el id_alumno en el localStorage.");
          return;
        }

        // Realizar la solicitud al servidor con el id_alumno en el body
        const response = await clienteAxios.post("/alumno/show", {
          id_alumno: id_alumno,
        });

        const { alumno } = response.data;
        // Actualizar los estados con los datos del estudiante
        setNombreEstudiante(
          `${alumno.primer_nombre} ${alumno.segundo_nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
        );
        setRun(alumno.rut);
        setEmailEstudiante(alumno.correo_personal);
        setCelular(alumno.telefono_personal);
        setDireccionEstudiante(alumno.direccion_particular);
        setFonoEmergencia(alumno.telefono_familiar); // Aquí asumo que el teléfono familiar es igual al teléfono de emergencia
      } catch (error) {
        console.error("Error al obtener los datos del estudiante:", error);
      }
    };

    // Llamar a la función para obtener los datos del estudiante al cargar el componente
    obtenerDatosEstudiante();
  }, []);

  useEffect(() => {
    // Obtener datos del localStorage o inicializar según tu lógica
    const idInscribeLocalStorage = localStorage.getItem("id_inscribe");
    if (idInscribeLocalStorage) {
      obtenerDatosInscripcion(idInscribeLocalStorage);
    } else {
      console.error("No se encontró id_inscribe en el localStorage.");
    }
  }, []);

  const obtenerDatosInscripcion = async (idInscribe) => {
    try {
      const response = await clienteAxios.get(`/inscribe/getInscribe/${idInscribe}`);
      const { asignatura } = response.data; // Ajustar según la respuesta real del servidor
      const practicaRegistrada = asignatura.id_asignatura; // Ajustar según la respuesta real del servidor
      setPractica(practicaRegistrada);
    } catch (error) {
      console.error("Error al obtener los datos de la inscripción:", error);
    }
  };

  const handleNext = () => {
    if (stepCompleted[activeStep]) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      console.error(`El paso ${activeStep} no está completo.`);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Datos a enviar:", data);
      const response = await clienteAxios.post('/inscribe/enviarDatos', data);
      console.log("Respuesta del servidor:", response.data);
      // Manejar la respuesta del servidor, redireccionar, mostrar mensajes, etc.
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    }
  };

  const StepComponent = steps[activeStep].component;

  return (
    <FormProvider {...methods}>
      <Card style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepComponent
            practica={practica}
            setPractica={setPractica}
            fechaRecepcion={fechaRecepcion}
            modalidad={modalidad}
            setModalidad={setModalidad}
            nombreEstudiante={nombreEstudiante}
            run={run}
            emailEstudiante={emailEstudiante}
            celular={celular}
            direccionEstudiante={direccionEstudiante}
            fonoEmergencia={fonoEmergencia}
            onStepComplete={(completed) => {
              const newStepCompleted = [...stepCompleted];
              newStepCompleted[activeStep] = completed;
              setStepCompleted(newStepCompleted);
            }}
          />
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                style={{ marginRight: '10px' }}
              >
                Atrás
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                disabled={!stepCompleted[activeStep]}
              >
                {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </FormProvider>
  );
};

export default FormularioInscripcion;
