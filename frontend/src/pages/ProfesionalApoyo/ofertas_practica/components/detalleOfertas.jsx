import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useState, useEffect } from "react";
import { Business } from "@mui/icons-material";

const DetalleOfertas = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      const isWide = window.innerWidth >= zoomThreshold;
      setIsWideScreen(isWide);
      setSidebarOpen(isWide);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getOferta = useQuery("detalleoferta", async () => {
    const response = await clienteAxios.get(`/oferta/show/${id}`);
    return response.data;
  });

  if (getOferta.status === "loading") {
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

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid
        item
        sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>

      <Grid container item>
        {sidebarOpen && (
          <Grid
            item
            sx={{
              position: "fixed",
              top: "80px",
              left: 0,
              width: "250px",
              zIndex: 1200,
              backgroundColor: "#36465d",
              // Ajustar altura para ocupar todo el espacio disponible
            }}
          >
            <SidebarProfesional />
          </Grid>
        )}

        <Grid
          item
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",

            display: "flex",
            justifyContent: "center",
            width: "100%", // Asegurar que el Grid ocupe todo el ancho disponible
          }}
        >
          <Grid
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              margin: "16px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h4"
                sx={{ textAlign: "center" }}
              ></Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Box>
            {getOferta.status === "success" && getOferta.data.oferta && (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#326fa6" }}>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              transition: "all 1000ms",
                            }}
                          >
                            Detalle Oferta{" "}
                            <Business style={{ marginLeft: "5px" }} />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Título:</strong>{" "}
                          {getOferta.data.oferta.titulo}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Descripción:</strong>{" "}
                          {getOferta.data.oferta.descripcion}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Empresa:</strong>{" "}
                          {getOferta.data.oferta.empresa.nombre}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Teléfono:</strong>{" "}
                          {getOferta.data.oferta.empresa.telefono}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Modalidad:</strong>{" "}
                          {getOferta.data.oferta.modalidad.nombre_modalidad}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Experiencia laboral:</strong>{" "}
                          {getOferta.data.oferta.experiencia_laboral
                            ? "Sí"
                            : "No"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetalleOfertas;
