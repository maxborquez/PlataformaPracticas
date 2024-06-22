import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Checklist } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";

const Practicas = () => {
  const [anio, setanio] = useState(new Date().getFullYear());
  const [periodo_academico, setPeriodo] = useState(1);
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
      setSidebarOpen(window.innerWidth >= zoomThreshold);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none", // Desactiva la selección múltiple
  }


  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={toggleSidebar} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",

              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: { xs: "1.3rem", sm: "1.4rem" },
                textAlign: "center"
              }}
            >
              Ingrese el semestre y período <Checklist style={{ marginLeft: "5px" }} />
            </Typography>

            <form
              style={{
                width: "100%",
                maxWidth: "1120px",
                borderRadius: "5px",
                backgroundColor: "white",
                padding: "10px",
                margin: "0px auto",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: "5px",
                  padding: "1px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                >
                  <TextField
                    placeholder="202x"
                    value={anio}
                    type="number"
                    inputProps={{
                      min: 2000,
                    }}
                    sx={{ backgroundColor: "white" }}
                    onChange={(e) => {
                      setanio(e.target.value);
                    }}
                    label="Año"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Seleccione Período</InputLabel>
                    <Select
                      sx={{ backgroundColor: "white" }}
                      onChange={(e) => {
                        setPeriodo(e.target.value);
                      }}
                      value={periodo_academico}
                      label="Seleccione periodo"
                      fullWidth
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                  }}
                >
                  <Button type="submit" variant="contained" sx={{ bgcolor: "#326fa6" }}>
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Typography variant="h6" sx={{ marginBottom: "10px", textAlign: "center" }}>
              Prácticas Profesionales IECI
            </Typography>

            <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "20px", textAlign: "center" }}>
              Prácticas Profesionales ICINF
            </Typography>

          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Practicas;