import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import clienteAxios from "../../../helpers/clienteaxios";

const FormularioInscripcion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ciudades, setCiudades] = useState([]);
  const [practica, setPractica] = useState("");
  const [idInscribe, setIdInscribe] = useState("");

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await clienteAxios.get("/ciudades/getCiudades");
        setCiudades(response.data.ciudad); // Actualiza el estado con el arreglo de ciudades
      } catch (error) {
        console.error("Error al obtener las ciudades:", error);
      }
    };

    fetchCiudades();
  }, []);

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
      setIdInscribe(idInscribeLocalStorage);
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
      console.log(practicaRegistrada);

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
  const [ciudad, setCiudad] = useState("");
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

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [fechaInicioError, setFechaInicioError] = useState(false);
  const [fechaFinError, setFechaFinError] = useState(false);

  const fechaRecepcion = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

  const handleFechaInicioChange = (e) => {
    const fechaActual = new Date().toISOString().split("T")[0];
    const nuevaFechaInicio = e.target.value;
    setFechaInicio(nuevaFechaInicio);

    if (nuevaFechaInicio < fechaActual) {
      setFechaInicioError(true);
    } else {
      setFechaInicioError(false);
    }

    if (fechaFin && new Date(nuevaFechaInicio) > new Date(fechaFin)) {
      setFechaFin("");
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFechaFin = e.target.value;
    const fechaMinimaFin = new Date(fechaInicio);
    fechaMinimaFin.setDate(fechaMinimaFin.getDate() + 30);

    setFechaFin(nuevaFechaFin);

    if (new Date(nuevaFechaFin) < fechaMinimaFin) {
      setFechaFinError(true);
    } else {
      setFechaFinError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log("Formulario enviado con éxito:", {
      practica,
      fechaRecepcion,
      modalidad,
      nombreEstudiante,
      run,
      emailEstudiante,
      celular,
      direccionEstudiante,
      fonoEmergencia,
      nombreEmpresa,
      deptoArea,
      paginaWeb,
      rubro,
      fonoEmpresa,
      direccionEmpresa,
      ciudad,
      nombreSupervisor,
      cargoSupervisor,
      fonoSupervisor,
      emailSupervisor,
      descripcionArea,
      objetivosPractica,
      actividadesDesarrollar,
      horarioPractica,
      fechaInicio,
      fechaFin,
    });
    // Aquí podrías enviar los datos del formulario a través de una API o hacer alguna acción adicional
  };

  const steps = [
    {
      label: "Datos",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Datos de la práctica
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="practica-label">Práctica</InputLabel>
              <Select
                labelId="practica-label"
                id="practica"
                value={practica}
                onChange={(e) => setPractica(e.target.value)}
                label="Práctica"
                disabled
              >
                <MenuItem value="620509">Práctica 1</MenuItem>
                <MenuItem value="620520">Práctica 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fecha de Recepción"
              value={fechaRecepcion}
              disabled
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="modalidad-label">Modalidad</InputLabel>
              <Select
                labelId="modalidad-label"
                id="modalidad"
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                label="Modalidad"
              >
                <MenuItem value="1">Presencial</MenuItem>
                <MenuItem value="2">Online</MenuItem>
                <MenuItem value="3">Pasantía</MenuItem>
                <MenuItem value="4">Training</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Datos del estudiante",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Datos del estudiante
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre del Estudiante"
              value={nombreEstudiante}
              onChange={(e) => setNombreEstudiante(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="RUN"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email del Estudiante"
              value={emailEstudiante}
              onChange={(e) => setEmailEstudiante(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Celular"
              type="text"
              placeholder="9xxxxxxxx"
              inputProps={{ maxLength: 9 }}
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Dirección del Estudiante"
              value={direccionEstudiante}
              onChange={(e) => setDireccionEstudiante(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fono de Emergencia"
              type="text"
              placeholder="9xxxxxxxx"
              inputProps={{ maxLength: 9 }}
              value={fonoEmergencia}
              onChange={(e) => setFonoEmergencia(e.target.value)}
              variant="outlined"
              margin="normal"
              disabled
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Datos de la empresa",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Datos de empresa
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre de la Empresa"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Departamento o Área"
              value={deptoArea}
              onChange={(e) => setDeptoArea(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Página Web"
              value={paginaWeb}
              onChange={(e) => setPaginaWeb(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Rubro"
              value={rubro}
              onChange={(e) => setRubro(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fono de la Empresa"
              type="text"
              placeholder="9xxxxxxxx"
              inputProps={{ maxLength: 9 }}
              value={fonoEmpresa}
              onChange={(e) => setFonoEmpresa(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Dirección de la Empresa"
              value={direccionEmpresa}
              onChange={(e) => setDireccionEmpresa(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="ciudad-label">Ciudad</InputLabel>
              <Select
                labelId="ciudad-label"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                label="Ciudad"
              >
                {ciudades.map((ciudad) => (
                  <MenuItem key={ciudad.id_ciudad} value={ciudad.nombre}>
                    {ciudad.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Datos del supervisor",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Datos del supervisor
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre del Supervisor"
              value={nombreSupervisor}
              onChange={(e) => setNombreSupervisor(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cargo del Supervisor"
              value={cargoSupervisor}
              onChange={(e) => setCargoSupervisor(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fono del Supervisor"
              type="text"
              placeholder="9xxxxxxxx"
              inputProps={{ maxLength: 9 }}
              value={fonoSupervisor}
              onChange={(e) => setFonoSupervisor(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="email"
              placeholder="corre@dominio.cl"
              label="Email del Supervisor"
              value={emailSupervisor}
              onChange={(e) => setEmailSupervisor(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
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
              onChange={(e) => setDescripcionArea(e.target.value)}
              variant="outlined"
              margin="normal"
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
              onChange={(e) => setObjetivosPractica(e.target.value)}
              variant="outlined"
              margin="normal"
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
              onChange={(e) => setActividadesDesarrollar(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Horario de la práctica",
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" marginBottom={5}>
              Horario de la práctica
            </Typography>
          </Grid>

          <Grid container spacing={2} marginLeft={0.06}>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Fecha de inicio de la práctica
              </Typography>
              <TextField
                id="fecha_inicio"
                label="Fecha de inicio"
                type="date"
                value={fechaInicio}
                onChange={handleFechaInicioChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={fechaInicioError}
                helperText={
                  fechaInicioError
                    ? "La fecha de inicio no puede ser anterior a la fecha actual"
                    : ""
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Fecha de fin de la práctica
              </Typography>
              <TextField
                id="fecha_fin"
                label="Fecha de fin"
                type="date"
                value={fechaFin}
                onChange={handleFechaFinChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={fechaFinError}
                helperText={
                  fechaFinError
                    ? "La fecha de fin debe ser al menos 30 días después de la fecha de inicio"
                    : ""
                }
                fullWidth
                disabled={!fechaInicio}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Lunes</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.lunes.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      lunes: {
                        ...horarioPractica.lunes,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.lunes.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      lunes: {
                        ...horarioPractica.lunes,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.lunes.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      lunes: {
                        ...horarioPractica.lunes,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.lunes.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      lunes: {
                        ...horarioPractica.lunes,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Martes</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.martes.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      martes: {
                        ...horarioPractica.martes,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.martes.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      martes: {
                        ...horarioPractica.martes,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.martes.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      martes: {
                        ...horarioPractica.martes,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.martes.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      martes: {
                        ...horarioPractica.martes,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Miércoles</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.miercoles.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      miercoles: {
                        ...horarioPractica.miercoles,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.miercoles.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      miercoles: {
                        ...horarioPractica.miercoles,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.miercoles.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      miercoles: {
                        ...horarioPractica.miercoles,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.miercoles.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      miercoles: {
                        ...horarioPractica.miercoles,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Jueves</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.jueves.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      jueves: {
                        ...horarioPractica.jueves,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.jueves.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      jueves: {
                        ...horarioPractica.jueves,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.jueves.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      jueves: {
                        ...horarioPractica.jueves,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.jueves.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      jueves: {
                        ...horarioPractica.jueves,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Viernes</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.viernes.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      viernes: {
                        ...horarioPractica.viernes,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.viernes.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      viernes: {
                        ...horarioPractica.viernes,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.viernes.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      viernes: {
                        ...horarioPractica.viernes,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.viernes.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      viernes: {
                        ...horarioPractica.viernes,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Sábado</Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Mañana"
                  value={horarioPractica.sabado.mañana1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      sabado: {
                        ...horarioPractica.sabado,
                        mañana1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Mañana"
                  value={horarioPractica.sabado.mañana2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      sabado: {
                        ...horarioPractica.sabado,
                        mañana2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Inicio Tarde"
                  value={horarioPractica.sabado.tarde1}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      sabado: {
                        ...horarioPractica.sabado,
                        tarde1: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="time"
                  label="Fin Tarde"
                  value={horarioPractica.sabado.tarde2}
                  onChange={(e) =>
                    setHorarioPractica({
                      ...horarioPractica,
                      sabado: {
                        ...horarioPractica.sabado,
                        tarde2: e.target.value,
                      },
                    })
                  }
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
