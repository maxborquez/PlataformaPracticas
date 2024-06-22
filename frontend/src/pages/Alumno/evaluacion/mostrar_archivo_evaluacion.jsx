import { useState, useEffect } from "react";
import { Card, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import clienteAxios from "../../../helpers/clienteaxios";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const MostrarArchivoEvaluacion = ({ id }) => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const response = await clienteAxios.post("/archivoevaluacion/getall", { id_inscripcion: id });
        if (response.data.archivos) {
          setArchivos(response.data.archivos);
        } else {
          setArchivos([]);
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivos();
  }, [id]);

  const handleDelete = async (archivoId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        await clienteAxios.delete(`/archivoevaluacion/delete/${archivoId}`);
        setArchivos(archivos.filter(archivo => archivo.id_archivo_evaluacion !== archivoId));
        Swal.fire(
          'Eliminado!',
          'El archivo ha sido eliminado.',
          'success'
        ).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      Swal.fire(
        'Error',
        'Hubo un problema al eliminar el archivo.',
        'error'
      );
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const columns = [
    {
      name: "nombre",
      label: "Nombre del Archivo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipo_archivo",
      label: "Tipo de Archivo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "tipo_documento",
      label: "Tipo de Documento",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const archivoId = archivos[tableMeta.rowIndex].id_archivo_evaluacion;
          return (
            <IconButton onClick={() => handleDelete(archivoId)}>
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none",
    sort: false,
  };

  return (
    <Card sx={{ padding: "20px", backgroundColor: "white", width: "100%" }}>
      <MUIDataTable
        title={"Archivo subido actualmente"}
        data={archivos}
        columns={columns}
        options={options}
      />
    </Card>
  );
};

export default MostrarArchivoEvaluacion;
