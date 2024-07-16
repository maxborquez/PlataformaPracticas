import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormPractica from "./components/FormPractica";
import FormEstudiante from "./components/FormEstudiante";
import FormEmpresa from "./components/FormEmpresa";
import FormSupervisor from "./components/FormSupervisor";
import FormDescripcion from "./components/FormDescripcion";
import FormHorarios from "./components/FormHorarios";

const FormularioInscripcion = () => {
  const [practica, setPractica] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [modalidad, setModalidad] = useState("");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [run, setRun] = useState("");
  const [emailEstudiante, setEmailEstudiante] = useState("");
  const [celular, setCelular] = useState("");
  const [direccionEstudiante, setDireccionEstudiante] = useState("");
  const [fonoEmergencia, setFonoEmergencia] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [paginaWeb, setPaginaWeb] = useState("");
  const [rubro, setRubro] = useState("");
  const [fonoEmpresa, setFonoEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [region, setRegion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [comuna, setComuna] = useState("");
  const [nombreSupervisor, setNombreSupervisor] = useState("");
  const [cargoSupervisor, setCargoSupervisor] = useState("");
  const [fonoSupervisor, setFonoSupervisor] = useState("");
  const [emailSupervisor, setEmailSupervisor] = useState("");
  const [areaDesarrollo, setAreaDesarrollo] = useState("");
  const [objetivosPractica, setObjetivosPractica] = useState("");
  const [actividadesDesarrollar, setActividadesDesarrollar] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [horarioPractica, setHorarioPractica] = useState({
    lunes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    martes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    miercoles: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    jueves: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    viernes: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
    sabado: { mañana1: "", mañana2: "", tarde1: "", tarde2: "" },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Formulario de Inscripción
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormPractica
          practica={practica}
          fechaRecepcion={fechaRecepcion}
          modalidad={modalidad}
          setPractica={setPractica}
          setFechaRecepcion={setFechaRecepcion}
          setModalidad={setModalidad}
        />
      </Grid>
      <Grid item xs={12}>
        <FormEstudiante
          nombreEstudiante={nombreEstudiante}
          run={run}
          emailEstudiante={emailEstudiante}
          celular={celular}
          direccionEstudiante={direccionEstudiante}
          fonoEmergencia={fonoEmergencia}
          setNombreEstudiante={setNombreEstudiante}
          setRun={setRun}
          setEmailEstudiante={setEmailEstudiante}
          setCelular={setCelular}
          setDireccionEstudiante={setDireccionEstudiante}
          setFonoEmergencia={setFonoEmergencia}
        />
      </Grid>
      <Grid item xs={12}>
        <FormEmpresa
          nombreEmpresa={nombreEmpresa}
          departamento={departamento}
          paginaWeb={paginaWeb}
          rubro={rubro}
          fonoEmpresa={fonoEmpresa}
          direccionEmpresa={direccionEmpresa}
          region={region}
          provincia={provincia}
          comuna={comuna}
          setNombreEmpresa={setNombreEmpresa}
          setDepartamento={setDepartamento}
          setPaginaWeb={setPaginaWeb}
          setRubro={setRubro}
          setFonoEmpresa={setFonoEmpresa}
          setDireccionEmpresa={setDireccionEmpresa}
          setRegion={setRegion}
          setProvincia={setProvincia}
          setComuna={setComuna}
        />
      </Grid>
      <Grid item xs={12}>
        <FormSupervisor
          nombreSupervisor={nombreSupervisor}
          cargoSupervisor={cargoSupervisor}
          fonoSupervisor={fonoSupervisor}
          emailSupervisor={emailSupervisor}
          setNombreSupervisor={setNombreSupervisor}
          setCargoSupervisor={setCargoSupervisor}
          setFonoSupervisor={setFonoSupervisor}
          setEmailSupervisor={setEmailSupervisor}
        />
      </Grid>
      <Grid item xs={12}>
        <FormDescripcion
          areaDesarrollo={areaDesarrollo}
          objetivosPractica={objetivosPractica}
          actividadesDesarrollar={actividadesDesarrollar}
          setAreaDesarrollo={setAreaDesarrollo}
          setObjetivosPractica={setObjetivosPractica}
          setActividadesDesarrollar={setActividadesDesarrollar}
        />
      </Grid>
      <Grid item xs={12}>
        <FormHorarios
          fechaInicio={fechaInicio}
          fechaTermino={fechaTermino}
          setFechaInicio={setFechaInicio}
          setFechaTermino={setFechaTermino}
          horarioPractica={horarioPractica}
          setHorarioPractica={setHorarioPractica}
        />
      </Grid>
      {/* Puedes agregar más secciones aquí */}
    </Grid>
  );
};

export default FormularioInscripcion;
