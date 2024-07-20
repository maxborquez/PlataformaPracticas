import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CopyAllOutlined } from "@mui/icons-material";

const SubirArchivoInscripcion = ({ id, hasExistingFile, setUpdateFiles }) => {
  const [nombre, setNombre] = useState("");
  const [extension, setExtension] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [isPdf, setPdf] = useState(true);
  const inputFileRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (archivo) {
      setNombre(archivo.name);
      setExtension(archivo.name.split(".")[1]);
    }
  }, [archivo]);

  const handleArchivoSeleccionado = (e) => {
    const file = e.target.files[0];
    const validExtensions = [".pdf"];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (validExtensions.includes(`.${fileExtension}`)) {
        setPdf(false);
        setArchivo(file);
      } else {
        setPdf(true);
        setArchivo(null);
        Swal.fire({
          title: "Error",
          text: "El tipo de archivo no es .pdf",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      // Manejo del error si no se seleccionó ningún archivo
      Swal.fire({
        title: "Error",
        text: "No se ha seleccionado ningún archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("tipo_archivo", extension);
    formData.append("archivo", archivo);
    formData.append("id_inscripcion", id);
    formData.append("tipo_documento", "Inscripcion");

    try {
      await clienteAxios.post("/archivoinscripcion/create", formData);

      // Llamar a la función para actualizar el estado de la inscripción
      await clienteAxios.post("/inscripcion/updatestado", {
        id_estado_inscripcion: 1, // El nuevo estado de la inscripción
        id_inscripcion: Number(id),
      });

      Swal.fire({
        title: "Éxito",
        text: "Archivo subido correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setUpdateFiles((prev) => !prev); // Actualizar el estado para desencadenar la actualización de archivos
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al subir el archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al subir el archivo:", error);
    }

    setArchivo(null);
    setNombre("");
    if (inputFileRef.current) {
      inputFileRef.current.value = null; // Limpia el valor del input file
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleArchivoSeleccionado}
              style={{ display: "none" }}
              id="archivo"
            />
            <label htmlFor="archivo">
              <Button
                variant="contained"
                component="span"
                startIcon={<CopyAllOutlined />}
                disabled={hasExistingFile}
              >
                {hasExistingFile ? "Ya existe un archivo" : "Seleccionar archivo"}
              </Button>
            </label>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            {archivo ? archivo.name : "Ningún archivo seleccionado"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!archivo || hasExistingFile}
            >
              Subir archivo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubirArchivoInscripcion;
