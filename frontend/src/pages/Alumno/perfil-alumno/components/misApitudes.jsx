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

  if (getAptitudes.status === "success" && getAptitudes.data.aptitudes) {
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
              maxWidth: "80%",
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
                {getAptitudes.data.aptitudes.map((conocimiento, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        sx={{ color: "black", transition: "all 1000ms" }}
                      >
                        {conocimiento.aptitud.nombre_aptitud}
                      </Typography>
                    </TableCell>
                    {showDeleteButton && (
                      <TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    );
  }

  if (getAptitudes.status === "success" && !getAptitudes.data.aptitudes) {
    return (
      <Grid sx={{ width: "60%", margin: "0px auto", marginTop: "20px" }}>
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
              maxWidth: "80%",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Table>
              <TableHead sx={{ width: "100%", textAlign: "center" }}>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        transition: "all 1000ms",
                        ":hover": { color: "black" },
                      }}
                    >
                      <strong>Listado de aptitudes</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Alert severity="error">No hay aptitudes registradas</Alert>
          </TableContainer>
        </Box>
      </Grid>
    );
  }

  return null;
};

export default MisAptitudes;
