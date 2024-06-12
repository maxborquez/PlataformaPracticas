import { Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../../../components/headers/header";
import MostrarOfertas from "./components/mostrar_ofertas";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const OfertaPractica = () => {
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
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
      <Grid container>
        <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
        </Grid>

        {sidebarOpen && (
          <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
            <SidebarProfesional />
          </Grid>
        )}

        <Grid
          item
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? '250px' : '0px',
            transition: 'margin-left 0.3s',
            overflowY: "auto",
            paddingRight: "16px",
            overflowX: "auto",
          }}
        >
          <MostrarOfertas />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfertaPractica;
