import { useState, useEffect } from "react";
import { Grid, Card, IconButton } from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import clienteAxios from '../../../helpers/clienteaxios';
import VisibilityIcon from '@mui/icons-material/Visibility';

const EvaluacionesPendientes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [informes, setInformes] = useState([]);
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

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const response = await clienteAxios.get("/archivoevaluacion/getPendientes");
        setInformes(response.data);
      } catch (error) {
        console.error("Error fetching pending reports:", error);
      }
    };

    fetchEvaluaciones();
  }, []);

  const handleView = (id) => {
    window.open(`/visualizadorEvaluaciones/${id}`, '_blank');
  };

  const columns = [
    { name: "id_archivo_evaluacion", label: "ID" },
    { name: "nombre", label: "Nombre" },
    { name: "tipo_archivo", label: "Tipo de Archivo" },
    { name: "tipo_documento", label: "Tipo de Documento" },
    { name: "id_inscripcion", label: "ID Inscripción" },
    { name: "id_estado_evaluacion", label: "Estado de la evaluación" },
    {
      name: "ver",
      label: "Ver",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={() => handleView(tableMeta.rowData[0])}>
              <VisibilityIcon />
            </IconButton>
          );
        },
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
          toggleSidebar={toggleSidebar}
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
            <MUIDataTable
              title={"Evaluaciones Pendientes"}
              data={informes}
              columns={columns}
              options={options}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EvaluacionesPendientes;
