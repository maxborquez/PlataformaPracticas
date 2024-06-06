import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import HeaderProfesional from "../../../components/headers/headerProfesional";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const DashboardProfesional = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Assuming 175% zoom means window.innerWidth < 1150 for typical 1920px wide screen
      const zoomThreshold = 900; 
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth < zoomThreshold ? false : true);
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Check the screen size on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid container direction="column">
      <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <HeaderProfesional toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} />
      </Grid>
      <Grid container item sx={{ marginTop: '64px' }}>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: 'fixed', top: '80px', zIndex: 1000 }}>
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs={sidebarOpen ? 9 : 12}
          sx={{
            marginLeft: sidebarOpen ? '250px' : '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 64px)',
          }}
        >
          <img
            src="/logo-color.png"
            alt="Logo"
            style={{ opacity: 0.25, maxWidth: '100%', maxHeight: '100%' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardProfesional;
