import { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";
import CardBitacoraAlumno from "./components/card_bitacora_alumno";

const BitacorasAlumnos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [bitacoras, setBitacoras] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { id_inscripcion } = useParams();
  const navigate = useNavigate(); // Asegúrate de tener useNavigate definido

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth < zoomThreshold ? false : true);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        if (id_inscripcion) {
          const response = await clienteAxios.get(
            `/bitacoras/getByInscripcion/${id_inscripcion}`
          );
          if (response.data) {
            setBitacoras(response.data);
          } else {
            setMensaje("No se encontraron bitácoras");
          }
        } else {
          console.error("id_inscripcion is missing");
          setMensaje("Falta id_inscripcion");
        }
      } catch (error) {
        console.error("Error fetching bitacoras:", error);
        setMensaje("Error al obtener los registros de bitácoras");
      }
    };

    fetchBitacoras();
  }, [id_inscripcion]);

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

      <Grid container item sx={{ flexGrow: 1 }}>
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
            width: "auto",
          }}
        >
          <Paper
            sx={{
              padding: "16px",
              margin: "16px",
              width: "100%",
              maxWidth: "calc(100% - 32px)",
              backgroundColor: "white",
              borderRadius: "8px",
              boxSizing: "border-box",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "16px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(
                    `/practicas`
                  )
                }
                sx={{ marginRight: "10px" }}
              >
                Volver
              </Button>
            </Box>
            {mensaje ? (
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Typography variant="h6" sx={{ color: "gray" }}>
                  {mensaje}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {bitacoras.map((bitacora) => (
                    <Grid item key={bitacora.id_bitacora} xs={12} sm={6} md={3}>
                      <CardBitacoraAlumno bitacora={bitacora} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BitacorasAlumnos;
