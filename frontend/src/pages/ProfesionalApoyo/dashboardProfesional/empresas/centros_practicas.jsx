import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import Header from "../../../../components/headers/header";
import TableEmpresa from "../../../../components/tableEmpresas/tableEmpresa";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useNavigate } from "react-router-dom";

const CentrosPracticas = () => {
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

  return (
    <Grid container sx={{ overflowY: "auto" }}>
      <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true}/>
      </Grid>

      <Grid container item >
        {sidebarOpen && (
          <Grid item sx={{ position: 'fixed', top: '80px', left: 0, width: '250px', zIndex: 1200, backgroundColor: '#36465d' }}>
            <SidebarProfesional />
          </Grid>
        )}

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ transition: 'margin-left 0.3s', marginLeft: isWideScreen ? '250px' : '0px'}}
        >
          <Grid item>
            <Button variant="contained" onClick={() => navigate("/ingresar_empresa")} sx={{mt:"40px", mb:"50px"}}>
              Ingresar nueva empresa
            </Button>
          </Grid>
          <Grid item sx={{ width: '100%', overflowX: 'hidden' }}>
            <TableEmpresa />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CentrosPracticas;
