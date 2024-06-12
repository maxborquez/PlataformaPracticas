import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/headers/header';
import SidebarProfesional from '../../../../components/sidebars/sidebarProfesional';
import FormularioEmpresa from './components/formulario_empresa';

const IngresarEmpresa = () => {
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
    navigate('/centros_practicas');
  };

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>

      {sidebarOpen && (
        <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
          <SidebarProfesional />
        </Grid>
      )}

      <Grid container item xs={12} justifyContent="center" alignItems="flex-start" sx={{ padding: 3, marginTop: 0 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleBack} sx={{ mr: 1 }}>
              Volver
            </Button>
          </Grid>
          <FormularioEmpresa />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IngresarEmpresa;
