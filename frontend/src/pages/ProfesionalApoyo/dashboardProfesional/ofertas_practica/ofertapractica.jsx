import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { Edit, Delete, Work } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../../helpers/clienteaxios";
import MUIDataTable from "mui-datatables";

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

  useEffect(() => {
    if (getOfertas.data) {
      console.log("Ofertas data:", getOfertas.data);
    }
  }, [getOfertas.data]);

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
      name: "descripcion",
      label: "Descripción",
      options: {
        setCellProps: () => ({ style: { width: "150px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
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
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
      },
    },
    {
      name: "cupos",
      label: "Cupos",
      options: {
        setCellProps: () => ({ style: { width: "50px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
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
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
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
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
      },
    },
    {
      name: "empresa",
      label: "Empresa",
      options: {
        customBodyRender: (value) =>
          value ? value.razon_social : "No hay una empresa asociada",
        setCellProps: () => ({ style: { width: "200px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
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
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/modificaroferta/${oferta.id_oferta_practica}`)
                }
              />
              <Delete
                sx={{ cursor: "pointer" }}
                onClick={() => eliminar_oferta(oferta.id_oferta_practica)}
              />
            </>
          );
        },
        setCellProps: () => ({ style: { width: "100px" } }),
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: '#326fa6',
            color: '#fff'
          }
        })
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
    selectableRows: "none", // Desactiva la selección múltiple
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
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",
            paddingRight: "16px",
            overflowX: "auto",
            marginTop: "35px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "16px",
              backgroundColor: "#fff",
              maxWidth: "1200px", // Adjust the width as needed
              margin: "auto",
            }}
          >
            {getOfertas.status === "success" && getOfertas.data.ofertas ? (
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
                    Ofertas de Prácticas <Work style={{ marginLeft: "5px" }} />
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
                  <MUIDataTable
                    data={getOfertas.data.ofertas}
                    columns={columns}
                    options={options}
                  />
                </Grid>
              </Grid>
            ) : getOfertas.status === "success" && !getOfertas.data.ofertas ? (
              <Grid
                container
                spacing={2}
                sx={{ flexDirection: "column", alignItems: "center" }}
              >
                <Grid item>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Ofertas de prácticas profesionales
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                    onClick={() => navigate("/crearoferta")}
                  >
                    Añadir oferta
                  </Button>
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <MUIDataTable
                    data={[]}
                    columns={columns}
                    options={options}
                  />
                </Grid>
              </Grid>
            ) : getOfertas.status === "loading" ? (
              <Grid
                container
                spacing={2}
                sx={{ flexDirection: "column", alignItems: "center" }}
              >
                <Grid item>Cargando datos.........</Grid>
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OfertaPractica;