import React, { useEffect, useState } from "react";
import axios from "axios";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import clienteAxios from "../../../../helpers/clienteaxios";
import { Grid, Button } from "@mui/material";

const GenerarWord = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(`/inscripcion/show/${id}`);
        console.log(response);
        setData(response.data.inscripcion);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  function formatUTCTime(dateString) {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    //const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const generateDocument = () => {
    if (!data) return;

    // Load the Word template
    const loadFile = (url, callback) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status === 200) {
          callback(null, xhr.response);
        } else {
          callback(new Error(xhr.statusText), null);
        }
      };
      xhr.onerror = () => {
        callback(new Error("Network error"), null);
      };
      xhr.send();
    };

    loadFile("../../../../../public/plantilla.docx", (error, content) => {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Map API data to template variables
      const asignatura = data.inscribe.id_asignatura;
      const modality = data.modalidad.nombre_modalidad;

      const templateData = {
        p1: asignatura === 620509 ? "x" : "",
        p2: asignatura === 620520 ? "x" : "",
        fecha_recepcion: new Date(
          data.fecha_inscripcion_practica
        ).toLocaleDateString("es-ES", {
          timeZone: "UTC",
        }),
        presencial: modality === "Presencial" ? "x" : "",
        online: modality === "Online" ? "x" : "",
        pasantia: modality === "Pasantia" ? "x" : "",
        training: modality === "Training" ? "x" : "",
        nombre_estudiante: `${data.inscribe.alumno.primer_nombre} ${data.inscribe.alumno.segundo_nombre} ${data.inscribe.alumno.apellido_paterno} ${data.inscribe.alumno.apellido_materno}`,
        run: data.inscribe.alumno.rut,
        email: data.inscribe.alumno.correo_institucional,
        celular: data.inscribe.alumno.telefono_personal,
        direccion_estudiante: data.inscribe.alumno.direccion_particular,
        fono_emergencia: data.inscribe.alumno.telefono_familiar,
        nombre_empresa: data.empresa.nombre,
        dpto: data.empresa.departamento,
        web: data.empresa.web,
        rubro: data.empresa.rubro.nombre_rubro,
        fono_empresa: data.empresa.telefono,
        direccion_empresa: data.empresa.direccion,
        nombre_supervisor: data.supervisor.nombre,
        profesion: data.supervisor.profesion,
        cargo: data.supervisor.cargo,
        fono_supervisor: data.supervisor.telefono,
        email_supervisor: data.supervisor.correo,
        descripcion: data.descripcion,
        objetivos: data.objetivos,
        actividades: data.actividades,
        fecha_inicio: new Date(data.fecha_inicio).toLocaleDateString("es-ES", {
          timeZone: "UTC",
        }),
        fecha_termino: new Date(data.fecha_fin).toLocaleDateString("es-ES", {
          timeZone: "UTC",
        }),
        L_inicio_m: data.lunes_manana1 ? formatUTCTime(data.lunes_manana1) : "",
        L_fin_m: data.lunes_manana2 ? formatUTCTime(data.lunes_manana2) : "",
        L_inicio_t: data.lunes_tarde1 ? formatUTCTime(data.lunes_tarde1) : "",
        L_fin_t: data.lunes_tarde2 ? formatUTCTime(data.lunes_tarde2) : "",
        M_inicio_m: data.martes_manana1
          ? formatUTCTime(data.martes_manana1)
          : "",
        M_fin_m: data.martes_manana2 ? formatUTCTime(data.martes_manana2) : "",
        M_inicio_t: data.martes_tarde1 ? formatUTCTime(data.martes_tarde1) : "",
        M_fin_t: data.martes_tarde2 ? formatUTCTime(data.martes_tarde2) : "",
        MM_inicio_m: data.miercoles_manana1
          ? formatUTCTime(data.miercoles_manana1)
          : "",
        MM_fin_m: data.miercoles_manana2
          ? formatUTCTime(data.miercoles_manana2)
          : "",
        MM_inicio_t: data.miercoles_tarde1
          ? formatUTCTime(data.miercoles_tarde1)
          : "",
        MM_fin_t: data.miercoles_tarde2
          ? formatUTCTime(data.miercoles_tarde2)
          : "",
        J_inicio_m: data.jueves_manana1
          ? formatUTCTime(data.jueves_manana1)
          : "",
        J_fin_m: data.jueves_manana2 ? formatUTCTime(data.jueves_manana2) : "",
        J_inicio_t: data.jueves_tarde1 ? formatUTCTime(data.jueves_tarde1) : "",
        J_fin_t: data.jueves_tarde2 ? formatUTCTime(data.jueves_tarde2) : "",
        V_inicio_m: data.viernes_manana1
          ? formatUTCTime(data.viernes_manana1)
          : "",
        V_fin_m: data.viernes_manana2
          ? formatUTCTime(data.viernes_manana2)
          : "",
        V_inicio_t: data.viernes_tarde1
          ? formatUTCTime(data.viernes_tarde1)
          : "",
        V_fin_t: data.viernes_tarde2 ? formatUTCTime(data.viernes_tarde2) : "",
        S_inicio_m: data.sabado_manana1
          ? formatUTCTime(data.sabado_manana1)
          : "",
        S_fin_m: data.sabado_manana2 ? formatUTCTime(data.sabado_manana2) : "",
        S_inicio_t: data.sabado_tarde1 ? formatUTCTime(data.sabado_tarde1) : "",
        S_fin_t: data.sabado_tarde2 ? formatUTCTime(data.sabado_tarde2) : "",
      };

      doc.setData(templateData);

      try {
        doc.render();
      } catch (error) {
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({ error: e }));
        throw error;
      }

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, "nombre_apellido_practica.docx");
    });
  };

  return (
    <Button onClick={generateDocument} variant="contained" color="primary">
      Generar Documento
    </Button>
  );
};

export default GenerarWord;
