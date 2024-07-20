import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { useQuery } from "react-query";
import { Edit, Delete, Work } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../helpers/clienteaxios";
import MUIDataTable from "mui-datatables";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const OfertaPractica = () => {
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

  const getOfertas = useQuery("ofertas", async () => {
    const response = await clienteAxios.get("/oferta/getall");

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error al obtener ofertas");
    }
  });

  const navigate = useNavigate();

  const eliminar_oferta = async (id) => {
    Swal.fire({
      title: "¿Estás seguro si quieres eliminar la oferta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clienteAxios.delete(`/oferta/delete/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Eliminada",
            text: "Oferta eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTimeout(() => {
            Swal.close();
            getOfertas.refetch();
          }, 2000);
        }
      }
    });
  };

  const columns = [
    {
      name: "titulo",
      label: "Título",
      options: {
        setCellProps: () => ({ style: { width: "150px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "descripcion",
      label: "Descripción",
      options: {
        customBodyRender: (value) =>
          value.length > 100 ? `${value.substring(0, 100)}...` : value,
        setCellProps: () => ({ style: { width: "150px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "experiencia_laboral",
      label: "Experiencia",
      options: {
        customBodyRender: (value) => (value ? "Si" : "No"),
        setCellProps: () => ({ style: { width: "100px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "cupos",
      label: "Cupos",
      options: {
        setCellProps: () => ({ style: { width: "50px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "modalidad",
      label: "Modalidad",
      options: {
        customBodyRender: (value) => value.nombre_modalidad,
        setCellProps: () => ({ style: { width: "100px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "periodo_academico",
      label: "Periodo académico",
      options: {
        customBodyRender: (value) => `${value.anio} - ${value.periodo}`,
        setCellProps: () => ({ style: { width: "150px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "empresa",
      label: "Empresa",
      options: {
        customBodyRender: (value) =>
          value ? value.nombre : "No hay una empresa asociada",
        setCellProps: () => ({ style: { width: "200px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const oferta = getOfertas.data.ofertas[dataIndex];
          return (
            <>
              <Edit
                sx={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() =>
                  navigate(`/modificaroferta/${oferta.id_oferta_practica}`)
                }
              />
              <Delete
                sx={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => eliminar_oferta(oferta.id_oferta_practica)}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  navigate(`/detalleOfertas/${oferta.id_oferta_practica}`)
                }
              >
                Ver más
              </Button>
            </>
          );
        },
        setCellProps: () => ({ style: { width: "150px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
  ];

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none",
    sort: false,
    textLabels: {
      body: {
        noMatch: 'No hay datos disponibles', // Mensaje en español cuando no hay datos
      },
    },
  };

  if (getOfertas.isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  const today = new Date();
  const currentYear = today.getFullYear();

  // Filtrar ofertas actuales solo si hay datos disponibles
  const ofertasActuales = getOfertas.data?.ofertas
    ? getOfertas.data.ofertas.filter(
        (oferta) => oferta.periodo_academico.anio >= currentYear
      )
    : [];

  // Filtrar ofertas pasadas solo si hay datos disponibles
  const ofertasPasadas = getOfertas.data?.ofertas
    ? getOfertas.data.ofertas.filter(
        (oferta) => oferta.periodo_academico.anio < currentYear
      )
    : [];

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
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",
            paddingRight: "16px",
            marginTop: "16px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              marginLeft: "16px",
              marginBottom: "16px",
              overflowX: "auto", // Scroll horizontal cuando sea necesario
              maxWidth: "100%", // Asegurar que se adapte al ancho del contenedor
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
                    marginBottom: "10px",
                  }}
                >
                  Ofertas de Prácticas <Work sx={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  sx={{ marginLeft: "10px", bgcolor: "#326fa6" }}
                  variant="contained"
                  onClick={() => navigate("/crearoferta")}
                >
                  Añadir oferta
                </Button>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                {ofertasActuales.length > 0 && (
                  <MUIDataTable
                    data={ofertasActuales}
                    columns={columns}
                    options={options}
                  />
                )}
                <Typography variant="h5" sx={{ textAlign: "center", marginTop: "15px" }}>
                  Ofertas de Prácticas Pasadas
                </Typography>
                {ofertasPasadas.length > 0 && (
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "20px",
                      marginLeft: "5px",
                      overflowX: "auto", // Scroll horizontal cuando sea necesario
                      maxWidth: "100%", // Asegurar que se adapte al contenedor
                    }}
                  >
                    <MUIDataTable
                      data={ofertasPasadas}
                      columns={columns}
                      options={{
                        ...options,
                        responsive: "standard", // Mantener responsive
                        tableBodyMaxHeight: "calc(100vh - 300px)", // Limitar altura
                      }}
                      sx={{ width: "100%" }} // Añadir estilo para tabla pasada
                    />
                  </Grid>
                )}
                {ofertasActuales.length === 0 &&
                  ofertasPasadas.length === 0 && (
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      No hay ofertas disponibles.
                    </Typography>
                  )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OfertaPractica;
