import { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import Header from '../../../../components/headers/header';
import SidebarProfesional from '../../../../components/sidebars/sidebarProfesional';
import FormularioEmpresa from './components/formulario_empresa';

const IngresarEmpresa = () => {
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
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
            <SidebarProfesional />
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
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              margin: "auto",
              marginLeft:"16px"
            }}
          >
            <Grid container spacing={2} sx={{ flexDirection: "column", alignItems: "center" }}>
              <FormularioEmpresa />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IngresarEmpresa;
