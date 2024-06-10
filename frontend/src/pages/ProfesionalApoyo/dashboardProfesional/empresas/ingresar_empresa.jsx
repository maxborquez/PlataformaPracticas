import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import HeaderProfesional from '../../../../components/headers/headerProfesional';
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
    <Grid container sx={{ height: '100vh', position: 'relative' }}>
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <HeaderProfesional toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} />
      </Grid>

      {/* Sidebar */}
      {sidebarOpen && (
        <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
          <SidebarProfesional />
        </Grid>
      )}

      {/* Contenido principal */}
      <Grid container item xs={12} justifyContent="center" alignItems="flex-start" sx={{ padding: 3, marginTop: 0 }}>
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <FormularioEmpresa />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IngresarEmpresa;
