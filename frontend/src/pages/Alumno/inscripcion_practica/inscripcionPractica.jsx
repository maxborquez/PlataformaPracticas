import { Grid, Typography, Alert } from "@mui/material";
import Header from "../../../components/headers/header";
import FormularioInscripcion from "./formularioInscripcion";
import { School } from "@mui/icons-material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import clienteAxios from "../../../helpers/clienteaxios";
import { useQuery } from "react-query";

const InscripcionPractica = () => {
  const id_alumno = localStorage.getItem("id_alumno");

  const { data, status } = useQuery("estado_inscripcion", async () => {
    const response = await clienteAxios.post("/inscripcion/comprobar", {
      id_alumno: id_alumno,
    });
    return response.data;
  });

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid item sx={{ zIndex: 1000, position: "fixed", width: "100%" }}>
        <Header />
      </Grid>

      <Grid
        item
        sx={{
          zIndex: 999,
          position: "fixed",
          top: "80px",
          height: "calc(100vh - 80px)",
          overflowY: "auto",
        }}
      >
        <SidebarAlumno />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "250px",
          width: "100%",
          paddingTop: "80px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          Inscripción Práctica Profesional{" "}
          <School style={{ marginLeft: "5px" }} />
        </Typography>
        {status === "success" && data.inscrito_sistema && (
          <Grid item>
            {localStorage.setItem(
              "id_inscripcion_practica",
              data.id_inscripcion_practica
            )}
              <Alert severity="warning">Ya tienes una practica inscrita actualmente</Alert>
          </Grid>
        )}
        {status === "success" && data.inscrito_sistema === false && (
          <Grid item>
            {localStorage.setItem("id_inscripcion_practica", "undefined")}
            <FormularioInscripcion />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default InscripcionPractica;
