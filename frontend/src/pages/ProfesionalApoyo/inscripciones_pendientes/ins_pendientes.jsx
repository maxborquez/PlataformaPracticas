import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Card } from "@mui/material";
import { Check, Block } from "@mui/icons-material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";
import Swal from "sweetalert2";
import clienteAxios from "../../../helpers/clienteaxios"; // Ajusta el path según tu estructura de proyecto

const InscripcionesPendientes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [data, setData] = useState([]); // Estado para almacenar los datos de la API

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get("/inscripcion/estado/1");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching inscripciones:", error);
      }
    };

    fetchData();
  }, []);

  const handleAprobarInscripcion = async (id_inscripcion_practica) => {
    try {
      // Primero, aprueba la inscripción
      const responseAprobar = await clienteAxios.post("/inscripcion/updatestado", {
        id_inscripcion: id_inscripcion_practica,
        id_estado_inscripcion: 2,
      });

      if (responseAprobar.status !== 200) {
        Swal.fire("Error", "Hubo un problema al aprobar la inscripción", "error");
        return;
      }

      // Luego, obtiene el id_inscribe
      const responseObtenerInscribe = await clienteAxios.get(`inscribe/obtener_inscribe/${id_inscripcion_practica}`);

      if (responseObtenerInscribe.status !== 200) {
        Swal.fire("Error", "Hubo un problema al obtener la inscripción asociada", "error");
        return;
      }

      const id_inscribe = responseObtenerInscribe.data.inscribeId;

      // Finalmente, actualiza el estado de práctica
      const responseActualizarEstado = await clienteAxios.put(`/inscribe/${id_inscribe}/2`);

      if (responseActualizarEstado.status === 200) {
        Swal.fire("Éxito", "Inscripción aprobada y estado de práctica actualizado", "success");
        // Actualizar la tabla después del cambio
        const updatedResponse = await clienteAxios.get("/inscripcion/estado/1");
        setData(updatedResponse.data);
      } else {
        Swal.fire("Error", "Hubo un problema al actualizar el estado de práctica", "error");
      }
    } catch (error) {
      console.error("Error handling inscripcion:", error);
      Swal.fire("Error", "Hubo un problema al procesar la inscripción", "error");
    }
  };

  const columns = [
    {
      name: "id_inscripcion",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "primer_nombre",
      label: "Nombre",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "primer_apellido",
      label: "Apellido",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "rut",
      label: "RUT",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "carrera",
      label: "Carrera",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "oferta",
      label: "Oferta que inscribe",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "periodo_academico",
      label: "Periodo Académico",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
    {
      name: "accion",
      label: "Acción",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const id_inscripcion_practica = tableMeta.rowData[0]; // Usar la primera columna oculta como ID
          return (
            <>
              <IconButton
                onClick={() => handleAprobarInscripcion(id_inscripcion_practica)}
                style={{ color: "green" }}
              >
                <Check />
              </IconButton>
              <IconButton
                onClick={() =>
                  updateEstadoInscripcion(id_inscripcion_practica, 3)
                }
                style={{ color: "red" }}
              >
                <Block />
              </IconButton>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "white",
          },
        }),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    sort: false,
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
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Inscripciones Pendientes
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <MUIDataTable data={data} columns={columns} options={options} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InscripcionesPendientes;
