import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
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
    <Grid container sx={{ height: "100vh", overflowY: "auto"  }}>
      <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <HeaderProfesional toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} />
      </Grid>

      <Grid container item sx={{ marginTop: '0' }}>
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
          sx={{ transition: 'margin-left 0.3s', marginLeft: isWideScreen ? '250px' : '0px', paddingTop: '0px' }}
        >
          <Grid item sx={{ marginBottom: "20px", marginTop: "10px" }}>
            <Button variant="contained" onClick={() => navigate("/ingresar_empresa")}>
              Ingresar nueva empresa
            </Button>
          </Grid>
          <TableEmpresa sx={{ width: '100%', overflowX: 'hidden' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CentrosPracticas;
