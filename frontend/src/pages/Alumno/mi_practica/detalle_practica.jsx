import {
  Grid,
  CircularProgress,
  Tooltip,
  Typography,
  Alert,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import {
  CheckCircleOutline,
  Delete,
  DoNotDisturb,
  Edit,
  FileCopy,
  TimerOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import BookIcon from "@mui/icons-material/Book";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BusinessIcon from "@mui/icons-material/Business";

const Detalle = ({ id }) => {
  const navigate = useNavigate();
  const { data, status } = useQuery(["detalleinscripcion", id], async () => {
    const response = await clienteAxios.get(`/inscripcion/inscribe/${id}`);
    return response.data;
  });

  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
  };

  const queryClient = useQueryClient();

  const eliminar_inscripcion = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clienteAxios.delete(`/inscripcion/delete/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Eliminado",
            text: "La Inscripción ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTimeout(() => {
            Swal.close();
            queryClient.refetchQueries("update_inscripcion");
            navigate("/ofertas_publicas");
          }, 2000);
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la Inscripción",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  if (status === "loading") {
    return (
      <Grid
        sx={{
          width: "35%",
          margin: "0px auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando datos.........
        <CircularProgress />
      </Grid>
    );
  }

  if (status === "success") {
    if (data.mensaje === "No se ha encontrado la inscripcion") {
      return (
        <Grid
          sx={{
            width: "100%",
            margin: "0px auto",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert severity="warning">
            Asignatura inscrita en sistema pero aún falta inscribir una práctica
          </Alert>
        </Grid>
      );
    }

    const inscripcion = data.inscripcion;
    const handleView = (id) => {
      window.open(`/visualizadorInscripciones/${id}`, "_blank");
    };
    const handleViewInforme = (id) => {
      window.open(`/visualizadorInformes/${id}`, "_blank");
    };
    const handleViewEvaluacion = (id) => {
      window.open(`/visualizadorEvaluaciones/${id}`, "_blank");
    };

    if (inscripcion.fecha_inicio && inscripcion.fecha_fin) {
      let fecha_inicio = inscripcion.fecha_inicio.split("T")[0];
      fecha_inicio = formato(fecha_inicio);
      let fecha_fin = inscripcion.fecha_fin.split("T")[0];
      fecha_fin = formato(fecha_fin);

      const columns = [
        {
          name: "fecha_inicio",
          label: "Fecha Inicio",
          options: {
            customBodyRender: () => fecha_inicio,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "fecha_fin",
          label: "Fecha Término",
          options: {
            customBodyRender: () => fecha_fin,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "modalidad",
          label: "Modalidad",
          options: {
            customBodyRender: (value) => value.nombre_modalidad,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "empresa",
          label: "Empresa",
          options: {
            customBodyRender: (value) =>
              value === null ? "No registrado" : `${value.nombre}`,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "supervisor",
          label: "Supervisor práctica",
          options: {
            customBodyRender: (value) =>
              value === null ? "No registrado" : `${value.nombre}`,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "estado_inscripcion",
          label: "Estado Solicitud",
          options: {
            customBodyRender: (value) => (
              <>
                {value.id_estado_inscripcion === 1 && (
                  <TimerOutlined style={{ marginRight: "5px" }} />
                )}
                {value.id_estado_inscripcion === 2 && (
                  <CheckCircleOutline style={{ marginRight: "5px" }} />
                )}
                {value.id_estado_inscripcion === 3 && (
                  <DoNotDisturb style={{ marginRight: "5px" }} />
                )}
                {value.nombre_estado_inscripcion}
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "observaciones",
          label: "Observaciones",
          options: {
            customBodyRender: (value) => (value === "" ? "----------" : value),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "Ver Inscripción/Centro Práctica",
          label: "Ver Inscripción/Centro Práctica",
          options: {
            customBodyRender: () => (
              <>
                <Tooltip title="Detalle Inscripción">
                  <VisibilityIcon
                    title="Ver detalle inscripción"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/detalle_inscripcion/${inscripcion.id_inscripcion_practica}`
                      )
                    }
                  />
                </Tooltip>
                <Tooltip title="Centro de práctica">
                  <BusinessIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/detalleCentroPractica/${inscripcion.id_empresa}`)}
                  />
                </Tooltip>
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "PDF Inscripción",
          label: "PDF Inscripción",
          options: {
            customBodyRender: () => (
              <>
                <Tooltip title="Archivo Inscrpción">
                  <PictureAsPdfIcon
                    title="Archivo Inscripción"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleView(inscripcion.id_inscripcion_practica)
                    }
                  />
                </Tooltip>
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "PDF Informe",
          label: "PDF Informe",
          options: {
            customBodyRender: () => (
              <>
                <Tooltip title="Archivo Informe">
                  <PictureAsPdfIcon
                    title="Archivo Informe"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleViewInforme(inscripcion.id_inscripcion_practica)
                    }
                  />
                </Tooltip>
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "PDF Evaluación",
          label: "PDF Evaluación",
          options: {
            customBodyRender: () => (
              <>
                <Tooltip title="Archivo Evaluación">
                  <PictureAsPdfIcon
                    title="Archivo Evaluación"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleViewEvaluacion(inscripcion.id_inscripcion_practica)
                    }
                  />
                </Tooltip>
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "Ver Bitacora",
          label: "Ver Bitacora",
          options: {
            customBodyRender: () => (
              <>
                <Tooltip title="Bitácoras">
                  <BookIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/bitacoras/${inscripcion.id_inscripcion_practica}`
                      )
                    }
                  />
                </Tooltip>
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
          },
        },
        {
          name: "Eliminar",
          label: "Eliminar",
          options: {
            customBodyRender: () => (
              <>
                {inscripcion.estado_inscripcion.id_estado_inscripcion === 3 ||
                inscripcion.estado_inscripcion.id_estado_inscripcion === 4 ? (
                  <Tooltip title="Eliminar Inscripción">
                    <Delete
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        eliminar_inscripcion(
                          inscripcion.id_inscripcion_practica
                        )
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Eliminar Inscripción">
                    <Delete sx={{ opacity: 0.5 }} />
                  </Tooltip>
                )}
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: "#326fa6",
                color: "#fff",
              },
            }),
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
        tableBodyHeight: "auto",
        tableBodyMaxHeight: "500px", // Para asegurar que la tabla no crezca demasiado
        textLabels: {
          body: {
            noMatch: "No hay datos disponibles", // Mensaje en español cuando no hay datos
          },
        },
      };

      return (
        <Grid sx={{ marginTop: "15px" }}>
          <div>
            <MUIDataTable
              data={[inscripcion]}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      );
    }
  }

  return null;
};

export default Detalle;
