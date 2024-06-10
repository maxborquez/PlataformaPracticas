import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import HeaderProfesional from "../../../../../components/headers/headerProfesional";
import FormularioIngresar from "./FormularioIngresar";
import { Work } from "@mui/icons-material";
import SidebarProfesional from "../../../../../components/sidebars/sidebarProfesional";

const CrearOferta = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

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

  return (
    <Grid container sx={{ width: "100%", position: "relative" }}>
      {/* Encabezado fijo */}
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <HeaderProfesional toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} />
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
        <FormularioIngresar />
      </Grid>
    </Grid>
  );
};

export default CrearOferta;
