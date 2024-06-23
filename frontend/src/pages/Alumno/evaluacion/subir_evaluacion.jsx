import { Alert, Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import clienteAxios from "../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CopyAllOutlined } from "@mui/icons-material";

const SubirEvaluacion = ({ id }) => {
  const [nombre, setNombre] = useState("");
  const [extension, setExtension] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [isPdf, setPdf] = useState(true);
  const [archivoExistente, setArchivoExistente] = useState(false);
  const inputFileRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Verificar si ya existe un archivo subido
    const verificarArchivoExistente = async () => {
      try {
        const response = await clienteAxios.get("/archivoevaluacion/tabla_vacia");
        setArchivoExistente(!response.data.isEmpty);
      } catch (error) {
        console.error("Error al verificar archivo existente:", error);
      }
    };

    verificarArchivoExistente();
  }, []);

  useEffect(() => {
    if (archivo) {
      setNombre(archivo.name);
      setExtension(archivo.name.split(".")[1]);
    }
  }, [archivo]);

  const handleArchivoSeleccionado = (e) => {
    if (e.target.files[0]?.name.includes(".pdf")) {
      setPdf(false);
      setArchivo(e.target.files[0]);
    } else {
      setPdf(true);
      setArchivo(null);
      Swal.fire({
        title: "Error",
        text: "El tipo de archivo no es pdf",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
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
    formData.append("id_inscripcion", Number(id));
    formData.append("tipo_documento", "Evaluacion");
    formData.append("archivo", archivo);

    try {
      const response = await clienteAxios.post("/archivoevaluacion/create", formData);
      Swal.fire({
        title: "Éxito",
        text: "Archivo subido correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      queryClient.invalidateQueries("archivos");
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al subir el archivo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
      <Grid container spacing={2} sx={{ flexDirection: "column", alignItems: "center" }}>
        <Grid item>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            component="label"
            startIcon={<CopyAllOutlined />}
            disabled={archivoExistente} // Desactivar botón si ya existe un archivo
          >
            Seleccionar Archivo
            <input
              type="file"
              hidden
              ref={inputFileRef}
              onChange={handleArchivoSeleccionado}
              disabled={archivoExistente} // Desactivar input si ya existe un archivo
            />
          </Button>
        </Grid>
        {!isPdf && (
          <Grid item>
            <Alert severity="success">Archivo PDF seleccionado: {archivo?.name}</Alert>
          </Grid>
        )}
        {archivoExistente && (
          <Grid item>
            <Alert severity="warning">Ya existe un archivo subido. Elimine el archivo existente antes de subir uno nuevo.</Alert>
          </Grid>
        )}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isPdf || archivoExistente}
          >
            Subir Archivo
          </Button>
        </Grid>
      </Grid>
  );
};

export default SubirEvaluacion;
