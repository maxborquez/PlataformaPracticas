import { useState, useEffect } from "react";
import { Card, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import clienteAxios from "../../../../helpers/clienteaxios";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const MostrarArchivoInforme = ({ id, setHasExistingFile }) => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const response = await clienteAxios.post("/archivoinforme/getall", { id_inscripcion: id });
        if (response.data.archivos) {
          setArchivos(response.data.archivos);
          setHasExistingFile(response.data.archivos.length > 0);
        } else {
          setArchivos([]);
          setHasExistingFile(false);
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
        setHasExistingFile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivos();
  }, [id, setHasExistingFile]);

  const handleDelete = async (archivoId) => {
    try {
      const archivo = archivos.find((archivo) => archivo.id_archivo_informe === archivoId);
      const estadoInforme = archivo.estado_informe?.nombre_estado_informe;

      if (estadoInforme === "Aprobado") {
        Swal.fire({
          title: "Error",
          text: "El archivo no puede ser eliminado porque ya ha sido aprobado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

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
        await clienteAxios.delete(`/archivoinforme/delete/${archivoId}`);
        setArchivos(archivos.filter(archivo => archivo.id_archivo_informe !== archivoId));
        setHasExistingFile(archivos.length > 1);
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
      name: "estado_informe",
      label: "Estado del Informe",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value?.nombre_estado_informe || "Desconocido";
        },
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const archivoId = archivos[tableMeta.rowIndex].id_archivo_informe;
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
    <MUIDataTable
      title={"Archivo subido actualmente"}
      data={archivos}
      columns={columns}
      options={options}
    />
  );
};

export default MostrarArchivoInforme;
