import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import DataAlumno from "./components/data_alumno";

const PerfilAlumno = () => {
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
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>
      <Grid container item sx={{ marginTop: "64px" }}>
        {sidebarOpen && (
          <Grid
            item
            sx={{
              position: "fixed",
              top: "80px",
              left: 0,
              zIndex: 1200,
              width: "250px",
              height: "100vh",
              backgroundColor: "white",
            }}
          >
            <SidebarAlumno />
          </Grid>
        )}
        <Grid
          item
          sx={{
            marginLeft: isWideScreen && sidebarOpen ? "250px" : "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "margin-left 0.3s",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto", // Añadir esta línea para centrar horizontalmente
            padding: "0 50px", // Añadir un padding opcional para mejor presentación
          }}
        >
          <DataAlumno isWideScreen={isWideScreen} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PerfilAlumno;
