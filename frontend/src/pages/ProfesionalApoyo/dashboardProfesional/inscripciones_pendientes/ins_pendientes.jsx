import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const InscripcionesPendientes = () => {
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

  // Supongamos que tienes datos de ejemplo
  const data = [
    { alumno: 'Juan Perez', rut: '20.356.893-9', oferta: 'Oferta A', accion: 'Aprobar/Rechazar' },
    { alumno: 'María González', rut: '19.40.587-1', oferta: 'Oferta B', accion: 'Aprobar/Rechazar' },
    // ... más datos
  ];

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>

      {/* Sidebar */}
      {sidebarOpen && (
        <Grid item sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
          <SidebarProfesional />
        </Grid>
      )}

      {/* Contenido principal */}
      <Grid
        container
        item
        xs
        sx={{
          marginLeft: sidebarOpen && isWideScreen ? '250px' : '0px',
          transition: 'margin-left 0.3s',
          marginTop: "64px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Tabla de inscripciones">
            <TableHead>
              <TableRow>
                <TableCell>Alumno</TableCell>
                <TableCell>RUT</TableCell>
                <TableCell>Oferta que inscribe</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.alumno}</TableCell>
                  <TableCell>{row.rut}</TableCell>
                  <TableCell>{row.oferta}</TableCell>
                  <TableCell>{row.accion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default InscripcionesPendientes;
