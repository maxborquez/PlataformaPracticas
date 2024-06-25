import { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, Button } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams, useNavigate } from "react-router-dom";

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
    navigate("/crear_bitacora"); // Cambia esta ruta a la ruta correspondiente para agregar bitácoras
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
            overflowX: "auto",
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              borderRadius: "8px",
              boxSizing: "border-box",
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
              bitacoras.map((bitacora) => (
                <Card
                  key={bitacora.id_bitacora}
                  sx={{
                    padding: "20px",
                    backgroundColor: "white",
                    width: "100%",
                    marginTop: "15px",
                    marginBottom: "15px",
                    marginLeft: "16px",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#1E88E5",
                      color: "white",
                      padding: "10px",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  >
                    <Typography variant="h6">{bitacora.titulo}</Typography>
                  </Box>
                  <Box sx={{ padding: "10px" }}>
                    <Typography variant="body2" sx={{ color: "#1E88E5" }}>
                      {new Date(bitacora.fecha_creacion).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                  >
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {bitacora.estado_bitacora.nombre}
                    </Typography>
                  </Box>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bitacoras;
