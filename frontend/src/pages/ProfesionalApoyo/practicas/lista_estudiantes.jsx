import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Grid, Typography, Button, Box, IconButton } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";
import clienteAxios from "../../../helpers/clienteaxios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ListaEstudiantes = () => {
  const { careerId, asignaturaId, anio, periodo } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  const carreraMap = {
    29037: "IECI",
    29027: "ICINF",
    // Añadir más mapeos aquí si es necesario
  };

  const asignaturaMap = {
    620520: "Práctica 2",
    620509: "Práctica 1",
  };

  const nombreCarrera = carreraMap[careerId] || "Carrera Desconocida";
  const nombreAsignatura =
    asignaturaMap[asignaturaId] || "Asignatura Desconocida";

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth >= zoomThreshold);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(
          `/inscripcion/listaestudiantes/${careerId}/${asignaturaId}/${anio}/${periodo}`
        );
        const transformedData = response.data.map((estudiante) => ({
          ...estudiante,
          estado_practica:
            estudiante.inscribe[0]?.estado_practica?.nombre_estado_practica ||
            "No disponible",
          id_inscripcion:
            estudiante.inscribe[0]?.id_inscripcion || "No disponible",
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [careerId, asignaturaId, anio, periodo]);

  const fetchInscripcion = async (idInscribe) => {
    try {
      const response = await clienteAxios.get(
        `/inscripcion/inscribe/${idInscribe}`
      );
      return response.data.inscripcion.id_inscripcion_practica;
    } catch (error) {
      console.error("Error fetching inscripcion:", error);
      return null;
    }
  };

  const handleViewInscripcion = (id) => {
    window.open(`/visualizadorInscripciones/${id}`, "_blank");
  };

  const handleViewInforme = (id) => {
    window.open(`/visualizadorInformes/${id}`, "_blank");
  };

  const handleViewEvaluacion = (id) => {
    window.open(`/visualizadorEvaluaciones/${id}`, "_blank");
  };

  const columns = [
    {
      name: "rut",
      label: "RUT",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "primer_nombre",
      label: "Primer Nombre",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "apellido_paterno",
      label: "Apellido Paterno",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "apellido_materno",
      label: "Apellido Materno",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "correo_institucional",
      label: "Correo Institucional",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "estado_practica",
      label: "Estado de Práctica",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "perfil",
      label: "Perfil",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
        customBodyRender: (value, tableMeta) => {
          return (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "10px" }}
                onClick={() =>
                  navigate(`/perfilEstudiante/${tableMeta.rowData[0]}`)
                }
              >
                Perfil
              </Button>
            </Box>
          );
        },
      },
    },
    {
      name: "PDF Inscripción",
      label: "PDF Inscripción",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
        customBodyRender: (value, tableMeta) => {
          const handleButtonClick = async (action) => {
            const idInscribe = data[tableMeta.rowIndex]?.id_inscripcion;
            if (idInscribe) {
              const idInscripcionPractica = await fetchInscripcion(idInscribe);
              action(idInscripcionPractica);
            }
          };

          return (
            <Box>
              <IconButton
                title="Ver PDF Inscripción"
                color="primary"
                onClick={() => handleButtonClick(handleViewInscripcion)}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </Box>
          );
        },
      },
    },
    {
      name: "PDF Evaluación",
      label: "PDF Evaluación",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
        customBodyRender: (value, tableMeta) => {
          const handleButtonClick = async (action) => {
            const idInscribe = data[tableMeta.rowIndex]?.id_inscripcion;
            if (idInscribe) {
              const idInscripcionPractica = await fetchInscripcion(idInscribe);
              action(idInscripcionPractica);
            }
          };

          return (
            <Box>
              <IconButton
                title="Ver PDF Evaluacion"
                color="primary"
                onClick={() => handleButtonClick(handleViewEvaluacion)}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </Box>
          );
        },
      },
    },
    {
      name: "PDF Informe",
      label: "PDF Informe",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
        customBodyRender: (value, tableMeta) => {
          const handleButtonClick = async (action) => {
            const idInscribe = data[tableMeta.rowIndex]?.id_inscripcion;
            if (idInscribe) {
              const idInscripcionPractica = await fetchInscripcion(idInscribe);
              action(idInscripcionPractica);
            }
          };

          return (
            <Box>
              <IconButton
                title="Ver PDF Informe"
                color="primary"
                onClick={() => handleButtonClick(handleViewInforme)}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </Box>
          );
        },
      },
    },
    {
      name: "bitacoras",
      label: "Bitácoras",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
        customBodyRender: (value, tableMeta) => {
          const idInscribe = data[tableMeta.rowIndex]?.id_inscripcion;

          const handleNavigate = async () => {
            if (idInscribe) {
              try {
                const idInscripcionPractica = await fetchInscripcion(
                  idInscribe
                );
                navigate(`/bitacoras_alumnos/${idInscripcionPractica}`);
              } catch (error) {
                console.error("Error fetching inscripcion:", error);
              }
            }
          };

          return (
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNavigate}
              >
                Bitácoras
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "600px", // Ajusta esta altura según sea necesario
    search: true, // Activa la opción de búsqueda
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "No se encontraron datos",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Borrar",
        deleteAria: "Borrar filas seleccionadas",
      },
    },
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid
        item
        sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}
      >
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>

      <Grid container item>
        {sidebarOpen && (
          <Grid
            item
            sx={{
              position: "fixed",
              top: "80px",
              left: 0,
              width: "250px",
              zIndex: 1200,
              backgroundColor: "#36465d",
            }}
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
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginBottom: "15px",
              marginLeft: "16px",
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
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: { xs: "1.3rem", sm: "1.4rem" },
                    textAlign: "center",
                  }}
                >
                  Lista de estudiantes {nombreAsignatura} - {nombreCarrera}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <MUIDataTable data={data} columns={columns} options={options} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListaEstudiantes;
