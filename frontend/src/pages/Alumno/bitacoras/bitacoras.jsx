import { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Paper } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";
import CardBitacora from "./components/card_bitacora";
import CardAddBitacora from "./components/card_add_bitacora";

const Bitacoras = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [bitacoras, setBitacoras] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { id_inscripcion_practica } = useParams();
  const navigate = useNavigate();

  const id_alumno = localStorage.getItem("id_alumno");

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
        if (id_alumno && id_inscripcion_practica) {
          const response = await clienteAxios.get(
            `/bitacoras/getall/${id_inscripcion_practica}/${id_alumno}`
          );
          if (response.data.bitacoras) {
            setBitacoras(response.data.bitacoras);
          } else {
            setMensaje(response.data.mensaje);
          }
        } else {
          console.error("id_alumno or id_inscripcion_practica is missing");
          setMensaje("Faltan id_alumno o id_inscripcion_practica");
        }
      } catch (error) {
        console.error("Error fetching bitacoras:", error);
        setMensaje("Error al obtener los registros de bitácoras");
      }
    };

    fetchBitacoras();
  }, [id_inscripcion_practica, id_alumno]);

  const handleAgregarBitacora = () => {
    navigate(`/crear_bitacora/${id_inscripcion_practica}`);
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
              flexGrow: 1, // Para que el Paper crezca y ocupe toda la altura disponible
            }}
          >
            {mensaje ? (
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Typography variant="h6" sx={{ color: "gray" }}>
                  {mensaje}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAgregarBitacora}
                  sx={{ marginTop: "20px" }}
                >
                  Agregar bitácora
                </Button>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  {bitacoras.map((bitacora) => (
                    <Grid item key={bitacora.id_bitacora} xs={12} sm={6} md={3}>
                      <CardBitacora bitacora={bitacora} />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6} md={3}>
                    <CardAddBitacora onClick={handleAgregarBitacora} />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bitacoras;
