import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Select,
  MenuItem,
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

  // ModalAptitudes code
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
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();
  const onSubmit = async (data) => {
    const response = await clienteAxios.post("/conocimiento/create", {
      id_alumno: Number(id_alumno),
      id_aptitud: data.id_aptitud,
    });
    if (response.status == 200) {
      Swal.fire({
        title: "Regitrado",
        text: "Conocimento registrado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setTimeout(() => {
        Swal.close();
        setOpen(false);
        refetch();
        queryClient.refetchQueries("misapitudes");
      }, 2000);
    }
  };

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>
      <Grid container item sx={{ marginTop: "64px" }}>
        {sidebarOpen && (
          <Grid
            item
            sx={{
              position: "fixed",
              top: "80px",
              left: 0,
              zIndex: 1200,
              width: "250px",
              height: "100vh",
              backgroundColor: "white",
            }}
          >
            <SidebarAlumno />
          </Grid>
        )}
        <Grid
          item
          sx={{
            marginLeft: isWideScreen && sidebarOpen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            flexGrow: 1,
            padding: "0 20px",
            display: "flex",
            flexDirection: "column", // Cambiado a columna para apilar verticalmente
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <DataAlumno isWideScreen={isWideScreen} />
          {status === "success" && (
            <>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  width: "250px",
                  margin: "0px auto",
                  marginBottom: "15px",
                  marginTop: "10px",
                }}
              >
                Ingresar conocimiento
              </Button>
              <Modal sx={{ zIndex: 2 }} open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                
                    maxHeight: "80vh",
                    boxShadow: 24,
                    overflow: "auto",
                    p: 4,
                    bgcolor:"green"
                  }}
                >
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Añadir conocimientos{" "}
                  </Typography>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Controller
                      name="id_aptitud"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Este campo es obligatorio" }}
                      render={({ field, fieldState }) => (
                        <Select {...field} displayEmpty fullWidth required>
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
                      sx={{ width: "40%", marginTop: "10px" }}
                      type="submit"
                    >
                      Enviar datos
                    </Button>
                  </form>
                </Box>
              </Modal>
            </>
          )}
          <MisAptitudes id_alumno={id_alumno} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PerfilAlumno;
