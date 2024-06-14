import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import Header from "../../../components/headers/header";
import OfertasPracticas from "../components/OfertaPracticas";
import ComprobarInscripcion from "../components/comprobarInscripcion";

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
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              maxWidth: "80%",
              margin: "0 auto",
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
                Ofertas de Práctica
              </Typography>
            </Grid>
            <Grid item sx={{ width: "100%", overflowX: "hidden" }}>
              <ComprobarInscripcion />
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