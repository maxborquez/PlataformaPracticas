import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";
import SidebarAlumno from "../../../../components/sidebars/sidebarAlumno";
import { useState, useEffect } from "react";

const DetalleBitacora = () => {
  const { id_bitacora } = useParams();
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

  const getBitacora = useQuery(["detallebitacora", id_bitacora], async () => {
    const response = await clienteAxios.get(
      `/bitacoras/detalle/${id_bitacora}`
    );
    return response.data;
  });

  if (getBitacora.status === "loading") {
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

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(timeString).toLocaleTimeString([], options);
  };

  const formatFechaUTC = (fecha) => {
    const date = new Date(fecha);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

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
              height: "calc(100vh - 80px)",
            }}
          >
            <SidebarAlumno />
          </Grid>
        )}

        <Grid
          item
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingBottom: "16px",
            display: "flex",
            justifyContent: "center",
            width: "auto",
          }}
        >
          <Grid
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginTop: "16px",
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
              <Typography variant="h5" gutterBottom sx={{ textAlign: "center", flexGrow: 1 }}>
                Detalle de Bitácora
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/bitacoras/${getBitacora.data.bitacora.id_inscripcion_practica}`)}
                  sx={{ marginRight: "10px" }}
                >
                  Volver
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/editar_bitacora/${id_bitacora}`)}
                  sx={{ marginLeft: "10px" }}
                  disabled={getBitacora.data.bitacora.estado_bitacora.nombre_estado_bitacora === "revisada"}
                >
                  Editar
                </Button>
              </Box>
            </Box>
            {getBitacora.status === "success" && getBitacora.data.bitacora && (
              <>
                <Paper sx={{ padding: "16px" }}>
                  <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                    <strong>{getBitacora.data.bitacora.titulo}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Fecha:</strong>{" "}
                    {formatFechaUTC(getBitacora.data.bitacora.fecha_creacion)}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Estado:</strong>{" "}
                    {
                      getBitacora.data.bitacora.estado_bitacora
                        .nombre_estado_bitacora
                    }
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Descripción:</strong> {getBitacora.data.bitacora.descripcion}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Hora de Inicio:</strong> {formatTime(getBitacora.data.bitacora.hora_inicio)}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Hora de Fin:</strong> {formatTime(getBitacora.data.bitacora.hora_fin)}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                    <strong>Tipo de Bitácora:</strong> {getBitacora.data.bitacora.tipo_bitacora.nombre_tipo_bitacora}
                  </Typography>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetalleBitacora;
