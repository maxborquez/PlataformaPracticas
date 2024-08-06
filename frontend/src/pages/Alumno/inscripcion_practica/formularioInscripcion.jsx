import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import FormPractica from "./components/FormPractica";
import FormEstudiante from "./components/FormEstudiante";
import FormEmpresa from "./components/FormEmpresa";
import FormSupervisor from "./components/FormSupervisor";
import FormDescripcion from "./components/FormDescripcion";
import FormHorarios from "./components/FormHorarios";

const FormularioInscripcion = () => {
  const navigate = useNavigate();
  const { id_oferta } = useParams();

  const getLocalDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset(); // Obtiene la diferencia en minutos entre UTC y la zona horaria local
    const localDate = new Date(today.getTime() - offset * 60 * 1000); // Ajusta la fecha a la zona horaria local
    return localDate.toISOString().split("T")[0];
  };

  const [practica, setPractica] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState(getLocalDate());
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
  const [profesionSupervisor, setProfesionSupervisor] = useState("");
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

  const [idInscribe, setIdInscribe] = useState("");

  useEffect(() => {
    const storedIdInscribe = localStorage.getItem("id_inscribe");
    if (storedIdInscribe) {
      setIdInscribe(storedIdInscribe);
    }
  }, []);

  useEffect(() => {
    // Realiza la petición a la API cuando el id_oferta esté disponible
    if (id_oferta) {
      clienteAxios
        .get(`/oferta/show/${id_oferta}`)
        .then((response) => {
          if (response.data.oferta) {
            const oferta = response.data.oferta;
            console.log("Oferta:", oferta);
            const empresa = oferta.empresa;
            setNombreEmpresa(empresa.nombre);
            setDepartamento(empresa.departamento);
            setPaginaWeb(empresa.web);
            setRubro(empresa.rubro.id_rubro);
            setFonoEmpresa(empresa.telefono);
            setDireccionEmpresa(empresa.direccion);

            // Asignar otras variables si es necesario
            setModalidad(oferta.modalidad.id_modalidad);
          }
        })
        .catch((error) => {
          console.error("Error al obtener la oferta:", error);
          // Maneja el error si es necesario
        });
    }
  }, [id_oferta]);

  const handleSubmit = async () => {
    try {
      // 1. Crear la empresa
      const empresaResponse = await clienteAxios.post("/empresa/create", {
        nombre: nombreEmpresa,
        departamento: departamento,
        web: paginaWeb,
        id_rubro: parseInt(rubro, 10),
        telefono: fonoEmpresa,
        direccion: direccionEmpresa,
        id_comuna: parseInt(comuna, 10),
        id_estado_empresa: 1,
      });

      // Obtén el ID de empresa creado
      const id_empresa = empresaResponse.data.id_empresa;
      console.log("ID de empresa:", id_empresa);

      // 2. Crear el supervisor
      const supervisorResponse = await clienteAxios.post("/supervisor/create", {
        nombre: nombreSupervisor,
        profesion: profesionSupervisor,
        telefono: fonoSupervisor,
        correo: emailSupervisor,
        cargo: cargoSupervisor,
        id_empresa: parseInt(id_empresa, 10),
        id_estado_supervisor: 1,
      });

      // Obtén el ID de supervisor creado
      const id_supervisor = supervisorResponse.data.id_supervisor;
      console.log("ID de supervisor:", id_supervisor);

      // 3. Crear la inscripción
      const inscripcionResponse = await clienteAxios.post(
        "/inscripcion/create",
        {
          id_modalidad: parseInt(modalidad, 10),
          descripcion: areaDesarrollo,
          objetivos: objetivosPractica,
          actividades: actividadesDesarrollar,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaTermino,
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
          id_estado_inscripcion: 4,
          id_inscribe: parseInt(idInscribe, 10),
          observaciones: "", // Puedes agregar observaciones si es necesario
        }
      );

      Swal.fire({
        title: "Éxito",
        text: "Inscripción creada correctamente.\nNo olvide subir su documento de inscripción.",
        icon: "success",
        confirmButtonText: "Aceptar",
        didOpen: () => {
          Swal.getHtmlContainer().style.whiteSpace = "pre-line";
        },
      }).then(() => {
        navigate(`/mi_practica`);
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al crear la inscripción.\n Es posible que uno o mas campos sean incorrectos.",
        icon: "error",
        confirmButtonText: "Aceptar",
        didOpen: () => {
          Swal.getHtmlContainer().style.whiteSpace = "pre-line";
        },
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
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
          profesionSupervisor={profesionSupervisor}
          cargoSupervisor={cargoSupervisor}
          fonoSupervisor={fonoSupervisor}
          emailSupervisor={emailSupervisor}
          setNombreSupervisor={setNombreSupervisor}
          setProfesionSupervisor={setProfesionSupervisor}
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

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar inscripción
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormularioInscripcion;
