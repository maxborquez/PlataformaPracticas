import { Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/headers/header";
import FormularioIngresar from "./FormularioIngresar";
import { Work } from "@mui/icons-material";
import SidebarProfesional from "../../../../../components/sidebars/sidebarProfesional";

const CrearOferta = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate('/ofertapracticas');
  };

  return (
    <Grid container sx={{ width: "100%", position: "relative" }}>
      {/* Encabezado fijo */}
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>

      {/* Barra lateral debajo del encabezado */}
      {sidebarOpen && (
        <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
          <SidebarProfesional />
        </Grid>
      )}

      {/* Contenido principal */}
      <Grid
        item
        xs
        sx={{
          marginLeft: sidebarOpen && isWideScreen ? '250px' : '0px',
          transition: 'margin-left 0.3s',
          marginTop: "64px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Crear Oferta Práctica Profesional{" "}
          <Work style={{ marginTop: "2px", marginLeft: "5px" }} />
        </Typography>
        <Grid container justifyContent="flex-end" sx={{ paddingRight: 2, mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleBack} sx={{ paddingRight: 2, mr: 14 }}>
            Volver
          </Button>
        </Grid>
        <FormularioIngresar />
      </Grid>
    </Grid>
  );
};

export default CrearOferta;
