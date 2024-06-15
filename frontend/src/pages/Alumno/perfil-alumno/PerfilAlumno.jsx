import {
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import Header from "../../../components/headers/header";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import DataAlumno from "./components/data_alumno";
import MisAptitudes from "../perfil-alumno/components/misApitudes";

const PerfilAlumno = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const id_alumno = localStorage.getItem("id_alumno");

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

  // Código de aptitudes
  const { handleSubmit, register, control } = useForm();
  const { data, status, refetch } = useQuery("aptitudes", async () => {
    const response = await clienteAxios.get("/aptitud/getall");
    const response2 = await clienteAxios.post("/alumno/showAptitudes", {
      id_alumno: id_alumno,
    });

    const array_aptitudes = response.data.aptitudes;
    const array_conocimientos = response2.data.aptitudes;
    const optionsNotRegistered = array_aptitudes.filter(
      (option) =>
        !array_conocimientos.some(
          (item) => item.id_aptitud === option.id_aptitud
        )
    );

    return optionsNotRegistered;
  });
  const queryClient = useQueryClient();
  const onSubmit = async (data) => {
    const response = await clienteAxios.post("/conocimiento/create", {
      id_alumno: Number(id_alumno),
      id_aptitud: data.id_aptitud,
    });
    if (response.status == 200) {
      Swal.fire({
        title: "Registrado",
        text: "Conocimiento registrado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setTimeout(() => {
        Swal.close();
        refetch();
        queryClient.refetchQueries("misapitudes");
      }, 2000);
    }
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid
            item
            xs={3}
            sx={{ position: "fixed", top: "80px", zIndex: 1200 }}
          >
            <SidebarAlumno />
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
            marginTop: "35px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
               // Adjust the width as needed
              margin: "auto",
              marginBottom: "16px",
              marginLeft:"16px"
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Grid item sx={{ width: "100%" }}>
                <DataAlumno isWideScreen={isWideScreen} />
              </Grid>
              {status === "success" && (
                <Grid item sx={{ width: "100%" }}>
                  <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "10px" }}>
                    Agregar conocimientos
                  </Typography>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Controller
                      name="id_aptitud"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Este campo es obligatorio" }}
                      render={({ field, fieldState }) => (
                        <Select
                          {...field}
                          displayEmpty
                          required
                          sx={{ marginRight: "10px", width: "300px" }}
                        >
                          <MenuItem value="" disabled>
                            Selecciona una opción
                          </MenuItem>
                          {Array.isArray(data) &&
                            data.map((option, idx) => (
                              <MenuItem key={idx} value={option.id_aptitud}>
                                {option.nombre_aptitud}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: "100px", height: "50px", bgcolor: "#326fa6" }}
                      type="submit"
                    >
                      Agregar
                    </Button>
                  </form>
                </Grid>
              )}
              <Grid item sx={{ width: "100%" }}>
                <MisAptitudes id_alumno={id_alumno} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PerfilAlumno;