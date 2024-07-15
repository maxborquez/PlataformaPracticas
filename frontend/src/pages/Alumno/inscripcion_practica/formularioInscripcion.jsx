import { useState, useEffect } from "react";
import { Card, Grid, TextField, Button, Typography } from "@mui/material";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";
import DatosEmpresa from "./components/DatosEmpresa";
import DatosSupervisor from "./components/DatosSupervisor";
import DatosEstudiante from "./components/DatosEstudiante";
import DatosPractica from "./components/DatosPractica";
import HorarioPractica from "./components/HorarioPractica";

const FormularioInscripcion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ciudades, setCiudades] = useState([]);
  const [practica, setPractica] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await clienteAxios.get("/ciudades/getCiudades");
        setCiudades(response.data.ciudad); // Actualiza el estado con el arreglo de ciudades

        // Asigna ciudadSeleccionada al primer elemento si hay ciudades disponibles
        if (response.data.ciudad.length > 0) {
          setCiudadSeleccionada("");
        }
      } catch (error) {
        console.error("Error al obtener las ciudades:", error);
      }
    };

    fetchCiudades();
  }, []);

  const handleChangeCiudad = (event) => {
    const ciudadIdSeleccionada = event.target.value;
    setCiudadSeleccionada(ciudadIdSeleccionada);
  };

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
  }, []); // El segundo argumento [] indica que useEffect se ejecutará solo una vez, al montar el componente

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    // Obtener id_inscribe del localStorage
    const idInscribeLocalStorage = localStorage.getItem("id_inscribe");
    if (idInscribeLocalStorage) {
      obtenerDatosInscripcion(idInscribeLocalStorage);
    } else {
      console.error("No se encontró id_inscribe en el localStorage.");
    }
  }, []);

  const obtenerDatosInscripcion = async (idInscribe) => {
    try {
      // Realizar la solicitud al servidor con el id_inscribe
      const response = await clienteAxios.get(
        `/inscribe/getInscribe/${idInscribe}`
      );

      // Extraer la práctica desde la respuesta
      const { asignatura } = response.data;
      const practicaRegistrada = asignatura.id_asignatura; // Nombre de la práctica registrada

      // Actualizar el estado de practica con la práctica registrada
      setPractica(practicaRegistrada);
    } catch (error) {
      console.error("Error al obtener los datos de la inscripción:", error);
    }
  };

  const [modalidad, setModalidad] = useState("");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [run, setRun] = useState("");
  const [emailEstudiante, setEmailEstudiante] = useState("");
  const [celular, setCelular] = useState("");
  const [direccionEstudiante, setDireccionEstudiante] = useState("");
  const [fonoEmergencia, setFonoEmergencia] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [deptoArea, setDeptoArea] = useState("");
  const [paginaWeb, setPaginaWeb] = useState("");
  const [rubro, setRubro] = useState("");
  const [fonoEmpresa, setFonoEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [nombreSupervisor, setNombreSupervisor] = useState("");
  const [cargoSupervisor, setCargoSupervisor] = useState("");
  const [fonoSupervisor, setFonoSupervisor] = useState("");
  const [emailSupervisor, setEmailSupervisor] = useState("");
  const [descripcionArea, setDescripcionArea] = useState("");
  const [objetivosPractica, setObjetivosPractica] = useState("");
  const [actividadesDesarrollar, setActividadesDesarrollar] = useState("");
  const [horarioPractica, setHorarioPractica] = useState({
    lunes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    martes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    miercoles: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    jueves: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    viernes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    sabado: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
  });

  const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const handleTimeChange = (day, timePart, value) => {
    const updatedHorario = {
      ...horarioPractica,
      [day]: {
        ...horarioPractica[day],
        [timePart]: value,
      },
    };

    // Aplicar el estado actualizado
    setHorarioPractica(updatedHorario);
  };

  const [idInscribe, setIdInscribe] = useState("");

  useEffect(() => {
    const storedIdInscribe = localStorage.getItem("id_inscribe");
    if (storedIdInscribe) {
      setIdInscribe(storedIdInscribe);
    }
  }, []);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const fechaRecepcion = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

  const handleFechaInicioChange = (e) => {
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);

    if (fechaFin && new Date(nuevaFechaInicio) > new Date(fechaFin)) {
      setFechaFin("");
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value;
    const fechaMinimaFin = new Date(fechaInicio);
    fechaMinimaFin.setDate(fechaMinimaFin.getDate() + 30);

    setFechaFin(nuevaFechaFin);
  };

  const handleDescripcionAreaChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]{0,200}$/.test(value)) {
      setDescripcionArea(value);
    }
  };

  const handleObjetivosPracticaChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]{0,200}$/.test(value)) {
      setObjetivosPractica(value);
    }
  };

  const handleActividadesDesarrollarChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]{0,200}$/.test(value)) {
      setActividadesDesarrollar(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let id_empresa;

      // Primero, busca si la empresa ya existe por nombre
      try {
        const responseBuscarEmpresa = await clienteAxios.post(
          "/empresa/getByNombre",
          { nombre: nombreEmpresa }
        );

        if (
          responseBuscarEmpresa.data &&
          responseBuscarEmpresa.data.id_empresa
        ) {
          // Si la empresa existe, usa el id_empresa existente
          id_empresa = responseBuscarEmpresa.data.id_empresa;
          console.log("Empresa encontrada con id:", id_empresa);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si la empresa no existe (404), crea una nueva empresa
          const formDataEmpresa = {
            nombre: nombreEmpresa,
            departamento: deptoArea,
            web: paginaWeb,
            rubro: rubro,
            telefono: fonoEmpresa,
            direccion: direccionEmpresa,
            id_ciudad: ciudadSeleccionada,
          };

          const responseCrearEmpresa = await clienteAxios.post(
            "/empresa/create",
            formDataEmpresa
          );
          id_empresa = responseCrearEmpresa.data.id_empresa;
          console.log("Empresa creada con id:", id_empresa);
        } else {
          // Maneja otros errores posibles en la búsqueda de la empresa
          throw new Error("Error al buscar la empresa");
        }
      }

      // Crear el supervisor con id_empresa y obtener id_supervisor
      const formDataSupervisor = {
        primer_nombre: nombreSupervisor,
        segundo_nombre: "a",
        apellido_paterno: "b",
        apellido_materno: "c",
        cargo: cargoSupervisor,
        telefono: fonoSupervisor,
        correo: emailSupervisor,
        id_empresa: id_empresa,
      };

      const responseSupervisor = await clienteAxios.post(
        "/supervisor/create",
        formDataSupervisor
      );
      const { id_supervisor } = responseSupervisor.data;
      console.log("Supervisor creado con id:", id_supervisor);

      const formDataInscripcion = {
        id_modalidad: parseInt(modalidad, 10),
        descripcion: descripcionArea,
        objetivos: objetivosPractica,
        actividades: actividadesDesarrollar,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        fecha_inscripcion_practica: fechaRecepcion,
        id_empresa: parseInt(id_empresa, 10),
        id_supervisor: parseInt(id_supervisor, 10),
        lunes_manana1: horarioPractica.lunes.mañana1,
        lunes_manana2: horarioPractica.lunes.mañana2,
        lunes_tarde1: horarioPractica.lunes.tarde1,
        lunes_tarde2: horarioPractica.lunes.tarde2,
        martes_manana1: horarioPractica.martes.mañana1,
        martes_manana2: horarioPractica.martes.mañana2,
        martes_tarde1: horarioPractica.martes.tarde1,
        martes_tarde2: horarioPractica.martes.tarde2,
        miercoles_manana1: horarioPractica.miercoles.mañana1,
        miercoles_manana2: horarioPractica.miercoles.mañana2,
        miercoles_tarde1: horarioPractica.miercoles.tarde1,
        miercoles_tarde2: horarioPractica.miercoles.tarde2,
        jueves_manana1: horarioPractica.jueves.mañana1,
        jueves_manana2: horarioPractica.jueves.mañana2,
        jueves_tarde1: horarioPractica.jueves.tarde1,
        jueves_tarde2: horarioPractica.jueves.tarde2,
        viernes_manana1: horarioPractica.viernes.mañana1,
        viernes_manana2: horarioPractica.viernes.mañana2,
        viernes_tarde1: horarioPractica.viernes.tarde1,
        viernes_tarde2: horarioPractica.viernes.tarde2,
        sabado_manana1: horarioPractica.sabado.mañana1,
        sabado_manana2: horarioPractica.sabado.mañana2,
        sabado_tarde1: horarioPractica.sabado.tarde1,
        sabado_tarde2: horarioPractica.sabado.tarde2,
        id_estado_inscripcion: 1,
        id_inscribe: parseInt(idInscribe, 10),
        observaciones: "",
      };

      const responseInscripcion = await clienteAxios.post(
        "/inscripcion/create",
        formDataInscripcion
      );
      console.log("Inscripción creada con éxito:", responseInscripcion.data);

      // Redirige a la página /mi_practica después de la inscripción exitosa
      navigate("/mi_practica");
    } catch (error) {
      console.error(
        "Error al crear la empresa, supervisor o inscripción:",
        error
      );
    }
  };

  const steps = [
    {
      label: "Datos de la práctica",
      content: (
        <DatosPractica
          practica={parseInt(practica,10)}
          setPractica={setPractica}
          fechaRecepcion={fechaRecepcion}
          modalidad={modalidad}
          setModalidad={setModalidad}
        />
      ),
    },
    {
      label: "Datos del estudiante",
      content: (
        <DatosEstudiante
          nombreEstudiante={nombreEstudiante}
          setNombreEstudiante={setNombreEstudiante}
          run={run}
          setRun={setRun}
          emailEstudiante={emailEstudiante}
          setEmailEstudiante={setEmailEstudiante}
          celular={celular}
          setCelular={setCelular}
          direccionEstudiante={direccionEstudiante}
          setDireccionEstudiante={setDireccionEstudiante}
          fonoEmergencia={fonoEmergencia}
          setFonoEmergencia={setFonoEmergencia}
        />
      ),
    },
    {
      label: "Datos de la empresa",
      content: (
        <DatosEmpresa
          nombreEmpresa={nombreEmpresa}
          setNombreEmpresa={setNombreEmpresa}
          deptoArea={deptoArea}
          setDeptoArea={setDeptoArea}
          paginaWeb={paginaWeb}
          setPaginaWeb={setPaginaWeb}
          rubro={rubro}
          setRubro={setRubro}
          fonoEmpresa={fonoEmpresa}
          setFonoEmpresa={setFonoEmpresa}
          direccionEmpresa={direccionEmpresa}
          setDireccionEmpresa={setDireccionEmpresa}
          ciudadSeleccionada={parseInt(ciudadSeleccionada, 10)}
          handleChangeCiudad={handleChangeCiudad}
          ciudades={ciudades}
        />
      ),
    },
    {
      label: "Datos del supervisor",
      content: (
        <DatosSupervisor
          nombreSupervisor={nombreSupervisor}
          setNombreSupervisor={setNombreSupervisor}
          cargoSupervisor={cargoSupervisor}
          setCargoSupervisor={setCargoSupervisor}
          fonoSupervisor={fonoSupervisor}
          setFonoSupervisor={setFonoSupervisor}
          emailSupervisor={emailSupervisor}
          setEmailSupervisor={setEmailSupervisor}
        />
      ),
    },
    {
      label: "Breve descripción del área de desarrollo",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Breve descripción del área de desarrollo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción del Área"
              value={descripcionArea}
              onChange={handleDescripcionAreaChange}
              variant="outlined"
              margin="normal"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Objetivo(s) de la práctica",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Objetivo(s) de la práctica
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Objetivos de la Práctica"
              value={objetivosPractica}
              onChange={handleObjetivosPracticaChange}
              variant="outlined"
              margin="normal"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Actividades a desarrollar",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Actividades a desarrollar
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Actividades a Desarrollar"
              value={actividadesDesarrollar}
              onChange={handleActividadesDesarrollarChange}
              variant="outlined"
              margin="normal"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Horario de la práctica",
      content: (
        <HorarioPractica
          fechaInicio={fechaInicio}
          handleFechaInicioChange={handleFechaInicioChange}
          fechaFin={fechaFin}
          handleFechaFinChange={handleFechaFinChange}
          diasSemana={diasSemana}
          horarioPractica={horarioPractica}
          handleTimeChange={handleTimeChange}
        />
      ),
    },
  ];

  return (
    <Card style={{ padding: "20px", marginBottom: "20px" }}>
      {steps[activeStep].content}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            style={{ marginRight: "10px" }}
          >
            Atrás
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FormularioInscripcion;
