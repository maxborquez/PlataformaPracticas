import { Grid, Typography, Paper, CircularProgress, Tooltip } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { CheckCircleOutline, Delete, DoNotDisturb, Edit, FileCopy, School, TimerOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";


const Detalle = ({ id }) => {
  const navigate = useNavigate();
  const { data, status } = useQuery("detalleinscripcion", async () => {
    const response = await clienteAxios.get(`/inscripcion/show/${id}`);
    return response.data.inscripcion;
  });

  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  };

  const queryClient = useQueryClient();

  const eliminar_inscripcion = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clienteAxios.delete(`/inscripcion/delete/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Eliminado",
            text: "La Inscripción ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
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
            confirmButtonText: "Aceptar"
          });
        }
      }
    });
  };

  if (status === "success") {
    if (data.fecha_inicio && data.fecha_fin) {
      let fecha_inicio = data.fecha_inicio.split("T")[0];
      fecha_inicio = formato(fecha_inicio);
      let fecha_fin = data.fecha_fin.split("T")[0];
      fecha_fin = formato(fecha_fin);

      const columns = [
        {
          name: "fecha_inicio",
          label: "Fecha Inicio",
          options: {
            customBodyRender: () => fecha_inicio,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "fecha_fin",
          label: "Fecha Término",
          options: {
            customBodyRender: () => fecha_fin,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "observaciones",
          label: "Observaciones",
          options: {
            customBodyRender: (value) => value === "" ? "----------" : value,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "modalidad",
          label: "Modalidad",
          options: {
            customBodyRender: (value) => value.nombre_modalidad,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "representante",
          label: "Supervisor práctica",
          options: {
            customBodyRender: (value) => value === null ? "No registrado" : `${value.nombre} ${value.apellido}`,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "nota_empresa",
          label: "Nota Empresa",
          options: {
            customBodyRender: (value) => value === 0 ? "-----" : value,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "nota_encargado",
          label: "Nota Encargado",
          options: {
            customBodyRender: (value) => value === 0 ? "-----" : value,
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "estado_inscripcion",
          label: "Estado Solicitud",
          options: {
            customBodyRender: (value) => (
              <>
                {value.id_estado_inscripcion === 1 && <TimerOutlined style={{ marginRight: "5px" }} />}
                {value.id_estado_inscripcion === 2 && <CheckCircleOutline style={{ marginRight: "5px" }} />}
                {value.id_estado_inscripcion === 3 && <DoNotDisturb style={{ marginRight: "5px" }} />}
                {value.nombre_estado_inscripcion}
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
        },
        {
          name: "acciones",
          label: "Acciones",
          options: {
            customBodyRender: () => (
              <>
                {data.estado_inscripcion.id_estado_inscripcion !== 2 && (
                  <>
                    <Tooltip title="Modificar inscripción">
                      <Edit sx={{ cursor: "pointer" }} onClick={() => { navigate(`/modificarinscripcion/${id}`) }} />
                    </Tooltip>
                    <Tooltip title="Documentos">
                      <FileCopy sx={{ cursor: "pointer" }} onClick={() => { navigate(`/documentosinscripcion/${data.id_inscripcion_practica}`) }} />
                    </Tooltip>
                    <Tooltip title="Eliminar Inscripción">
                      <Delete sx={{ cursor: "pointer" }} onClick={() => eliminar_inscripcion(data.id_inscripcion_practica)} />
                    </Tooltip>
                  </>
                )}
              </>
            ),
            setCellHeaderProps: () => ({
              style: {
                backgroundColor: '#326fa6',
                color: '#fff'
              }
            })
          }
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
        <Grid sx={{ marginTop: "15px" }}>
          <Typography sx={{ textAlign: "center", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} variant="h6">
            Detalle Inscripción <School style={{ marginLeft: "5px" }} />
          </Typography>
          <Paper sx={{ maxWidth: '100%', margin: "0px auto", marginTop: "10px", padding: "16px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ overflowX: 'auto' }}>
              <MUIDataTable
                title={"Detalle Inscripción"}
                data={[data]}
                columns={columns}
                options={options}
              />
            </div>
          </Paper>
        </Grid>
      );
    }
  }

  if (status === "loading") {
    return (
      <Grid sx={{ width: "35%", margin: "0px auto", marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        Cargando datos.........
        <CircularProgress />
      </Grid>
    );
  }

  return null;
};

export default Detalle;
