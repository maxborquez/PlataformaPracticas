import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import Header from "../../../components/headers/header";
import OfertasPracticas from "../components/OfertaPracticas";

const OfertasPublicas = () => {
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
              height: "calc(100vh - 80px)", // Ajustar altura para ocupar todo el espacio disponible
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
            paddingTop: "16px",
            paddingBottom: "16px",
            display: "flex",
            justifyContent: "center",
            width: "auto", // Asegurar que el Grid ocupe todo el ancho disponible
          }}
        >
          <Grid
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              // Máximo ancho para hacerlo más responsivo

              borderRadius: "8px", // Bordes redondeados
              boxSizing: "border-box", // Asegurar que el padding no cause overflow
            }}
          >
            <Grid item>
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Ofertas de Práctica
              </Typography>
            </Grid>
            <Grid item sx={{ width: "100%", overflowX: "hidden" }}>
              <OfertasPracticas />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OfertasPublicas;
