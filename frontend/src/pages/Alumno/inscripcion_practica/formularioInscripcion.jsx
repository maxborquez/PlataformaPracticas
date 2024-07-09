import { useState } from "react";
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

const FormularioInscripcion = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [practica, setPractica] = useState("");
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

  const fechaRecepcion = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

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
              >
                <MenuItem value="Práctica 1">Práctica 1</MenuItem>
                <MenuItem value="Práctica 2">Práctica 2</MenuItem>
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
                <MenuItem value="Presencial">Presencial</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Pasantía">Pasantía</MenuItem>
                <MenuItem value="Training">Training</MenuItem>
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              variant="outlined"
              margin="normal"
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Fono de Emergencia"
              value={fonoEmergencia}
              onChange={(e) => setFonoEmergencia(e.target.value)}
              variant="outlined"
              margin="normal"
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
            <TextField
              fullWidth
              label="Ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              variant="outlined"
              margin="normal"
            />
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
              value={fonoSupervisor}
              onChange={(e) => setFonoSupervisor(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
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
            <Typography variant="h5" gutterBottom>
              Horario de la práctica
            </Typography>
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
