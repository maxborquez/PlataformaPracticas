import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Grid, Typography, Alert, Paper } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import { Construction } from "@mui/icons-material";
import clienteAxios from "../../../helpers/clienteaxios";
import Detalle from "../../Alumno/mi_practica/detalle_practica";

const fetchPracticas = async (id_alumno) => {
  const response = await clienteAxios.get(`/inscripcion/getPracticas/${id_alumno}`);
  return response.data;
};

const MiPractica = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const id_alumno = localStorage.getItem("id_alumno");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth >= zoomThreshold);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, status } = useQuery(['practicas', id_alumno], () => fetchPracticas(id_alumno), {
    enabled: !!id_alumno,
  });

  const practica1 = data?.find(practica => practica.id_asignatura === 620509);
  const practica2 = data?.find(practica => practica.id_asignatura === 620520);

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

      <Grid container>
        {sidebarOpen && (
          <Grid
            item
            xs={3}
            sx={{ position: "fixed", top: "80px", zIndex: 1200 }}
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
            marginTop: "16px",
            overflowX: "auto", // Añadido para permitir el desplazamiento horizontal
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              margin: "auto",
              marginBottom: "16px",
              marginLeft: "16px",
              maxWidth: "100%", // Ajuste para que el papel no se salga de la pantalla
              overflowX: "auto", // Asegurarse de que el contenido pueda desplazarse horizontalmente
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Mis prácticas
                  <Construction style={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              {status === "loading" && (
                <Grid item>
                  <Alert severity="info">Cargando información...</Alert>
                </Grid>
              )}
              {status === "error" && (
                <Grid item>
                  <Alert severity="error">Error al cargar la información</Alert>
                </Grid>
              )}
              {status === "success" && (
                <>
                  <Grid item>
                    <Typography variant="h6">Mi Práctica 1</Typography>
                    {practica1 ? (
                      <Detalle id={practica1.id_inscripcion} />
                    ) : (
                      <Alert severity="info">No se encontró información para la Práctica 1</Alert>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Mi Práctica 2</Typography>
                    {practica2 ? (
                      <Detalle id={practica2.id_inscripcion} />
                    ) : (
                      <Alert severity="info">No se encontró información para la Práctica 2</Alert>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MiPractica;
