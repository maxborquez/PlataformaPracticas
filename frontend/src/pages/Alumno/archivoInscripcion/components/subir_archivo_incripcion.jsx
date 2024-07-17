import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CopyAllOutlined } from "@mui/icons-material";

const SubirArchivoInscripcion = ({ id, hasExistingFile }) => {
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
    formData.append("id_inscripcion", Number(id));
    formData.append("tipo_documento", "ArchivoInscripcion");
    formData.append("archivo", archivo);

    try {
      // Subir el archivo al servidor
      const response = await clienteAxios.post(
        "/archivoinscripcion/create",
        formData
      );
      Swal.fire({
        title: "Éxito",
        text: "Archivo subido correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Llamar a la función para actualizar el estado de la inscripción
      await clienteAxios.post("/inscripcion/updatestado", {
        id_estado_inscripcion: 1, // El nuevo estado de la inscripción
        id_inscripcion: Number(id),
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
    <Grid
      container
      spacing={2}
      sx={{ flexDirection: "column", alignItems: "center" }}
    >
      <Grid item>
        <Button
          variant="contained"
          component="label"
          startIcon={<CopyAllOutlined />}
          disabled={hasExistingFile}
        >
          Seleccionar Archivo
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleArchivoSeleccionado}
          />
        </Button>
      </Grid>
      {!isPdf && (
        <Grid item>
          <Alert severity="success">
            Archivo PDF seleccionado: {archivo?.name}
          </Alert>
        </Grid>
      )}
      {hasExistingFile ? (
        <Grid item>
          <Alert severity="info">
            Ya existe un archivo de inscripcion subido. Si desea subir uno nuevo
            debe borrar el actual.
          </Alert>
        </Grid>
      ) : (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isPdf || hasExistingFile}
          >
            Subir Archivo
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default SubirArchivoInscripcion;
