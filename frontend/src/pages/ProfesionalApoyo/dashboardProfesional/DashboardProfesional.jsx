import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const DashboardProfesional = () => {
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
    <Grid container direction="column">
      <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>
      <Grid container item sx={{ marginTop: '64px' }}>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: 'fixed', top: '80px', zIndex: 1200 }}>
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: isWideScreen ? '250px' : '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'margin-left 0.3s',
          }}
        >
          <img
            src="/logo-color.png"
            alt="Logo"
            style={{ opacity: 0.25, maxWidth: '50%', maxHeight: '80%' }} // Aquí se ajusta el tamaño de la imagen
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardProfesional;
