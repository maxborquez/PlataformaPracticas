import { useState, useEffect } from "react";
import { Card, CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import clienteAxios from "../../../../helpers/clienteaxios";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";

const MostrarArchivoArchivoInscripcion = ({ id, setHasExistingFile }) => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const response = await clienteAxios.post("/archivoinscripcion/getall", { id_inscripcion: id });
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
      name: "estado_archivo_inscripcion",
      label: "Estado del Archivo Inscripcion",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value?.nombre_estado_archivo_inscripcion || "Desconocido";
        },
      },
    }
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

export default MostrarArchivoArchivoInscripcion;