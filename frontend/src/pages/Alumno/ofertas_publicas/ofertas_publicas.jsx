import { Grid } from "@mui/material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import Header from "../../../components/headers/header";
import OfertasPracticas from "../components/OfertaPracticas";
import ComprobarInscripcion from "../components/comprobarInscripcion";

const OfertasPublicas = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item sx={{ zIndex: 1000, position: "fixed", width: "100%" }}>
        <Header />
      </Grid>
      <Grid
        container
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          marginTop: "80px", 
        }}
      >
        <Grid item sx={{ flex: "0 0 auto", position: "fixed", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto" }}>
          <SidebarAlumno />
        </Grid>

        <Grid
          container
          item
          sx={{
            flexDirection: "column",
            justifyContent: "center", 
            textAlign: "center", 
            flexGrow: 1,
            marginLeft: "250px", 
          }}
        >
          <Grid item sx={{ marginBottom: "20px" }}>
            <ComprobarInscripcion />
          </Grid>
          <Grid item>
            <OfertasPracticas />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OfertasPublicas;
