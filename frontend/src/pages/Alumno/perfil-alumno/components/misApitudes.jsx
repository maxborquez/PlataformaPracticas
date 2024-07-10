import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  Alert,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const MisAptitudes = ({ id_alumno, showDeleteButton = true }) => {
  const queryClient = useQueryClient();

  const getAptitudes = useQuery(["misapitudes", id_alumno], async () => {
    const response = await clienteAxios.post("/alumno/showAptitudes", {
      id_alumno: id_alumno,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch aptitudes");
    }
  });

  const eliminar_conocimiento = async (id_conocimiento) => {
    const response = await clienteAxios.delete(
      `/conocimiento/delete/${id_conocimiento}`
    );
    if (response.status === 200) {
      Swal.fire({
        title: "Eliminado",
        text: "Conocimiento eliminado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setTimeout(() => {
        Swal.close();
        queryClient.refetchQueries("misapitudes");
        getAptitudes.refetch();
      }, 2000);
    }
  };

  if (getAptitudes.status === "loading") {
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

  if (getAptitudes.status === "error") {
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
        <Alert severity="error">Error al cargar las aptitudes</Alert>
      </Grid>
    );
  }

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "50%",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "#326fa6",
              }}
            >
              <TableRow>
                <TableCell colSpan={showDeleteButton ? 2 : 1}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "center",
                      color: "white",
                      transition: "all 1000ms",
                    }}
                  >
                    {" "}
                    <strong>Listado de aptitudes</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAptitudes.status === "success" &&
              getAptitudes.data.aptitudes &&
              getAptitudes.data.aptitudes.length > 0 ? (
                getAptitudes.data.aptitudes.map((conocimiento, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{ color: "black", transition: "all 1000ms" }}
                      >
                        {conocimiento.aptitud.nombre_aptitud}
                      </Typography>
                    </TableCell>
                    {showDeleteButton && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <Tooltip title="Eliminar Aptitud">
                          <DeleteIcon
                            style={{ cursor: "pointer" }}
                            className="iconn"
                            onClick={() =>
                              eliminar_conocimiento(
                                conocimiento.id_conocimiento
                              )
                            }
                          />
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={showDeleteButton ? 2 : 1}
                    sx={{ textAlign: "center" }}
                  >
                    <Alert severity="error">No hay aptitudes registradas</Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default MisAptitudes;
